from rest_framework import serializers
from .models import Player, Competitor, CompPick, League

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = (
            'id', 'name', 'position', 'EstimatedRound', 
            'college', 'age', 'TakenRound', 'TakenPick',
                )

class CompPickSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompPick
        fields = ('player', 'pos', 'round', 'pick') #, 'comp')

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('name',)
    