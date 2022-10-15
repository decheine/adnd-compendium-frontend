import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css';
import './Sidebar.css';

library.add(fas, faBars)


// Reimpliment NavBar as React component

class NavBar extends React.Component {
    render() {
        return (
            <Navbar />
        )
    }
}

// Sidebarprops type
type SidebarProps = {
    sidebarOpen: boolean,
    closeSidebar: () => void
}

// Boolean class that renders depending on true or false
class BooleanDisplay extends React.Component<SidebarProps> {

    constructor(props: SidebarProps) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { sidebarOpen: 0 };
        // this.handleClick = this.handleClick.bind(this);


    }

    render() {
      console.log(this.props.sidebarOpen)
        return (
            <div>
                {this.props.sidebarOpen ? "Open" : "Closed"}
            </div>
        )
    }
}

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const check = [
      {id: "hamberger-input", checked: 0}
    ]

    const [checkedList, setCheckedList] = React.useState(
      check.map(x => !!x.checked)
    );

    //  const overlay_checkbox = (
    //   <>
    //     <input type="checkbox" id="hamburger-input" className="burger-shower" />
    //   </>
    // )

    // console.log(button)
    const handleClick = () => {
      // Set "checked" status of checkbox to opposite of click
      setClick(!click);
      const checkbox = document.getElementById("hamburger-input") as HTMLInputElement;
      checkbox.checked = !click;
    }
    const closeMobileMenu = (e: any) => {
      // e.preventDefault();
      // console.log(e.target);
      // e.stopPropagation()
      // setClick(!click); 
      console.log("closeMobileMenu");
      // (overlay_checkbox.checked = false;
    };
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
            <div className="navbar-container" >
            <div className="menu-mobile">
                <NavLink to='/' className='navbar-logo'  >
                    Home    
                </NavLink>
                {/* {overlay_checkbox} */}
                <input type="checkbox" id="hamburger-input" className="burger-shower" onClick={handleClick}/>
                {check.map((item, idx) => (
                  
                  <label id="hamburger-menu" htmlFor="hamburger-input" key="key">
                    <nav id="sidebar-menu">
                      <h3>Menu</h3>
                      <ul>
                        <label className='nav-item' onClick={handleClick}>
                            <Link to='/' className='nav-links'>
                                Home
                            </Link>
                            {/* <a href='/' className='nav-links' onClick={handleClick}>
                                Home
                            </a> */}
                        </label>
                        <li className='nav-item'>
                            <Link to='/appendix' className='nav-links' onClick={handleClick}>
                                Appendix
                            </Link>
                        </li>
                        <li className='nav-item'>
                          <Link
                            to='/catalog'
                            className='nav-links'
                            onClick={handleClick}
                          >
                            Catalog
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <Link
                            to='/about'
                            className='nav-links'
                            onClick={handleClick}
                          >
                            About
                          </Link>
                        </li>
                        <li className='nav-item'>
                          <Link
                            to='/search'
                            className='nav-links'
                            onClick={handleClick}
                          >
                            Search &nbsp;  
                            <FontAwesomeIcon icon="search" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </label>
                ))}
                
                <label className="overlay" htmlFor='hamburger-input'></label>
            </div>
            </div>
        )
    } else {
        return (
            <>
            <div className="navbar">
              <div className="navbar-wrapper">
                <Link to='/' className='navbar-logo'>
                  Home
                  
                </Link>
                <ul className='nav-menu'>
                  <li className='nav-item'>
                    <Link to='/appendix' className='nav-links' onClick={closeMobileMenu}>
                      Appendix
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/catalog'
                      className='nav-links'
                      // onClick={closeMobileMenu}
                    >
                      Catalog
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/about'
                      className='nav-links'
                      // onClick={closeMobileMenu}
                    >
                      About
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      to='/search'
                      className='nav-links'
                      // onClick={closeMobileMenu}
                    >
                      Search &nbsp;  
                      <FontAwesomeIcon icon="search" />
                    </Link>
                  </li>
      
                </ul> 
              </div>
            </div>
            </>
        )
    }
}

export default Navbar