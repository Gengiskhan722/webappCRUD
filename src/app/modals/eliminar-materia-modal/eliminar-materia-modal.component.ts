import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-eliminar-materia-modal',
  templateUrl: './eliminar-materia-modal.component.html',
  styleUrls: ['./eliminar-materia-modal.component.scss']
})
export class EliminarMateriaModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EliminarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    public usuariosService: UsuariosService
  ){}


  ngOnInit(): void {
  }
  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }
  public eliminarMateria(){
    this.usuariosService.eliminarMateria(this.data.nrc).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      },(error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }
}
