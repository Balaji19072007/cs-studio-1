# CS Studio - AI-Powered Learning Platform

Welcome to CS Studio, a professional, AI-powered learning platform for computer science. This project allows users to explore structured roadmaps, solve coding problems, and master CS fundamentals with an interactive and modern UI, all enhanced with Google's Gemini API.

## Getting Started

To get the project up and running on your local machine, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository** (if you have it in a git repo):
    ```sh
    git clone <your-repository-url>
    cd cs-studio
    ```

2.  **Install dependencies**:
    Run the following command in your project root to install all the necessary packages listed in `package.json`.
    ```sh
    npm install
    ```

3.  **Set up Environment Variables**:
    This project uses Google's services for AI features and authentication. You must provide API keys for these services to work.

    - Create a `.env` file in the root of your project.
    - Add your keys to the file like this:
      ```
      # For Gemini AI features (AI Tutor, hints, etc.)
      API_KEY=your_google_gemini_api_key_here
      
      # For Google Sign-In and Sign-Up
      GOOGLE_CLIENT_ID=your_google_oauth_client_id_here
      ```
    > **Note**: This setup assumes you are using a bundler like Vite or Create React App that supports environment variables. If you are running in a different environment, you may need to configure how `process.env` variables are loaded.

### Running the Application

Once dependencies are installed, you can start the development server:

```sh
npm start
```
(This assumes you have a "start" script in your `package.json`, e.g., `"start": "vite"`)


## Core Dependencies

This project relies on the following major dependencies, which will be installed automatically with `npm install`:

-   **`react`**: A JavaScript library for building user interfaces.
-   **`react-dom`**: Serves as the entry point to the DOM and server renderers for React.
-   **`react-router-dom`**: For declarative routing in the single-page application.
-   **`@google/genai`**: The official Google Gemini API client for JavaScript.
-   **`jwt-decode`**: For decoding JWTs from Google Sign-In.
-   **`typescript`**: A typed superset of JavaScript that compiles to plain JavaScript.

All other packages listed in `package.json` are also required for development and will be installed.