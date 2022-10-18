import { Link } from "react-router-dom";

type MonsterListProps = {
    // Needs a list of:
    // - monster keys
    // - monster titles

    monster_keys: string[];
    url_suffix: string;
}

function MonsterList(props: MonsterListProps) {
  const { monster_keys, url_suffix } = props;
  return (
    <div className="list-container">
        <div className="list-flexbox">
            <>
            {
            // Sort by monster_key (sorting by title is hard...)
            monster_keys.sort().map((monster_key: string) => {
                // console.log("monster_key: ", monster_key)
                return (
                    <div className="list-entry" key={monster_key}>
                        <Link to={url_suffix + monster_key} className="list-link">
                            {global.monster_titles.get(monster_key)}
                        </Link>
                    </div>
                )
            }
            )
            }
            {
                // console.log("monster_boxes: ", monster_keys.map((monster_key: string) => {return (global.monster_titles.get(monster_key))}).sort())
            }  
            </>
        </div>
    </div>
);
}

export default MonsterList;