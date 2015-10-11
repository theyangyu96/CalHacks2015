from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.http import HttpResponse, HttpResponseRedirect
# from userauth.forms import UserForm, UserProfileForm, ForgotForm
from maps.models import Report, Route
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
# Create your views here.

def test(request):
	return HttpResponse('test')

def index(request):
	if request.POST:
		info = request.POST.get('scoreArray')
		alat = info[0]
		alng = info[1]
		blat = info[2]
		blng = info[3]

		qual = request.POST.get('quality')
		try:
			rpt = Report()
			rpt.quality = qual
			rpt.desc = ""
			rpt.lat = float(lat)
			rpt.lng = float(lng)
			rpt.save()
		except:
			return HttpResponse('something went wrong')
	else:
		try:
			route = Route.objects.filter(a_lat=alat).filter(a_lng=alng).filter(b_lat=blat).filter(blng)
		except:
			pass
	return render(request, 'index.html', {})

def report(request):
	if request.POST:
		a = request.POST.getlist("a[]")
		b = request.POST.getlist("b[]")
		alat = a[0]
		alng = a[1]
		blat = b[0]
		blng = b[1]

		qual = request.POST.get('rating')
		try:
			route = Route.objects.filter(a_lat=float(alat)).filter(a_lng=float(alng)).filter(b_lat=float(blat)).filter(b_lng=float(blng))
			if len(route) == 0:
				route = Route()
				route.a_lat = alat
				route.a_lng = alng
				route.b_lat = blat
				route.b_lng = blng
				route.avg = qual
				route.save()
				return HttpResponse("created")
			else:
				route = route[0]
				if route != None or route != "null":
					route.avg -= route.avg / 10
					route.avg += float(qual) / 10
					route.save()
				return HttpResponse("updated route")
		except:
			return HttpResponse(-1)
def get(request):
	if request.POST:
		result = []
		array = request.POST.getlist("dict[]")
		x = 0
		while x < len(array):
			alat = array[x]
			alng = array[x+1]
			blat = array[x+2]
			blng = array[x+3]
			x+=4
			route = Route.objects.filter(a_lat=float(alat)).filter(a_lng=float(alng)).filter(b_lat=float(blat)).filter(b_lng=float(blng))
			if len(route)==0:
				result.append(-1)
			else:
				result.append(route[0].avg)
		return HttpResponse(str(result))
	else:
		return HttpResponse(-1)
