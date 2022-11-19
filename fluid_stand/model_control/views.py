from django.shortcuts import render
from .models import Session, Telemetry
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .serializers import *


# Create your views here.
def index(request):
    num_session = Session.objects.all().count()
    num_operation = Telemetry.objects.all().count()
    return render(
        request=request,
        template_name='index.html',
        context=
        {
            'num_session': num_session,
            'num_operation': num_operation
        }
    )


@api_view(['GET', 'POST'])
def telemetry_list(request):
    """
 List  telemetry, or create a new telemetry.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        customers = Telemetry.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(customers, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = TelemetrySerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data})

    elif request.method == 'POST':
        serializer = TelemetrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def telemetry_detail(request, pk):
    try:
        customer = Telemetry.objects.get(pk=pk)
    except Telemetry.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TelemetrySerializer(customer, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TelemetrySerializer(customer, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
