import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../src/auth/auth-helper.js'; 
export default function Layout() {
const navigate = useNavigate();
const isLoggedIn = auth.isAuthenticated();
const handleSignOut = () => {
    auth.clearJWT(() => {
        navigate('/'); 
    });
};
return (
<div>
{/*Portfolio Heading: */}
<h1>My Portfolio</h1>
{/*Logo: */}
<img src='/AJTDLogo.png' alt='My logo' width={100} height={100} style={{ float: 'left', marginRight: '20px' }}></img>
<br /><br /><br />
{/*Navigation: */}
<nav>
{!isLoggedIn && (
    <>
        <Link to="/signup">Sign Up</Link> | <Link to="/signin">Sign In</Link> |
    </>
)}
{isLoggedIn && (
<>
    <a href="#" onClick={handleSignOut} style={{ color: 'pink' }}>Sign Out</a> 
    <span> | </span>
</>
)}
<Link to="/">Home</Link> | <Link to="/about">About</Link> |
<Link to="/education">Education</Link>| <Link
to="/project">Project</Link>| <Link to="/contact">Contact</Link> | <Link to="/services">Services</Link>
</nav>
<hr />
</div>
);
}