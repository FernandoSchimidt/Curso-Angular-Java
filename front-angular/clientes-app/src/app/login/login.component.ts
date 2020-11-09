import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  password2: string;
  mensagemSucesso: string;
  mensagemSenha: string;
  cadastrando: boolean;
  errors: String[];
  constructor(private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    this.authService
      .tentarLogar(this.username, this.password)
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/home'])
      }, erroResponse => {
        {
          this.errors = ['Usuario e/ou senha incorretos!']
        }
      })
  }

  preparaCadastrar(event) {
    event.preventDefault();
    this.cadastrando = true;
  }
  cancelaCadastro() {
    this.cadastrando = false;
    this.errors = null
    this.mensagemSenha = null
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    if (this.password === this.password2) {
      usuario.username = this.username;
      usuario.password = this.password;

      this.authService.salvarUsuario(usuario)
        .subscribe(res => {
          this.posCadastro()
        }, errorResponse => {
          {
            this.mensagemSucesso = null
            this.errors = errorResponse.error.errors;
          }
        })
    } else {
      this.mensagemSenha = "As Senhas são diferentes"
      this.mensagemSucesso = null
    }
  }

  logar() {

  }

  posCadastro() {
    this.mensagemSenha = null
    this.mensagemSucesso = "cadastro realizado com sucesso! Efetue login."
    this.cadastrando = false
  }

}
