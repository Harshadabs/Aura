from django.urls import path
from . import views

urlpatterns = [
    path("signup_view/", views.signup_view, name="signup_view"),
    path("login_view/", views.login_view, name="login_view"),
]
