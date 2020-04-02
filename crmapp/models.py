from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

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


class Account(models.Model):
    cin = models.CharField(max_length=14, unique=True)
    first_name = models.CharField("First Name", max_length=64)
    last_name = models.CharField("Last Name", max_length=64)
    gender = models.CharField("Gender", choices=GENDERCHOICES, max_length=1)
    email = models.EmailField(blank = False, null = False, unique=True)
    phone = models.CharField(max_length=20, blank = True, null = True, unique=True)
    address = models.CharField("Address", "Name", max_length=250)
    city = models.CharField("City", max_length=64)
    position = models.CharField("Position at the Association", max_length=255, choices=INDCHOICES, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdBy = models.ForeignKey(User, related_name='account_created_by', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created Att", auto_now_add=True)
    isActive = models.BooleanField(default=False)
    activatedBy = models.ForeignKey(User, related_name='account_activated_by', on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name

#Article, Post, News, etc...
class Post(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    preview = models.TextField(max_length=600, verbose_name='Preview')
    content = models.TextField(max_length=2000, verbose_name='Detail Text')
    #picture = models.FileField(blank=False, null=True)
    picture = CloudinaryField('image')
    category = models.CharField(max_length=64, choices=CATEGORY_POSTS)
    publishedBy = models.ForeignKey(User, related_name='post_published_by', on_delete=models.CASCADE)
    editedBy = models.ForeignKey(User, related_name='post_last_edited_by', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)
    
    
    
    def __str__(self):
        return self.title





#Class pour les Match 
class Game(models.Model):
    title = models.CharField('Title', max_length=255, null=False, blank=False)
    preview = models.TextField(max_length=600, verbose_name='Preview')
    content = models.TextField(max_length=2000, verbose_name='Detail Text')
    address = models.CharField("Address", "Name", max_length=250)
    arbitrator = models.ForeignKey(User, related_name='Arbitrator', on_delete=models.CASCADE)
    publishedBy = models.ForeignKey(User, related_name='game_published_by', on_delete=models.CASCADE)
    editedBy = models.ForeignKey(User, related_name='game_last_edited_by', on_delete=models.CASCADE)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.title


class GameRegistration(models.Model):
    player = models.ForeignKey(User, related_name='player', on_delete=models.CASCADE)
    game = models.ForeignKey(Game, related_name='game_played', on_delete=models.CASCADE)
    position = models.CharField('Position in the game', max_length=20, null=False, blank=False, choices=GAME_POSITION)


    def __str__(self):
        return self.position


