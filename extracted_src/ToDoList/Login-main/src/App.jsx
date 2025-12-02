import "./App.css";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      <div className="background-container">
        <a
          href="https://teabalho-sla-oq.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/Personal planner (4).png"
            alt="Logo"
            className="corner-image"
          />
        </a>

        <Login />
      </div>
    </div>
  );
}

export default App;
