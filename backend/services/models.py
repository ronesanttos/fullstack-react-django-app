from django.db import models
from projects.models import Projects

class Services(models.Model):
    project = models.ForeignKey(Projects,related_name='services', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=1024,blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.pk:
            self.project.total_cost += self.cost
            self.project.save()
        
        super().save(*args, **kwargs)
        
    def delete(self, *args, **kwargs):
        self.project.total_cost -= self.cost
        self.project.save()
        super().delete(*args, **kwargs)
    
    def __str__(self):
        return self.name
    
