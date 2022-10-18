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
                    <div className="title">
                        <h1>Search for Monsters</h1>
                    </div>
                    <SearchComponent />
                </div>
            </div>
        </Layout>
    );
};
