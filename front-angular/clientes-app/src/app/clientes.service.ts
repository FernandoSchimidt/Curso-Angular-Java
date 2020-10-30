import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/Cliente';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}/api/clientes`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}/api/clientes`);
  }
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/api/clientes/${id}`);
  }
  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/api/clientes/${cliente.id}`, cliente);
  }
  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/api/clientes/${cliente.id}`);
  }
}
