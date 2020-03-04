from django.shortcuts import render

# Create your views here.
from django.views.generic import ListView
from posts.models import Post

class Home(ListView):
    model = Post
    template_name = 'posts/home.html'