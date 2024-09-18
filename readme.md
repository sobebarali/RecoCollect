# RecoCollect - Node.js, Express, PostgreSQL, TDD

This project implements a backend system that allows users to create and manage collections of their recommendations (such as movies, TV shows, places, songs, etc.). Users can add and remove recommendations from collections and view their collections with pagination support.

## Features

- Create a new collection for a user.
- Add recommendations to a collection.
- Remove recommendations from a collection.
- View all collections for a user with pagination support.
- Delete a collection.
- Error handling for invalid scenarios.

## Database Schema Modifications

### Existing Schema:

#### `users` Table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  sname VARCHAR(255) NOT NULL,
  profile_picture VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `recommendations` Table:

```sql
CREATE TABLE recommendations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  caption TEXT,
  category VARCHAR(50) NOT NULL,
  pictures TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### New Schema: `collections` Table

```sql
CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  recommendation_ids INT[] DEFAULT '{}',  -- Array to hold recommendation IDs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- `collections` table holds collections for users with an array of recommendation IDs.

## API Documentation

### Base URL: `/api/v1`

### 1. Create Collection

- **Method**: POST
- **Endpoint**: `/collections`
- **Description**: Creates a new collection for a user.
- **Request Body**:
  ```json
  {
    "name": "My Collection",
    "description": "A description of the collection",
    "user_id": 1
  }
  ```

### 2. Add Recommendation to Collection

- **Method**: POST
- **Endpoint**: `/collections/{collectionId}/recommendations`
- **Description**: Adds a recommendation to a specific collection.
- **Request Body**:
  ```json
  {
    "recommendation_id": 1
  }
  ```

### 3. Remove Recommendation from Collection

- **Method**: DELETE
- **Endpoint**: `/collections/{collectionId}/recommendations/{recommendationId}`
- **Description**: Removes a recommendation from a specific collection.

### 4. View Collections

- **Method**: GET
- **Endpoint**: `/collections`
- **Description**: Retrieves all collections for a user with pagination support.
- **Query Parameters**:
  - `user_id` (required): ID of the user
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of collections per page (default: 10)
- **Example URL**:
  ```
  GET /api/v1/collections?user_id=123&page=2&limit=10
  ```

### 5. Delete Collection

- **Method**: DELETE
- **Endpoint**: `/collections/{collectionId}`
- **Description**: Deletes a collection.

## Error Handling

- 400 Bad Request: Missing or invalid parameters
- 403 Forbidden: User doesn't have permission to perform the action
- 404 Not Found: Resource not found
- 500 Internal Server Error: Unexpected server error

## Project Setup

### Prerequisites

- **Node.js** (>= v14)
- **PostgreSQL** (v12+)
- **Prisma** (ORM)
- **npx** (to run Prisma commands)
- **npm** or **yarn** for package management

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sobebarali/reckit-coding-challenge
   cd reckit-coding-challenge
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file at the root of your project and add the following variables:

   ```bash
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```

4. **Prisma Init** (if using Prisma):

   ```bash
   npx prisma init
   ```

5. **Introspect your database**

   ```bash
   npx prisma db pull
   ```

6. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

7. **Start the server**:

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

## Running Tests

To test the API using tools like Postman, Insomnia, or a testing library like Jest:

1. **Unit Tests**:

   - Use Jest or any other testing framework of your choice.
   - You can define API request tests with a mock server and Prisma test client.

2. **Manual Testing with Postman**:
   - Set up requests according to the API documentation.
   - For example:
     - `GET /api/v1/collections?user_id=1&page=1&limit=10` to view collections with pagination.

### Example Test Request

**Create Collection Example**:

```http
POST /api/v1/collections
Content-Type: application/json

{
  "name": "Favorites",
  "description": "My favorite movies",
  "user_id": 1
}
```

This README now incorporates the updated API structure with RESTful conventions while maintaining the original project setup, database schema, and testing information. The API documentation section has been significantly revised to reflect the new endpoint structure and naming conventions.
