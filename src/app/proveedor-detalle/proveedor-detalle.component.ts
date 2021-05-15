import { Component, OnInit, Input } from '@angular/core'
import { ProveedorService } from '../proveedor.service'
import { Proveedor } from '../proveedor';
import { ProveedorDataSource } from '../proveedor-datasource'
import {BehaviorSubject, merge, Observable, of as observableOf} from 'rxjs';


@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.component.html',
  styleUrls: ['./proveedor-detalle.component.css']
})
export class ProveedorDetalleComponent implements OnInit { 
  dataSource: ProveedorDataSource;

  
  exampleDatabase: ProveedorService | null;
  proveedores = new BehaviorSubject<Proveedor[]>([]);
  userData:Observable<Proveedor[]>;

  resultsLength : number = 5;
 persona;

  @Input() proveedor?: Proveedor;
  
  constructor(private datosProveedor:ProveedorService) {
    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);
   }

  ngOnInit(): void {
    this.dataSource = new ProveedorDataSource(this.datosProveedor);
    this.dataSource.cargaProveedores(1, 0, 3);

    
    this.datosProveedor
      .getSize()
      .subscribe(id => this.resultsLength = id);
      

      console.log("size:  "+this.resultsLength);
  }
  
  eliminar(persona)
  {
    this.datosProveedor.eleminarProveedor(persona.id)
    .subscribe(response1 =>(
      this.proveedor=this.persona.filter(item => item.id == this.proveedor.id)    ));
  }

}
