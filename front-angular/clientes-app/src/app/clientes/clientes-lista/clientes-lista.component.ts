import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../Cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSel: Cliente;
  mensagemSucesso: string;
  mensagemErro: string;


  constructor(private service: ClientesService, private router: Router) {

  }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe(res => this.clientes = res);
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form'])
  }
  preparaDelecao(cliente: Cliente) {
    this.clienteSel = cliente;
  }
  deletarCliente() {
    this.service.deletar(this.clienteSel)
      .subscribe(res => { this.mensagemSucesso = 'Cliente deletado com sucesso', this.ngOnInit() },
        erro => this.mensagemErro = 'erro ao deletar o cliente')
  }

}
