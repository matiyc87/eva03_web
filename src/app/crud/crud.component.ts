import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProductoModel } from '../../model/reserva';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ RouterOutlet,ReactiveFormsModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})
export class CrudComponent {
  
  productObj:ProductoModel = new ProductoModel();
  productForm:FormGroup = new FormGroup({});
  productList:ProductoModel[] = [];

  constructor()
  {
    this.createReserva();
    const oldData = localStorage.getItem("Reservas");
    if(oldData!=null)
    {
      //Convirtiendo los datos a JSON 
      const parseData = JSON.parse(oldData);
      this.productList = parseData;
    }

  }

  createReserva()
  {
    this.productForm = new FormGroup({
      ID: new FormControl(this.productObj.ID),
      Nombre: new FormControl(this.productObj.Nombre, [Validators.required]),
      Tour: new FormControl(this.productObj.Tour, [Validators.required]),
      Fecha: new FormControl(this.productObj.Fecha, [Validators.required]),
    });  
  }

  onSave(){
    const oldData = localStorage.getItem("Reservas");
    if(oldData!=null)
    {
      //Convierte datos a JSON???
      const parseData = JSON.parse(oldData);
      this.productForm.controls['ID'].setValue(parseData.length+1);
      //Guardar en la lista
      this.productList.unshift(this.productForm.value);
    }
    else
    {
      this.productList.unshift(this.productForm.value);
    }
    //Guardar registro en almacenamiento local
    localStorage.setItem("Reservas", JSON.stringify(this.productList));
    this.limpiar();
  }

  onEdit(item:ProductoModel)
  {
    this.productObj=item;
    this.createReserva();
  }

  limpiar(){
    this.productObj=new ProductoModel;
    this.createReserva();
  }

  onUpdate()
  {
    const registro = this.productList.find(m=>m.ID == this.productForm.controls['ID'].value);
    if(registro != undefined){
      registro.Nombre = this.productForm.controls['Nombre'].value;
      registro.Tour = this.productForm.controls['Tour'].value;
      registro.Fecha = this.productForm.controls['Fecha'].value;
    }
    localStorage.setItem("Reservas", JSON.stringify(this.productList));
    this.limpiar();
  }

  onDelete(ID:number){
    const borrar = confirm("¿Está seguro de eliminar este registro?");
    if (borrar) 
      {
      //Recuperar id del registro a eliminar
      const indice = this.productList.findIndex(m=>m.ID ==ID);
      //Elimina el registro de la lista
      this.productList.splice(indice,1);
    }
    localStorage.setItem("Reservas", JSON.stringify(this.productList));
  }

}
