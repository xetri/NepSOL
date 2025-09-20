import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from "../../context/AuthContext";
import './Navbar.css';
import logo from '../../assets/logo.png';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { user } = useAuth();
  const goto = useNavigate();

  const [textValue, setTextValue] = useState('');

  const search = (e) => {
    e.preventDefault();
    if (textValue.trim() !== '') {
      goto(`/profile/${encodeURIComponent(textValue)}`);
    }
  }

  return (
    <nav>
      {/* Left: Logo and Brand */}
      <div className="logosection">
        <img src={logo} alt="logo" className="logo" />
        <span className="brand-name">NepSOL</span>
      </div>

      {/* Right section: Search bar + nav links + buttons */}
      <div className="right-section">
        <div className="search-bar">
          <form onSubmit={search}>
            <input type="text" placeholder="Search creators..." value={textValue} onChange={(e) => setTextValue(e.target.value)} />
            <FaSearch onClick={search} className="search-icon" />
          </form>
        </div>

        <div className="nav-buttons">
          {
            user ?
            <button className="getstarted-btn" onClick={() => goto('/dashboard')} >Dashboard</button>
            : <button className="getstarted-btn" onClick={() => goto('/login')}>Login</button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
