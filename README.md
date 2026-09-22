# Blog Generation Frontend

A responsive Single-Page Application (SPA) built with vanilla **HTML5**, **CSS3**, and **JavaScript (ES6+)**. This interface allows users to interact with an AI-powered FastAPI backend service to generate blog posts, chat with an LLM, and manage user accounts.

---

## 🎨 Features

- **Single-Page Navigation**: Smooth section toggling between views without requiring full page reloads.
- **Side-by-Side Blog View**: Displays generated blog outlines and full blog posts side-by-side using CSS Grid.
- **AI Chat Interface**: Interactive view for sending single-prompt queries to the language model.
- **User Registration Form**: Full user signup form with field validation.
- **Dynamic User Directory**: Fetches and renders registered user data into an HTML table.
- **API Health Checker**: Built-in ping tool to test connectivity with the deployed backend.
- **Fully Responsive**: Mobile-first media queries ensure seamless rendering on smartphones, tablets, and desktop displays.

---

## 📁 File Structure

```text
Blog-Generation-Frontend/
├── index.html   # Main HTML markup containing all view sections and navigation header
├── style.css    # CSS styling, layout reset, CSS Grid system, and responsive breakpoints
└── script.js    # SPA view switcher, DOM manipulation, dynamic rendering, and Fetch API calls
```

---

## 🛠 Tech Stack

- **Markup**: HTML5
- **Styling**: CSS3 (Flexbox, CSS Grid, Media Queries)
- **Scripting**: Modern JavaScript (ES6+, Async/Await, Fetch API)
- **Icons & Fonts**: Native Web Fonts & Emoji Icons

---

## 🔗 Backend API Integration

The frontend connects to the FastAPI backend service via asynchronous HTTP requests using the `Fetch API`. 

The default backend base URL configured in `script.js` is:
```javascript
const API_BASE_URL = "https://demo-sf6t.onrender.com";
```

### Endpoints Used

| View Section | HTTP Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Home** | `GET` | `/` | Checks server status and health |
| **AI Chat** | `POST` | `/chat` | Sends a prompt payload `{ prompt: string }` |
| **Blog Generator** | `POST` | `/get_blog?topic={topic}` | Triggers AI workflow and returns outline & blog content |
| **User Signup** | `POST` | `/user/signup` | Registers new user details (`name`, `age`, `email`, `gender`, `password`) |
| **All Users** | `GET` | `/all_users` | Fetches registered user accounts |

---

## 🚀 Getting Started

Because this frontend relies entirely on native browser features, no package installation or build step is required.

### Local Execution

1. **Clone or Download the Repository**:
   ```bash
   git clone <repository-url>
   cd Blog-Generation-Frontend
   ```

2. **Open in Browser**:
   - Double-click the `index.html` file to launch the application directly in any modern web browser.
   - Or serve the project using Python's simple HTTP server:
     ```bash
     python -m http.server 3000
     ```
   - Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ⚙️ Configuration

To connect the frontend to a locally running backend instance (e.g., during development), update `API_BASE_URL` at the top of `script.js`:

```javascript
// Local Development URL
const API_BASE_URL = "http://127.0.0.1:8000";

// Production URL
// const API_BASE_URL = "https://demo-sf6t.onrender.com";
```

---
