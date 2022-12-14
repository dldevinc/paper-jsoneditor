# Generated by Django 4.1.3 on 2022-11-16 19:11

from django.db import migrations, models
import paper_jsoneditor.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sample',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='name')),
                ('ordered_json', paper_jsoneditor.fields.OrderedJSONField(blank=True, default=dict, verbose_name='JSON (order preserved)')),
            ],
            options={
                'verbose_name': 'Sample',
            },
        ),
    ]
