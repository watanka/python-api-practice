from django.db import models

# Create your models here.
class Post(models.Model):
	author = models.ForeignKey('user.User', on_delete = models.CASCADE)
	title = models.TextField()
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now_add=True)
	
class Comment(models.Model):
	post = models.ForeignKey(Post, on_delete = models.CASCADE, related_name='comments')
	author = models.ForeignKey('user.User', on_delete = models.CASCADE)
	content = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ['-created_at']