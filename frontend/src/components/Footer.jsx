import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
          <span>•</span>
          <Link to="/admin/login">Admin</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Nepali Urban Dictionary. All rights reserved.</p>
        <p className="footer-tagline">Preserving the culture, one word at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
