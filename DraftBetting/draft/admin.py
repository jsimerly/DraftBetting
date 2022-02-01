from django.contrib import admin
from .models import Player, League, DraftPick, Competitor, CompPick

# Register your models here.
admin.site.register(Player)
admin.site.register(League)
admin.site.register(Competitor)
admin.site.register(CompPick)
admin.site.register(DraftPick)