# Nour Academy - Back Office

Nour Academy is a course management and registration platform designed for an educational center offering academic support and coaching sessions. This project focuses on presenting available courses, filtering them by level, subject, and location, and allowing students to select courses and complete a registration form.

The application is built as a front-end experience with interactive JavaScript logic and a local server to serve the pages. It includes a course catalog, a student registration flow, an admin dashboard, and a simple login screen for administrative access.

## Project Overview

This repository contains the front-end and logic for the Nour Academy management system. The main goal is to help students discover available courses and enroll in them easily, while also giving administrators a place to manage or review registrations.

The project supports:
- Course browsing by subject, level, and location
- Search across course titles
- Course card display with price and remaining seats
- Add-to-cart flow for selected classes
- Student registration form with validation
- Admin login and dashboard area
- Responsive design for desktop and smaller screens

## Main Features

### Course Catalog
The home page displays a list of training courses offered by Nour Academy. Each course includes:
- Title
- Subject
- Academic level
- Schedule
- Center/location
- Price
- Remaining seats

### Filtering and Search
Users can:
- Search for a course by name
- Filter by level
- Filter by location
- Filter by subject

This makes it easy to find the right support course based on the student’s academic needs.

### Registration Flow
Students can add courses to a cart and proceed to a registration form. The form collects required details for enrollment and validates the information before final submission.

### Admin Area
The project includes a simple admin login interface and a dashboard page to manage or review student activity.

## Project Structure

- `index.html` — main landing page showing the course catalog
- `pages/` — HTML pages for login, dashboard, registration, and related views
- `src/` — JavaScript logic for filtering, cart behavior, course rendering, and page interactions
- `public/` — icons, assets, and visual resources
- `components/` — reusable UI blocks
- `utilities/` — helper scripts and shared logic
- `validation/` — validation logic for forms and user data
- `server.js` — local server entry point used to serve the project

## Technologies Used

- HTML
- JavaScript
- Tailwind CSS
- Local server setup for page hosting
- Responsive UI design

## How to Run

1. Clone the repository
2. Open the project folder
3. Install the required dependencies
4. Start the local server with Node.js:
   
   ```bash
   node server.js
   ```

5. Open the app in your browser using the served local address

## Demo Access

The admin demo account included in the project is:

- Email: `admin@gmail.com`
- Password: `admin`

## Contributors

This project was developed by:

- Zakaria Bensaid (@zakariabensaid-360)
- Mohame (@mr-mohame)

## About

Nour Academy is focused on helping students improve their academic performance through structured support in key school subjects. This project reflects that mission by creating a simple and modern platform for course discovery and registration.

## License

This project is intended for educational and demonstration purposes.
