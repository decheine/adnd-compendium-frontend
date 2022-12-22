import {useEffect, useState} from 'react'
import { Interweave } from 'interweave';

import "./MonsterPage.css"
import { Link, useParams } from 'react-router-dom';
import Layout from './Layout';
import RandomMonsterButton from './RandomMonsterButton';
// import DataService
import { DataService } from '../services/DataService'


const sortedtsr = require('../data/sortedtsr.json')
const cat_acronyms = require('../data/CatAcronyms.json')

// interface IMonsterPage {
//     monster_key: number;
//     monster_data: any;
//     getMonsterData: Function;
// }

// function to fix the links within monster pages
// Adds a hash to the href's of the pattern that appears
// in the input string

function HashMonsterData(data: string){
    const reg = RegExp('href="/', 'g');
    const monster_data_hashed = data.replace(reg, 'href="/#/');
    return monster_data_hashed;
}


// function MonsterPage({monster_key, monster_data, getMonsterData}: IMonsterPage) {
function SlimMonsterPage({data}: any) {
    const [titles, setTitles] = useState(new Map<string, string>())
    
    useEffect(() => {
        global.data_provider.fetchMonsterTitles().then((data): any => {
            setTitles(global.data_provider.getLocalTitles())
        })
    }, [])

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
    // TODO: This stuff does not need to be in here I don't think.
    const monster_keys = Array.from(titles.keys()) ;  
    // console.log("monster_keys", monster_keys)
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

    } 
    
    // Change document title to monster title
    document.title = data[0].monster_data.title + " - Complete Compendium";

    console.log("Type of data[0].monster_data.fullBody", 
    typeof(data[0].monster_data.fullBody)
    )

    const fullBody = data[0].monster_data.fullBody;
    const fullBodyHashed = HashMonsterData(fullBody);
    
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
                <Link to={"/catalog/" + cat_acronyms[data[0].monster_data.setting]} className="sourcebook-link">
                    <img className="setting-image" src={`/img_settings/${cat_acronyms[data[0].monster_data.setting]}.gif`}  alt={data[0].monster_data.setting + "Campaign Setting Logo"} title={data[0].monster_data.setting}/>
                </Link>
            </div>
            
            <hr className ="hr1"/>
            <hr className ="hr2"/>

            <div className="monster-img-frame">
            {monster_image}
            </div>
            
            {/* Render with Interweave */}
            <Interweave className="interweave" content={fullBodyHashed} />
            
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
                                        <Link to={"/catalog/" + cat_acronyms[data[0].monster_data.setting] + "/" + tsr}>{sortedtsr[tsr]} ({tsr})</Link>
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
            <img className="tsr-footer" src="/img_settings/tsr_sm.png" alt="TSR Logo" />
            
            
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
    const apiurl = "http://127.0.0.1:8080/api/appendix/" + monster_key;
  
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




export {MonsterPageLoader, MockMonsterPageLoader};