# Generated by Django 4.0.1 on 2022-02-14 19:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0018_alter_player_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='TakenPick',
            new_name='takenPick',
        ),
        migrations.RenameField(
            model_name='player',
            old_name='TakenRound',
            new_name='takenRound',
        ),
    ]
