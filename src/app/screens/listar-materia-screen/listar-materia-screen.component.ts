import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { MatPaginator } from '@angular/material/paginator';
import { EliminarUserModalComponent } from 'src/app/modals/eliminar-user-modal/eliminar-user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarMateriaModalComponent } from 'src/app/modals/eliminar-materia-modal/eliminar-materia-modal.component';

export interface DatosMateria{
  nrc: number,
  materia: string,
  seccion: number,
  dias: string,
  hora_inicio: string,
  hora_fin: string,
  salon: string,
  carrera: string
}

@Component({
  selector: 'app-listar-materia-screen',
  templateUrl: './listar-materia-screen.component.html',
  styleUrls: ['./listar-materia-screen.component.scss']
})
export class ListarMateriaScreenComponent implements OnInit {

  public l_materia: any=[];
  public token : String ="";
  displayedColumns: string[] = ['nrc', 'materia', 'seccion', 'dias', 'hora_inicio', 'hora_fin', 'salon', 'carrera', 'editar', 'eliminar']; 
  dataSource = new MatTableDataSource<DatosMateria>(this.l_materia as DatosMateria[]);
  
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
    this.obtenerMaterias();

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
  
  public goHome(){
    this.router.navigate(["home"]);
  }
  public goEditar(nrc: Number){
    this.router.navigate(["registrar_materia/"+nrc]);
  }
  public delete(nrcMateria: number){
    const dialogRef = this.dialog.open(EliminarMateriaModalComponent,{
      data: {nrc: nrcMateria},
      height: '268px',
      width: '328px',
    });
 
    dialogRef.afterClosed().subscribe(result => {
      if(result.isDelete){
        console.log("Materia eliminada");
        window.location.reload();
      }else{
        console.log("No se eliminó la materia");
      }
    });
  }
  public initPaginator(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
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
  }
  //Funcion que obtiene todas las materias y las muestra en una tabla
  public obtenerMaterias(){
    this.usuariosService.obtenerListaMaterias().subscribe(
      (response)=>{
        this.l_materia = response;
        console.log("Lista materias: ", this.l_materia);
        if(this.l_materia.length > 0){
          this.dataSource = new MatTableDataSource<DatosMateria>(this.l_materia as DatosMateria[]);
        }
      }, (error)=>{
        alert("No se pudo obtener la lista de materias.");
      }
    );
  }
}
