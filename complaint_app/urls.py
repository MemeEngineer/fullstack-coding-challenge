from django.urls import path
from rest_framework import routers
from .views import ComplaintViewSet, OpenCasesViewSet, ClosedCasesViewSet, TopComplaintTypeViewSet, ConstituentsViewSet

router = routers.SimpleRouter()
#router here acts like React router: must be ordered from Most to Least specific
router.register(r'openCases', OpenCasesViewSet, base_name='openCases')
router.register(r'closedCases', ClosedCasesViewSet, base_name='closedCases')
router.register(r'topComplaints', TopComplaintTypeViewSet, base_name='topComplaints')
router.register(r'constituents', ConstituentsViewSet, base_name='constituents')
router.register(r'', ComplaintViewSet, base_name='complaint')
urlpatterns = [
]
urlpatterns += router.urls