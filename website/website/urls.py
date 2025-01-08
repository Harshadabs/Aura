from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('honkai/', views.honkai, name='honkai'),
    path('mobilelegends/', views.mobilelegends, name='mobilelegends'),
    path('genshin/', views.genshin, name='genshin'),
]
