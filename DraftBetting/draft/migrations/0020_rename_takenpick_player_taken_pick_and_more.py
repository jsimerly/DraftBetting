# Generated by Django 4.0.1 on 2022-02-14 19:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0019_rename_takenpick_player_takenpick_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='takenPick',
            new_name='taken_pick',
        ),
        migrations.RenameField(
            model_name='player',
            old_name='takenRound',
            new_name='taken_round',
        ),
    ]
