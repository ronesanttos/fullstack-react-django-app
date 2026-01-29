from rest_framework import serializers #type:ignore
from .models import Projects
from services.models import Services

class ServiceInlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id', 'name', 'cost')
        
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'name', 'budget', 'total_cost', 'services',)