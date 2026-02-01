from rest_framework import serializers #type:ignore
from .models import Projects
from services.models import Services
from services.serializers import ServiceSerializer


class ServiceInlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id', 'name', 'cost', 'description')
        
class ProjectSerializer(serializers.ModelSerializer):
    services = ServiceInlineSerializer(many=True,read_only=True)
    
    class Meta:
        model = Projects
        fields = ('id', 'name', 'budget', 'total_cost', 'services',)
        
    def update(self, instance, validated_data):
        services_data = validated_data.pop('services', [])

        # Atualiza campos do projeto
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        # Atualiza serviços
        existing_ids = [s.id for s in instance.services.all()]
        sent_ids = [s.get('id') for s in services_data if s.get('id')]

        # Remove serviços deletados
        for service in instance.services.exclude(id__in=sent_ids):
            service.delete()

        total_cost = 0

        for service_data in services_data:
            service_id = service_data.get('id')

            if service_id and service_id in existing_ids:
                service = Services.objects.get(id=service_id)
                service.name = service_data['name']
                service.cost = service_data['cost']
                service.save()
            else:
                service = Services.objects.create(
                    project=instance,
                    **service_data
                )

            total_cost += service.cost

        # Atualiza total_cost com segurança
        if total_cost > instance.budget:
            raise serializers.ValidationError(
                'O custo total dos serviços ultrapassa o orçamento do projeto.'
            )

        instance.total_cost = total_cost
        instance.save()
        
        return instance
        
