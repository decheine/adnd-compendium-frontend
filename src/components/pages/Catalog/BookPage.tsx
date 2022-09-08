// Page that has all the books for a given setting


import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import Layout from "../../Layout";

import { BookList } from "./BookList";

import { DataService } from "../../../services/DataService";

import './BookPage.css'


const ACRONYMS = require('../../../data/CatAcronyms.json')

// Input Structure
interface BookProps {
    book_title: string,
    monster_keys: Object
}

interface BookLoaderProps {
    publish_id: string
}

// Need to call API to get settings

const getBookData = async (publish_id: any) => {
    const apiurl = "http://127.0.0.1:8080" + "/api/catalog/" + publish_id;
  
    return fetch(apiurl, {
      method: 'GET',
      headers: {
      }
    });  
}


// The Page component will take as input the book id that is
// in the url location. It will get the data from DB for that publish_id

// class BookPageLoader extends React.Component {
//     state = {
//         publish_id: "",
//         loading: true,
//         monster_keys: [],
//         error: false
//       }

//     constructor(props: BookLoaderProps) {
//         super(props);
//         this.state.publish_id=props.publish_id;
        
//     }
//     // componentDidMount() {
//     //     fetch("http://127.0.0.1:8080" + "/api/catalog/" + this.state.publish_id)
//     //                     .then((res) => res.json())
//     //                     .then((json) => {
//     //                         this.setState({
//     //                             items: json,
//     //                             DataisLoaded: true
//     //                         });
//     //                     })
//     // }
//     // useEffect(() => {
//     //     fetch(`https://jsonplaceholder.typicode.com/posts`)
//     //      .then((response) => response.json())
//     //      .then((actualData) => console.log(actualData))
//     //      .catch((err) => {
//     //       console.log(err.message);
//     //      });
//     //    }, []);

//     render() {
//         return (
//             <>
//                 <BookPage/>
//                 <div className='background-catalog'>
//                     Book Title: {this.state.publish_id}
//                 </div>
//             </>
//         )
//     }
// }


const BookPageLoader = () => {
    const {category, publish_id} = useParams();
    const [bookData, setBookData] = useState([])
    const [monster_keys, setMonsters] = useState([])
    const [book_title, setTitle] = useState([])
  
    const fetchData = () => {
      fetch("http://127.0.0.1:8080" + "/api/catalog/" + publish_id)
        .then(response => {
            // console.log("response", response.json());
          return response.json()
        })
        .then(data => {
            console.log("book data: ", data[0]);
            console.log("monster_keys: ", data[0].monster_keys)
            setMonsters(data[0].monster_keys);
            setTitle(data[0].title);
        })
    }
  
    useEffect(() => {
      fetchData()
    }, [])
  
    return (
        <Layout>
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
            <div className="list-container">
                <div className="list-flexbox">
                    <>
                    {
                    // Sort by monster_key (sorting by title is hard...)
                    monster_keys.sort().map((monster_key: string) => {
                        return (
                            <div className="list-entry" key={monster_titles.get(monster_key)}>
                                <Link to={'/catalog/' + category + "/" + publish_id + "/" + monster_key} className="list-link">
                                    {monster_titles.get(monster_key)}
                                </Link>
                            </div>
                        )
                    }
                    )
                    }
                    {
                        console.log("monster_boxes: ", monster_keys.map((monster_key: string) => {return (monster_titles.get(monster_key))}).sort())
                    }  
                    </>
                </div>
            </div>
        </Layout>
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