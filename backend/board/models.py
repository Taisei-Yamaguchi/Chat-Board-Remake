from django.db import models
from accounts.models import Account
from django.utils import timezone
from django.core.exceptions import ValidationError

class Board(models.Model):
    title = models.CharField(max_length=255, default="default")
    show = models.BooleanField(default=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Image(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    url = models.CharField()
    show = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Comment {self.id} by {self.account.username} on Board {self.board.id}"


class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    content = models.TextField()
    show = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reply_to_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    reply_to_image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)

    def clean(self):
        if self.reply_to_image and self.reply_to_comment:
            raise ValidationError("Both reply_to_image and reply_to_comment cannot be filled at the same time.")
        
    def __str__(self):
        return f"Comment {self.id} by {self.account.username} on Board {self.board.id}"