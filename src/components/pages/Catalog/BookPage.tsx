// Page that has all the books for a given setting


import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import Layout from "../../Layout";

import { BookList } from "./BookList"; 

import MonsterList from "../../MonsterList";

import { DataService } from "../../../services/DataService";

import './BookPage.css'

import { GLOBALS } from '../../../data/GLOBALS';

const ACRONYMS = require('../../../data/CatAcronyms.json')

// import GLOBALS

// Input Structure
interface BookProps {
    book_title: string,
    monster_keys: Object
}

interface BookLoaderProps {
    publish_id: string
}

// Need to call API to get settings

const BookPageLoader = () => {
    const {category, publish_id} = useParams();
    const [bookData, setBookData] = useState([])
    const [monster_keys, setMonsters] = useState([])
    const [book_title, setTitle] = useState([])
  
    const fetchData = () => {
      fetch(GLOBALS.API_ENDPOINT + "/api/catalog/" + publish_id)
        .then(response => {
            // console.log("response", response.json());
          return response.json()
        })
        .then(data => {
            // console.log("book data: ", data[0]);
            // console.log("monster_keys: ", data[0].monster_keys)
            setMonsters(data[0].monster_keys);
            setTitle(data[0].title);
        })
    }
    
    window.scrollTo(0, 0);
  
    useEffect(() => {
      fetchData()
    }, [])
  
    return (
        <>
        <div className="background"></div>
        <Layout>
            {/* Background Image Paper */}
            
            {/* Image */}
            <div className="frame">
                <div className="card-1">
                    <div className="col-1">
                        <img src={'/images/Books/Hi Resolution/' +  publish_id + '.jpg'} className="card-img"/>
                    </div>
                    <div className="col-2">
                        <h5 className="card-title">{book_title}</h5>
                        <div className="card-body">
                            <div className="card-text">
                                TODO: Properties of this book including:
                                <ul>
                                    <li>
                                        <strong>Author:</strong>
                                    </li>
                                    <li>
                                        <strong>Year:</strong>
                                    </li>
                                    <li>
                                        <strong>Cool Quote</strong>
                                    </li>
                                    <li>
                                        <strong>Monster Count? :</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Monster List */}
            <h3>Monsters</h3>
            <MonsterList monster_keys={monster_keys} url_suffix={'/catalog/' + category + "/" + publish_id + "/"}/>
        </Layout>
        </>
    )
  }


function BookPage() {
    let { category, publish_id } = useParams();
    // const the_category = props.category;
    if(publish_id === undefined || category === undefined){
        return (
            <>
            </>
        )
    } else {
        console.log("book publish_id: ", publish_id)
        return (
            <>
                <Layout>

                    <div className="setting-logo">
                        <img className="headerimg" src={'/images/grf/' +  category + '.gif'} alt={category + 'category image'}></img>

                    </div>
                    
                    <div className="categoryBody"></div>
                    {/* <BookPage book_title={publish_id}/> */}
                </Layout>
            </>
        )
        
    }
}



export default BookPageLoader;