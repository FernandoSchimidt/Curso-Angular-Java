import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/clientes.service';

import { Cliente } from '../Cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  sucesso: boolean = false;
  errors: string[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service
          .getClienteById(this.id)
          .subscribe(res => this.cliente = res,
            errorResponse => this.cliente = new Cliente())
      }
    })
  }


  onSubmit() {
    if (this.id) {
      this.service
        .atualizar(this.cliente)
        .subscribe(res => {
          this.sucesso = true;
          this.errors = null;
        }, errorResponse => {
          this.errors = ['Erro ao atualizar o cliente.']
        })
    } else {

      this.service.salvar(this.cliente)
        .subscribe(res => {
          console.log(res);
          this.sucesso = true;
          this.errors = null;
          this.cliente = res;
        },
          errorResponse => {
            this.sucesso = false;
            this.errors = errorResponse.error.errors;
          })
    }
  }
  listaCliente() {
    this.router.navigate(['/clientes-lista'])
  }

}
