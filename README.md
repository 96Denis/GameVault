# GameVault

GameVault is a full-stack web application for managing a library of games.

## What it covers

- REST API with Spring Boot
- Spring Data JPA with MySQL in Docker
- DTOs, validation, and centralized error handling
- Spring Security with JWT
- React frontend with Axios, controlled forms, toast notifications, and delete confirmation
- CRUD for games with image URLs, estimated prices, genres, platforms, descriptions, and system requirements

## Game domain

Each game stores:

- `title`
- `publisher`
- `releaseYear`
- `platform`
- `genre`
- `estimatedPrice`
- `description`
- `imageUrl`
- `systemRequirements`

## Features

- list games
- add games
- edit games
- delete games with confirmation
- filter by title, genre, and maximum price
- sort by title, price, genre, and release year
- display cover images by URL

## Project structure

```text
backend/   Spring Boot REST API, security, persistence, validation, tests
frontend/  React + Vite interface for GameVault
```

## Run locally

1. Start the MySQL container:

```bash
cd backend
docker compose up -d
```

2. Start the backend:

```bash
mvn spring-boot:run
```

3. Start the frontend:

```bash
cd frontend
npm run dev
```

4. Open the frontend in the browser, usually at `http://localhost:5173`.

The frontend uses `http://localhost:8080/api` during development.

## Database

The Docker compose file creates:

- database name: `gamevault_db`
- user: `labuser`
- password: `labpass`
- port: `3306`

The current schema used by the application contains:

- `games` for the main CRUD entity
- `users` and `user_roles` for JWT-authenticated write access

There are no test tables, actuator tables, product tables, or category tables in the active schema after the cleanup.

The seeded games are imported from the older XML catalog and adapted to the current GameVault model.

## Notes

- The app keeps JWT-based authentication from the original project.
- The frontend logs in with the seeded `admin / admin123` account to perform write operations.
