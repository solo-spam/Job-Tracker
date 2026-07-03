
# JOB APPLICATION TRACKER
#### Video Demo:  https://youtu.be/66Kksqgh7a4
#### Description:

##Overview

The Job Application Tracker is a web-based application designed to help users organize, monitor, and manage their job search efficiently. Job hunting can quickly become overwhelming, especially when juggling multiple applications across different companies, roles, and stages. This project provides a centralized platform where users can log, update, and analyze job applications in a structured and intuitive way, transforming the job search process from chaotic to manageable.

##Core Functionality

At the heart of the application is a database-driven system powered by SQLite and managed with Flask, a lightweight Python web framework. This setup ensures that all application data is stored persistently and securely. Users can register for an account, log in, and access a personalized dashboard displaying all their job applications in a clean, interactive table. Each row contains key details such as Company Name, Role, Application Status, Date Applied, and Notes, giving users a comprehensive overview of their job search at a glance.

##Interactive Table

A standout feature is the interactive table functionality. Users can sort applications by any column in ascending or descending order—whether it’s by company name, role, status, or applied date. This sorting is implemented with JavaScript, allowing fast, real-time rearrangement of data without page reloads. Users can also filter applications by status (e.g., Applied, Interviewing, Offered, Rejected), and filtered entries are highlighted for easy identification. This feature helps users quickly focus on the most relevant applications at any stage of their job search.

##Notes and Tooltips

Each application can include a note field for additional information, such as interview feedback, communications with recruiters, or important reminders. In the table, these notes are truncated for a cleaner layout, but hovering over a note reveals the full content in a tooltip. This ensures users can store detailed information without cluttering the main interface.

##Security and Usability

The application includes user authentication, allowing users to safely register, log in, and log out. Client-side validation ensures that passwords are entered correctly, including a confirmation field during registration, providing immediate feedback to prevent submission errors. The application is designed with responsive web principles, making it accessible on desktops, tablets, and smartphones.

##Technical Implementation

From a technical perspective, the project demonstrates proficiency in full-stack development. The backend, built with Flask, handles routing, server-side logic, and database operations, while the frontend uses HTML, CSS, and JavaScript to create a dynamic, user-friendly interface. Jinja2 templating enables dynamic content rendering based on user input and database queries, creating seamless interaction between client and server. The modular code structure ensures extensibility and maintainability, making it easy to add features such as data export, notifications, or multi-user support.

##Benefits and Use Case

In essence, the Job Application Tracker is more than just a table of entries. It is a powerful organizational tool that helps users track the progress of each application, store detailed information, and make informed decisions during their job search. Whether actively seeking a job or maintaining a historical record, the application streamlines the process, reduces manual effort, and increases visibility into a user’s job search strategy. By combining an interactive frontend, a secure backend, and a clean user experience, this project provides a complete solution for managing job applications effectively.

##Live Demo

https://job-tracker-ym68.onrender.com
