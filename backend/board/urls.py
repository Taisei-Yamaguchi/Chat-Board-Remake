from django.urls import path
from .views import BoardCreate,BoardGet,BoardSearch,BoardHide,CommentCreate,CommentHide

urlpatterns = [
    path('create/', BoardCreate.as_view(), name='create-new-board'),
    path('get/<int:board_id>', BoardGet.as_view(), name='get-board'),
    path('search/', BoardSearch.as_view(), name='get-board-list'),
    path('hide/<int:board_id>', BoardHide.as_view(), name='hide-board'),    
    path('comment/create/<int:board_id>', CommentCreate.as_view(), name='comment-create'),  
    path('comment/hide/<int:comment_id>', CommentHide.as_view(), name='hide-commsent'),   
]
