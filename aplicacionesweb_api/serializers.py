from rest_framework import serializers
from rest_framework.authtoken.models import Token
from aplicacionesweb_api.models import *

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ('id','first_name','last_name', 'email')

class MateriasSerializer(serializers.ModelSerializer):
    nrc = serializers.IntegerField(read_only=True)
    materia = serializers.CharField(required=True)
    seccion = serializers.IntegerField(required=True)
    dias = serializers.CharField(required=True)
    hora_inicio = serializers.CharField(required=True)
    hora_fin = serializers.CharField(required=True)
    salon = serializers.CharField(required=True)
    carrera = serializers.CharField(required=True)
    class Meta:
        model = Materias
        fields = ('nrc','materia','seccion','dias','hora_inicio','hora_fin','salon','carrera')

class ProfilesSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = "__all__"
class ProfilesAllSerializer(serializers.ModelSerializer):
    #user=UserSerializer(read_only=True)
    class Meta:
        model = Profiles
        fields = '__all__'
        depth = 1
