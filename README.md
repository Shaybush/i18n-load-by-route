# i18n-load-by-route

This project demonstrates an efficient method for managing internationalization (i18n) resources in a React application using `i18next` and `react-router-dom`. The key goal is to load only the necessary translation files for the current route and language, which significantly improves performance and memory usage.

## 🎯 What This Project Solves

In large-scale applications with many routes and languages, loading all translation files at once can lead to:

- **High initial load times**: Users wait longer for the app to become interactive.
- **Increased memory consumption**: Unnecessary data is stored in memory.
- **Slow performance**: The browser has to parse and handle large JSON objects.

This project implements a strategy where translation files (namespaces) are loaded on-demand based on the current route.

## ✨ Key Features & Benefits

- **On-Demand Loading**: Only the translations for the current page are loaded.
- **Automatic Cleanup**: When navigating to a new page, the translations for the previous page are automatically removed from memory.
- **Language Switching**: Seamlessly switch languages on any page. The system automatically loads the correct resources for the new language.
- **Memory Efficiency**: Keeps the memory footprint minimal by only storing the currently needed translations.
- **Scalability**: The approach scales well as more routes and languages are added to the application.

## 🚀 How to Run This Project Locally

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd i18n-load-by-route
    ```

3.  **Install dependencies:**
    This project uses `pnpm`, but you can use `npm` or `yarn` as well.

    ```bash
    pnpm install
    # or
    npm install
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    # or
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📸 Screenshots

<img width="1432" height="684" alt="Screenshot 2025-07-31 at 17 33 23" src="https://github.com/user-attachments/assets/6986c231-e8c8-4f49-bfc9-e90831c10ff5" />
<img width="1433" height="683" alt="Screenshot 2025-07-31 at 17 34 02" src="https://github.com/user-attachments/assets/977add41-d0e3-4aac-a021-118211710202" />
