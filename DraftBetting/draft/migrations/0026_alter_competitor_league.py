# Generated by Django 4.0.1 on 2022-04-11 23:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0025_delete_draftpick'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competitor',
            name='league',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='draft.league'),
        ),
    ]