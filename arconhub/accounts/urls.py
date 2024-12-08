from django.urls import path
from .views import SignUpView, LoginView  # Ensure these views are defined in accounts/views.py

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]
