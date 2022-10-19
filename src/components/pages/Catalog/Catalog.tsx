import React from 'react'

import { CategoriesList } from './CategoriesList';

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
          <h2 className='catalog-title' id='settings'>All Campaign Settings</h2>
          <div className="CatalogDescription">
              Browse monster books by setting or browse all at once.
          </div>
          <CategoriesList/>
          {/* All Books */}
          <h2 className="catalog-title" id='books'>All Books</h2>
          <AllBooksList/>
        </div>
      </Layout>
      </>
      // lower page with all book list
    );
}
export default Catalog;