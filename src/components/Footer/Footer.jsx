import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import "../Footer/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="copyright">
        <p>© 2025 Raquel Manajreh Alaboud. Hecho con pasión y código.</p>
      </div>

      <div className="info">
        <a href="https://www.linkedin.com/in/raquel-manajreh-alaboud-396811321/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://github.com/raquel-manajreh" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>

      <div className="contact">
        <p>raquel.fsdev@gmail.com</p>
      </div>
    </div>
  )
}

export default Footer;
