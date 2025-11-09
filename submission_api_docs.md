# Submission API Documentation

## Base URL
```
/submission
```

## Endpoints

### 1. Create Submission

Creates a new team submission for the competition.

**Endpoint:** `POST /`

**Request Body:**

```json
{
  "teamName": "string",
  "teamLeaderName": "string",
  "email": "string",
  "contactNumber": "string",
  "yearOfStudy": "1" | "2" | "3" | "4" | "5",
  "college": "string",
  "teamMembers": [
    {
      "name": "string",
      "yearOfStudy": "1" | "2" | "3" | "4" | "5"
    }
  ],
  "supportingFiles": {
    "pitchDeckUrl": "string",
    "pitchVideoUrl": "string"
  }
}
```

**Field Validations:**

| Field                           | Type   | Required | Constraints                                                           |
|---------------------------------|--------|----------|-----------------------------------------------------------------------|
| `teamName`                      | string | Yes      | 1-100 characters                                                      |
| `teamLeaderName`                | string | Yes      | 1-100 characters                                                      |
| `email`                         | string | Yes      | Valid email format, max 255 characters, converted to lowercase        |
| `contactNumber`                 | string | Yes      | Exactly 10 digits OR international format: `+{1-3 digits}{10 digits}` |
| `yearOfStudy`                   | string | Yes      | Must be "1", "2", "3", "4", or "5" (converted to number)              |
| `college`                       | string | Yes      | Must be one of the allowed colleges (see below)                       |
| `teamMembers`                   | array  | No       | Maximum 4 members (excluding team leader), defaults to empty array    |
| `teamMembers[].name`            | string | Yes      | 1-100 characters                                                      |
| `teamMembers[].yearOfStudy`     | string | Yes      | Must be "1", "2", "3", "4", or "5"                                    |
| `supportingFiles.pitchDeckUrl`  | string | Yes      | Valid URL, max 500 characters                                         |
| `supportingFiles.pitchVideoUrl` | string | Yes      | Valid URL, max 500 characters                                         |

**Allowed Colleges:**

(will be changed later; for demo)
- MIT Manipal
- MAHE Manipal
- KMC Manipal
- MCODS Manipal
- Manipal College of Nursing
- Welcomgroup Graduate School of Hotel Administration
- Manipal Academy of Banking
- Manipal Institute of Technology Bengaluru

**Success Response:**

**Status Code:** `201 Created`

```json
{
  "success": true,
  "message": "Submission created successfully",
  "payload": null
}
```

**Error Responses:**

**Status Code:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Validation error message",
  "payload": null
}
```

**Status Code:** `409 Conflict`
```json
{
  "success": false,
  "message": "A submission with this email or team name already exists",
  "payload": null
}
```

---

### 2. Get All Submissions

Retrieves a paginated list of submissions with optional filtering and sorting.

**Endpoint:** `GET /`

**Query Parameters:**

| Parameter     | Type   | Required | Default     | Constraints                                            |
|---------------|--------|----------|-------------|--------------------------------------------------------|
| `page`        | number | No       | 1           | Positive integer                                       |
| `limit`       | number | No       | 10          | Positive integer, max 100                              |
| `teamName`    | string | No       | -           | Filter by team name                                    |
| `email`       | string | No       | -           | Filter by email (must be valid email format)           |
| `yearOfStudy` | string | No       | -           | Filter by year: "1", "2", "3", "4", or "5"             |
| `college`     | string | No       | -           | Filter by college (must be from allowed colleges list) |
| `sortBy`      | string | No       | "createdAt" | One of: "createdAt", "teamName", "email", "college"    |
| `sortOrder`   | string | No       | "desc"      | Either "asc" or "desc"                                 |

**Example Request:**
```
GET /api/submissions?page=1&limit=20&college=MIT%20Manipal&sortBy=teamName&sortOrder=asc
```

**Success Response:**

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Submissions retrieved successfully",
  "payload": {
    "submissions": [
      {
        "_id": "string",
        "teamName": "string",
        "teamLeaderName": "string",
        "email": "string",
        "contactNumber": "string",
        "yearOfStudy": 1,
        "college": "string",
        "teamMembers": [
          {
            "name": "string",
            "yearOfStudy": 1
          }
        ],
        "supportingFiles": {
          "pitchDeckUrl": "string",
          "pitchVideoUrl": "string"
        },
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

**Error Response:**

**Status Code:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid query parameter",
  "payload": null
}
```

---

### 3. Get Submission by ID

Retrieves a single submission by its MongoDB ObjectId.

**Endpoint:** `GET /:id`

**URL Parameters:**

| Parameter | Type   | Required | Constraints                                     |
|-----------|--------|----------|-------------------------------------------------|
| `id`      | string | Yes      | Valid 24-character hexadecimal MongoDB ObjectId |

**Example Request:**
```
GET /api/submissions/507f1f77bcf86cd799439011
```

**Success Response:**

**Status Code:** `200 OK`

```json
{
  "success": true,
  "message": "Submission retrieved successfully",
  "payload": {
    "_id": "507f1f77bcf86cd799439011",
    "teamName": "string",
    "teamLeaderName": "string",
    "email": "string",
    "contactNumber": "string",
    "yearOfStudy": 1,
    "college": "string",
    "teamMembers": [
      {
        "name": "string",
        "yearOfStudy": 1
      }
    ],
    "supportingFiles": {
      "pitchDeckUrl": "string",
      "pitchVideoUrl": "string"
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

**Status Code:** `400 Bad Request`
```json
{
  "success": false,
  "message": "Invalid MongoDB ObjectId format",
  "payload": null
}
```

**Status Code:** `404 Not Found`
```json
{
  "success": false,
  "message": "Submission not found",
  "payload": null
}
```

---

## Common Error Responses

All endpoints may return the following error responses:

**Status Code:** `500 Internal Server Error`
```json
{
  "success": false,
  "message": "Internal server error",
  "payload": null
}
```

---

## Notes

- All string fields are automatically trimmed of leading/trailing whitespace
- Email addresses are automatically converted to lowercase
- The `yearOfStudy` field accepts strings ("1", "2", etc.) in requests but is stored and returned as a number
- Team members array excludes the team leader and can have a maximum of 4 additional members
- Both email and team name must be unique across all submissions