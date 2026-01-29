from rest_framework import serializers #type:ignore
from services.models import Services

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id', 'project', 'name', 'cost',)
        
    def validate(self,data):
        project = data['project']
        cost = data['cost']
        
        if project.total_cost + cost > project.budget:
            raise serializers.ValidationError(
                'Este serviço ultrapassa o orçamento do projeto.'
            )

        return data