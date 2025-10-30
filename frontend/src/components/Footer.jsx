import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Nepali Urban Dictionary. All rights reserved.</p>
        <p className="footer-tagline">Preserving the culture, one word at a time.</p>
      </div>
    </footer>
  );
};

export default Footer;
