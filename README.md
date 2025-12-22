# Flight Booking Application – Frontend (Angular)

A modern **Angular-based frontend** for a microservices-driven **Flight Booking Application**, designed to deliver smooth authentication, flight discovery, booking, and management workflows.

The frontend communicates securely with backend microservices via an **API Gateway**, following real-world enterprise architecture.

---

## Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

```
http://localhost:4200/
```

The application reloads automatically on source code changes.

---

## Tech Stack

### Frontend
- Angular (Standalone Components)
- TypeScript
- Reactive Forms
- Angular Router
- Route Guards
- HTTP Interceptors
- CSS (Custom Styling)

### Backend (via API Gateway)
- Spring Boot Microservices
- Spring Security with JWT
- Eureka Discovery Server
- Config Server
- Docker and Docker Compose

---

## Backend Integration

**Backend Repository:**  
https://github.com/Sreenidhiangadi/FlightBooking_AWT_authentication_Docker

**API Gateway Repository:**  
https://github.com/Sreenidhiangadi/FlightBooking_AWT_authentication_Docker/tree/main/API_Gateway_Microservices_security

All frontend requests are routed through the **API Gateway**, which provides:

- JWT-based Authentication and Authorization
- Centralized Security
- Service Routing and Load Balancing
- CORS Handling

---

## CORS Configuration

Cross-Origin Resource Sharing (CORS) is configured at the **API Gateway level**.

- Frontend runs on a separate origin (Angular)
- Backend services are accessed only via API Gateway
- Allowed origins, headers, and HTTP methods are restricted
- JWT headers are explicitly permitted

This ensures secure and controlled frontend–backend communication.

---

## Features

### Authentication & Authorization
- User and Admin login
- Secure JWT token handling
- Token stored using browser storage
- Auto logout on token expiration
- Role-based access control

### Registration
- User and Admin registration
- Frontend and backend validations
- Duplicate user detection
- Inline form error messages

#### Validation Rules
- Name: minimum 2 characters
- Age: must be greater than 0
- Email: valid email format
- Password: minimum 4 characters

---

### Flight Search
- Search flights by:
  - Source
  - Destination
  - Airline
- Real-time search results
- Responsive card-based result display

---

### Flight Booking 
- Book flights directly from search results
- Seat availability validation
- Booking confirmation flow
- Backend-integrated reservation logic

---

### Booking History 
- View all booked flights
- Booking details with flight information
- User-specific booking records

---

### Admin Features 
- Add new flights
- Update existing flight details
- Delete flights
- View all flights in inventory
- Manage airline schedules

---

### Security Enhancements
- Route Guards for protected pages
- Admin-only access for management screens
- HTTP Interceptor for attaching JWT token
- Unauthorized access redirection

---

### UI & UX Improvements
- Fully responsive layout
- Hamburger menu (navigation drawer)
- Conditional menu items based on login state
- Clean and consistent design system
- Improved form usability and feedback

---

## Application Pages

- Home Page
- Login Page (User / Admin)
- Register Page
- Flight Search Page
- Booking Confirmation Page
- Booking History Page
- Admin Dashboard
- Navigation Drawer (Hamburger Menu)
- Add flight
- Add inventory(RBAC)
- Manage inventory
- Password Change


---

## Screenshots

### Home Page
<img width="1090" height="573" alt="Home Page" src="https://github.com/user-attachments/assets/ae7ce45d-3817-42bd-9fbc-6d99261b8278" />
<br><br>

### Login Page
<img width="940" height="478" alt="Login Page" src="https://github.com/user-attachments/assets/e45a4180-dcf5-4563-991f-ba40c9784d91" />
<br><br>

### Register Page
<img width="1059" height="601" alt="Register Page" src="https://github.com/user-attachments/assets/221c4b72-34e1-4f2b-b537-7c47b77ef9a4" />
<br><br>

### Flight Search Page
<img width="1090" height="552" alt="Flight Search Page" src="https://github.com/user-attachments/assets/60f3a215-a6d3-48a1-ba1b-19e4c7416cd0" />
<br><br>

### Add inventory
<img width="1211" height="588" alt="image" src="https://github.com/user-attachments/assets/6ebf6c4e-8696-4496-ba9c-719e8447b9e7" />
<br><br>

### RBAC
<img width="1132" height="587" alt="image" src="https://github.com/user-attachments/assets/366dceb1-616e-4a58-bb74-090e4de14dbb" />
<br><br>

### Manage Flights
<img width="1198" height="529" alt="image" src="https://github.com/user-attachments/assets/e4957d17-c2b8-4e38-a356-988e1f5863f6" />
<br><br>

### Delete Flight
<img width="1176" height="670" alt="image" src="https://github.com/user-attachments/assets/1ece3956-5991-49af-ba56-0af5552fc7c4" />
<br><br>

### Change Password
<img width="1091" height="546" alt="image" src="https://github.com/user-attachments/assets/29435689-fa45-4264-bd29-8804d4f54120" />
<br><br>





---

## Architecture Overview

- Angular frontend (SPA)
- API Gateway as single entry point
- Microservices for:
  - Authentication
  - Flight Management
  - Booking
- Service Discovery via Eureka
- Centralized configuration via Config Server
- Dockerized deployment

---

## Summary

This project demonstrates a **production-grade Angular frontend** integrated with a **secure Spring Boot microservices backend**, following best practices in authentication, authorization, UI design, and scalability.

---
