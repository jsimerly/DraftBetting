#External
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

#My Imports
from .models import *
from draft.serializers import PlayerSerializer, CompPickSerializer

# Create your views here.
class CompPickView(APIView):
    serializer_class = CompPickSerializer

    def post(self, request, format='json'):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            comp = self.request.session.session_key
            player_name = serializer.data.name
            pos = serializer.data.pos
            round = serializer.data.round
            pick = serializer.data.pick
        
    



def index(request):
    return HttpResponse('Hello world')
