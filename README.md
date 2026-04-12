# ⛏️ Minecraft Developer Portfolio

A responsive, single-page interactive developer portfolio built with React and Three.js. It features a retro CRT-style command-line terminal, a card-based experience grid, and a fully interactive 3D Minecraft sandbox where users can place and break blocks.

## ✨ Features

- **Retro Terminal Interface:** A fully functional, interactive terminal with CRT scanlines, glow effects, and a blinking cursor. Type commands like `about`, `experience`, `projects`, and `resume` to navigate the portfolio "the hacker way". It also includes immersive easter egg commands!
- **Interactive 3D Minecraft Sandbox:** Built with `@react-three/fiber` and `@react-three/drei`. Users can click to place blocks and `Shift + Click` to break them in a procedurally generated voxel island.
- **Vertical SPA Layout:** Smooth scrolling, sticky glassmorphic header, and a responsive horizontally-scrolling card-based layout for experience and projects.
- **Responsive Design:** Mobile-friendly, adjusting the layout and components seamlessly across all device sizes.
- **Resume integration:** One-click resume viewing directly from the terminal or the navigation bar.

## 🛠️ Tech Stack

- **Frontend Framework:** React (bootstrapped with Vite)
- **3D Graphics:** `three.js`, `@react-three/fiber`, `@react-three/drei`
- **Routing:** `react-router-dom` (using `HashRouter` for GitHub Pages compatibility)
- **Styling:** Vanilla CSS with custom properties, CSS Grid, and Flexbox
- **Deployment:** automated deployment via `gh-pages`

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kamesh22/minecraft-portfolio.git
   cd minecraft-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to the local URL provided by Vite (usually `http://localhost:5173`) to view the application.

## 📦 Deployment

This project is configured to be deployed seamlessly to GitHub Pages. To deploy the latest build:

```bash
npm run deploy
```
*(This command builds the project and pushes the `dist` folder to the `gh-pages` branch).*

## 🎮 Terminal Commands 
- `help` - Lists all available commands
- `about` - Who is Kamesh?
- `skills` - Technical skills
- `experience` - Work experience
- `education` - Academic background
- `certifications` - Professional certs
- `project` / `projects` - Featured projects
- `contact` - Get in touch
- `resume` - Open my resume in a new tab
- `clear` - Clear terminal
- `time-travel` - ⚡ Secret command...

## 💼 Author

**Kamesh Rajaram**

* [GitHub](https://github.com/Kamesh22)
* [Email](mailto:kameshraja07@gmail.com)
