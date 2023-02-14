import { useState, useEffect } from "react";
import { useProSidebar } from 'react-pro-sidebar';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import logo from '../../assets/logo.png';
import {CollapseContextHook} from "../../hooks/custom-contexts/display-toggle-hook"

export const Header = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const { collapsed, collapseSidebar } = useProSidebar();
    const { setToggle } = CollapseContextHook()
    const handleToggle = () => {
        collapseSidebar(!collapsed);
        setToggle(!collapsed)
    }
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const logOut = () => {
        logout();
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" style={{ background: '#f5f5f5' }} sticky="top" >
                <Navbar.Brand className="text-center">
                    <Link to={"/"}><img src={logo} style={{ height: '50px' }}></img></Link>
                </Navbar.Brand>
                <i onClick={handleToggle} >{<DensityMediumIcon />}</i>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Link to={"/about"} style={{ margin: '4px', textDecoration: 'none' }}>About</Link>
                        <Link to={"/contact"} style={{ margin: '4px', textDecoration: 'none' }}>Contact</Link>
                        {currentUser && (<Link to={"/private"} style={{ margin: '4px', textDecoration: 'none' }}>Private</Link>)}
                        {currentUser && (<Link to={"/login"} onClick={logOut} style={{ margin: '4px', textDecoration: 'none' }}>Logout</Link>)}
                        {currentUser || (<Link to={"/login"} style={{ margin: '4px', textDecoration: 'none' }}>Login</Link>)}
                        {currentUser || (<Link to={"/register"} style={{ margin: '4px', textDecoration: 'none' }}>Register</Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}
