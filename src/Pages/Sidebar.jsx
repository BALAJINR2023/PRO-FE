import { useState } from 'react';
import { Nav, Button, Offcanvas } from 'react-bootstrap';
import styles from './Sidebar.module.css'; // Import CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCar, faCarAlt, faGlobeAsia, faHome,  faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons/faBlog';


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const cityName = localStorage.getItem('city') || ''; // Retrieve the city from local storage
  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);
  
 
  return (
    <>
      <Button onClick={handleShow} className={styles.sidebarButton}>
        <i className="fa-solid fa-bars"></i>
      </Button>

      <Offcanvas show={showSidebar} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MENU</Offcanvas.Title>
        </Offcanvas.Header>

        <hr className="my-3" />

        <Offcanvas.Body>
          <Nav className="flex-column">
          <Nav.Link  href="/" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faHome} className="me-2" />Home
          </Nav.Link>
          <Nav.Link  href="/addcar" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCarAlt} className="me-2" />Add CarHost
          </Nav.Link>
          <Nav.Link  href="/profile" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} className="me-2" />Profile
          </Nav.Link>
          <Nav.Link  href="/listcar" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCar} className="me-2" />List car
          </Nav.Link>
          <Nav.Link
              href="#"
              className="d-flex align-items-center">
              <FontAwesomeIcon icon={faGlobeAsia} className="me-2" />
              change city <div className="ps-5 text-success">{cityName}</div>
          </Nav.Link>

            <hr className="my-3" />
            <Nav.Link href="https://investor-relations.zoomcar.com/in/" className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faBuilding} className="me-2" />
              Investor Relations
            </Nav.Link>
            <Nav.Link href="https://press.zoomcar.com/in/" className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faNewspaper} className="me-2" />
              Press Releases
            </Nav.Link>
            <Nav.Link href="https://www.zoomcar.com/leadership" className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Leadership
            </Nav.Link>
            <Nav.Link href="https://www.zoomcar.com/blogs/in/" className="d-flex align-items-center mb-3">
              <FontAwesomeIcon icon={faBlog} className="me-2" />
              Blogs
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;

