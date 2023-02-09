from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
 

 #JavaScript version translated into python3
#  function zeroPadding(dist){
#     if(dist.length > 1){
#         return "NYCC" + dist
#     }
#     return "NYCC" + '0' + dist
# }

#the district num is a string but treated as an array for .length / len()
#if the district num length is greater than 1 (double digits "10, 12")
# return NYCC10 or NYCC12
# else return NYCC03 or NYCC05 for the single digit district num
def zeroPadding(dist):
    if len(dist) > 1: 
        return "NYCC" + dist
    else:
        return 'NYCC' + '0' + dist

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = ComplaintSerializer
  queryset = Complaint.objects.all()
  def list(self, request):
    # Get all complaints from the user's district

    #request pulls the user logged in
    userProfile = UserProfile.objects.get(user=request.user)
    #filter complaints by account# from users district
    complaints = self.queryset.filter(account= zeroPadding(userProfile.district))
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)
  

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get only the open complaints from the user's district
    return Response()

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):
    # Get only complaints that are close from the user's district
    return Response()
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    return Response()