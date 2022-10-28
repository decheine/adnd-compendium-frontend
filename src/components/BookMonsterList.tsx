import React, {useEffect} from 'react'
import axios from 'axios'

import MonsterLink from './MonsterLink'

// import GLOBALS
// import {KEYS_TITLES} from '../globals'

import { GLOBALS } from '../data/GLOBALS';

import './BookMonsterList.css'

function BookMonsterList({data}: any) {
    if(!data || data[0] === undefined){
        // console.log("data == null")
        return (
            <>
            Loading..
            </>
        )
    } else {
        console.log("BookMonsterList data")
        console.log(data[0])
        
        // console.log(data[0].monster_data.title)
        return (
            <div className="wrapper">
            <div className="BookMonsterList">
            {
                    data[0]["monster_keys"].sort(function(a: string, b:string){
                        var nameA = a.toLowerCase(), nameB = b.toLowerCase();
                        if (nameA < nameB) //sort string ascending
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0; //default return value (no sorting)
                       })
                    .map((monster_key: string) => 
                        <MonsterLink monster_key={monster_key} monster_title={global.book_titles.get(monster_key)} />
                        // <li>{global.monster_titles.get(monster_key)}</li>
                    
                    )


                
            }
            {/* <div className="box">
                <div>One</div>
                <div>Two</div>
                <div>Three</div>
                <div>Four</div>
                <div>Five</div>
                <div>Six</div>
                <div>Seven</div>
                <div>Eight</div>
                <div>Nine</div>
                <div>Ten</div>
            </div> */}
            </div>
            </div>
        )
    }
    
}

// function ListViewRenderPropGeneric<T extends AbstractItem>(
//     props: PropsType<T>
//   ) {
//     return (
//       <ul>
//         {props.items.map((item) => {
//           return <li key={item.key}>{props.renderer(item)}</li>;
//         })}
//       </ul>
//     );
//   }


const BookMonsterListLoader = (props: any) => {
    const [data, setData] = React.useState([])
    console.log("publish_id source: " + props.publish_id)
    useEffect(() => {
      axios
        .get(GLOBALS.API_ENDPOINT + "/api/catalog/" + props.publish_id)
        .then((res) => {
          setData(res.data)
        })
    },
    [props.monster_key]
    )
  
    return (
      (!data) ? <>Loading...</> : <BookMonsterList data={data} />
    //   <MonsterPage data={data} />
    )
  }

export default BookMonsterListLoader