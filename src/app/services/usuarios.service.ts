import { Injectable } from '@angular/core';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';
import { Token } from '@angular/compiler';


const httpOptions ={
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private http: HttpClient,
    private facadeService: FacadeService
  ) { }
  //JSON para registrar Usuarios
  public esquemaUser(){
    return{
      'matricula':'',
      'first_name':'',
      'last_name':'',
      'email':'',
      'password':'',
      'confirmar_password':'',
      'fecha_nacimiento':'',
      'curp':'',
      'rfc':'',
      'edad':'',
      'telefono':'',
      'ocupacion':'',
   }
 }
 //JSON para registar una materia con los campos deseados
 public esquemaMateria(){
  return{
    'nrc':'',
    'materia':'',
    'seccion':'',
    'dias':'',
    'hora_inicio':'',
    'hora_fin':'',
    'salon':'',
    'carrera':'',
 }
}
//Funcion que valida el tipo de dato de cada campo y lo hace requerido
 public validarUsuario(data: any, editar:boolean){
  console.log("Validando user...",data);
  let error: any = [];
  if(!this.validatorService.required(data["matricula"])){
    error["matricula"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["first_name"])){
    error["first_name"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["last_name"])){
    error["last_name"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["email"])){
    error["email"] = this.errorService.required;
  }else if(!this.validatorService.max(data["email"],40)){
    error["email"] = this.errorService.max(40); 
  }else if(!this.validatorService.email(data["email"])){
    error['email'] = this.validatorService.email;
  }
if(!editar){
  if(!this.validatorService.required(data["password"])){
    error["password"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["confirmar_password"])){
    error["confirmar_password"] = this.errorService.required;
  } 
}
  if(!this.validatorService.required(data["fecha_nacimiento"])){
    error["fecha_nacimiento"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["curp"])){
    error["curp"] = this.errorService.required;
  }else if(!this.validatorService.min(data["curp"],18)){
    error["curp"] = this.errorService.min(18);
    alert("La longitud de caracteres de la CURP es menor, deben ser 18");
  }else if(!this.validatorService.max(data["curp"],18)){
    error["curp"] = this.errorService.max(18);
    alert("La longitud de caracteres de la CURP es mayor, deben ser 18");
  }
  if(!this.validatorService.required(data["rfc"])){
    error["rfc"] = this.errorService.required;
  }else if(!this.validatorService.min(data["rfc"],12)){
    error["rfc"] = this.errorService.min(12);
    alert("La longitud de caracteres del RFC es menor, deben ser 12");
  }else if(!this.validatorService.max(data["rfc"],13)){
    error["rfc"] = this.errorService.max(13);
    alert("La longitud de caracteres del RFC es mayor, deben ser 13");
  }
  if(!this.validatorService.required(data["edad"])){
    error["edad"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["telefono"])){
    error["telefono"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["ocupacion"])){
    error["ocupacion"] = this.errorService.required;
  }
  return error;
 }
//Funcion que valida todos los campos para registrar una materia
 public validarMateria(data: any, editar: boolean){
  console.log("Validando materia...",data);
  let error: any = [];
  if(!this.validatorService.required(data["nrc"])){
    error["nrc"] = this.errorService.required;
  }else if(!this.validatorService.numeric(data["nrc"])){
    //Utilizamos la funcion Numeric para validar que el dato sea de tipo numerico
    error["nrc"] = this.errorService.numeric;
  }
  if(!this.validatorService.required(data["materia"])){
    error["materia"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["seccion"])){
    error["seccion"] = this.errorService.required;
  }else if(!this.validatorService.numeric(data["seccion"])){
    error["seccion"] = this.errorService.numeric;
  }
  if(!this.validatorService.required(data["dias"])){
    error["dias"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["hora_inicio"])){
    error["hora_inicio"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["hora_fin"])){
    error["hora_fin"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["salon"])){
    error["salon"] = this.errorService.required;
  }
  if(!this.validatorService.required(data["carrera"])){
    error["carrera"] = this.errorService.required;
  }
  return error;
 }

 //Registra usuario
 public registrarUsuario (data: any): Observable <any>{
  return this.http.post<any>(`${environment.url_api}/users/`,data,httpOptions);
 }
 //Obtiene la lista completa de usuarios
 public obtenerListaUsers (): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.get<any>(`${environment.url_api}/lista-users/`, {headers:headers}); 
}
//Obtiene un usuario en especifico en base al ID que se le proporcione
public getUserByID(idUser: Number){
  return this.http.get<any>(`${environment.url_api}/users/?id=${idUser}`,httpOptions);
}
//Actualiza la informacion de un usuario despues de haber editado su informacion
public editarUsuario (data: any): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.put<any>(`${environment.url_api}/users-edit/`, data, {headers:headers});
}
//ELimina un usuario de la base de datos
public eliminarUsuario(idUser: number): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.delete<any>(`${environment.url_api}/users-edit/?id=${idUser}`,{headers:headers});
}
//Copia exacta de la funcion registrar usuario con diferente URL
public registrarMateria (data: any): Observable <any>{
  return this.http.post<any>(`${environment.url_api}/registrar_materia/`,data,httpOptions);
 }
 //Funcion para obtener el listado de materias actuales
 public obtenerListaMaterias (): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.get<any>(`${environment.url_api}/l-materia/`, {headers:headers}); 
}
//Funcion que obtiene la materia deseada con un NRC especifico
public getMateriaByNRC(nrc_m: Number){
  return this.http.get<any>(`${environment.url_api}/registrar_materia/?nrc=${nrc_m}`,httpOptions);
}
//Funcion que actualiza la informacion de una materia editada
public editarMateria (data: any): Observable <any>{ 
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.put<any>(`${environment.url_api}/materia-edit/`, data, {headers:headers});
}
//Funcion que elimina una materia
public eliminarMateria(nrc_m: number): Observable <any>{
  var token = this.facadeService.getSessionToken();
  var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  return this.http.delete<any>(`${environment.url_api}/materia-edit/?nrc=${nrc_m}`,{headers:headers});
}
}
