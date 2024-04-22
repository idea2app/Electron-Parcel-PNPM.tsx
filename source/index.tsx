import { createRoot } from "react-dom/client";

createRoot(document.querySelector("#root")!).render(
  <h1
    className="text-danger"
    onClick={() => {
      alert("Hello!");
    }}
  >
    Hello, <span className="text-primary">fCC</span> tea & code!
  </h1>
);
