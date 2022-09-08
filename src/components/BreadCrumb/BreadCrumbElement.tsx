import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

class BreadCrumbElement extends React.Component {

    // Has a Light Mode and Dark Mode state


    constructor(props: any) {
        super(props);
        // Don't call this.setState() here!
        this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);
      }



    render() {
        return (
            <>
            <div className="bc-frame">
                <div className="breadcrumb">
                    <Link to='/catalog' className='bc-catalog'>
                        Catalog
                    </Link>
                <div className="bc-bg"/>
                </div>
            </div>
            </>
        )
    }
}

export default BreadCrumbElement;