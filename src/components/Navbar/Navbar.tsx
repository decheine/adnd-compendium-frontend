import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';
import './Sidebar.css';

library.add(fas, faBars)


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    // console.log(button)
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    // displays on mobile
    const showButton = () => {
        if (window.innerWidth <= 700) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);
    if(!button){
        return (
            <div className="navbar-container">
            
            <div className="menu-mobile">
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    Home    
                </Link>
                <input type="checkbox" id="hamburger-input" className="burger-shower" />
                <label id="hamburger-menu" htmlFor="hamburger-input">
                <nav id="sidebar-menu">
                    <h3>Menu</h3>
                    <ul>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/appendix' className='nav-links' onClick={closeMobileMenu}>
                            Appendix
                        </Link>
                    </li>
                <li className='nav-item'>
                  <Link
                    to='/catalog'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Catalog
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/about'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/Search'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Search &nbsp;  
                    <FontAwesomeIcon icon="search" />
                  </Link>
                </li>
                    </ul>
                </nav>
                </label>
                <label className="overlay" htmlFor="hamburger-input"></label>
            </div>
            </div>
        )
    } else {
        return (
            <>
            <div className="navbar">
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Home
                
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                {click ?<FontAwesomeIcon icon='times' /> : <FontAwesomeIcon icon='bars' />}
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/appendix' className='nav-links' onClick={closeMobileMenu}>
                    Appendix
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/catalog'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Catalog
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/about'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                </li>
                {/* <li className='nav-item'>
                  <Link
                    to='/Search'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Search &nbsp;  
                    <FontAwesomeIcon icon="search" />
                  </Link>
                </li> */}
    
              </ul> </div>
              
            </>
        )
    }
}

export default Navbar


/**
 * <input id="toggle1" type="checkbox" />
    <label class="hamburger1" for="toggle1">
      <div class="top"></div>
      <div class="meat"></div>
      <div class="bottom"></div>
    </label>
  
    <nav class="menu1">
      <a class="link1" href="">Our Models</a>
      <a class="link1" href="">Specialties</a>
      <a class="link1" href="">About</a>
      <a class="link1" href="">Blog</a>
      <a class="lin1 kbutton-nav" href="">Contact</a>
    </nav>
 */

    /**
     * <div className='navbar-container'>
              <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Home
                
              </Link>
              <div className='menu-icon' onClick={handleClick}>
                {click ?<FontAwesomeIcon icon='times' /> : <FontAwesomeIcon icon='bars' />}
              </div>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <Link to='/appendix' className='nav-links' onClick={closeMobileMenu}>
                    Appendix
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/catalog'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Catalog
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/about'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    About
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/Search'
                    className='nav-links'
                    onClick={closeMobileMenu}
                  >
                    Search &nbsp;  
                    <FontAwesomeIcon icon="search" />
                  </Link>
                </li>
    
              </ul> </div>
     */


              /*
<>
          <nav className='navbar'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                Home
            </Link>
            <input id="toggle1" type="checkbox" />
            <label className="hamburger1" htmlFor="toggle1">
                <div className="top"></div>
                <div className="meat"></div>
                <div className="bottom"></div>
            </label>
        
            <nav className="menu1">
                <a className="nav-links" href="">Our Models</a>
                <a className="nav-links" href="">Specialties</a>
                <a className="nav-links" href="">About</a>
                <a className="nav-links" href="">Blog</a>
                <a className="nav-links kbutton-nav" href="">Contact</a>
            </nav>
          </nav>
        </>
              */