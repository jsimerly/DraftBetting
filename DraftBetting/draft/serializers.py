from rest_framework import serializers
from .models import Player, Competitor, CompPick

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = (
            'id', 'name', 'position', 'EstimatedRound', 'EstimatedPick', 
            'college', 'age', 'TakenRound', 'TakenPick',
                )

class CompPickSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompPick
        fields = ('player', 'pos', 'round', 'pick', 'comp')
    