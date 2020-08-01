from rest_framework import serializers

from .models import Account, Post, Game, GameRegistration
from django.contrib.auth.models import User

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ["cin", "first_name", "last_name", "gender", "phone", "address", "city", "position", "description"]
        def create(self, validated_data):
            return Account.objects.create(**validated_data)



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


class PostBaseSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title':instance.title,
            'preview':instance.preview,     
            'content':instance.content, 
            'picture':instance.picture.url,   
            'category':instance.category,            
            'publishedBy':instance.publishedBy.username,
            'editedBy':instance.editedBy.username,    
            'createdAt':instance.createdAt.strftime("%b %d %Y")
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'is_active')
        # fields = "__all__"
        # extra_kwargs = {'password': {'write_only': True}}


