📱 Todo App — React Native (Expo)

A clean and functional Todo Mobile Application built using React Native + Expo Router, demonstrating:

✅ Authentication
✅ Navigation (Expo Router + Tabs + Stack)
✅ API Integration with FastAPI
✅ State Management (Context Provider)
✅ Beautiful UI & UX
✅ Secure Token Storage

🚀 Features

🔐 Authentication
• User Signup
• User Login
• JWT Token saved securely using Expo SecureStore

📋 Dashboard
• Fetch Todos from backend
• Create Todo
• Toggle Completion
• Edit Todo
• Delete Todo
• Auto-refresh after create/update/delete

👤 Profile
• Fetch and display authenticated user details
• Logout / Signout

🎨 UI Highlights
• Modern card-based layout
• Clean buttons
• Floating “+ Add Task” button
• Responsive for Android + iOS

⸻

📂 Folder Structure
app/
(auth)/
 login.tsx
 signup.tsx
(main)/
 index.tsx
 create-todo.tsx
 profile.tsx
 layout.tsx
context/
 TodosContext.tsx
utils/
 auth.ts (token helpers)

🔧 Setup & Installation

1️⃣ Install dependencies
npm install

2️⃣ Start Expo
npx expo start

3️⃣ Configure API URL

Inside constants.ts:
export const API_URL = "http://YOUR_LOCAL_IP:8000";

Find your local IP:
ipconfig (Windows)
ifconfig (macOS / Linux)

📸 Screenshots

![Login](/assets/screenshots/login.png)
![Creating todo](</assets/screenshots/creating todo.png>)
![logged in](/assets/screenshots/loggedin.png)
![mark complete](</assets/screenshots/mark todo completion.png>)
![signing](/assets/screenshots/signing.png)
![signup](/assets/screenshots/signup.png)
![todo list](</assets/screenshots/todo list.png>)
![profile](</assets/screenshots/user profile.png>)


📄 License

MIT License
