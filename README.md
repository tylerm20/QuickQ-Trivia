# QuickQ - Daily Trivia Quiz

QuickQ is a 90-second daily trivia challenge where questions appear one character at a time. Buzz in when you know the answer, but you only have 15 seconds to respond! Test your knowledge across eight categories: Current Events, World History, Sports, US History, Entertainment, Geography, Science, and Arts & Literature. Play in Multiple Choice or Free Response mode and track your daily streak.

It is currently hosted at [QuickQTrivia.com](https://quickqtrivia.com).

## Background

QuickQ was started by Marty Heavey in January 2024. It was created to be a daily game in the tradition of Wordle. Each day there was a quiz of 8 questions and a 90 second time limit. Each quiz would have one quiz-bowl-style question from each of the following categories: Current Events, U.S. History, Sports, World History, Science, Geography, Arts & Literature, and Entertainment.

Marty Heavey maintained the project until March 2025, when it was open-sourced.

## Features

-   90-second timed trivia challenge.
-   Character-by-character question reveal.
-   "Buzz" and "Skip" functionality.
-   15-second answer submission window.
-   Multiple Choice and Free Response modes.
-   Daily quiz with 8 quiz-bowl-style questions.
-   Streak tracking.
-   Local browser storage for statistics.

## Technologies Used

-   **Frontend (React):**
    -   React (created with create-react-app)
    -   JavaScript
    -   CSS
    -   HTML
    -   [Add any specific React libraries used, e.g., React Router, Axios]
-   **Backend (Flask):**
    -   Flask
    -   Python
    -   [Add any specific Flask libraries used, e.g., Flask-Cors]
-   **Database:**
    -   [Specify the database used, e.g., SQLite, PostgreSQL]

## Getting Started

### Prerequisites

-   Python 3.x
-   Node.js and npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [your-repo-url]
    cd QuickQ
    ```

2.  **Backend Setup (Flask):**

    ```bash
    cd backend
    python3 -m venv venv
    source venv/bin/activate  # On macOS/Linux
    venv\Scripts\activate  # On Windows
    pip install -r requirements.txt
    # Set up your database. If you have a database that needs to be initialized, add those steps here.
    export FLASK_APP=app.py #or whatever you named your main python file.
    flask run
    ```

3.  **Frontend Setup (React):**

    ```bash
    cd frontend
    npm install
    npm start
    ```

4.  **Access the application:**

    -   The frontend will be available at `http://localhost:3000`.
    -   The backend API will be available at `http://localhost:5000`.

## Configuration

-   **Backend:**
    -   Configuration variables (e.g., database connection strings) can be set using environment variables or a configuration file.
    -   Explain how to configure the database.
-   **Frontend:**
    -   Explain how to configure the backend URL if it is not the default.

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.

## License

This project is licensed under the [Your License] License - see the `LICENSE` file for details.

## Future Improvements

-   [List potential future features or improvements]
-   Example: User authentication.
-   Example: Score history.
-   Example: Question category selection.

## Contact

For questions or suggestions, please contact QuickQTrivia@gmail.com or open an issue.
