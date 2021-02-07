import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { pyServer } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }

  public getClientes(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${pyServer}/getClientes`;
      const sub: Subscription = this.http
        .get(url)
        .subscribe(
          (data) => {
            console.log(data);
            
            sub.unsubscribe();
            resolve(data);
          },
          (error) => {
            sub.unsubscribe();
            console.log(error);
            
            reject(error);
          }
        );
    });
  }

  public addClientes(cliente:{ cliente: string, estado: string}): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${pyServer}/Clientes`;
      const sub: Subscription = this.http
        .post(url, cliente)
        .subscribe(
          (data) => {
            console.log(data);
            
            sub.unsubscribe();
            resolve(data);
          },
          (error) => {
            sub.unsubscribe();
            console.log(error);
            
            reject(error);
          }
        );
    });
  }

}
