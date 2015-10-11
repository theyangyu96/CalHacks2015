from django.conf.urls import patterns, include, url
from django.contrib import admin
from cal_hacks import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'cal_hacks.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.launch, name='launch'),
    url(r'^maps/', include('maps.urls')),
)
