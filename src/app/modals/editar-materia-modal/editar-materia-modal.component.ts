import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var $:any;

@Component({
  selector: 'app-editar-materia-modal',
  templateUrl: './editar-materia-modal.component.html',
  styleUrls: ['./editar-materia-modal.component.scss']
})
export class EditarMateriaModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<EditarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    public usuariosService: UsuariosService,
    public router: Router
  ){}
  ngOnInit(): void {
  }
  public cerrar_modal(){
    this.dialogRef.close({isEdit:false});
  }

  public actualizar(){
    this.usuariosService.editarMateria(this.data).subscribe(
      (response)=>{
        this.dialogRef.close({isEdit:true});
      }, (error)=>{
        this.dialogRef.close({isEdit:false});
      }
    );
    
  }
}
