from rest_framework.viewsets import ModelViewSet #type:ignore
from projects.models import Projects, Category
from projects.serializers import ProjectSerializer, CategorySerializer

class ProjectViewSet(ModelViewSet):
    queryset = Projects.objects.all().order_by('-id')
    serializer_class = ProjectSerializer
    
class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer