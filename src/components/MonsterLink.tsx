// import MonsterLink.css

// define type for MonsterLink props
interface MonsterLinkProps {
    monster_key: string;
    monster_title: string;
}

type MonsterLinkKeyProps = {
    monster_key: string;
}


const MonsterLink = (props: MonsterLinkProps | MonsterLinkKeyProps) => {
    // console.log("title: " + global.monster_titles.get('aarakath'));
    // console.log("global.monster_titles.size: " + global.monster_titles.size);
    return (
        <div className="Button">
        </div>
    )
}

export default MonsterLink;