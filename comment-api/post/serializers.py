from rest_framework import serializers
from django.urls import reverse

from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'post', 'created_at', 'updated_at']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    comment_url = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'updated_at', 'comments', 'comment_url']

    def get_comment_url(self, obj):
        request = self.context['request']
        relative_url = reverse('comment_list_create', kwargs={'post_id': obj.id})
        if request:
            return request.build_absolute_uri(relative_url)
        return relative_url
        