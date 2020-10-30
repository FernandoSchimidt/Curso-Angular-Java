import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/Cliente';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';
import { ClientesService } from '../../clientes.service'
import { ServicoPrestado } from '../servicoPrestado';
@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[]
  servico: ServicoPrestado
  sucesso: boolean = false;
  errors: string[];
  id: number;

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado()
  }

  ngOnInit(): void {
    this, this.clienteService
      .getClientes()
      .subscribe(res => this.clientes = res)
  }
  onSubmit() {
    if (this.id) {

    }
    else {
      this.servicoPrestadoService
        .salvar(this.servico)
        .subscribe(res => {
          this.sucesso = true;
          this.errors = null;
          this.servico = new ServicoPrestado;
        }, errosResponse => {
          this.sucesso = false;
          this.errors = errosResponse.error.errors;
        })
    }
  }
}
