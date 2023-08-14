# Node.js Project: Authentication, User Management, Product, and Order Flow

This is a Node.js project that implements authentication features, user management, product management, and order management functionalities. It provides a foundation for building a web application with user registration, authentication, and authorisation capabilities.

## Features

- User Authentication:
  - Manual sign-up and sign-in with email, password, and name
  - Google sign-in using Passport.js
  - Facebook sign-in using Passport.js

- User Management:
  - User model with properties like name, email, role (Admin/User)
  - CRUD operations for managing users

- Product Flow:
  - CRUD operations for managing products

- Order Flow:
  - CRUD operations for managing orders

- Error Handling:
  - Properly managed error handling throughout the application

- Authorization:
  - Authenticated users have access to all APIs
  - Token-based authentication and authorisation

## Prerequisites

- Node.js and npm installed on your system

## Installation

1. Clone the repository:

   
   git clone https://github.com/kishan-ck/passport-Oauth.git
   cd your-project
   

2. Install dependencies:

   
   npm install
   

3. Set up environment variables:
   - Create a `.env` file based on `.env.example`
   - Add necessary configurations for your authentication providers (Google, Facebook)

4. Start the server:

   
   npm start
   

5. The application will be accessible at `http://localhost:4000`.

## Usage

- Register a new user using manual sign-up or sign-up through Google/Facebook.
- Log in using your registered credentials or Google/Facebook accounts.
- Manage users, products, and orders using the provided CRUD operations.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

