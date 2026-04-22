import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

declare global {
  interface Window {
    __confebraqAppBooted?: boolean;
  }
}

window.__confebraqAppBooted = true;

createRoot(document.getElementById("root")!).render(<App />);
