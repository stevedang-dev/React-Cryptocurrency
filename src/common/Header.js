import React from 'react';
import logo from './logo.png';
import './Header.css';

const containerStyle = {
    fontSize: '40px'
}

const Header = () => {
    return (
        <div style={containerStyle} className="Header-wrapper">
            <img src={logo} alt="logo" className="Header-logo" />
        </div>
    );
}

export default Header;
