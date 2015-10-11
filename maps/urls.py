from django.conf.urls import patterns, include, url
from django.contrib import admin
from maps import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'cal_hacks.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.index, name='index'),
    url(r'^test/$', views.test, name='test'),
    url(r'^report/$', views.report, name='report'),
    url(r'^get/$', views.get, name='get'),
)
