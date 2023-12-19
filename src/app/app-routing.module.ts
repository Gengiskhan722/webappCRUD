import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { MateriaScreenComponent } from './screens/materia-screen/materia-screen.component';
import { ListarMateriaScreenComponent } from './screens/listar-materia-screen/listar-materia-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'registro/:id', component: RegistroScreenComponent, pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent, pathMatch: 'full' },
  { path: 'registrar_materia', component: MateriaScreenComponent, pathMatch: 'full' },
  { path: 'registrar_materia/:id', component: MateriaScreenComponent, pathMatch: 'full' },
  { path: 'listar_materia', component: ListarMateriaScreenComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
