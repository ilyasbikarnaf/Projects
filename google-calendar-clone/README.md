# Google Calendar Clone

## Overview
A dynamic calendar application built to replicate core Google Calendar functionality, showcasing advanced front-end development with React and TypeScript. Features include month navigation, event creation/editing, persistent storage, and responsive design, demonstrating skills in modern web development.

## Features

- **Month Navigation**: View any month with back/forward buttons and a "jump to current month" option.
- **Event Management**: Add, edit, and delete events via modals, with fields for name (required), all-day toggle, start/end times (validated), and color (red, blue, green).
- **Persistent Storage**: Events saved in LocalStorage, ensuring data persists across page refreshes.
- **Overflow Handling**: Displays "+X More" for excess events, with a modal to view and edit them, recalculated on resize or event changes.
- **Smooth Animations**: CSS animations for modal transitions, enhancing user experience.

## Tech Stack

- **Front-End**: React, TypeScript, CSS
- **Tools**: Date-fns (date handling), LocalStorage (persistence)
- **Development**: Git (version control)

## Purpose
Built to master complex React and TypeScript concepts, including state management, form validation, and responsive design. This project highlights my ability to create user-friendly, feature-rich applications with a focus on performance and UX.

## Installation

To get started, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ilyasbikarnaf/Projects/tree/main/google-calendar-clone
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the app:
    ```bash
    npm start
    ```

## Usage

- Navigate months using the arrow buttons or jump to the current month.
- Click the "+" button on any day to add an event, or click an existing event to edit/delete.
- View overflow events via the "+X More" button, with smooth modal animations.
