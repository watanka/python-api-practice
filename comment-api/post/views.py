from django.shortcuts import get_object_or_404, redirect
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.renderers import TemplateHTMLRenderer

from .models import Post
from .serializers import PostSerializer, CommentSerializer
# Create your views here.

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(author=request.user)

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        serializer.save(post_id=post_id, author=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return redirect('post_detail', pk=self.kwargs['post_id'])


class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        post = get_object_or_404(Post, pk=kwargs['pk'])
        return Response(post)
