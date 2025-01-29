# Movie Mania

Movie Mania is a web application that allows users to search for movies and view trending movies. It uses the Appwrite backend for managing movie data and search counts.

## Features

- Search for movies by title
- View trending movies based on search counts
- Display detailed information about each movie

## Technologies Used

- React
- Appwrite
- Fetch API
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- npm (or yarn)
- Appwrite account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-mania.git
   cd movie-mania

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and add your Appwrite project details:
   ```bash
    VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    VITE_APPWRITE_PROJECT_ID=your_project_id
    VITE_APPWRITE_DATABASE_ID=your_database_id
    VITE_APPWRITE_COLLECTION_ID=your_collection_id


4. Start the development server:
    ```bash
    npm start

Open your browser and navigate to http://localhost:3000.

*Project Structure*
App.jsx: Main component that renders the application.
appwrite.js: Contains functions for interacting with the Appwrite backend.
components: Contains reusable components like MovieCard and Search.
Usage
Use the search bar to find movies by title.
View trending movies in the "Trending Movies" section.
View all movies in the "All Movies" section.
Contributing
Contributions are welcome! Please open an issue or submit a pull request.

License
This project is licensed under the MIT License.
   
