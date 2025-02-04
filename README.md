# EUSI Challenge - Satellite Image Ordering API

This is a **RESTful API** that allows users to view and order satellite images. The application is containerized using **Docker** and utilizes **PostgreSQL with PostGIS** for spatial data handling.

## Features

- Retrieve all available satellite images.
- Retrieve details of a specific satellite image.
- Place an order for a satellite image.
- View all ordered satellite images.

## Prerequisites

Ensure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (for local development)
- API testing tool (e.g., [Postman](https://www.postman.com/) or `curl`)

## Installation & Setup

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:
   ```sh
   git clone <your-repository-url>
   cd EUSI_Challenge
   ```

2. **Create a `.env` file**:
   - Copy the contents of `.env.example` into a new `.env` file.
   - Ensure the environment variables are properly set.

3. **Run Docker Desktop**.

4. **Start the containers**:
   ```sh
   docker-compose up --build
   ```
   This will:
   - Build the API container.
   - Set up the PostgreSQL database with PostGIS.
   - Automatically create and seed the database with satellite image data.

## API Endpoints

| Method | Endpoint                           | Description                                      |
|--------|------------------------------------|--------------------------------------------------|
| GET    | `/satellite-images`               | Retrieve all available satellite images.        |
| GET    | `/satellite-images/:catalogID`    | Retrieve details of a specific satellite image. |
| GET    | `/orders`                         | View all ordered satellite images.              |
| POST   | `/orders/:catalogID`              | Place an order for a satellite image.           |

### Example Usage

- **View all satellite images**:  
  Open your browser and go to: `http://localhost:3000/satellite-images`

- **View a specific satellite image**:  
  Replace `:catalogID` with the image ID and navigate to:  
  `http://localhost:3000/satellite-images/{catalogID}`

- **View all orders**:  
  `http://localhost:3000/orders`

- **Order a satellite image**:  
  Send a **POST request** to `http://localhost:3000/orders/{catalogID}` using Postman or `curl`.

## Contributing

Feel free to fork this repository and submit pull requests with improvements.

## Helpful links

- [Freecodecamp](https://www.freecodecamp.org/learn/relational-database/learn-relational-databases-by-building-a-mario-database/build-a-mario-database)
- [Tutorial on running Postgres in Docker](https://www.youtube.com/watch?v=Hs9Fh1fr5s8)
- [Docker documentation for Postgres Image](https://www.docker.com/blog/how-to-use-the-postgres-docker-official-image/)
- [PostGIS documentation](https://postgis.net/documentation/)
