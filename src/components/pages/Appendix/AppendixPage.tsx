import React from 'react'
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
// import { SettingPage } from './SettingPage';
// import { CategoriesList } from './CategoriesList';
// import { Router, Switch, Route } from 'react-router';
import BreadCrumb from '../../BreadCrumb/BreadCrumbFrame';
// import CATEGORIES from '../../Categories.json'
import KEYS_TITLES from '../../../data/AA_KEYS_TITLES.json'

// import './css/Catalog.css'
import Layout from '../../Layout';


// import AppendixPage.css
import './AppendixPage.css';

//for each monster_key in the KEYS_TITLES, display a link to the monster page
const MonsterLinks = () => {

    let myMap = new Map(Object.entries(KEYS_TITLES));
    console.log(myMap)


    const monster_title = "Aarakath";


    const monster_keys = Object.keys(KEYS_TITLES)
    const monster_links = monster_keys.map(monster_key => {
        return (
                <MonsterLink monster_key={monster_key} title={myMap.get(monster_key) ? myMap.get(monster_key)! : ""} />
        )
    }
    )
    return (
        <>
        <div className="monster-links">
            {monster_links}
        </div>
        </>
    )
}

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};


interface MonsterLinkProps {
    monster_key: string;
    title: string;
  }

// monster link. Link to each monster_key
const MonsterLink = ( {monster_key, title }: MonsterLinkProps) => {
    return (
        <a className="monster-link" href={`/appendix/${monster_key}`}>{title}</a>
    )
}

export function Appendix() {
    // Set up the page variables
    // const itemCount = KEYS_TITLES.length;

    


    return (
        // upper page with category links
        <>
        <Layout>
            
        <div className='background-appendix'>

        {/* <CategoriesList/> */}
        {/* <a href="/appendix/aarakocr">Aarakocra</a> */}

        <div className="AppendixDescription">Browse monster source books by setting or browse all at once.</div>

        <MonsterLinks />


        </div>
        </Layout>
        </>

        // lower page with all book list
    );
}
export default Appendix;