from django.contrib import admin

from .models import Account, Post, Game, GameRegistration

admin.site.register(Account)
admin.site.register(Post)
admin.site.register(Game)
admin.site.register(GameRegistration)
