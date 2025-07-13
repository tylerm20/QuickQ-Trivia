# QuickQ - Daily Trivia Quiz

QuickQ is a 90-second daily trivia challenge where questions appear one character at a time. Buzz in when you know the answer, but you only have 15 seconds to respond! Test your knowledge across eight categories: Current Events, World History, Sports, US History, Entertainment, Geography, Science, and Arts & Literature. Track your daily streak.

It is currently hosted at [QuickQTrivia.com](https://quickqtrivia.com).

## Background

QuickQ was started by Marty Heavey in January 2024. It was created to be a daily game in the tradition of Wordle. Each day there was a quiz of 8 questions and a 90 second time limit. Each quiz would have one quiz-bowl-style question from each of the following categories: Current Events, U.S. History, Sports, World History, Science, Geography, Arts & Literature, and Entertainment.

Marty Heavey maintained the project until April 2025, when it was open-sourced.

To reduce hosting costs and simplify deployment, the hosted version of the project has been updated to remove the backend server. Trivia questions are now stored in a JSON file within the frontend application.

**However, the original backend code (Flask) is still included in the repository for reference and historical purposes.**

## Features

-   90-second timed trivia challenge.
-   Character-by-character question reveal.
-   "Buzz" and "Skip" functionality.
-   15-second answer submission window.
-   Free Response mode
-   Daily quiz with 8 quiz-bowl-style questions.
-   Streak tracking.
-   Local browser storage for statistics.
-   Trivia questions for the hosted version are now stored in a local JSON file (no backend server required).
-   **Original Flask backend code is included for reference.**

## Technologies Used

-   **Frontend (React):**
    -   React (created with create-react-app)
    -   JavaScript
    -   CSS
    -   HTML
-   **Original Backend (Flask):**
    -   Flask
    -   Python

## Getting Started

### Prerequisites

-   Node.js and npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [your-repo-url]
    cd QuickQ
    ```

2.  **Frontend Setup (React):**

    ```bash
    cd frontend
    npm install
    npm start
    ```

3.  **Access the application:**

    -   The frontend will be available at `http://localhost:3000`.

## Configuration

-   **Trivia Questions:**

    -   Trivia questions for the hosted version are located in `frontend/src/questions.json`. You can modify this file to update the questions.
    -   The JSON file contains an array of question objects. Each object has the following structure:
        ```json
        {
            "category": "Geography",
            "source": "2022 MAKEMAKE",
            "question": "This country's capital city was designed in the shape of an airplane around a \"Monumental Axis\" by architect Oscar Niemeyer. \"Cariocas\" are residents of this country's second most populous city, which was the origin of bossa nova music and hosts massive parades in the Sambodrome during Carnaval. Name this Portuguese-speaking country in South America which contains most of the Amazon rainforest.",
            "answers": ["Brazil"],
            "incorrect1": "Argentina",
            "incorrect2": "Mexico",
            "incorrect3": "Colombia",
            "used": "TRUE"
        }
        ```

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Future Improvements

-   [List potential future features or improvements]
-   Example: User authentication.
-   Example: Score history.
-   Example: Question category selection.

## Contact

For questions or suggestions, please contact QuickQTrivia@gmail.com or open an issue.
