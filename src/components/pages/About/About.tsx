import React from 'react';

import Layout from "../../Layout";
import { Interweave } from 'interweave';
import { AppService } from '../../../services/app.service';

export function About() {
    document.title = "Complete Compendium - About"
    return (
        // upper page with category links
        <>
            <Layout>
                
                <div className='background-catalog'>
                    Some text for the About page. 
                </div>

                <div className="testing-header">
                    <h1>About</h1>
                This page currently used for testing.
                

                </div>
                
                <div>
                    Testing Interweave

                    <Interweave content="This string contains <b>HTML</b> and will safely be rendered!" />;
                </div>
                <hr/>
                <h2>Function Testing</h2>

                <div>
                    <button onClick={() => AppService.getMonster("aarakath")}>
                      Get Monster  
                    </button>
                </div>

            </Layout>
        </>

        // lower page with all book list
    );
}