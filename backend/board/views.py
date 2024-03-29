from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Board, Comment,Image
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

class BoardGet(APIView):
    def get(self, request, board_id):
        try:
            board = Board.objects.filter(show=True).get(id=board_id)
            print(board)
            comments = Comment.objects.filter(board=board_id,show=True)
            
            serialized_comments=[]
            for comment in comments:
                serialized_comment = {
                    'id': comment.id,
                    'account': {
                        "id":comment.account.id,
                        "username":comment.account.username,
                    },
                    'created_at': comment.created_at,
                    'reply_to_comment': comment.reply_to_comment.id if comment.reply_to_comment else None,
                    'content':comment.content,
                }
                serialized_comments.append(serialized_comment)
            print(serialized_comments)
                
            serialized_board = {
                "id":board.id,
                "title":board.title,
                'account': {
                        "id":board.account.id,
                        "username":board.account.username,
                    },
                'created_at': board.created_at,
                'comments':serialized_comments,
            }
            
            return Response({'message': 'Board retrieved successfully', 'board': serialized_board}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BoardSearch(APIView):
    def get(self, request):
        keyword = request.query_params.get('keyword', None)
        
        try:
            if keyword:
                boards = Board.objects.filter(show=True, title__icontains=keyword)
            else:
                boards = Board.objects.filter(show=True)
            
            serialized_boards = []
            for board in boards:
                serialized_board = {
                    'id': board.id,
                    'title': board.title,
                    'account': {
                        "id":board.account.id,
                        "username":board.account.username,
                    },
                    'created_at': board.created_at,
                }
                serialized_boards.append(serialized_board)

            return Response({'message': 'Boards retrieved successfully', 'boards': serialized_boards}, status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


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


class BoardHide(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, board_id):
        try:
            board = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({'error': 'Board does not exist' }, status=status.HTTP_404_NOT_FOUND)
        # Check if the board is associated with the authenticated user
        if board.account != request.user:
            return Response({'error': 'Unauthorized'}, status= status.HTTP_401_UNAUTHORIZED)
        board.show = False
        board.save()
        return Response({'message': 'Board hide successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    
class CommentCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, board_id):
        account = request.user
        content = request.data.get('content')
        reply_to_comment_id = request.data.get('reply_to_comment',None)
        try:
            board = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({'error': 'Board does not exist' }, status=status.HTTP_404_NOT_FOUND)
        
        reply_to_comment=None
        if(reply_to_comment_id):
            try:
                reply_to_comment = Comment.objects.get(id=reply_to_comment_id)
            except Comment.DoesNotExist:
                return Response({'error': 'Comment does not exist' }, status=status.HTTP_404_NOT_FOUND)
            
        try:
            comment = Comment.objects.create(board=board, account=account,content=content,reply_to_comment=reply_to_comment)
            serialized_comment = {
                'id': comment.id,
                'content': comment.content,
                'account': comment.account.username,
                'board': comment.board.title,
                'reply_to_comment': comment.reply_to_comment.id if comment.reply_to_comment else None,
            }
            return Response({'message': 'Comment created successfully','comment':serialized_comment}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CommentHide(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment does not exist' }, status=status.HTTP_404_NOT_FOUND)
        # Check if the board is associated with the authenticated user
        if comment.account != request.user:
            return Response({'error': 'Unauthorized'}, status= status.HTTP_401_UNAUTHORIZED)
        comment.show = False
        comment.save()
        return Response({'message': 'Comment hide successfully'}, status=status.HTTP_204_NO_CONTENT)


class ImageCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, board_id):
        account = request.user
        content = request.data.get('content')
        reply_to_comment_id = request.data.get('reply_to_comment',None)
        try:
            board = Board.objects.get(id=board_id)
        except Board.DoesNotExist:
            return Response({'error': 'Board does not exist' }, status=status.HTTP_404_NOT_FOUND)
        
        reply_to_comment=None
        if(reply_to_comment_id):
            try:
                reply_to_comment = Comment.objects.get(id=reply_to_comment_id)
            except Comment.DoesNotExist:
                return Response({'error': 'Comment does not exist' }, status=status.HTTP_404_NOT_FOUND)
            
        try:
            comment = Comment.objects.create(board=board, account=account,content=content,reply_to_comment=reply_to_comment)
            serialized_comment = {
                'id': comment.id,
                'content': comment.content,
                'account': comment.account.username,
                'board': comment.board.title,
                'reply_to_comment': comment.reply_to_comment.id if comment.reply_to_comment else None,
            }
            return Response({'message': 'Comment created successfully','comment':serialized_comment}, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ImageHide(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)
        except Comment.DoesNotExist:
            return Response({'error': 'Comment does not exist' }, status=status.HTTP_404_NOT_FOUND)
        # Check if the board is associated with the authenticated user
        if comment.account != request.user:
            return Response({'error': 'Unauthorized'}, status= status.HTTP_401_UNAUTHORIZED)
        comment.show = False
        comment.save()
        return Response({'message': 'Comment hide successfully'}, status=status.HTTP_204_NO_CONTENT)
    