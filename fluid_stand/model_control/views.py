from django.shortcuts import render
from .models import Session, Operation

# Create your views here.
def index(request):
    num_session = Session.objects.all().count()
    num_operation = Operation.objects.all().count()
    return render(
        request=request,
        template_name='index.html',
        context=
        {
           'num_session': num_session,
           'num_operation': num_operation
        }
    )