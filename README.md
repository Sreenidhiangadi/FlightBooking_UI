#  Flight Booking Application – Frontend (Angular)

A modern **Angular-based frontend** for a microservices-driven **Flight Booking Application**, providing user-friendly interfaces for authentication, flight search, and booking workflows.

The frontend communicates securely with backend microservices via an **API Gateway**.

---
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

---
##  Tech Stack

### Frontend
- Angular (Standalone Components)
- TypeScript
- Reactive Forms
- Angular Router
- CSS (Custom Styling)

### Backend (via API Gateway)
- Spring Boot Microservices
- Spring Security with JWT
- Eureka Discovery Server
- Config Server
- Docker and Docker Compose

---
##  Backend Integration

**Backend Repository:** 
https://github.com/Sreenidhiangadi/FlightBooking_AWT_authentication_Docker

The UI is connected to the backend through an **API Gateway**.

**API Gateway Repository:**  
https://github.com/Sreenidhiangadi/FlightBooking_AWT_authentication_Docker/tree/main/API_Gateway_Microservices_security

All requests from the UI are routed through the API Gateway, which handles:

- Authentication and Authorization (JWT)
- Service routing
- Security enforcement
---

##  CORS Configuration

Cross-Origin Resource Sharing (CORS) is enabled to allow secure communication between the Angular frontend and backend microservices.

- Frontend runs on a different origin (Angular)
- Backend services are accessed through the API Gateway
- CORS is configured at the API Gateway level
- Only required HTTP methods and headers are allowed

This ensures smooth frontend–backend interaction while maintaining security.

---



##  Features


###  Registration
- User and Admin registration
- Frontend and backend validation
- Duplicate user handling (User already exists)
- Field-level error display

#### Validation Rules
- Name: minimum 2 characters  
- Age: must be greater than 0  
- Email: valid email format  
- Password: minimum 4 characters  

###  Flight Search
- Search flights by route and airline
- Real-time results from backend
- Clean card-based UI for results

###  Responsive UI
- Mobile-friendly layout
- Hamburger menu (navigation drawer)
- Smooth user experience for forms and navigation

---

##  Application Pages

- Home Page
- Login Page (User/Admin)
- Register Page
- Flight Search Page
- Navigation Drawer (Hamburger Menu)
- Add flight

---
##  Screenshots

### Home Page
<img width="1090" height="573" alt="image" src="https://github.com/user-attachments/assets/ae7ce45d-3817-42bd-9fbc-6d99261b8278" />
<br><br>

### Login Page
<img width="940" height="478" alt="image" src="https://github.com/user-attachments/assets/e45a4180-dcf5-4563-991f-ba40c9784d91" />
<br><br>

### Register Page
<img width="1059" height="601" alt="image" src="https://github.com/user-attachments/assets/221c4b72-34e1-4f2b-b537-7c47b77ef9a4" />
<br><br>

### Flight Search Page
<img width="1090" height="552" alt="image" src="https://github.com/user-attachments/assets/60f3a215-a6d3-48a1-ba1b-19e4c7416cd0" />


---


