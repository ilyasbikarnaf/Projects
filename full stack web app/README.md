
# My Web App

This is a full-stack web application built with HTML, CSS, JavaScript (frontend) and Node.js with MySQL (backend).

## Features
- User registration and authentication using MySQL.
- Drag-and-drop or file selection for image uploads (up to 20 images).
- Backend with Node.js and Express.
- Frontend built with vanilla JavaScript, HTML, and CSS.

## Installation and Setup

### **1. Clone the Repository**
### **2. Install Dependencies**
### **3. Setup the `.env` File**
Create a `.env` file in the `backend` folder and add the following environment variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=?????  # Make sure to change this to your own password
DB_DATABASE=users_app
```

- **DB_HOST**: Typically `localhost` unless your database is hosted remotely.
- **DB_USER**: Default MySQL user is `root`, unless configured otherwise.
- **DB_PASSWORD**: Replace `?????` with your own MySQL password.
- **DB_DATABASE**: Name of the database you're using, in this case `users_app`.

### **4. Start the Backend**
The backend should now run on `http://localhost:3000`.

### **5. Start the Frontend**
If your frontend is a simple HTML, CSS, and JS a

### **6. Test the App**
Open the frontend in your browser and test features like:
- User registration
- Image upload (drag-and-drop or file selection)

---

## Additional Notes
- Make sure to **replace** the `DB_PASSWORD` in the `.env` file with your own MySQL password.
- The app uses MySQL, so make sure you have a MySQL server running and the database `users_app` created.
- If you encounter issues, check that all the environment variables are correctly set in the `.env` file.

---

## License
This project is licensed under the MIT License.
