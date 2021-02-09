import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaClientes:{codigoFactura: string,
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
    fechaDePago: Date}[];
  public encabezados:string[];
  public listaEstados:string[];
  public loading:boolean;
  public hasError:boolean;
  public codigoFactura: string;
  public cliente: string;
  public ciudad: string;
  public nit: number;
  public totalFactura: number;
  public subtotal: number;
  public iva: number;
  public retencion: number;
  public fechaDeCreacion: Date;
  public estado:string;
  public pagada:boolean;
  public fechaDePago: Date;
  public error:string;
  public isSelected:boolean;


  constructor(private homeServiceService: HomeServiceService) { 
    this.encabezados = this.getHeaders();
    this.loading = true;
    this.hasError = false;
    this.codigoFactura = "";
    this.cliente = "";
    this.ciudad = "";
    this.nit = 0;
    this.totalFactura = 0;
    this.subtotal = 0;
    this.iva = 0;
    this.retencion = 0;
    this.fechaDeCreacion = new Date;
    this.estado = "";
    this.pagada = false;
    this.fechaDePago = null as any;
    this.error = "";
    this.isSelected = false;
    this.listaClientes = [];
    this.listaEstados = this.getStates();
    this.getCliente();
  }

  ngOnInit(): void {
  }

  public getCliente(){
    this.loading = true;
    this.homeServiceService.getClientes().then((data)=>{
      this.listaClientes=data;      
      this.hasError = false;
    }).catch((error)=>{
      console.log(error);
      this.hasError = true;
      this.error = "obtener los datos";
    }).finally(()=>{
      this.loading = false;
    });
  }

  public Agregar(){
     const factura = { codigoFactura: this.codigoFactura,
      cliente: this.cliente,
      ciudad: this.ciudad,
      nit: this.nit,
      totalFactura: this.totalFactura,
      subTotal: this.subtotal,
      iva: this.iva,
      retencion: this.retencion,
      fechaDeCreacion: this.fechaDeCreacion,
      estado: this.estado,
      pagada: this.pagada,
      fechaDePago: this.fechaDePago}
    this.homeServiceService.addClientes(factura).then(()=>{
      this.getCliente();
      this.resetDatas()
    }).catch((error)=>{
      this.error = "enviar los datos";
      console.log(error);
    });
  }

  public onStateChange(cod:string, state:string){
    this.homeServiceService.updateClientes(cod, {estado: state});
    swal("Estado Actualizado", "You clicked the button!", "success");
  }

  private resetDatas(){
    this.codigoFactura = "";
    this.cliente = "";
    this.ciudad = "";
    this.nit = 0;
    this.totalFactura = 0;
    this.subtotal = 0;
    this.iva = 0;
    this.retencion = 0;
    this.fechaDeCreacion = new Date;
    this.estado = "";
    this.pagada = false;
    this.fechaDePago = null as any;
  }

  private getHeaders():string[]{
    const encabezados:string[] = [ "CodigoFactura", "Cliente", "Ciudad", "NIT", "TotalFactura", "SubTotal", "IVA", "Retencion", "FechaDeCreacion", "Estado", "Pagada", "FechaDePago"];
    return encabezados;
  }
  
  private getStates():string[]{
    const estados:string[] = ["primerrecordatorio", "segundorecordatorio", "desactivado"];
    return estados;
  }
}