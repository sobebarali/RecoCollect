# Collections API - Node.js, Express, PostgreSQL

This project implements a backend system that allows users to create and manage collections of their recommendations (such as movies, TV shows, places, songs, etc.). Users can add and remove recommendations from collections and view their collections with pagination support.

## Features

- Create a new collection for a user.
- Add recommendations to a collection.
- Remove recommendations from a collection.
- View all collections for a user with pagination support.
- Delete a collection.
- Error handling for invalid scenarios.

---

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

---

## API Documentation

### Base URL: `/v1/api`

### 1. **Create a Collection**
   - **Endpoint**: `POST /users/:user_id/collections`
   - **Description**: Creates a new collection for a user.
   - **Body**:
     ```json
     {
       "name": "My Collection",
       "description": "A description of the collection"
     }
     ```

### 2. **Add Recommendation to Collection**
   - **Endpoint**: `PUT /users/:user_id/collections/:collection_id/recommendations`
   - **Description**: Adds a recommendation to a specific collection.
   - **Body**:
     ```json
     {
       "recommendation_id": 1
     }
     ```

### 3. **Remove Recommendation from Collection**
   - **Endpoint**: `DELETE /users/:user_id/collections/:collection_id/recommendations`
   - **Description**: Removes a recommendation from a specific collection.
   - **Body**:
     ```json
     {
       "recommendation_id": 1
     }
     ```

### 4. **View Collections**
   - **Endpoint**: `GET /users/:user_id/collections`
   - **Description**: Retrieves all collections for a user with pagination support.
   - **Query Params**:
     - `perPage` (optional): Number of collections per page.
     - `page` (optional): Page number.
   - **Example URL**:
     ```http
     GET /users/123/collections?perPage=10&page=2
     ```

### 5. **Delete Collection**
   - **Endpoint**: `DELETE /users/:user_id/collections/:collection_id`
   - **Description**: Deletes a collection.

---

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

4. **Set up the database**:

   - Create the necessary tables:

     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       fname VARCHAR(255) NOT NULL,
       sname VARCHAR(255) NOT NULL,
       profile_picture VARCHAR(255),
       bio TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     CREATE TABLE recommendations (
       id SERIAL PRIMARY KEY,
       user_id INT REFERENCES users(id) ON DELETE CASCADE,
       title VARCHAR(255) NOT NULL,
       caption TEXT,
       category VARCHAR(50) NOT NULL,
       pictures TEXT[],
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     CREATE TABLE collections (
       id SERIAL PRIMARY KEY,
       user_id INT REFERENCES users(id) ON DELETE CASCADE,
       name VARCHAR(255) NOT NULL,
       description TEXT,
       recommendation_ids INT[] DEFAULT '{}',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

5. **Run migrations** (if using Prisma):

   ```bash
   npx prisma migrate dev --name init
   ```

6. **Start the server**:

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

---

## Running Tests

To test the API using tools like Postman, Insomnia, or a testing library like Jest:

1. **Unit Tests**:
   - Use Jest or any other testing framework of your choice.
   - You can define API request tests with a mock server and Prisma test client.

2. **Manual Testing with Postman**:
   - Set up requests according to the API documentation.
   - For example:
     - `GET /v1/api/users/:user_id/collections` with pagination parameters.

### Example Test Request

**Create Collection Example**:

```http
POST /v1/api/users/1/collections
Content-Type: application/json

{
  "name": "Favorites",
  "description": "My favorite movies"
}
```

---

## Error Handling Scenarios

1. **Invalid User**: If a user doesn’t exist, a `404` response is returned.
2. **Invalid Recommendation**: Adding/removing a recommendation that doesn’t belong to the user will return a `403` response.
3. **Missing Fields**: Requests with missing required fields will return a `400` response.
4. **Other Errors**: A `500` response is returned for internal server errors.

---
