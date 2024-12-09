from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Serve React's index.html for all routes (catch-all)
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),  # catch-all for all URLs
    
    # Additional specific paths if you want to handle individual URLs
    path('', TemplateView.as_view(template_name='index.html')),  # Optional: root URL
    path('login', TemplateView.as_view(template_name='index.html')),  # Optional: /login route
    path('signup', TemplateView.as_view(template_name='index.html')),  # Optional: /signup route
    path('about', TemplateView.as_view(template_name='index.html')),
  # Optional: /about route
]

# Serve static files in development (React build's static files)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
