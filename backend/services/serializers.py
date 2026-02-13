from rest_framework import serializers #type:ignore
from services.models import Services
from projects.models import Projects

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id', 'project', 'name', 'cost','description')
        
    def validate(self, data):
        project = data.get('project') or (self.instance.project if self.instance else None)
        
        if not project:
            raise serializers.ValidationError(
                "Projeto inválido."
            )
            
        new_cost = data.get('cost', self.instance.cost if self.instance else 0)
        
        old_cost = self.instance.cost if self.instance else 0
        
        total_after_update = project.total_cost - old_cost + new_cost
        
        if total_after_update > project.budget:
            raise serializers.ValidationError(
                f'Este serviço ultrapassa o orçamento do projeto. '
                f'Orçamento: {project.budget} | '
                f'Atual: {project.total_cost} | '
                f'Tentativa: {total_after_update}'
            )

        return data