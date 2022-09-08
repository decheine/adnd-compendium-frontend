/**
 * Breadcrum react component that displays the current page's breadcrumb
 * Showing Catalog > Setting > Book
 */

// Breadcrum react component that displays the current page's breadcrumb showing Catalog > Setting > Book
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import './BreadCrumbFrame.css'
// import { title } from 'process';
const Acronyms = require('../../data/AcronymsSetting.json')
const Titles = require('../../data/AA_KEYS_TITLES.json')


// class BreadCrumbElement extends React.Component {

function BreadCrumbElement (props: {link: string, text: string}) {
    return (
        <>
        <Link to={props.link} className='bc-element'>
            {
            props.text
           }
        </Link>
        </>
    )
}

interface BreadCrumbArgs {
    title: string,
    setting?: string,
    book?: string
}

// Specify types for Props and State
type MyProps = {
    title: string,
    setting?: string,
    book?: string,
    monster_key?: string
}

// 👇️ we set the props to empty object, and set the state to {value: string}
class BreadCrumb extends React.Component<MyProps> {

    // Has a Light Mode and Dark Mode state


    constructor(props: BreadCrumbArgs) {
        super(props);
        // Don't call this.setState() here!
        this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);
    }

    // will render the breadcrumb depending on the page
    // if the page is catalog, it will render the breadcrumb for catalog
    // if the page is setting, it will render the breadcrumb for setting
    // if the page is book, it will render the breadcrumb for book
    
    render() {
        // console.log("title: " + this.props.title)
        // console.log("book: " + this.props.book)
        // console.log("setting: " + this.props.setting)
        // console.log("monster_key: " + this.props.monster_key)
        if(this.props.title == "Home"){
            return (
                <></>
            )
        } else if (this.props.title == "catalog") {
            // console.log("Book id: ", this.props.book)
            // console.log("Books: ", global.book_titles)
            // console.log("Book title: ", global.book_titles.get(this.props.book!))
            return (
                <>
                <div className="bc-frame">
                    <div className="breadcrumb">
                        <BreadCrumbElement link={"/" +this.props.title} text={ this.props.title}/>
                        {this.props.setting ? 
                        <>
                        {/* Right Arrow */}
                        <div className='arrow-box'>
                            <FontAwesomeIcon icon="angle-right" className='right-arrow' />
                        </div>
                            <BreadCrumbElement link={"/catalog/" + this.props.setting} text={Acronyms[this.props.setting]}/> 
                        </>
                        : null
                        }
                        
                        {this.props.book ? 
                        <>
                        <div className='arrow-box'>
                            <FontAwesomeIcon icon="angle-right" className='right-arrow' />
                        </div>
                        <BreadCrumbElement link={"/catalog/" + this.props.setting + "/" + this.props.book} text={global.book_titles.get(this.props.book!)!}/> 
                        </>: null} 

                        {this.props.book && 
                        this.props.setting &&
                        this.props.monster_key ? 
                        <>
                        <div className='arrow-box'>
                            <FontAwesomeIcon icon="angle-right" className='right-arrow' />
                        </div>
                        <BreadCrumbElement link={"/catalog/" + this.props.setting + "/" + this.props.book + "/" + this.props.monster_key} text={this.props.monster_key}/> 
                        </>: null
                        } 
                        
                        <div className="bc-bg"/>
                    </div>
                </div>
                </>
            )
        } else if (this.props.title == "appendix") {
            return (
                <>
                <div className="bc-frame">
                    <div className="breadcrumb">
                        <BreadCrumbElement link={"/" +this.props.title} text={ this.props.title}/>
                        {this.props.setting ?
                        <>
                        {/* Right Arrow */}
                        <div className='arrow-box'>
                            <FontAwesomeIcon icon="angle-right" className='right-arrow' />
                        </div>
                            <BreadCrumbElement link={"/appendix/" + this.props.setting} text={Titles[this.props.setting]}/>
                        </>
                        : null
                    }
                        {this.props.book ? <BreadCrumbElement link={this.props.book} text={this.props.book}/> : null}
                        <div className="bc-bg"/>
                    </div>
                </div>
                </>
            )
                } 

    }
}
    // render() {
    //     return (
    //         <>
    //         <div className="bc-frame">
    //             <div className="breadcrumb">
    //                 <BreadCrumbCatalog />
    //                 {/* <BreadCrumbElement link='/catalog' text='Catalog'/> */}
    //                 <FontAwesomeIcon icon="angle-right" className='right-arrow' />
    //             <div className="bc-bg"/>
    //             </div>
    //         </div>
    //         </>
    //     )
    // }

export default BreadCrumb;

//                   </li>
//                   <li className='nav-item'>
//                     <Link
//                       to='/catalog/setting'
//                       className='nav-links'
//                       onClick={closeMobileMenu}
//                     >
//                       Setting
//                     </Link>
//                   </li>
//                   <li className='nav-item'>
//                     <Link
//                       to='/catalog/setting/book'
//                       className='nav-links'
//                       onClick={closeMobileMenu}
//                     >
//                       Book
//                     </Link>
//                   </li>
//
//
//
//
//

