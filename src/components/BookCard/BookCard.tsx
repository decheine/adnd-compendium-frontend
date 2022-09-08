import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {*} props 
 * img = path to image file
 * description = description card text
 * header = header text
 * @returns 
 */

// import CATEGORIES from '../../Categories.json'
// import BOOKS from '../../sortedtsr.json'

import "./BookCard.css"

function BookCard(props: any){
    return (
        

        
        <div className="book-card">
            <div className="book-card-header-rectangle">
                <p className="book-card-header">{props.title}</p>
            </div>
            <div className="book_arrow">
                <div className="book_point-left"></div>
                <div className="book_line"></div>
                <div className="book_point-right"></div>
            </div>
            {/* <Link to={`/catalog/${props.category}/${props.id}`}  className="book-link">
            <div className="hover14 column">
                <figure>
                    <img className="book_img-2" src={'/images/Books/Hi Resolution/' +  props.id + '.jpg'} alt={props.title}/>
                </figure>
                </div>
            </Link> */}
            <Link to={`/catalog/${props.category}/${props.id}`}  className="book-link">
            <div className="hover01 column">
                <figure>
                    <img className="book_img-2" src={'/images/Books/Hi Resolution/' +  props.id + '.jpg'} alt={props.title}/>
                </figure>
                </div>
            </Link>
            <div className="group-1-2">
                <div className="book-card-footer-rectangle">
                    <p className="book-card-description-text">{props.id}</p>
                </div>
            </div>
        </div>
        
        
    )
}
  
  export default BookCard;