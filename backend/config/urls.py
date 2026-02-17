from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter #type:ignore 
from projects.views import ProjectViewSet, CategorySerializer
from services.views import ServiceViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'categories', CategorySerializer)
router.register(r'services', ServiceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]

"""
🌐 Endpoints criados automaticamente
    Método	Endpoint	Ação
        GET	/api/projects/	Listar projetos
        POST /api/projects/	Criar projeto
        GET	/api/projects/{id}/	Detalhar projeto
        PUT	/api/projects/{id}/	Atualizar
        DELETE /api/projects/{id}/	Deletar
        GET	/api/categories/ Listar categorias
        GET	/api/services/	Listar serviços
        POST /api/services/	Criar serviço
        PUT	/api/services/{id}/	Atualizar
        DELETE /api/services/{id}/	Deletar

"""