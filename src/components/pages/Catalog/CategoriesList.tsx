import React from "react";

// REFACTOR THIS To instead call API to get the data it needs
// and then build the result.

import { Link } from "react-router-dom"; 
import './css/CategoriesList.css'
// import CatAcronyms from '../../../data/CatAcronyms.json'
const  CATEGORIES = require( '../../../data/Categories.json' )
const ACRONYMS = require('../../../data/CatAcronyms.json')
const WORLDS = require('../../../data/CatWorlds.json')
// import { Router, Switch, Route } from 'react-router';

// import { SettingPage } from "./SettingPage";



export function CategoriesList(){
    console.log("Categories Keys: ", Object.keys(CATEGORIES), "")
    return (
        <>
        
        <div className="CategoryList">
            {Object.keys(CATEGORIES).map(( category: string)=>{
                return (
                    <div className={"setting-frame"} title={category} key={category}>
                        <Link to={`/catalog/${ACRONYMS[category]}`} className="category">
                            <div className="setting-button">
                                <img className="catImg" src={'/images/grf/' +  ACRONYMS[category] + '.gif'} alt={category + 'image'}></img>
                                
                                <div className="setting-subtitle">
                                    <div className="setting-title">{category}</div>
                                    <div className="setting-world">{WORLDS[category]}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
        </>
    )
    
}