# Vehicle Rental Management System — Server (Node.js + Express + PostgreSQL)

### Live URL : https://vehicle-rental-server-six.vercel.app/ 

# Features : 

   - 📌 Features
             ✅ Authentication & Authorization
             
             Login & Register using JWT
             
             Role-based access (Admin, Customer)
             
             Protected routes with middleware
             
             
    - 🚗 Vehicle Management
             
             Add, update, delete vehicles (Admin)
             
             View vehicles (Public)
             
             Vehicle availability managed automatically
             
             When booking created → status: booked
             
             When returned/cancelled → status: available
             
             
    - 📅 Booking Management
             
             Create bookings with dynamic total price calculation
             
             Prevent booking unavailable vehicles
             
             Customers see only their bookings
             
             Admin sees all bookings
             
             Booking status updates: active, returned, cancelled
             
    - 👤 User Management
             
             Admin can manage all users
             
             Optional update fields (partial updates)
             
    - 🛡 Error Handling
             
             Validation errors & unauthorized access messages


## 🛠 Technology Stack
      # Backend
       
           Node.js
          
           Express.js
          
           TypeScript
       
      #  Database
       
           PostgreSQL
       
      #  Auth
       
           JWT (JSON Web Token)
       
           bcrypt password hashing


## 📂 Project Structure
       src/
        ├── config/
        │    ├── db.ts
        │    └── config.ts
        ├── modules/
        │    ├── auth/
        │    ├── users/
        │    ├── vehicles/
        │    ├── booking/
        ├── middlewares/
        └── server.ts


## Run the Project
   - Git clone = https://github.com/Alif210222/Vehicle-Rental-Server 
      - npm run dev
       
      - Build TypeScript
      - npm run build