from django.db import models
from django.forms import CharField
from accounts.models import User

# Create your models here.
class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    rank = models.IntegerField()
    pos = models.CharField(max_length=4, null=True)

    first_name = models.CharField(max_length=256, null=False)
    last_name = models.CharField(max_length=256, null=False)
    suffix = models.CharField(max_length=5, null=True)

    college = models.CharField(max_length=256, null=True)
    col_class = models.CharField(max_length=4, null=True)

    conf = models.CharField(max_length=25, null=True)

    picked = models.BooleanField(default=False)

    taken_round = models.IntegerField(null=True, blank=True)
    taken_pick = models.IntegerField(null=True, blank=True)

    def get_full_name(self):
        return self.first_name + self.last_name
    
    def get_taken_overall(self):
        return self.TakenRound*32 + self.TakenPick

class Draft(models.Model):
    overall = models.IntegerField(primary_key=True)
    round = models.IntegerField()
    pick = models.IntegerField()

    player = models.ForeignKey(Player, on_delete=models.CASCADE)

class League(models.Model):
    year = models.IntegerField()
    name = models.CharField(max_length=256)
    owner = models.ForeignKey(User, on_delete=models.PROTECT, null=True)

    winner = models.ManyToManyField('Competitor', related_name='leagueWinner')
    runnerUp = models.ManyToManyField('Competitor', related_name='leagueRunnerUp')

class Competitor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    league = models.ForeignKey(League, on_delete=models.PROTECT, null=True)

    pointsFromPos = models.IntegerField(default=0)
    pointsFromPick = models.IntegerField(default=0)

    def total_points(self):
        return self.pointsFromPos + self.pointsFromPick

class CompPick(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=True)
    pos = models.CharField(max_length=4, null=True)

    comp = models.ForeignKey(Competitor, on_delete=models.CASCADE)

    overall = models.IntegerField()    
    round = models.IntegerField()
    pick = models.IntegerField()

    correct_player = models.BooleanField(default=False)
    correct_pos = models.BooleanField(default=False)

    def get_drafted_player(self):
        queryset = Draft.objects.filter(overall=self.overall)
        drafted_player = queryset[0]
        return drafted_player

    def check_pos_pick(self):
        drafted_player = self.get_drafted_player()

        if drafted_player.pos == self.pos:
            self.correct_pos = True
        else:
            self.correct_pos = False

    def check_player_pick(self):
        drafted_player = self.get_drafted_player()

        if drafted_player.pos == self.pos:
            self.correct_player = True
        else:
            self.correct_player = False
            
    def get_pick_full_string(self):
        return 'Round: {} Pick: {}'.format(self.round, self.pick)

    def get_pick_short_string(self):
        return '{}.{}'.format(self.round, self.pick)

    def get_overall(self):
        return self.pick + self.round*32

class DraftPick(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)  

    round = models.IntegerField()
    pick = models.IntegerField()
    pass

