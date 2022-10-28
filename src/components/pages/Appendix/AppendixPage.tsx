import React from 'react'
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import BreadCrumb from '../../BreadCrumb/BreadCrumbFrame';
import KEYS_TITLES from '../../../data/AA_KEYS_TITLES.json'

// import './css/Catalog.css'
import Layout from '../../Layout';


// import AppendixPage.css
import './AppendixPage.css';
import { Link } from 'react-router-dom';

type MonsterLinksProps = {
    monster_keys: Map<string, string>,
}
//for each monster_key in the KEYS_TITLES, display a link to the monster page
const MonsterLinks = (props: MonsterLinksProps) => {

    // let arr = Array.from(props.monster_keys.keys())
    // console.log(arr)
    const monster_keys = Array.from(props.monster_keys.keys())
    const monster_links = monster_keys.map(monster_key => {
        return (
                <MonsterLink key={monster_key} monster_key={monster_key} title={props.monster_keys.get(monster_key) ? props.monster_keys.get(monster_key)! : ""} />
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
        <Link className="monster-link" to={`/appendix/${monster_key}`}>{title}</Link>
    )
}

export function Appendix() {
    // Set up the page variables
    // const itemCount = KEYS_TITLES.length;
    document.title = "Appendix - Complete Compendium"
    return (
        // upper page with category links
        <>
        <Layout>
            
        <div className='background-appendix'>

        {/* <CategoriesList/> */}
        <div className="AppendixDescription">Browse monster source books by setting or browse all at once.</div>

        <MonsterLinks monster_keys={global.monster_titles}/>


        </div>
        </Layout>
        </>

        // lower page with all book list
    );
}
export default Appendix;