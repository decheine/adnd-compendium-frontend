// import MonsterLink.css

// define type for MonsterLink props
interface MonsterLinkProps {
    monster_key: string;
    monster_title: string;
}

const MonsterLink = (props: MonsterLinkProps) => {
    // console.log("title: " + global.monster_titles.get('aarakath'));
    // console.log("global.monster_titles.size: " + global.monster_titles.size);
    return (
        <div className="Button">
            <a href={"/appendix/" + props.monster_key}>
                {/* {global.monster_titles.get(props.monster_key)}    */}
                {props.monster_title}   
            </a>
        </div>
    )
}

export default MonsterLink;