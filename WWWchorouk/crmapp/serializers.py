from rest_framework import serializers

from .models import Account, Post, Game, GameRegistration


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
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
