from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Board
from .serializers import BoardSerializer
from django.http import Http404
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

class BoardGet(APIView):
    def get(self, request, board_id):
        try:
            board = Board.objects.get(id=board_id)
            serializer = BoardSerializer(board)
            return Response(serializer.data)
        except Board.DoesNotExist:
            raise Http404

class BoardSearch(APIView):
    def get(self, request):
        keyword = request.query_params.get('keyword', None)
        
        if keyword:
            boards = Board.objects.filter(title__icontains=keyword)
        else:
            boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data)


class BoardCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        account = request.user
        title = request.data.get('title')
        try:
            board = Board.objects.create(title=title, account=account)
            
            serialized_board = {
                'id': board.id,
                'title': board.title,
                'account': board.account.username,
                'created_at':board.created_at,
            }
            return Response({'message': 'Board created successfully','board':serialized_board}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BoardUpdate(APIView):
    def patch(self, request, board_id):
        try:
            board = Board.objects.get(id=board_id)
            serializer = BoardSerializer(board, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Board.DoesNotExist:
            raise Http404

class BoardDelete(APIView):
    def delete(self, request, board_id):
        try:
            board = Board.objects.get(id=board_id)
            board.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Board.DoesNotExist:
            raise Http404
