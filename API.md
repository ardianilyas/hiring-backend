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
| POST | `/` | Create a new department.<br/>**Body:**<br/>`{`<br/>&nbsp;&nbsp;`"name": "string",`<br/>&nbsp;&nbsp;`"description": "string (optional)"`<br/>`}` | Admin Only |
| PUT | `/:id` | Update an existing department.<br/>**Body:**<br/>`{`<br/>&nbsp;&nbsp;`"name": "string (optional)",`<br/>&nbsp;&nbsp;`"description": "string (optional)"`<br/>`}` | Admin Only |
| DELETE | `/:id` | Delete a department. | Admin Only |

---

## 3. Job Openings
**Base Path:** `/api/job-openings`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get a paginated list of job openings. Supports filtering via query params: `page`, `limit`, `search`, `location`, `departmentId`, `employmentType`. | Public |
| GET | `/:id` | Get details of a specific job opening. | Public |
| POST | `/` | Create a new job opening.<br/>**Body:**<br/>`{`<br/>&nbsp;&nbsp;`"departmentId": "uuid",`<br/>&nbsp;&nbsp;`"title": "string",`<br/>&nbsp;&nbsp;`"description": "string",`<br/>&nbsp;&nbsp;`"location": "string",`<br/>&nbsp;&nbsp;`"employmentType": "full-time | part-time | contract | internship (optional)",`<br/>&nbsp;&nbsp;`"isActive": "boolean (optional)"`<br/>`}` | Admin Only |
| PUT | `/:id` | Update an existing job opening.<br/>**Body:**<br/>`{`<br/>&nbsp;&nbsp;`"departmentId": "uuid (optional)",`<br/>&nbsp;&nbsp;`"title": "string (optional)",`<br/>&nbsp;&nbsp;`"description": "string (optional)",`<br/>&nbsp;&nbsp;`"location": "string (optional)",`<br/>&nbsp;&nbsp;`"employmentType": "full-time | part-time | contract | internship (optional)",`<br/>&nbsp;&nbsp;`"isActive": "boolean (optional)"`<br/>`}` | Admin Only |
| DELETE | `/:id` | Delete a job opening. | Admin Only |

---

## 4. Applications
**Base Path:** `/api/applications`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get a paginated list of all applications. Supports query params: `page`, `limit`. | Admin Only |
| GET | `/me` | Get a list of applications submitted by the currently authenticated user. | Authenticated |
| GET | `/:id` | Get details of a specific application. | Admin or Owner |
| POST | `/` | Submit a new application for a job opening.<br/>**Body:**<br/>`{`<br/>&nbsp;&nbsp;`"jobOpeningId": "uuid",`<br/>&nbsp;&nbsp;`"resume": "string",`<br/>&nbsp;&nbsp;`"coverLetter": "string (optional)"`<br/>`}` | Authenticated |
| PATCH| `/:id/status`| Update the status of an application and add optional feedback.<br/>**Body:**<br/>`{`<br/>&nbsp;&nbsp;`"status": "applied | reviewing | interviewing | offered | rejected",`<br/>&nbsp;&nbsp;`"feedback": "string (optional)"`<br/>`}` | Admin Only |

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
