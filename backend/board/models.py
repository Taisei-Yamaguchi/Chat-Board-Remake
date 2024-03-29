from django.db import models
from accounts.models import Account
from django.utils import timezone

class Board(models.Model):
    title = models.CharField(max_length=255, default="default")
    show = models.BooleanField(default=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    content = models.TextField()
    show = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reply_to_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Comment {self.id} by {self.account.username} on Board {self.board.id}"