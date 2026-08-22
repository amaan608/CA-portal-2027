from django.contrib import admin
from .models import POC, POCBulk, Idea, Media, Quiz, Question, Answer, QuizSubmission
# Register your models here.

class POCAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_verified')

class POCBulkAdmin(admin.ModelAdmin):
    list_display = ('csv_file', 'is_verified')

class IdeaAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_verified')

class QuestionAdmin(admin.StackedInline):
    model = Question

class QuizAdmin(admin.ModelAdmin):
    inlines = [QuestionAdmin]

class AnswerAdmin(admin.StackedInline):
    model = Answer

class QuizSubmissionAdmin(admin.ModelAdmin):
    inlines = [AnswerAdmin]

admin.site.register(POC, POCAdmin)
admin.site.register(POCBulk, POCBulkAdmin)
admin.site.register(Idea, IdeaAdmin)
admin.site.register(Media)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(QuizSubmission, QuizSubmissionAdmin)
admin.site.register(Answer)
