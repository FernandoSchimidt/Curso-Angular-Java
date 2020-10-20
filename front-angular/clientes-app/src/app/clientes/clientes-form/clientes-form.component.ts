import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private service: ClientesService,private router:Router) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
  }

  onSubmit() {
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
  listaCliente(){
    this.router.navigate(['/clientes-lista'])
  }

}
