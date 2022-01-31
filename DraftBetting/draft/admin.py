from django.contrib import admin
from .models import Player, League, DraftPick

# Register your models here.
admin.site.register(Player)
admin.site.register(League)
admin.site.register(DraftPick)