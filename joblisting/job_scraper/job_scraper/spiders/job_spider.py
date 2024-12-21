import scrapy
import requests
import re
from datetime import datetime

class DiceJobSpider(scrapy.Spider):
    name = "job_spider"

    # Start URL
    start_urls = [
        "https://www.dice.com/jobs?q=Software&radius=30&radiusUnit=mi&page=1&pageSize=20&filters.postedDate=ONE&filters.workplaceTypes=Remote&filters.employmentType=CONTRACTS&currencyCode=USD&language=en"
    ]

    def get_location_type(self, workplace_types):
        # Default value if workplace_types is not found
        if not workplace_types:
            return "Not specified"
        
        # If workplace_types is a list, join them with commas
        if isinstance(workplace_types, list):
            return ", ".join(workplace_types)  # Example: "Remote, On-Site"
        return workplace_types

    def parse_date(self, date_string):
        """
        Converts a date string from the job posting into a standardized format.
        Assumes the input date format is something like '2024-12-19T21:34:03Z'.
        """
        if date_string:
            try:
                # Parse the date string to a datetime object
                date_obj = datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%SZ")
                # Convert the datetime object to the desired format
                return date_obj.strftime("%Y-%m-%d")  # Output format: 'YYYY-MM-DD'
            except ValueError as e:
                self.logger.error(f"Error parsing date: {e}")
                return None
        return None

    skills_keywords = [
        # Programming Languages
        "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "Ruby", "Go", "Rust", "Kotlin", "Swift", "PHP", "R", "Perl", 
        
        # Frontend Frameworks
        "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "Bootstrap", "Tailwind CSS", 

        # Backend Frameworks
        "Django", "Flask", "Spring", "Express", "Ruby on Rails", "ASP.NET", "FastAPI", "Hapi", "NestJS", "Koa", "Micronaut", 

        # Databases
        "SQL", "MySQL", "PostgreSQL", "SQLite", "MongoDB", "Cassandra", "CouchDB", "DynamoDB", "Redis", "Elasticsearch", "NoSQL", "PL/SQL",

        # DevOps and Cloud Tools
        "AWS", "Docker", "Kubernetes", "Azure", "Google Cloud Platform", "Terraform", "Jenkins", "Ansible", "Puppet", "Chef", 
        "GitLab CI/CD", "CircleCI", "Vagrant", "OpenShift", "Apache Kafka", 

        # Version Control
        "Git", "GitHub", "GitLab", "Bitbucket",

        # Data Science and AI
        "Machine Learning", "Deep Learning", "Data Analysis", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Keras", 
        "Natural Language Processing", "Computer Vision", "OpenCV", "Matplotlib", "Seaborn", "Statsmodels", "XGBoost", 

        # Tools and IDEs
        "Visual Studio", "Visual Studio Code", "Eclipse", "PyCharm", "IntelliJ IDEA", "NetBeans", "Atom", "Sublime Text",

        # Project Management
        "SCRUM/Agile", "Kanban", "JIRA", "TEMPO", "Trello", "Asana", "Monday.com",

        # Testing and QA
        "Selenium", "Cypress", "Jest", "Mocha", "Chai", "Pytest", "JUnit", "TestNG", "Postman", "SoapUI", "LoadRunner", 

        # Other Technologies and Tools
        "REST API", "GraphQL", "gRPC", "Microservices", "Blazor Server/WSM", "Entity Framework", "Hibernate", "RxJS", "Redux", 
        "Struts", "Apache Spark", "Hadoop", "Tableau", "Power BI", "MATLAB", "Splunk", "Prometheus", "Grafana", 

        # Security
        "OWASP", "Penetration Testing", "Burp Suite", "Nmap", "Wireshark", "Metasploit", "SSL/TLS", 

        # Emerging Technologies
        "Blockchain", "Ethereum", "Solidity", "Smart Contracts", "Web3.js", "AR/VR", "IoT", "Edge Computing",
    ]


    def extract_skills(self, summary):
        skills_found = []
        for skill in self.skills_keywords:
            if re.search(r'\b' + re.escape(skill) + r'\b', summary, re.IGNORECASE):
                skills_found.append(skill)
        return skills_found

    
    def parse(self, response):
        # Extract the API endpoint from the Network tab in developer tools
        api_url = "https://job-search-api.svc.dhigroupinc.com/v1/dice/jobs/search"
        headers = {
            'x-api-key': '1YAt0R9wBg4WfsF9VB2778F5CHLAPMVW3WAZcKd8',
        }
        # Query parameters for the API call (modify as needed)
        params = {
            'q': 'Software',
            'countryCode2': 'US',
            'radius': '30',
            'radiusUnit': 'mi',
            'page': '1',
            'pageSize': '20',
            'facets': 'employmentType|postedDate|workFromHomeAvailability|workplaceTypes|employerType|easyApply|isRemote|willingToSponsor',
            'filters.workplaceTypes': 'Remote',
            'filters.employmentType': 'CONTRACTS',
            'filters.postedDate': 'ONE',
            'currencyCode': 'USD',
            'fields': 'id|jobId|guid|summary|title|postedDate|modifiedDate|jobLocation.displayName|detailsPageUrl|salary|clientBrandId|companyPageUrl|companyLogoUrl|companyLogoUrlOptimized|positionId|companyName|employmentType|isHighlighted|score|easyApply|employerType|workFromHomeAvailability|workplaceTypes|isRemote|debug|jobMetadata|willingToSponsor',
            'culture': 'en',
            'recommendations': 'true',
            'interactionId': '0',
            'fj': 'true',
            'includeRemote': 'true',
        }


        # Send the API request
        response = requests.get(api_url, headers=headers, params=params)
        # print(response.json())
        if response.status_code == 200:
            data = response.json()
            print(data)
            jobs = data.get("data", [])
            # print(jobs)

            if not jobs:  # Check if jobs list is empty
                self.logger.warning("No jobs found in the response.")
                return  # Exit or handle this case as needed
            # Iterate through job data and yield results
            for job in jobs:
                summary = job.get('description') or job.get("summary", "")
                skills = self.extract_skills(summary)
                location = job.get("jobLocation", {}).get("displayName", "Remote")
                print("Location", location)
                location_type = self.get_location_type(job.get("workplaceTypes"))
                nmn=self.parse_date(job.get("postedDate"))
                job_data = {
                    "title": job.get("title"),
                    "company": job.get("companyName"),
                    "location" :location,
                    "location_type": location_type,
                    "compensation": job.get("salary"),
                    "employment_type": job.get("employerType"),
                    "skills": ", ".join(skills),
                    "description" : summary or 'No description available',
                    "posted_at": self.parse_date(job.get("postedDate")),
                    "updated_at": self.parse_date(job.get("modifiedDate")),
                }
                # Send scraped job data to the backend

                self.logger.info(f"Job Data: {job_data}")

                self.send_to_backend(job_data)

            # Handle pagination
            total_pages = data.get("totalPages", 1)
            current_page = params["page"]

            current_page = int(current_page) 
            total_pages = int(total_pages)
            if current_page < total_pages:
                params["page"] += 1
                yield scrapy.Request(
                    url=api_url, headers=headers, callback=self.parse, meta={"params": params}
                )
        else:
            self.logger.error(f"Failed to fetch data: {response.status_code}")

    def send_to_backend(self, job_data):
        backend_url = "http://127.0.0.1:8000/api/jobs/"  # Replace with your Django API endpoint
        try:
            self.logger.info(f"Sending data to backend: {job_data}")
            response = requests.post(backend_url, json=job_data)
            self.logger.info(f"Backend response status: {response.status_code}")
            if response.status_code == 201:
                self.logger.info(f"Job '{job_data['title']}' saved successfully!")
            else:
                self.logger.error(f"Failed to save job: {response.text}")
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Error sending data to backend: {e}")

