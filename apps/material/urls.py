from django.urls import include, path
import apps.material.views as views

app_name = "material"

urlpatterns = [
    path('', views.index, name='index'),
    path('compdes', views.desplugada, name='desplugada')
]