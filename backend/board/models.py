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

class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    content = models.TextField(null=True,blank=True)
    image_url = models.CharField(null=True,blank=True)
    show = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reply_to_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

    def clean(self):
        if not self.content and not self.image_url:
            raise ValidationError("Both content and image_url cannot be null.")
    
    def save(self, *args, **kwargs):
        self.full_clean()  # Run full validation
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"Comment {self.id} by {self.account.username} on Board {self.board.id}"