#External
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts import serializers

#My Imports
from .models import *
from draft.serializers import PlayerSerializer, CompPickSerializer

# Create your views here.
class CompPickView(APIView):
    serializer_class = CompPickSerializer

    def get(self,request, format='json'):
        players = Player.objects.all()
        print('--------------')
        for i in players:
            print(i.name)
        print('-----------')
        serializer =  PlayerSerializer(players[0])
        return Response(serializer.data)

    def post(self, request, format='json'):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            #user = self.request.session.session_key
            #comp = serializer.data.get('comp')
            player = serializer.data.get('player')
            pos = serializer.data.get('pos')
            round = serializer.data.get('round')
            pick = serializer.data.get('pick')

            compPick = CompPick(player=player, pos=pos, round=round,pick=pick) #comp=comp,)
            compPick.save()


            return Response(CompPickSerializer(compPick).data, status=status.HTTP_201_CREATED)

    

        
def index(request):
    return HttpResponse('Hello world')
