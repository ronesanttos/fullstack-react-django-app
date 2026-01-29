from rest_framework.viewsets import ModelViewSet #type:ignore
from projects.models import Projects
from projects.serializers import ProjectSerializer

class ProjectViewSet(ModelViewSet):
    queryset = Projects.objects.all().order_by('-id')
    serializer_class = ProjectSerializer