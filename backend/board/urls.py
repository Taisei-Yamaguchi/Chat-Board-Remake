from django.urls import path
from .views import BoardCreate,BoardGet,BoardSearch,BoardUpdate,BoardDelete

urlpatterns = [
    path('create/', BoardCreate.as_view(), name='create-new-board'),
    path('get/<int:board_id>/', BoardGet.as_view(), name='get-board'),
    path('search/', BoardSearch.as_view(), name='get-board-list'),
    path('update/<int:board_id>', BoardUpdate.as_view(), name='update-board'),
    path('delete/<int:board_id>', BoardDelete.as_view(), name='delete-board'),    
]
