from django.urls import re_path
from . import views

urlpatterns = [
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('test_login', views.test_login),
    re_path('logout', views.logout),
]


