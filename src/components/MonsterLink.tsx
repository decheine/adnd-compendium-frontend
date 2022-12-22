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
    return (
        <div className="Button">
        </div>
    )
}

export default MonsterLink;