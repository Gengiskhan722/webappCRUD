import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroScreenComponent } from './screens/registro-screen/registro-screen.component';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {CookieService } from 'ngx-cookie-service';
import {NgIf, NgFor} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaskPipe,NgxMaskDirective,NgxMaskService,IConfig, provideNgxMask } from 'ngx-mask';
import {MatDialogModule} from '@angular/material/dialog';
import { EliminarUserModalComponent } from './modals/eliminar-user-modal/eliminar-user-modal.component';
import { MateriaScreenComponent } from './screens/materia-screen/materia-screen.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatSelectModule} from '@angular/material/select';
import { ListarMateriaScreenComponent } from './screens/listar-materia-screen/listar-materia-screen.component';
import { EliminarMateriaModalComponent } from './modals/eliminar-materia-modal/eliminar-materia-modal.component';
import { EditarMateriaModalComponent } from './modals/editar-materia-modal/editar-materia-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    RegistroScreenComponent,
    HomeScreenComponent,
    EliminarUserModalComponent,
    MateriaScreenComponent,
    ListarMateriaScreenComponent,
    EliminarMateriaModalComponent,
    EditarMateriaModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTableModule,
    NgFor,NgIf,
    MatPaginatorModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatDialogModule,
    NgxMaterialTimepickerModule,
    MatSelectModule
  ],
  providers: [
    [provideNgxMask()],
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES',},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
