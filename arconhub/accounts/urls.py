from django.urls import path
from .views import SignUpView, LoginView
from django.views.decorators.csrf import csrf_token_view

urlpatterns = [
    path("csrf/", csrf_token_view, name="csrf-token"),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]
