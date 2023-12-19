import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})

export class HomeScreenComponent implements  OnInit{
  
  public lista_usuarios: any[]=[];
  public token : String ="";
  displayedColumns: string[] = ['matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar']; 
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private facadeService: FacadeService,
    private router: Router,
    private usuariosService: UsuariosService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.token= this.facadeService.getSessionToken();
    if(this.token==""){
      this.router.navigate([""]);
    }
    this.obtenerUsuarios();

  }
  public goMateria(){
    this.router.navigate(["registrar_materia"]);
  }

  public listarMateria(){
    this.router.navigate(["listar_materia"]);
  }
  public logout(){
    this.facadeService.logout().subscribe(
      (response)=>{
        this.facadeService.destroyUser();
        this.router.navigate(["/"]);
      }, (error)=>{
        console.error(error);
      }
    );
  }
  public goEditar(idUser: Number){
    this.router.navigate(["registro/"+idUser]);
  }
  public delete(idUser: number){
    const dialogRef = this.dialog.open(EliminarUserModalComponent,{
      data: {id: idUser},
      height: '268px',
      width: '328px',
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Usuario eliminado");
        window.location.reload();
      }else{
        console.log("No se eliminó el usuario");
        //alert("No se eliminó el usuario");
      }
    });
  }
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }
  public obtenerUsuarios(){
    this.usuariosService.obtenerListaUsers().subscribe(
      (response)=>{
        this.lista_usuarios = response;
        console.log("Lista users: ", this.lista_usuarios);
        if(this.lista_usuarios.length > 0){
          //Agregar datos del nombre e email
          this.lista_usuarios.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    );
  }
}
//
export interface DatosUsuario{
  id: number,
  matricula: number,
  first_name: string,
  last_name: string,
  email: string,
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: number,
  ocupacion: string
}
