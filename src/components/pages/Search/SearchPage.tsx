// react page


// import the Search component
import Layout from '../../Layout';
import SearchComponent from './Search';

import './SearchPage.css'

export function SearchPage() {
    return (
        <Layout>
            <div className="search-page">
                <div className="search-banner">
                    <h1>Search for Monsters</h1>
                    <SearchComponent />
                </div>
            </div>
        </Layout>
    );
};
