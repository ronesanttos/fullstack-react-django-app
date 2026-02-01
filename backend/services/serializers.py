from rest_framework import serializers #type:ignore
from services.models import Services

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id', 'project', 'name', 'cost','description')
        
    def validate(self, data):
        project = data.get('project', self.instance.project if self.instance else None)
        cost = data.get('cost', self.instance.cost if self.instance else 0)
        
        
        
        if project.total_cost - (self.instance.cost if self.instance else 0) + cost > project.budget:
            raise serializers.ValidationError(
                'Este serviço ultrapassa o orçamento do projeto.')

        return data