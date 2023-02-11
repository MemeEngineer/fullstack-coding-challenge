from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
## importing builtin functions
from django.db.models import Count
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
  serializer_class = UserProfileSerializer
  
  def list(self, request):
    # Get all complaints from the user's district

    #request pulls the user logged in
    userProfile = UserProfile.objects.get(user=request.user)
    #filter complaints by account# from users district
    complaints = Complaint.objects.all().filter(account= zeroPadding(userProfile.district))
    #display the serializer 
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)
  

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = UserProfileSerializer
  serializer_class = ComplaintSerializer
  def list(self, request):
    # Get only the open complaints from the user's district
    #pulling user
    userProfile = UserProfile.objects.get(user=request.user)

    #filter complaints that have an opendate but no closedate
    #filter by account# by user district
    openCases = Complaint.objects.all().filter(opendate__isnull= False).filter(closedate__isnull= True).filter(account= zeroPadding(userProfile.district))
    
    #display the serializer 
    serializer = ComplaintSerializer(openCases, many=True)
    return Response(serializer.data)

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  serializer_class = UserProfileSerializer
  serializer_class = ComplaintSerializer
  def list(self, request):
    # Get only complaints that are close from the user's district

    #pull user
    userProfile = UserProfile.objects.get(user=request.user)

    #filter complaints that have an opendate & closedate
    #filter by account# by user district
    closeCases = Complaint.objects.all().filter(opendate__isnull= False).filter(closedate__isnull= False).filter(account= zeroPadding(userProfile.district))
    
    #display serializer data
    serializer = ComplaintSerializer(closeCases, many=True)
    return Response(serializer.data)
    
class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  serializer_class = UserProfileSerializer
  serializer_class = ComplaintSerializer
  def list(self, request):
    # Get the top 3 complaint types from the user's district
    #pull user
    userProfile = UserProfile.objects.get(user=request.user)

    #pull all compliants
    #filter complaints by user with account# (district they are from)
    #use complaint_type as a value
    #annotate: calls on complaint_type to be counted
    #orderby : ascending order (top to bottom highest complaint) bring the top 3
    topComplaints= Complaint.objects.all().filter(account= zeroPadding(userProfile.district)).values('complaint_type').annotate(complaint_type__count= Count('complaint_type')).order_by('-complaint_type__count')[:3]
    serializer = ComplaintSerializer(topComplaints, many=True)
    return Response(serializer.data)