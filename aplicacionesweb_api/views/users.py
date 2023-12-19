from django.shortcuts import render
from django.db.models import *
from django.db import transaction
from aplicacionesweb_api.serializers import *
from aplicacionesweb_api.models import *
from rest_framework.authentication import BasicAuthentication, SessionAuthentication, TokenAuthentication
from rest_framework.generics import CreateAPIView, DestroyAPIView, UpdateAPIView
from rest_framework import permissions
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.utils.html import strip_tags
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from datetime import datetime
from django.conf import settings
from django.template.loader import render_to_string
import string
import random
import json

class UsersAll(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        profiles = Profiles.objects.filter(user__is_active = 1).order_by("id")
        lista = ProfilesSerializer(profiles, many=True).data
        
        return Response(lista, 200)



class UsersView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        user = get_object_or_404(Profiles, id = request.GET.get("id"))
        user = ProfilesSerializer(user, many=False).data
    
        return Response(user, 200)

    @transaction.atomic
    def post(self, request, *args, **kwargs):

        user = UserSerializer(data=request.data)
        if user.is_valid():
            #Grab user data
            role = 'user'
            first_name = request.data['first_name']
            last_name = request.data['last_name']
            email = request.data['email']
            password = request.data['password']

            existing_user = User.objects.filter(email=email).first()

            if existing_user:
                return Response({"message":"Username "+email+", is already taken"},400)

            user = User.objects.create( username = email,
                                        email = email,
                                        first_name = first_name,
                                        last_name = last_name,
                                        is_active = 1)


            user.save()
            user.set_password(password)
            user.save()

            group, created = Group.objects.get_or_create(name=role)
            group.user_set.add(user)
            user.save()

            #Create a profile for the user
            profile = Profiles.objects.create(user=user,
                                                matricula=request.data["matricula"],
                                                curp= request.data["curp"].upper(),
                                                rfc=request.data["rfc"].upper(),
                                                fecha_nacimiento=request.data["fecha_nacimiento"],
                                                edad=request.data["edad"],
                                                telefono=request.data["edad"],
                                                ocupacion=request.data["ocupacion"])
            profile.save()

            return Response({"profile_created_id": profile.id }, 201)

        return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)

class UsersViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        # iduser=request.data["id"]
        profile = get_object_or_404(Profiles, id=request.data["id"])
        profile.fecha_nacimiento = request.data["fecha_nacimiento"]
        profile.curp = request.data["curp"]
        profile.rfc = request.data["rfc"]
        profile.edad = request.data["edad"]
        profile.telefono = request.data["telefono"]
        profile.ocupacion = request.data["ocupacion"]
        profile.matricula = request.data["matricula"]
        profile.save()
        temp = profile.user
        temp.first_name = request.data["first_name"]
        temp.last_name = request.data["last_name"]
        temp.save()
        user = ProfilesSerializer(profile, many=False).data
 
        return Response(user,200)


    def delete(self, request, *args, **kwargs):
        profile = get_object_or_404(Profiles, id=request.GET.get("id"))
        try:
            profile.user.delete()
            return Response({"details":"USuario eliminado"},200)
        except Exception as e:
            return Response({"details":"Algo paso al eliminar"},400)


#Clase que alberga nuestro metodo GET para obtener una materia por NRC y metodo POST para registrar una materia
class MateriasView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        materia = get_object_or_404(Materias, nrc = request.GET.get("nrc"))
        materia = MateriasSerializer(materia, many=False).data
    
        return Response(materia, 200)
        
    @transaction.atomic
    def post(self, request, *args, **kwargs):

        materia = MateriasSerializer(data=request.data)
        if materia.is_valid():
            #Grab user data
            role = 'materia'
            nrc = request.data['nrc']
            materia = request.data['materia']
            seccion = request.data['seccion']
            dias = request.data['dias']
            hora_inicio = request.data['hora_inicio']
            hora_fin = request.data['hora_fin']
            salon = request.data['salon']
            carrera = request.data['carrera']

            existing_subject = Materias.objects.filter(nrc=nrc).first()

            if existing_subject:
                return Response({"message":"Materia con NRC "+nrc+", ya se encuentra registrada"},400)

            materia = Materias.objects.create( nrc = nrc,
                                        materia = materia,
                                        seccion = seccion,
                                        dias = dias,
                                        hora_inicio = hora_inicio,
                                        hora_fin = hora_fin,
                                        salon = salon,
                                        carrera =carrera,
                                        )


            materia.save()
            return Response({"Materia registrada correctamente": materia.nrc }, 201)

        return Response(materia.errors, status=status.HTTP_400_BAD_REQUEST)

#Clase que alberga nuestro metodo GET que obtiene la lista completa de Materias
class MateriasAll(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request, *args, **kwargs):
        materias = Materias.objects.order_by("nrc")
        lista_materias = MateriasSerializer(materias, many=True).data
        
        return Response(lista_materias, 200)

#CLase que contiene nuestro metodo PUT para actualizar informacion de una materia y el metodo DELETE para eliminar una materia
class MateriasViewEdit(generics.CreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    def put(self, request, *args, **kwargs):
        # iduser=request.data["id"]
        materia = get_object_or_404(Materias, nrc=request.data["nrc"])
        materia.materia = request.data["materia"]
        materia.seccion = request.data["seccion"]
        materia.dias = request.data["dias"]
        materia.hora_inicio = request.data["hora_inicio"]
        materia.hora_fin = request.data["hora_fin"]
        materia.salon = request.data["salon"]
        materia.carrera = request.data["carrera"]
        materia.save()
        materia = MateriasSerializer(materia, many=False).data
 
        return Response(materia,200)


    def delete(self, request, *args, **kwargs):
        materia = get_object_or_404(Materias, nrc=request.GET.get("nrc"))
        try:
            materia.delete()
            return Response({"details":"Materia eliminada correctamente"},200)
        except Exception as e:
            return Response({"details":"Error al eliminar"},400)