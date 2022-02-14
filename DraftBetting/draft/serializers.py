from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
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
        fields = ( 'round', 'pick', 'comp', 'player', 'pos',)
        

class CompetitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competitor
        fields = ('user', 'league',)


class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('name', 'owner')
    