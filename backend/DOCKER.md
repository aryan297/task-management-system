# Docker Setup Guide

This guide explains how to run the Task Management Backend using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed (usually comes with Docker Desktop)

## Quick Start

Run the application with Docker:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete your database data)
docker-compose down -v
```

The backend will be available at `http://localhost:3000`

## Available Services

### PostgreSQL Database
- **Container Name**: `task-management-postgres`
- **Port**: `5432`
- **Database**: `task_management`
- **Username**: `postgres`
- **Password**: `StrongPassword123`

### Backend Application
- **Container Name**: `task-management-backend`
- **Port**: `3000`
- **Swagger API Docs**: `http://localhost:3000/api`

## Useful Docker Commands

### View Running Containers
```bash
docker ps
```

### View All Containers (including stopped)
```bash
docker ps -a
```

### Access PostgreSQL Database
```bash
docker exec -it task-management-postgres psql -U postgres -d task_management
```

### View Backend Logs
```bash
docker-compose logs -f backend
```

### View PostgreSQL Logs
```bash
docker-compose logs -f postgres
```

### Rebuild Containers
```bash
docker-compose up -d --build
```

### Execute Commands in Backend Container
```bash
docker exec -it task-management-backend sh
```

### Run Database Migrations
```bash
# If you have TypeORM migrations
docker exec -it task-management-backend npm run migration:run
```

## Environment Variables

The following environment variables are configured in `docker-compose.yml`:

- `DB_HOST`: Database host (set to `postgres` service name)
- `DB_PORT`: Database port (5432)
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name
- `NODE_ENV`: Node environment (production)

To customize these values, you can:
1. Edit the `docker-compose.yml` file
2. Create a `.env` file in the backend directory

## Troubleshooting

### Port Already in Use
If you get an error that port 3000 or 5432 is already in use:

```bash
# Stop your local backend/database first
# Or change the port mapping in docker-compose.yml
# For example: "3001:3000" to use port 3001 on your host
```

### Database Connection Issues
If the backend can't connect to the database:

```bash
# Check if postgres is healthy
docker-compose ps

# View postgres logs
docker-compose logs postgres

# Restart the services
docker-compose restart
```

### Clear Everything and Start Fresh
```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker-compose down --rmi all

# Start fresh
docker-compose up -d --build
```

## File Structure

```
backend/
├── Dockerfile         # Production Dockerfile (multi-stage build)
├── docker-compose.yml # Docker compose configuration
├── .dockerignore      # Files to exclude from Docker build
└── DOCKER.md         # This file
```

## Best Practices

1. **Secrets**: Never commit sensitive data to version control. Use environment variables or Docker secrets
2. **Volumes**: Database data is persisted in Docker volumes. Use `docker-compose down -v` carefully as it deletes data
3. **Health Checks**: The postgres service has health checks to ensure the backend only starts when the database is ready
4. **Logs**: Regularly check logs to monitor application health

## Next Steps

1. Access the Swagger API documentation at `http://localhost:3000/api`
2. Test the API endpoints using Swagger UI or tools like Postman
3. Check the logs to ensure everything is running correctly
