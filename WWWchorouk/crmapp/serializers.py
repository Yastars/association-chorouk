from rest_framework import serializers

from .models import Account, Post, Game, GameRegistration
from django.contrib.auth.models import User

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    publishedByUsername = serializers.CharField(source='publishedBy.username', read_only=True)
    createdAt = serializers.DateTimeField(format="%b %d %Y", read_only=True)
    class Meta:
        model = Post
        fields = "__all__"

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"

class GameRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameRegistration
        fields = "__all__"
