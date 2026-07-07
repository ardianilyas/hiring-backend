# Hiring Backend API Documentation

This document outlines the available REST API endpoints for the Hiring Backend application. 

All endpoints require authentication (e.g., via `better-auth` sessions or tokens). Some endpoints require the user to have an `admin` role.

---

## 1. Auth (better-auth)
*Authentication is handled by better-auth.*
- **POST** `/api/auth/*` - Handles login, registration, and session management.

---

## 2. Departments
**Base Path:** `/api/departments`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get a list of all departments. | Authenticated |
| GET | `/:id` | Get details of a specific department. | Authenticated |
| POST | `/` | Create a new department. | Admin Only |
| PUT | `/:id` | Update an existing department. | Admin Only |
| DELETE | `/:id` | Delete a department. | Admin Only |

---

## 3. Job Openings
**Base Path:** `/api/job-openings`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get a paginated list of job openings. Supports filtering via query params: `page`, `limit`, `search`, `location`, `departmentId`, `employmentType`. | Admin Only |
| GET | `/:id` | Get details of a specific job opening. | Admin Only |
| POST | `/` | Create a new job opening. | Admin Only |
| PUT | `/:id` | Update an existing job opening. | Admin Only |
| DELETE | `/:id` | Delete a job opening. | Admin Only |

---

## 4. Applications
**Base Path:** `/api/applications`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get a list of all applications. | Admin Only |
| GET | `/me` | Get a list of applications submitted by the currently authenticated user. | Authenticated |
| GET | `/:id` | Get details of a specific application. | Admin or Owner |
| POST | `/` | Submit a new application for a job opening. | Authenticated |
| PATCH| `/:id/status`| Update the status of an application (e.g. `reviewing`, `rejected`) and add optional feedback. | Admin Only |

---

## Standard Responses

### Success Response
```json
{
  "success": true,
  "message": "Action successful",
  "data": { ... }
}
```

### Paginated Success Response
```json
{
  "success": true,
  "message": "Action successful",
  "data": [ ... ],
  "meta": {
    "total": 42,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "nextUrl": "http://localhost:3000/api/...?page=2",
    "prevUrl": null
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description here",
  "errors": [ ... ] 
}
```
