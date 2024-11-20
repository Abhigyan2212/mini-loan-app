Mini Loan App
The Mini Loan App is a full-stack application designed to manage loan processing and repayments. This project includes user authentication, loan creation, viewing loans, and repayment handling. It utilizes MongoDB Compass, Express.js, React.js, and tools like Postman for API testing.

Features
User authentication using JWT (JSON Web Tokens).
Loan creation with scheduled repayments.
Viewing all loans for a specific user.
Adding repayments to loans and marking installments as paid.
Admin functionality for approving loans.

Table of Contents
Technologies Used
Frontend Development
Backend Development
Database Setup
API Endpoints
How to Run
Screenshots

Technologies Used
Frontend: React.js, Axios, CSS
Backend: Node.js, Express.js, JWT
Database: MongoDB (MongoDB Compass)
Tools: Postman, MongoDB Compass, Git

Frontend Development
1. Setup React App
Initialized a React app using: npx create-react-app mini-loan-app
Created essential components:
Login.js: For user authentication.
LoanRequest.js: For requesting loans.
Configured React Router for navigation.

2. Login Page
Built a Login Page that collects user credentials and authenticates them with the backend.

![Login Page](images/frontend_login.png)

Backend Development
1. Setting Up the Environment
Initialized a Node.js project: npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv
Created the following key files:
server.js: Main server file.
routes/userRoutes.js: For user authentication.
routes/loanRoutes.js: For loan and repayment management.

User Authentication
Implemented user registration and login routes with password hashing using bcryptjs.
Generated JWT tokens for authenticated access to protected routes.

![MongoDB Compass - Users Collection](images/mongodb_users.png)

3. Loan Management
Created routes for:
Loan creation: POST /api/loan
Viewing loans: GET /api/loan
Approving loans: PUT /api/loan/:id/approve
Adding repayments: POST /api/repayment

Database Setup
1. MongoDB Atlas
Connected the backend to a MongoDB Atlas cluster using: MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/miniLoanApp

Created collections:
users: To store user credentials.
loans: To store loan details and repayment schedules.
repayments: To track individual repayments.
Insert MongoDB Compass Loans Image Here
Add a screenshot of the loans collection in MongoDB Compass.

![MongoDB Compass - Loans Collection](images/mongodb_loans.png)

API Endpoints
Method	Endpoint	Description
POST	/api/users/register	Register a new user.
POST	/api/users/login	Authenticate user and return JWT.
POST	/api/loan	Create a loan.
GET	/api/loan	Get all loans for a user.
PUT	/api/loan/:id/approve	Approve a loan (admin only).
POST	/api/repayment	Add a repayment to a loan.

Sample Requests
Insert Postman Screenshot for Register/Login
Place Postman screenshots for user registration or login request.

![Postman - Register/Login Request](images/postman_register_login.png)

Insert Postman Screenshot for Loan Creation
Place a screenshot for a POST /api/loan request in Postman.

![Postman - Loan Creation](images/postman_loan_creation.png)

How to Run
1. Clone the Repository
git clone https://github.com/yourusername/mini-loan-app.git
cd mini-loan-app
2. Run the Backend
Navigate to the backend folder:cd backend
Install dependencies:npm install
Start the server: npm start
3. Run the Frontend
Navigate to the frontend folder: cd frontend
Install dependencies: npm install
Start the React app: npm start

Conclusion
This project demonstrates the development of a full-stack Mini Loan App with the following features:

Secure user authentication.
Loan creation with scheduled repayments.
Repayment management and loan state updates.
API endpoints tested using Postman.
