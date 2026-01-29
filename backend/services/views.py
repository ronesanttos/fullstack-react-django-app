from rest_framework.viewsets import ModelViewSet #type:ignore
from services.models import Services
from services.serializers import ServiceSerializer

class ServiceViewSet(ModelViewSet):
    queryset = Services.objects.all().order_by('-id')
    serializer_class = ServiceSerializer