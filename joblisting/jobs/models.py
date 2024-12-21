from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=200)  # Job Title
    company = models.CharField(max_length=200)  # Company Name
    location = models.CharField(max_length=200)  # Location (e.g., Remote, Nashville, TN)
    location_type = models.CharField(max_length=50, choices=[  # Remote, On-Site, Hybrid
        ('Remote', 'Remote'),
        ('On-Site', 'On-Site'),
        ('Hybrid', 'Hybrid'),
        ('Remote, On-Site', 'Remote, On-Site'),
        ('Remote, Hybrid', 'Remote, Hybrid'),
        ('On-Site, Hybrid', 'On-Site, Hybrid'),
    ])
    compensation = models.CharField(max_length=100, null=True, blank=True)  # Salary or hourly range
    employment_type = models.CharField(max_length=100, null=True, blank=True)  # Full-time, Contract, etc.
    skills = models.TextField(null=True, blank=True)  # Skills as a comma-separated string
    description = models.TextField()  # Job Description
    posted_at = models.DateTimeField()  # Posted At
    updated_at = models.DateTimeField()  # Updated At

    def save(self, *args, **kwargs):
        # Ensure the dates are only set manually, not overwritten by auto_now
        if not self.posted_at:
            self.posted_at = datetime.datetime.now()
        if not self.updated_at:
            self.updated_at = datetime.datetime.now()

        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.title} at {self.company}"
