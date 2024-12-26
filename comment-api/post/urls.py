from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListCreateView.as_view(), name='post_list_create'),
    path('<int:post_id>/comments/', views.CommentListCreateView.as_view(), name='comment_list_create'),
    # path('<int:pk>/', views.PostDetailView.as_view(), name='post_detail'),
]