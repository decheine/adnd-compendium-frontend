import React from 'react'

// import { SettingPage } from './SettingPage';
import { CategoriesList } from './CategoriesList';
// import { Router, Switch, Route } from 'react-router';
import BreadCrumb from '../../BreadCrumb/BreadCrumbFrame';
// import CATEGORIES from '../../Categories.json'

import './css/Catalog.css'
import Layout from '../../Layout';

export function Catalog() {
    return (
        // upper page with category links
        <>
        <Layout>
            
        <div className='background-catalog'>

        <CategoriesList/>

        <div className="CatalogDescription">Browse monster source books by setting or browse all at once.</div>
        </div>
        </Layout>
        </>

        // lower page with all book list
    );
}
export default Catalog;