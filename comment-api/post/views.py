from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
# Create your views here.

class PostListCreateView(generics.ListCreateAPIView):
    renderer_class = [TemplateHTMLRenderer]
    template_name = 'post/index.html'

    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = self.get_serializer(posts, many=True)
        return Response({'posts': serializer.data})

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        print('request.user', self.request.user)
        serializer.save(post_id=post_id, author=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    renderer_class = [TemplateHTMLRenderer]
    template_name = 'post/detail.html'

    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        post = get_object_or_404(Post, pk=kwargs['pk'])
        serializer = self.get_serializer(post)
        return Response({'post': serializer.data})
