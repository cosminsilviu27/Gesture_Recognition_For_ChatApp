from django.contrib import admin
from .models import User, Profile, Todo, ChatMessage

# Register the User model
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('email',)

# Register the Profile model
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'verified')
    search_fields = ('user__username', 'full_name')
    ordering = ('user',)

# Register the Todo model
@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'completed', 'date')
    list_filter = ('completed', 'date')
    search_fields = ('title',)
    ordering = ('-date',)

# Register the ChatMessage model
@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'reciever', 'message', 'is_read', 'date')
    list_filter = ('is_read', 'date')
    search_fields = ('message',)
    ordering = ('-date',)
