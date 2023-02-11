from django.contrib.auth.models import User
from .models import UserProfile, Complaint
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'first_name','last_name')

class UserProfileSerializer(serializers.ModelSerializer):
    # BONUS Task: Flatten out the User object inside of UserProfile.
    # primary or foreign key?
    class Meta:
        model = UserProfile
        fields = ('id','user','full_name','district','party','borough')
        depth = 1
        #single digit district are not zero padded
    # print(UserProfile.objects.all())
class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = ('unique_key','account','opendate','complaint_type','descriptor','zip','borough','city','council_dist','community_board','closedate')
        #account = district from complaint made
        #council_dist = district from complaint lives
        #single digit district are zero padded