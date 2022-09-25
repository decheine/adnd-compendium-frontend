import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Interweave } from 'interweave';

import "./MonsterPage.css"
import { Link, useParams } from 'react-router-dom';
import Layout from './Layout';
import MonsterBodyBlocks from './MonsterBlockBuilder';
import RandomMonsterButton from './RandomMonsterButton';
// import DataService
import { DataService } from '../services/DataService'
import { JsxElement } from 'typescript';


const KEYS_TITLES = require('../data/AA_KEYS_TITLES.json')
const sortedtsr = require('../data/sortedtsr.json')
const cat_acronyms = require('../data/CatAcronyms.json')

interface IMonsterPage {
    monster_key: number;
    monster_data: any;
    getMonsterData: Function;
}


// function MonsterPage({monster_key, monster_data, getMonsterData}: IMonsterPage) {
    function SlimMonsterPage({data}: any) {
        if(!data || !data[0]){
            return (
                <div role='loading' key='loading'>
                Loading...
                </div>
            )
        } 
        // Get monster body data
        // check if exists
        // const monsterBodyData = (data[0].monster_data.hasOwnProperty("fullBody")) ? data[0].monster_data.fullBody : null;

        let previous_monster_key = "";
        let next_monster_key = "";
    
        const monster_keys = Object.keys(KEYS_TITLES);  
        const index = monster_keys.indexOf(data[0].monster_key.toString());
        if(index > 0 && index < monster_keys.length - 1){
            // console.log("first")
            previous_monster_key = monster_keys[index - 1];
            next_monster_key = monster_keys[index + 1];
        } else if(index === 0){
            previous_monster_key = monster_keys[monster_keys.length -1];
            next_monster_key = monster_keys[index + 1];
        } else if(index === monster_keys.length - 1){
            previous_monster_key = monster_keys[index - 1];
            next_monster_key = monster_keys[0];
        } else {
            console.error("Error finding previous and next monster keys")
            previous_monster_key = "";
            next_monster_key = "";
        }

        // Checking Main Image
        //  If the regex pattern matches, know we NEED an image. So set the url to where it should be with monster_key
        //  and also have an onerror="javascript:this.src='images/default.jpg'" to set the image to default if it doesn't exist
        //  If doesn't need image, set the bool flag and no image will be rendered
        let monster_image = null;
        let has_image = true;
        let needs_image = true;
        let image_url = "";
        // if(data[0].monster_data.images[1]) regex contains monster_key
        if(data[0].monster_data.images[1] && data[0].monster_data.images[1].match(new RegExp(data[0].monster_key, "g"))){
            // console.log("Should have image")
            needs_image = true;
        } else {
            // console.log("Does not have image")
            needs_image = false;
        }

        if(needs_image){
            // Set image url
            image_url = "/appendix/img/" + data[0].monster_key + ".gif"
            let image_placeholder = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"

            monster_image = <img    src={image_url} 
            className = "monster-image"
            alt={data[0].monster_data.title} 
            title={data[0].monster_data.title} 
            onError={({currentTarget}) => {
                currentTarget.onerror = null;
                currentTarget.alt = "This monster is missing it's image. It will be found eventually.";
                currentTarget.src = image_placeholder;
                currentTarget.title = "Missing image of " + data[0].monster_data.title;
            }}/>
            

            //     } else {
            //         //placeholder image
            //         monster_image = <img src="https://via.placeholder.com/300x360" alt="Placeholder image. Image not yet in database" className="monster-image" />
            //     }
            // });
        } 
        
        // Change document title to monster title
        document.title = data[0].monster_data.title + " - Complete Compendium";
        
        // if(data[0].monster_data.hasOwnProperty("image")){
        //     image = data[0].monster_data.images[1];
        // } else {
        //     image = "https://via.placeholder.com/300x360";
        // }
        
        // console.log("data: ", data[0].monster_data)
        // console.log("Monster setting origin: ", data[0].monster_data.setting, cat_acronyms[data[0].monster_data.setting])

        return (
            <div className="monster-page">
                {/* Sourcebook Image */}
                {/* NAV */}
                <div className="nav">
                    <div className="monster-nav-links">
                        <div className="monster-nav">
                            <Link className="monster-nav-link" to={"/appendix/" + previous_monster_key}>Previous</Link>
                        </div>
                        {/* Random Monster */}
                        <div className="monster-nav">
                            <RandomMonsterButton />
                        </div>
                        <div className="monster-nav">
                            <Link className="monster-nav-link" to={"/appendix/" + next_monster_key}>Next</Link>
                        </div>
                    </div>
                </div>
                {/* TITLE */}
                <div className="top-header">
                    <h1>{data[0].monster_data.title}</h1>
                    <a href={"/catalog/" + cat_acronyms[data[0].monster_data.setting]} className="sourcebook-link">
                        <img className="setting-image" src={`/img_settings/${cat_acronyms[data[0].monster_data.setting]}.gif`}  alt={data[0].monster_data.setting + "Campaign Setting Logo"} title={data[0].monster_data.setting}/>
                    </a>
                </div>
                
                <hr className ="hr1"/>
                <hr className ="hr2"/>
    
                <div className="monster-img-frame">
                {monster_image}
                </div>
                
                {/* Render with Interweave */}
                <Interweave className="interweave" content={data[0].monster_data.fullBody} />
                
                {/* TSR Array */}
                <div className="source-list">
                    <div className="tsr-label">
                        Sourcebooks:
                    </div>
                    <div className="tsr">
                        {
                            (data[0].monster_data.hasOwnProperty("TSR") && data[0].monster_data["TSR"] != null) ?
                                data[0].monster_data["TSR"].map((tsr: string) => {
                                    return (
                                        <div key={tsr}>
                                            <a href={"/catalog/" + cat_acronyms[data[0].monster_data.setting] + "/" + tsr}>{sortedtsr[tsr]} ({tsr})</a>
                                            <br/>
                                        </div>
                                    )
                                }
                            )
                            : "No TSR"
                        }
                    </div>
                </div>
    
                {/* LAST MODIFIED */}
                <div className="last-modified">
                    Last Modified: {data[0].updatedAt}
                </div>
                {/* TSR LOGO */}
                <img className="tsr-footer" src="/img_settings/tsr_sm.png" />
                
                
                {/* NAV BAR */}
                <div className="nav">
                    <div className="monster-nav-links">
                        <div className="monster-nav">
                            <Link className="monster-nav-link" to={"/appendix/" + previous_monster_key}>Previous</Link>
                        </div>
                        <div className="monster-nav">
                            <RandomMonsterButton />
                        </div>
                        <div className="monster-nav">
                            <Link className="monster-nav-link" to={"/appendix/" + next_monster_key}>Next</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

const getMonsterData = async (monster_key: any) => {
    const apiurl = "http://127.0.0.1:8080" + "/api/appendix/" + monster_key;
  
    return fetch(apiurl, {
      method: 'GET',
      headers: {
      }
    });  
}

// React component for MonsterPageLoader
const MonsterPageLoader = () => {
    const {monster_key } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // debugger;
    useEffect(() => {

        // getMonsterData(monster_key)
        DataService.getMonster(monster_key)
        .then(response => {
            setData(response);
            setLoading(false);
        }).catch(error => {
            setError(error);
            setLoading(false);
        }
        );
    } , [monster_key]);
    if (loading) {
        return <div className="loading">Loading....</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <Layout>
            {/* <MonsterPage data={data}/> */}
            <SlimMonsterPage data={data}/>
        </Layout>
    )
    ;
}

interface MockMonsterPageLoaderProps {
    monster_key: string;
    get?: any;
}


function MockMonsterPageLoader(props: MockMonsterPageLoaderProps) {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getMonsterData(props.monster_key)
            .then(response => response.json())
            .then(json => {
                setData(json);
                setLoading(false);
            }).catch(error => {
                setError(error);
                setLoading(false);
            }
            );
    }, [props.monster_key]);
    if (loading) {
        return <div role='loading'>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
            <div role='loaded'>
                <SlimMonsterPage data={data} role="monster-page" />
            </div>
    );
}


// class MonsterPageLoader extends React.Component {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             data: null,
//             loading: true,
//             error: null
//         }
//     }
//     componentDidMount() {
//         getMonsterData(this.props.monster_key)
//         .then(response => response.json())
//         .then(json => {
//             this.setState({
//                 data: json,
//                 loading: false
//             });
//         }).catch(error => {
//             this.setState({
//                 error: error,
//                 loading: false
//             });
//         }
//         );
//     }
//     render() {
//         if (this.state.loading) {
//             return <div>Loading....</div>;
//         }
//         if (this.state.error) {
//             return <div>Error: {this.state.error}</div>;
//         }
//         return <MonsterPage data={this.state.data}/>;
//     }
// }


// const MonsterPageLoader = (monster_key: any) => {
//     const [data, setData] = React.useState([])
//     console.log("MonsterPageLoader monster_key: " + monster_key)
//     useEffect(() => {
//       axios
//         .get("http://127.0.0.1:8080" + "/api/appendix/" + monster_key)
//         .then((res) => {
//           setData(res.data)
//         })
//     },
//     [monster_key]
//     )
  
//     return (
//     //   (!data) ? <>Loading...</> : <MonsterPage data={data} />
//       <MonsterPage data={data} />
//     )
//   }

export {MonsterPageLoader, MockMonsterPageLoader};