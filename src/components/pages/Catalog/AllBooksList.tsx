import React from 'react'
import BookCard from '../../BookCard/BookCard'

import './BookList.css'
const BOOKS = require('../../../data/sortedtsr.json')
const Categories = require('../../../data/Categories.json')
const CatAcronyms = require('../../../data/CatAcronyms.json')

export function AllBooksList() {

    const items = []
    // console.log(BOOKS)
    // Iterate through all BOOKS and push a BookCard for each one
    var books_setting: any = {}
    for (const [index, value] of Object.entries(Categories)){
        for(const val of value as string[]){
            books_setting[val] = CatAcronyms[index]     
        }
        // books_setting[value as string] = CatAcronyms[index]
    }

    for (const [index, value] of Object.entries(BOOKS)){
        console.log(index, value)
        items.push(<BookCard key={index} id={index} category={books_setting[index]} title={BOOKS[index as string]}/> )
    }
    
    return (
        <div className="BookList">
        {items}
        </div>
    )
}