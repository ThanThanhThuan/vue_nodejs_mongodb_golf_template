# Tiya Golf Club Full Stack Project

Convert a static HTML template into a modern, dynamic web application.
Many thanks to the author of the template : https://themewagon.com/themes/tiya/

**1. Project Architecture**

The project follows a Client-Server architecture (MEVN Stack):

    Frontend: Vue.js 3 (Composition API) + Vite + Bootstrap 5.

    Backend: Node.js + Express.js.

    Database: MongoDB (using Mongoose ODM).

    Communication: REST API (Axios).

<img width="1697" height="1081" alt="image" src="https://github.com/user-attachments/assets/ecad8bfc-249b-4458-9e32-84356591b1b6" />
    

**2. Project Structure**

The project is split into two distinct folders:

tiya-golf-club/
│

├── server/                 # THE BACKEND

│   ├── models/             # Database Schemas
│   │   ├── Event.js        # Schema for Golf Events
│   │   └── Member.js       # Schema for Membership Applications
│   ├── index.js            # Main Server Entry (Routes & DB Connection)
│   ├── .env                # Config (Mongo URI)
│   └── package.json
│

└── client/                 # THE FRONTEND

    ├── public/             # Static Assets (Images, CSS, JS from template)
    ├── src/
    │   ├── components/     # Reusable UI parts
    │   │   ├── NavBar.vue          # Navigation & Login State Logic
    │   │   ├── LoginOffcanvas.vue  # Pop-up Login Form
    │   │   └── SiteFooter.vue      # Footer
    │   ├── views/          # Page definitions
    │   │   ├── HomeView.vue        # Main Landing Page
    │   │   └── EventDetailView.vue # Dynamic Single Event Page
    │   ├── router/         # Vue Router Configuration
    │   └── App.vue         # Main Layout Wrapper
    └── package.json

**3. Key Features Implemented**
   
A. Backend (Node.js & MongoDB)

    Database Connection: Automatically connects to MongoDB and creates the tiya-golf database.

    Data Seeding: A /seed route to populate the database with initial Event data.

    API Endpoints:

        GET /api/events: Fetches all upcoming events.

        GET /api/events/:id: Fetches details for a specific event.

        POST /api/login: Authenticates users (Mock Logic: checks ID 11002560 / Pass 1234).

        POST /api/membership: Validates unique emails and saves new applications to MongoDB.

        POST /api/contact: Accepts contact form submissions.

B. Frontend (Vue.js)

    Dynamic Content:

        Home page fetches the top 2 events from the database.

        Event Detail page reads the URL ID (e.g., /event/65a...) and fetches specific data (Title, Price, Description, Image).

    Authentication State:

        Login: Uses a global offcanvas modal. Stores a JWT token/User in localStorage upon success.

        Navbar: Reactively changes based on state. Shows "Member Login" button when logged out, and "Hi, Michael | Logout" when logged in.

    Form Handling:

        Membership Form: Prevents duplicate submissions. Shows specific error messages from the backend (e.g., "This email has already applied").

        Contact Form: Sends data to the backend via Axios.

    Legacy Integration:

        Successfully integrated the template's original custom.js (jQuery) for sticky navigation and scroll animations while running inside a Vue environment.

**4. How to Run the Project**

You need two separate terminals open.

Terminal 1: Start the Backend

cd server
node index.js
- Server runs on http://localhost:5000

Terminal 2: Start the Frontend

cd client
npm run dev
- App runs on http://localhost:5173
