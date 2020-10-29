import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/Cliente';
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

  constructor(
    private clienteService: ClientesService,
  ) {
    this.servico = new ServicoPrestado()
  }

  ngOnInit(): void {
    this, this.clienteService
      .getClientes()
      .subscribe(res => this.clientes = res)
  }
  onSubmit() {
    console.log(this.servico)
  }

}
