
---

```markdown
# 🧑‍💻 User Management Dashboard – Frontend

This is the frontend of the User Management Dashboard built using **Vite + React + Material UI**. It connects to a NestJS backend to handle user authentication, profile management, and role-based access.

---

## 📽️ Frontend Flow Demo

Watch the full frontend flow in action:  
👉 [Frontend Flow Video (Google Drive)](https://drive.google.com/file/d/1kJ13NeLTq7l02uXntosTNFCVLGoRh1J3/view?usp=drive_link)

---

## 🚀 Live Demo

Coming soon...

---

## 🛠️ Tech Stack

- ⚡ [Vite](https://vitejs.dev/) – Lightning-fast frontend build tool
- ⚛️ [React](https://reactjs.org/) – UI library
- 🎨 [Material UI (MUI)](https://mui.com/) – Component library
- 🔐 [React Router](https://reactrouter.com/) – SPA routing
- 🍞 [React Toastify](https://fkhadra.github.io/react-toastify/) – Notifications
- 🔑 JWT Auth – Secure token-based authentication

---

## 📁 Project Structure

```
```bash
user-dashboard-frontend/
├── public/ # Static assets
├── src/
│ ├── api/ # API services (e.g., signIn, signUp)
│ ├── components/ # Reusable UI components
│ ├── context/ # Auth and global context providers
│ ├── pages/ # Page views (Login, Register, Dashboard, Profile)
│ ├── App.jsx # Root component
│ └── main.jsx # Entry point
├── .env.example # Environment variables template
├── package.json # Project metadata and dependencies
└── vite.config.js # Vite configuration
---

````

---

## ⚙️ Environment Variables

Create a `.env` file in the root and configure the following (see `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:3000/api
````

> 🔒 **Note:** All frontend environment variables must start with `VITE_`.

---

## 🧑‍💻 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/RGokulravichandran/user-dashboard-frontend.git
cd user-dashboard-frontend
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Create `.env` File

```bash
cp .env.example .env
```

Update `VITE_API_BASE_URL` to match your backend server.

### 4. Run the App

```bash
npm run dev
```

---

## 🧪 Features

* ✅ Sign In / Sign Up
* ✅ Role-based access (Admin/User)
* ✅ Protected Routes using JWT
* ✅ User Profile Management
* ✅ Responsive Design with Material UI
* ✅ Toast notifications

---

## 🧩 Integration

Make sure your backend (NestJS) is running and accessible via the base URL set in your `.env` file (`VITE_API_BASE_URL`).

---

## 🐛 Troubleshooting

* **Build errors on Netlify?**
  Run a clean install:

  ```bash
  rm -rf node_modules package-lock.json
  npm install --legacy-peer-deps
  ```

* **API connection issues?**
  Check that your backend is running and `VITE_API_BASE_URL` is correctly configured.

---

## 📬 Contact

**Developer**: Gokul R
📧 Email: [rgokulravichandran@gmail.com](mailto:rgokulravichandran@gmail.com)
🌐 Portfolio: \[Coming Soon]

---

## 📄 License

This project is licensed under the MIT License.

```

---

```
