import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faYoutube, faFacebook, faLinkedin, faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <Container fluid>
        <div className="mt-4">
          <div className={styles.footerSocialTitle}>{"Let's keep in touch"}</div>
          <div className={styles.footerSocialIcons}>
          <a href="https://x.com/zoomcar_india?lang=en" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className={`social-icons ${styles.socialIcons}`} />
          </a>
          <a href="https://www.instagram.com/zoomcar_india/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} className={`social-icons ${styles.socialIcons}`} />
          </a>
          <a href="https://www.youtube.com/c/Zoomcar-Self-Drive-Car-Rental" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} className={`social-icons ${styles.socialIcons}`} />
          </a>
          <a href="https://www.facebook.com/zoomcar.in" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} className={`social-icons ${styles.socialIcons}`} />
          </a>
          <a href="https://in.linkedin.com/company/zoomcar-india-pvt-ltd-" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className={`social-icons ${styles.socialIcons}`} />
          </a>
          </div>
        </div>

    <div className={styles.footerContainernew}>
      <div className={styles.leftSection}>
        <p className={styles.footerLogoText}>Never</p>
        <p className={styles.footerLogoText}>Stop</p>
        <p className={styles.footerLogoText}>Living.</p>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.footerMobileQR}>
        <img src="https://www.zoomcar.com/img/image.png" alt="qr-code" className={styles.qrCodeImage} />
        <div  className={styles.appStoreIconsContainer}>
        <a href="https://play.google.com/store/apps/details?id=com.zoomcar" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faGooglePlay} className={`${styles.playstoreIcons} ${styles.googlePlay}`} />
        </a>
        <a href="https://apps.apple.com/us/app/zoomcar/id1234567890" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faApple} className={`${styles.playstoreIcons} ${styles.appleStore}`} />
        </a>
        </div>
        <div className={styles.footerMobileQRTitle}>DOWNLOAD ZOOMCAR APP</div>
        <div className={styles.footerMobileQRSubtitle}>We have incredible offers, discounts &amp; much more in our app.</div>
        </div>
      </div>
    </div>
        <div className={styles.footerLine}></div>
        <div className={styles.footerContent}>
          By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. 
          All trademarks are properties of their respective owners. 2012-2023 © Zoomcar™ Ltd. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
