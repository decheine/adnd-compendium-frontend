

// import './css/Catalog.css'
import Layout from '../../Layout';


// import AppendixPage.css
import './AppendixPage.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type MonsterLinksProps = {
    monster_keys: Map<string, string>,
}
//for each monster_key in the KEYS_TITLES, display a link to the monster page
const MonsterLinks = (props: MonsterLinksProps) => {

    // let arr = Array.from(props.monster_keys.keys())
    // console.log(arr)
    console.log(props.monster_keys)
    const monster_keys = Array.from(props.monster_keys.keys()).sort((a, b) => a.localeCompare(b))
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
    const [titles, setTitles] = useState(new Map<string, string>())
    
    useEffect(() => {
        global.data_provider.fetchMonsterTitles().then((data): any => {
            setTitles(global.data_provider.getLocalTitles())
        })
    }, [])

    

    return (
        // upper page with category links
        <>
        <Layout>
            
        <div className='background-appendix'>

        {/* <CategoriesList/> */}
        <div className="AppendixDescription">Browse monster source books by setting or browse all at once.</div>

        {
            titles && titles.size > 0
            ? <MonsterLinks monster_keys={global.data_provider.getLocalTitles()}/>
            : <div role='loading' key='loading'>
            Loading...
            </div>
        }
        


        </div>
        </Layout>
        </>

        // lower page with all book list
    );
}
export default Appendix;