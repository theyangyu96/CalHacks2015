from django.shortcuts import render

# Create your views here.

def launch(request):
	return render(request, 'launch.html', {})