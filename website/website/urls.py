from django.urls import path
from django.contrib.auth import views as auth_views
from django.urls import include, path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('honkai/', views.honkai, name='honkai'),
    path('mobilelegends/', views.mobilelegends, name='mobilelegends'),
    path('genshin/', views.genshin, name='genshin'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset_done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path("database/", include("database.urls")),
]
