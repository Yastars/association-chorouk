from django.db import models

# Create your models here.

#


class Category(models.Model):
    title = models.CharField(max_length=300)
    primaryCategory = models.BooleanField(default=False)

    def __str__(self):
        return self.title


# Post Model
class Post(models.Model):
    mainimage = models.ImageField(upload_to='media/posts/', blank=True)
    name = models.CharField(max_length=300)
    slug = models.SlugField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    preview_text = models.TextField(
        max_length=200, verbose_name='Preview Text')
    detail_text = models.TextField(max_length=2000, verbose_name='Detail Text')
    posted = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.name