"""point_experts_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from aplicacionesweb_api.views import bootstrap
from aplicacionesweb_api.views import users
from aplicacionesweb_api.views import auth

urlpatterns = [
    #Version
        path('bootstrap/version', bootstrap.VersionView.as_view()),
    #Create User
        path('users/', users.UsersView.as_view()),
    #Crear/registrar materia
        path('registrar_materia/', users.MateriasView.as_view()),
    #Editar ususarios    
        path('users-edit/', users.UsersViewEdit.as_view()),
    #Editar ususarios    
        path('materia-edit/', users.MateriasViewEdit.as_view()),
    #User Data
        path('lista-users/', users.UsersAll.as_view()),
    #User Data
        path('l-materia/', users.MateriasAll.as_view()),
    #Login
        path('token/', auth.CustomAuthToken.as_view()),
    #Logout
        path('logout/', auth.Logout.as_view())
]
