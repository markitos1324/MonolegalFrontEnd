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
      const url = `${pyServer}/getFacturas`;
      const sub: Subscription = this.http
        .get(url)
        .subscribe(
          (data) => {
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
 
  public addClientes(factura:
    { codigoFactura: string,
      cliente: string,
      ciudad: string,
      nit: number,
      totalFactura: number,
      subTotal: number,
      iva: number,
      retencion: number,
      fechaDeCreacion: Date,
      estado: string,
      pagada:boolean,
      fechaDePago: Date}): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${pyServer}/AddFactura`;
      const sub: Subscription = this.http
        .post(url, factura)
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

  public updateClientes(cod:string, state: {estado: string}): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `${pyServer}/updateFacturas/`+cod;
      console.log(url);
      const sub: Subscription = this.http
        .put(url, state)
        .subscribe(
          (data) => {
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
