import React from 'react'

// import { SettingPage } from './SettingPage';
import { CategoriesList } from './CategoriesList';
// import { Router, Switch, Route } from 'react-router';
import BreadCrumb from '../../BreadCrumb/BreadCrumbFrame';
// import CATEGORIES from '../../Categories.json'

import './css/Catalog.css'
import Layout from '../../Layout';
import { AllBooksList } from './AllBooksList';

export function Catalog() {
    document.title = "Catalog - Complete Compendium"
    return (
        // upper page with category links
      <>
      <Layout>
        <div className='background-catalog'>
          <div className="CatalogDescription">
              Browse monster books by setting or browse all at once.
          </div>
          <CategoriesList/>
          {/* All Books */}
          <AllBooksList/>
        </div>
      </Layout>
      </>
      // lower page with all book list
    );
}
export default Catalog;