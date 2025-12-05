# Calculator Application with CI/CD

This project is a simple calculator application built to demonstrate a full-stack development workflow with Continuous Integration (CI) using GitHub Actions.

## Project Overview

The application consists of two main components:
-   **Backend**: A Python Flask application providing API endpoints for arithmetic operations.
-   **Frontend**: A React application (created with Vite) providing the user interface.

## Directory Structure

```
Github-Actions/
├── .github/workflows/   # CI/CD Configuration files
│   ├── backend.yml      # Workflow for Backend CI
│   └── frontend.yml     # Workflow for Frontend CI
├── calculator-app/
│   ├── backend/         # Python Flask code
│   └── frontend/        # React Vite code
└── README.md            # Project Documentation
```

## Features

-   **Basic Arithmetic**: Addition, Subtraction, Multiplication, Division.
-   **Advanced Operations**: Modulus (%).
-   **Error Handling**: Handles division by zero and invalid inputs.

## Continuous Integration (GitHub Actions)

We have set up two GitHub Actions workflows to automatically build and test the application on every push to the `main` branch.

### 1. Backend CI (`.github/workflows/backend.yml`)
-   **Triggers**: On push to `main`.
-   **Environment**: Ubuntu Latest, Python 3.10.
-   **Steps**:
    -   Checks out the code.
    -   Sets up Python 3.10.
    -   **Caching**: Uses `actions/setup-python@v5` with `cache: 'pip'` to cache dependencies and speed up builds.
    -   Installs dependencies from `requirements.txt`.
    -   Lints code using `flake8`.
    -   Runs unit tests using `pytest`.

### 2. Frontend CI (`.github/workflows/frontend.yml`)
-   **Triggers**: On push to `main`.
-   **Environment**: Ubuntu Latest, Node.js (Matrix: 20.x, 22.x).
-   **Steps**:
    -   Checks out the code.
    -   Sets up Node.js.
    -   **Caching**: Uses `actions/setup-node@v4` with `cache: 'npm'` to cache `node_modules`.
    -   Installs dependencies (`npm ci`).
    -   Builds the project (`npm run build`).
    -   Runs component tests (`npm test`).

## Development Journey & Key Learnings

1.  **Initial Setup**: Created the directory structure and initialized Flask and React apps.
2.  **Local Testing**: Verified the app works locally (Backend on port 5000, Frontend on port 5173).
3.  **CI Implementation**:
    -   Created `backend.yml` to automate Python testing.
    -   Created `frontend.yml` to automate React testing.
4.  **Feature Expansion**: Added "Modulus" operation to both backend and frontend, including new test cases.
5.  **Debugging & Verification**:
    -   Intentionally introduced a bug (swapped `+` for `-`) to verify that the CI pipeline correctly fails.
    -   Fixed the bug and verified the CI pipeline passes.
6.  **Optimization**:
    -   Enabled **Caching** for both `pip` and `npm` to optimize workflow runtime.
    -   Fixed a `400 Bad Request` cache error by upgrading `setup-python` to `v5` and specifying `cache-dependency-path`.

## Challenges & Resolutions

During the development process, we encountered and resolved several issues:

1.  **GitHub Actions Cache Error (400)**:
    -   **Issue**: The `setup-python` action failed with a 400 error when trying to cache `pip` dependencies.
    -   **Cause**: The action looked for `requirements.txt` in the root directory, but it was located in `calculator-app/backend/`.
    -   **Resolution**: We upgraded `actions/setup-python` from `v3` to `v5` and added the `cache-dependency-path` parameter to point to the correct file location.

2.  **CI Failure Verification**:
    -   **Action**: We intentionally introduced a logic bug (swapping addition for subtraction).
    -   **Result**: The GitHub Actions workflow correctly failed, verifying that our tests are working and protecting the codebase.

## How to Run Locally

### Backend
```bash
cd calculator-app/backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd calculator-app/frontend
npm install
npm run dev
```
