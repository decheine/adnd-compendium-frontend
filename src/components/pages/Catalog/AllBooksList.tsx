import React from 'react'
import BookCard from '../../BookCard/BookCard'

import './BookList.css'
const BOOKS = require('../../../data/sortedtsr.json')


export function AllBooksList(props: any) {

    const items = []
    console.log(BOOKS)
    // Iterate through all BOOKS and push a BookCard for each one
    for (const [index, value] of Object.entries(BOOKS)){
        console.log(index, value, BOOKS[value as string])
        items.push(<BookCard key={index} id={index} category={props.category} title={BOOKS[index as string]}/> )
    }
    
    return (
        <div className="BookList">
        {items}
        </div>
    )
}