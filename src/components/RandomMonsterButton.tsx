// Random monster button.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './RandomMonsterButton.css';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

const RandomMonsterButton = () => {
    const [monster_key, setMonsterKey] = useState('');
    // const [monster_title, setMonsterTitle] = useState('');

    const getRandomMonster = () => {
        // if DataService.monsterTitles is undefined
        if(global.monster_keys !== undefined){

            const random_key = global.monster_keys[getRandomInt(monster_keys.length)];
            setMonsterKey(random_key);
            // setMonsterTitle(global.monster_titles.get(random_key));
        }
    }

    useEffect(() => {
        getRandomMonster();
    }, []);

    return (
        <div className="RandomMonsterButton">
            <Link to={"/appendix/" + monster_key}>
                <div className="random-button" onClick={getRandomMonster}>Random Monster</div>
            </Link>
        </div>
    );
}

export default RandomMonsterButton;