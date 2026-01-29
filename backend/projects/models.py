from django.db import models

class Projects(models.Model):
    name = models.CharField(max_length=100)
    budget = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    
    def __str__(self):
        return self.name