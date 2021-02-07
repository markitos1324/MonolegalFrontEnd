import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaClientes:{cliente:string, estado:string}[];
  public encabezados:string[];
  public listaEstados:string[];

  public loading:boolean;
  public hasError:boolean;

  public name:string;
  public state:string;

  public error:string;


  constructor(private homeServiceService: HomeServiceService) { 
    this.encabezados = this.getHeaders();
    this.loading = true;
    this.hasError = false;
    this.name = "";
    this.error = "";
    this.state = "";
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
    const cliente = { cliente: this.name, estado: this.state}
    this.homeServiceService.addClientes(cliente).then(()=>{
      this.getCliente();
      this.name= "";
      this.state= "";
    }).catch((error)=>{
      this.error = "enviar los datos";
      console.log(error);
    });
  }

  public onStateChange(index:number){
    //MOLAMOLA
  }

  private getHeaders():string[]{
    const encabezados:string[] = ["Nombre", "Estado"];
    return encabezados;
  }
  
  private getStates():string[]{
    const estados:string[] = ["primerrecordatorio", "segundorecordatorio", "desconectado"];
    return estados;
  }

}
