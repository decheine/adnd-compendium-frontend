import React, {useEffect, useState} from 'react'
import "./MonsterPage.css"
import { Link, useParams } from 'react-router-dom';
import { Interweave } from 'interweave';


const KEYS_TITLES = require('../data/AA_KEYS_TITLES.json')
const sortedtsr = require('../data/sortedtsr.json')
const cat_acronyms = require('../data/CatAcronyms.json')

interface IMonsterPage {
    monster_key: number;
    monster_data: any;
    getMonsterData: Function;
}

type StatblockProps = {
    statblock_json: object
}


function PsionicsTable({json_data}: any) {

    return (
        <>
        <p className="psionics-summary">Psionics Summary</p>
        <table className="psionics-table">
        <tbody>
            <tr className="psionic-header"><th>Level</th><th>Dis/Sci/Dev</th><th>Attack/Defense</th><th>Score</th><th>PSPs</th></tr>
            <tr className="psionic-table-data"><td>{json_data.table.Level}</td><td>{json_data.table.DisSciDev}</td><td>{json_data.table.AttackDefense}</td><td>{json_data.table.Score}</td><td>{json_data.table.PSPs}</td></tr>
        </tbody>
        </table>
        </>
    );
}


function Statblock({statblock_json}: StatblockProps) {
    // Iterate over the keys in statblock_json
    // and create a table column for each key
    // with the value of the key in the statblock_json
    // as the value of the column
    const statblock_keys = Object.keys(statblock_json);
    const statblock_values = Object.values(statblock_json);
    const row_labels = Object.keys(statblock_values[0])
    
    // console.log("statblock_keys: ", statblock_keys, statblock_keys.length)
    // console.log("statblock_values: ", statblock_values)
    // console.log("row_labels: ", row_labels)

    // Do row labels manually

    // A row
    // <tr> <th>Climate/Terrain:</th>    <td>aaa</td>    </tr>


    // First row
    // <tr class="bk"><th> </th><th class="cn">Astral</th><th class="cn">Monadic</th><th class="cn">Movanic</th></tr>
    
/*
<table className="statblock" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr><th>Climate/Terrain:</th><td>aaa</td></tr>
                    <tr><th>Frequency:</th><td>Very rare</td></tr>
                    <tr><th>Organization:</th><td>Tribal</td></tr>
                    <tr><th>Activity Cycle:</th><td>Day</td></tr>
                    <tr><th>Diet:</th><td>Carnivore</td></tr>
                    <tr><th>Intelligence:</th><td>Average (8-10)</td></tr>
                    <tr><th>Treasure:</th><td>D</td></tr>
                    <tr><th>Alignment:</th><td>Neutral good</td></tr>
                    <tr><th>No. Appearing:</th><td>1-10</td></tr>
                    <tr><th>Armor Class:</th><td>7</td></tr>
                    <tr><th>Movement:</th><td>6, Fl 36 (C)</td></tr>
                    <tr><th>Hit Dice:</th><td>1+2</td></tr>
                    <tr><th>THAC0:</th><td>19</td></tr>
                    <tr><th>No. of Attacks:</th><td>2</td></tr>
                    <tr><th>Damage/Attack:</th><td>1-3/1-3 or 2-8 (weapon)</td></tr>
                    <tr><th>Special Attacks:</th><td>Dive +4</td></tr>
                    <tr><th>Special Defenses:</th><td>Nil</td></tr>
                    <tr><th>Magic Resistance:</th><td>Nil</td></tr>
                    <tr><th>Size:</th><td>M (20' wing span)</td></tr>
                    <tr><th>Morale:</th><td>Steady (11)</td></tr>
                    <tr><th>XP Value:</th><td>65</td></tr>
                </tbody>
            </table>
*/


    return (
        <>
        <table className="statblock" cellSpacing="0" cellPadding="0">
            
            
            
        <tbody>
            {
                // if statblock_keys.length > 1
                statblock_keys.length > 1 ?
                <>
                    <tr className="bk"></tr><th> </th>
                    {
                        statblock_keys.map((statblock_name: string) => {
                            return (
                                <th  className="cn">{statblock_name}</th>
                            )
                        }
                        )
                    }
                </>
                : null
            }


            <MakeRow statblock_json={statblock_json} row_label='Climate/Terrain'/>
            <MakeRow statblock_json={statblock_json} row_label='Frequency'/>
            <MakeRow statblock_json={statblock_json} row_label='Organization'/>
            <MakeRow statblock_json={statblock_json} row_label='Activity Cycle'/>
            <MakeRow statblock_json={statblock_json} row_label='Diet'/>
            <MakeRow statblock_json={statblock_json} row_label='Intelligence'/>
            <MakeRow statblock_json={statblock_json} row_label='Treasure'/>
            <MakeRow statblock_json={statblock_json} row_label='Alignment'/>
            <MakeRow statblock_json={statblock_json} row_label='No. Appearing'/>
            <MakeRow statblock_json={statblock_json} row_label='Armor Class'/>
            <MakeRow statblock_json={statblock_json} row_label='Movement'/>
            <MakeRow statblock_json={statblock_json} row_label='Hit Dice'/>
            <MakeRow statblock_json={statblock_json} row_label='THAC0'/>
            <MakeRow statblock_json={statblock_json} row_label='No. of Attacks'/>
            <MakeRow statblock_json={statblock_json} row_label='Damage/Attack'/>
            <MakeRow statblock_json={statblock_json} row_label='Special Attacks'/>
            <MakeRow statblock_json={statblock_json} row_label='Special Defenses'/>
            <MakeRow statblock_json={statblock_json} row_label='Magic Resistance'/>
            <MakeRow statblock_json={statblock_json} row_label='Size'/>
            <MakeRow statblock_json={statblock_json} row_label='Morale'/>
            <MakeRow statblock_json={statblock_json} row_label='XP Value'/>
            {/* <tr className="statblock-table-data"><td>{statblock_json.Stat}</td><td>{statblock_json.Value}</td></tr> */}
        </tbody>
        </table>
        </>
    );

    }


function MakeRow(statblock_json: any, row_label: string) {
    const values_array = Object.values(statblock_json)[0] as any[];
    const statblock_keys = Object.values(values_array);
    // const statblock_values = Object.values(statblock_json);
    // const row_labels = Object.keys(statblock_values[0])
    // console.log("statblock_keys: ", Object.keys(values_array))
    // console.log("row_label: ", row_label)
    // console.log("values_array: ", values_array)
    
    return (
        <>
            <tr><th>{statblock_json.row_label}</th>
                {statblock_keys.map((statblock_name: string) => {
                    // console.log("statblock_name: ", statblock_name)
                    // console.log("row_label: ", statblock_json.row_label)
                    // console.log("result: ", statblock_name[statblock_json.row_label])
                    return (
                        <td key={statblock_name[statblock_json.row_label]}>{statblock_name[statblock_json.row_label]}</td>
                        // <th className="cn">{statblock_name}</th>
                    )
                    }
                )}
            </tr>
        </>
    )
}

type MockMonsterPageProps = {
    monster_key: string;
    monster_title: string;
    monster_data: Object;
}

function MockSlimMonsterPage({data}: any) {
    if(!data || !data[0]){
        return (
            <div role='loading'>
            Loading...
            </div>
        )
    } 

    // Get monster body data
    
    // check if exists
    const monsterBodyData = (data[0].monster_data.hasOwnProperty("fullBody")) ? data[0].monster_data.fullBody : null;


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

    // console.log("data: ", data[0].monster_data)

    // console.log("Monster setting origin: ", data[0].monster_data.setting, cat_acronyms[data[0].monster_data.setting])

    if(cat_acronyms.hasOwnProperty(data[0].monster_data.setting)){
        let setting_image_path = "/images/grf/" + cat_acronyms[data[0].monster_data.setting] + ".gif";
    }
    else {
        let setting_image_path = "/images/grf/xx.gif";
        // console.error("Error finding category acronym" + data[0].monster_data.category)
    }
    // const setting_image_path = "/img_settings/" + cat_acronyms[data[0].monster_data.setting] + ".gif";

    return (
        <div className="monster-page">
            {/* Sourcebook Image */}
            {/* NAV */}
            <div className="nav">
                <div className="monster-nav-links">
                    <div className="monster-nav">
                        <Link className="monster-nav-link" to={"/appendix/" + previous_monster_key}>Previous</Link>
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
            <img    src={"/appendix/img/" + data[0].monster_key + ".gif"} 
                    className = "monster-image"
                    alt={data[0].monster_data.title} 
                    title={data[0].monster_data.title} 
            />
            </div>
            
            {/* BODY */}
            
            {/* Render with Interweave */}
            <Interweave className= "interweave" content={data[0].monster_data.fullBody} />
            
            
            {/* PSIONICS */}
            
            {/* <hr className="hr3"/> */}

            {/* Testing Body Blocks */}
            {/* <div className="body-blocks-wrapper">
                <MonsterBodyBlocks bodyBlocks={data[0].monster_data.bodyBlocks}/>
            </div> */}

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
                                    <>
                                        <a key={tsr} href={"/catalog/" + cat_acronyms[data[0].monster_data.setting] + "/" + tsr}>{sortedtsr[tsr]} ({tsr})</a>
                                        <br/>
                                    </>
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
                        <Link className="monster-nav-link" to={"/appendix/" + next_monster_key}>Next</Link>
                    </div>
                </div>
            </div>

            

        </div>
    )
}

function MockMonsterPage({data}: any) {
    if(!data[0]){
        return (
            <div role='loading'>
            Loading...
            </div>
        )
    } else {
    }

    // Check if general information
    let general = false;
    if(data[0].monster_data.hasOwnProperty('general')){ 
        general = true;
    }

    // Get and Parse monster body data
    for(var i in data[0].monster_data.body){
        var key = i;
        var val = data[0].monster_data.body;

        // console.log("key " + key);

    }
    // console.log("title: " + data[0].monster_data.title)
    // console.logdata[0].monster_data)

    let primary_body = "main";
    // Check if "main" exists in body
    if(!data[0].monster_data.body){
        // console.error("No body data found")
    } else if(data[0].monster_data.body["main"]){
        // console.log("main exists")
        primary_body = "main";
    } else {
        // console.log("main does not exist")
        // check if title branch exists
        if(data[0].monster_data.body[data[0].monster_data.title]){
            // console.log("title branch exists", data[0].monster_data.title)
            primary_body = data[0].monster_data.title;
        }  else {
            console.error("title branch does not exist. Shouldn't happen")
        }
    }

    // console.log("has body: ", data[0].monster_data.hasOwnProperty("body"))

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
    // const index = KEYS_TITLES.findIndex((key: any) => key.monster_key === data[0].monster_key);

    // console.log("this index: ", index);
    // console.log("keys: ", monster_keys);
    // console.log(data[0].monster_key)

    // console.log("previous_monster_key: ", previous_monster_key)

    return (
        <div className="monster-page">
            {/* Sourcebook Image */}
            {/* NAV */}
            <div className="nav">
                <div className="monster-nav-links">
                    <div className="monster-nav">
                        <Link className="monster-nav-link" to={"/appendix/" + previous_monster_key}>Previous</Link>
                    </div>
                    <div className="monster-nav">
                        <Link className="monster-nav-link" to={"/appendix/" + next_monster_key}>Next</Link>
                    </div>
                </div>
            </div>
            {/* TITLE */}
            <div className="top-header">
                <h1>{data[0].monster_data.title}</h1>
                <img className="setting-image" src="/img_settings/add2_01.gif"  alt="Advanced Dungeons & Dragons 2nd Edition" title="ADnD"/>

            </div>
            
            <hr className ="hr1"/>
            <hr className ="hr2"/>

             

            <div className="monster-img-frame">
            <img    src={"/appendix/img/" + data[0].monster_key + ".gif"} 
                    className = "monster-image"
                    alt={data[0].monster_data.title} 
                    title={data[0].monster_data.title} 
            />
            </div>

            {/* BODY */}
            {/* Instead of rendering all the pieces, just render the fullBody with Interweave */}
            

            {general ? "" : <Statblock statblock_json={data[0].monster_data.statblock}/>}
            
            
            {/* PSIONICS */}
            {(data[0].monster_data.hasOwnProperty("psionics")) ? 
            <PsionicsTable json_data={data[0].monster_data.psionics}/>
            : "" }
            {/* BODY */}
            {/*     INTRO */}
            <div key={data[0].monster_key} className="monster-body" >
                
                {/* Intro */}
                {/* loop over entries in data[0].monster_data.body */}
                {/* Do Main Block First */}
                {
                    // UNCOMMENT TO FIX
                    (data[0].monster_data.hasOwnProperty('body') ) ?
                        (data[0].monster_data.body[primary_body] != null) ?
                        <>
                            {/* if intro exists */}
                            {(data[0].monster_data.body[primary_body].hasOwnProperty("intro")) ?
                                <>
                                {/* <h4>Intro</h4> */}
                                <p>{data[0].monster_data.body[primary_body]["intro"]}</p>
                                </>
                            : "" }
                            {(data[0].monster_data.body[primary_body].hasOwnProperty("Combat")) ?
                                <>
                                <h4 >Combat</h4>
                                <p  >{data[0].monster_data.body[primary_body]["Combat"]}</p>
                                </>
                            : "" }
                            {(data[0].monster_data.body[primary_body].hasOwnProperty("Habitat/Society")) ?
                                <>
                                <h4 >Habitat/Society</h4>
                                <p >{data[0].monster_data.body[primary_body]["Habitat/Society"]}</p>
                                </>
                            : "" }
                            {(data[0].monster_data.body[primary_body].hasOwnProperty("Ecology")) ?
                                <>
                                <h4 >Ecology</h4>
                                <p>{data[0].monster_data.body[primary_body]["Ecology"]}</p>
                                </>
                            : "" }
                        </>
                        : ""
                    : <div role="no-body">Sorry, this monster's body is not ready.</div>
                }

                {
                (data[0].monster_data.hasOwnProperty('body') ) ?
                    Object.keys(data[0].monster_data.body).map((key: string) => {
                        // console.log("key: ", key);
                        return (
                            <>
                                {/* if key is main, render main */}
                                {(key != primary_body) ?
                                <>
                                <h2>{key}</h2>
                                {/* <p>{data[0].monster_data.body[key]}</p> */}
                                </>
                                : 
                                // <h2>Main</h2>
                                ""
                                }
                                {/* if key is not main, render key */}
                                {
                                    (key != primary_body) ?
                                        // check if body[key] is an object
                                        // {(typeof data[0].monster_data.body[key] !== 'undefined') ? 
                                        // <>test</> : <p>{data[0].monster_data.body[key]}</p>}
                                    
                                        
                                        // if body[key] is an object, render it
                                        (data[0].monster_data.body[key] !== null) ?
                                        


                                        <>  
                                            {/* {console.log("keyp: ", key)} */}
                                            {/* if intro exists */}
                                            {(data[0].monster_data.body[key].hasOwnProperty("intro")) ?
                                                <>
                                                {/* <h4>Intro</h4> */}
                                                <p>{data[0].monster_data.body[key]["intro"]}</p>
                                                </>
                                            : "" }
                                            {(data[0].monster_data.body[key].hasOwnProperty("Combat")) ?
                                                <>
                                                <h4>Combat</h4>
                                                <p>{data[0].monster_data.body[key]["Combat"]}</p>
                                                </>
                                            : "" }
                                            {(data[0].monster_data.body[key].hasOwnProperty("Habitat/Society")) ?
                                                <>
                                                <h4>Habitat/Society</h4>
                                                <p>{data[0].monster_data.body[key]["Habitat/Society"]}</p>
                                                </>
                                            : "" }
                                            {(data[0].monster_data.body[key].hasOwnProperty("Ecology")) ?
                                                <>
                                                <h4>Ecology</h4>
                                                <p>{data[0].monster_data.body[key]["Ecology"]}</p>
                                                </>
                                            : "" }
                                        </>
                                        : <p>{data[0].monster_data.body[key]}</p>
                                    : "" 
                                }
                            </>
                        )
                    }
                   
                )
                : ""}
                {   
                    // (
                    //     (data[0].monster_data.hasOwnProperty("body")) ? 
                    //         (data[0].monster_data.body[data[0].monster_data.title].intro) ?
                    //         <div className="intro">
                    //             <h2>Introduction</h2>
                    //             <p>{data[0].monster_data.body[data[0].monster_data.title].intro}</p>
                    //         </div>
                    //         : "No intro"
                    //     : "no body"
                    // )
                }
            </div>

                <hr className="hr3"/>

                {/* TSR Array */}
            <div className="source-list">
                <div className="tsr-label">
                    Sourcebooks:
                </div>
                <div className="tsr">
                    {
                        (data[0].monster_data.hasOwnProperty("TSR")) ?
                            data[0].monster_data["TSR"].map((tsr: string) => {
                                return (
                                    <>
                                        <a href={"/catalog/all/" + tsr}>{sortedtsr[tsr]} ({tsr})</a>
                                        <br/>
                                    </>
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
                        <Link className="monster-nav-link" to={"/appendix/" + next_monster_key}>Next</Link>
                    </div>
                </div>
            </div>
            {/* "Page" Number with diamonds */}

            {/* </div> */}
        </div>
    )
}

export default MockSlimMonsterPage;