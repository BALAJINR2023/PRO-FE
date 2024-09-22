import { Navbar, Nav } from 'react-bootstrap';
import { Outlet, useNavigate} from 'react-router-dom';
import Footer from '../Pages/Footer';
import Sidebar from '../Pages/Sidebar';
import HostCounter from '../Pages/otherpages/HostCounter';
import HostCarSharingBenefits from '../Pages/otherpages/HostCar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const Layout = () => {
  const storedAuthStatus = localStorage.getItem('isAuthenticated');
  const storedUserName = localStorage.getItem('username') 
    ? JSON.parse(localStorage.getItem('username')) 
    : null;

  const [isAuthenticated, setIsAuthenticated] = useState(storedAuthStatus ? JSON.parse(storedAuthStatus) : false);
  const [userName, setUserName] = useState(storedUserName ? storedUserName.name : '');
 const navigate = useNavigate();
  // Update userName when isAuthenticated and storedUserName are available
  useEffect(() => {
    if (isAuthenticated && storedUserName) {
      setUserName(storedUserName.name);
    }
  }, [isAuthenticated, storedUserName]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setUserName('');
    navigate ('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Nav className="me-auto">
          {/* Sidebar button */}
          <Nav.Item>
            <Sidebar />
          </Nav.Item>

          {/* Logo */}
          <Nav.Item className="d-flex align-items-center">
            <img 
              src="https://www.zoomcar.com/zap/subscribe/build/7f1998e5f3e2ea1ad605b2203aef2ac5.svg"
              alt="Zoomcar Logo"
              style={{ width: '100px', height: 'auto' }} // Adjust the width as needed
            />
          </Nav.Item>

          {/* Dropdown Menu Aligned Left */}
          <Nav.Item className="nav-item dropdown">
            <Nav.Link
              className="dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Company Profile
            </Nav.Link>
            <ul
              className="dropdown-menu dropdown-menu-start"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <a className="dropdown-item" href="https://investor-relations.zoomcar.com/in/">
                  Investor Relations
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="https://press.zoomcar.com/in/">
                  Press Releases
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="https://www.zoomcar.com/leadership">
                  Leadership
                </a>
              </li>
            </ul>
          </Nav.Item>
        </Nav>

        {/* Login/Signup or Logout */}
        <Nav className="ms-auto">
        <Nav.Link  href="/addcar" className="d-flex align-items-center bg-white text-dark py-2 px-3 border rounded" 
                   style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
         CARHOST
        </Nav.Link>


          {isAuthenticated ? (
            <>
              <Nav.Item className="d-flex align-items-center">
                <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                <span className="text-light">Welcome, {userName || ''}</span>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleLogout} className="d-flex align-items-center text-light">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Logout
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link href="/login" className="d-flex align-items-center text-light">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/register" className="d-flex align-items-center text-light">
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  Signup
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Other Content */}
      <HostCounter />
      <HostCarSharingBenefits />

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
