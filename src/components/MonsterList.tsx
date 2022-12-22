import axios from 'axios';
import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";
import { GLOBALS } from '../data/GLOBALS';


type MonsterListProps = {
    monster_keys: string[];
    url_suffix: string;
}


function MonsterList(props: MonsterListProps) {
  const { monster_keys, url_suffix } = props;
  const [monsterTitles, setTitles] = useState(new Map<string, string>);

    useEffect(() => {
        
        if(global.data_provider.getLocalTitles().size == 0){
            // empty, fetch
            global.data_provider.fetchMonsterTitles().then((data: Map<string, string>) => {
                setTitles(global.data_provider.getLocalTitles());
            })
        } else {
            console.log("setting titles", global.data_provider.getLocalTitles())
            setTitles(global.data_provider.getLocalTitles())
        }
    }, [])
    
  return (
    <div className="list-container">
        <div className="list-flexbox">
            <>
            {monsterTitles && monsterTitles.size > 0 // if the global variable has been made
                ? monster_keys.sort().map((monster_key: string) => {
                    // console.log("monster_key: ", monster_key)
                    return (
                            <Link to={url_suffix + monster_key} className="list-link" key={monster_key}>
                            <div className="list-entry" >
                                {monsterTitles.get(monster_key)}
                            </div>
                            </Link>
                    )
                })
                :  (<div>
                    Loading...
                </div>)
                }
            </>
        </div>
    </div>
);
}

export default MonsterList;