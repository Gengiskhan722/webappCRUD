import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarMateriaModalComponent } from 'src/app/modals/editar-materia-modal/editar-materia-modal.component';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
declare var $:any;

@Component({
  selector: 'app-materia-screen',
  templateUrl: './materia-screen.component.html',
  styleUrls: ['./materia-screen.component.scss']
})
export class MateriaScreenComponent implements OnInit {

  public token : String ="";
  public materia: any = {};
  public errors: any = {};
  public editar: boolean =false;
  public nrc_m: Number = 0;
  constructor(
    private facadeService: FacadeService,
    private router: Router,
    private usuariosService: UsuariosService,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.token= this.facadeService.getSessionToken();
    if(this.token==""){
      this.router.navigate([""]);
    }
    this.materia = this.usuariosService.esquemaMateria();

    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global del nrc a editar a nuestra variable local
      this.nrc_m = this.activatedRoute.snapshot.params['id'];
      console.log("NRC de la materia: ", this.nrc_m);
      //Si el token de sesion es correcto se obtiene la materia deseada a editar
      this.obtenerMateriaByID();
    }
    console.log("Materia:",this.materia);
  }
//Obtenemos la materia con el NRC deseado
  public obtenerMateriaByID(){
    this.usuariosService.getMateriaByNRC(this.nrc_m).subscribe(
      (response)=>{
        this.materia = response;
        console.log("Datos de la materia: ",this.materia);
      }, (error)=>{
        alert("No se puede obtener los datos de la materia para actualizar.");
      }
    );
  }
  //Actualizamos la materia deseada
  public actualizar(){
    this.errors = [];
    //Validamos que los datos a actualizar son correctos
    this.errors = this.usuariosService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Validacion de datos correcta!");
    //Llamamos al modal para confirmar la edicion
    const dialogRef = this.dialog.open(EditarMateriaModalComponent,{
      data: this.materia,
      height: '268px',
      width: '328px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        console.log("La materia se ha editado!");
        this.router.navigate(["listar_materia"]);
      }else{
        console.log("No se pudo editar la materia");
      }
    });
  }
  
  public regresar(){
    this.router.navigate(["home"]);
  }
  //Registramos una materia nueva
  public registrar(){
    this.errors = [];
    this.errors = this.usuariosService.validarMateria(this.materia, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    this.usuariosService.registrarMateria(this.materia).subscribe(
      (response)=>{
        alert("Materia registrada!.");
        console.log("Materia registrada!",response);
        this.router.navigate(["listar_materia"]);
      }, (error)=>{
        alert("No se pudo registrar la materia de forma adecuada");
      }
    )
  }
}
