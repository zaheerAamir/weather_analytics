import "../styles/index.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🌦 Weather Analytics Dashboard</div>
      <ul className="navbar-links">
        <li>
          <button className="settings-btn">⚙️ Settings</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

