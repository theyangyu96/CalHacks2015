from django.db import models

# Create your models here.

class Report(models.Model):
	#user = models.ForeignKey(User)
	report_type = models.CharField(max_length=10, default="Generic")
	td = models.DateTimeField(auto_now_add=True)
	quality = models.CharField(max_length=10, default="Unknown")
	desc = models.TextField(default=" ")
	lat = models.FloatField(default=0)
	lng = models.FloatField(default=0)

class Route(models.Model):
	a_lat = models.FloatField(default=0)
	a_lng = models.FloatField(default=0)
	b_lat = models.FloatField(default=0)
	b_lng = models.FloatField(default=0)
	avg = models.FloatField(default=-1)
	td = models.DateTimeField(auto_now_add=True)

