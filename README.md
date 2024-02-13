# Rocket

## Online Job Portal (MERN Stack)

**Objective**: Develop a basic version of an online job portal with functionalities for candidates and recruiters, including the tracking of applicant status.

**Technologies**: MongoDB, Express.js, React, Node.js

**Assignment Overview**

Your task is to build a basic online job portal where candidates can view, apply for jobs, and track their application status, while recruiters can post job openings and manage applications.

1. **Initial Setup**
- Initialize a Node.js project with an Express.js server.
- Set up a MongoDB database for storing user and job data.
- Create a React application for the front-end.

2. **User Authentication**
- Implement user registration and login functionalities for both candidates and recruiters.
- Use authentication (JWT or similar) to secure routes.
- Implement basic authorization to ensure candidates and recruiters access only relevant functionalities.

3. **User Profiles**

- Candidates: Allow candidates to create and edit their profiles with personal information.
- Recruiters: Enable recruiters to create and manage profiles, including company details.

4. **Job Management**

- **Recruiters**:
  - Create a form for posting job openings with necessary details.
  - Develop a dashboard to view and manage job postings.

- **Candidates**:
  - Implement a job search feature.
  - Allow candidates to view job details, apply for jobs, and track the status of their applications.

5. **Application Status Tracking**
  - Enable candidates to view the status of their applications (e.g., submitted, under review, rejected, or accepted).
  - Allow recruiters to update the status of each application received.
 
6. **Frontend Development**
  - Design a basic, user-friendly interface for both user types.
  - Implement efficient navigation and routing.

7. **Testing**
  - Conduct basic tests to ensure functionality, particularly the application status feature.

8. **Documentation**
  - Document your code thoroughly.
  - Create a README file with setup and run instructions.

**General Considerations**:
- **Relationships**: Establish clear relationships between models. For example, the Application Model should reference both the Job and User models.
- **Schema Design**: Design schemas in MongoDB keeping in mind the nature of data and the queries that will be run against them.
- **Data Integrity**: Ensure data integrity, especially in user authentication and job application processes.
- **Security**: Pay special attention to securing sensitive data, particularly in the User Model.