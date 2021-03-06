from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

from django.db.models.signals import post_save
from django.dispatch import receiver

from rest_framework import serializers
import datetime

INDCHOICES = (
    ('PRESIDENT', 'PRESIDENT'),
    ('ADMINISTRATION', 'ADMINISTRATION'),
    ('MEMBER', 'MEMBER'),
    ('OTHER', 'OTHER'),
)
        
GENDERCHOICES = (
    ('M','Male'),
    ('F','Female'),
)

CATEGORY_POSTS = (
    ('sport','Sport'),
    ('news','News'),
    ('donation','Donation'),
    ('match','Match'),
    ('project','Project'),
)


GAME_POSITION = (
    ('goalkeeper','Goalkeeper'),
    ('attack','Attack'),
    ('defense','Defense'),
)

GAME_REGISTRATION_STATUS = (
    ('REGISTERED','Registered'),
    ('WAITINGLIST','Waiting List'),
)


class Account(models.Model):
    cin = models.CharField(max_length=14, unique=True)
    first_name = models.CharField("First Name", max_length=64)
    last_name = models.CharField("Last Name", max_length=64)
    gender = models.CharField("Gender", choices=GENDERCHOICES, max_length=1)
    # email = models.EmailField(blank = False, null = False, unique=True)
    phone = models.CharField(max_length=20, blank = True, null = True, unique=True)
    address = models.CharField("Address", max_length=250)
    city = models.CharField("City", max_length=64)
    position = models.CharField("Position at the Association", max_length=255, choices=INDCHOICES, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_Accepted = models.BooleanField()
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
    
 
    def __str__(self):
        return self.first_name


    # @receiver(post_save, sender=User)
    # def create_user_account(sender, instance, created, **kwargs):
    #     if created:
    #         Account.objects.create(cin=instance.account.cin, user=instance)

    # @receiver(post_save, sender=User)
    # def save_user_account(sender, instance, **kwargs):
    #     instance.account.save()

#Article, Post, News, etc...
class Post(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    preview = models.TextField(max_length=600, verbose_name='Preview')
    content = models.TextField(max_length=2000, verbose_name='Detail Text')
    picture = models.FileField(blank=True, null=True)
    # picture = CloudinaryField('image')
    category = models.CharField(max_length=64, choices=CATEGORY_POSTS)
    publishedBy = models.ForeignKey(User, related_name='post_published_by', on_delete=models.CASCADE)
    editedBy = models.ForeignKey(User, related_name='post_last_edited_by', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    
    
    def __str__(self):
        return self.title



class Team(models.Model):
    name = models.CharField('Title', max_length=255, null=False, blank=False)
    owner = models.ForeignKey(User, related_name='team_owner', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    def __str__(self):
        return self.name


#Class pour les Match 
class Game(models.Model):
    title = models.CharField('Title', max_length=255, null=False, blank=False)
    preview = models.TextField(max_length=600, verbose_name='Preview')
    content = models.TextField(max_length=2000, verbose_name='Detail Text')
    address = models.CharField("Address", "address", max_length=250)
    arbitrator = models.ForeignKey(User, related_name='Arbitrator', on_delete=models.CASCADE)
    date = models.DateTimeField("Date play", null=False)
    max_players = models.IntegerField("Maximum of Players", null=True)
    is_private = models.BooleanField(default=False)
    publishedBy = models.ForeignKey(User, related_name='game_published_by', on_delete=models.CASCADE)
    editedBy = models.ForeignKey(User, related_name='game_last_edited_by', on_delete=models.CASCADE, blank=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    team_a = models.ForeignKey(Team, related_name='game_team_a', on_delete=models.CASCADE, null=True, blank=True)
    team_b = models.ForeignKey(Team, related_name='game_team_b', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.title


class TeamRegistration(models.Model):
    player = models.ForeignKey(User, related_name='player', on_delete=models.CASCADE)
    team = models.ForeignKey(Team, related_name='team_joined', on_delete=models.CASCADE)
    position = models.CharField('Position in the game', max_length=20, null=False, blank=False, choices=GAME_POSITION)
    status = models.CharField('Status of the registration', max_length=20, null=False, blank=False, choices=GAME_REGISTRATION_STATUS)

    def __str__(self):
        return self.position




    


