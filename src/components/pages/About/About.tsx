import Layout from "../../Layout";
import { Interweave } from 'interweave';

// import fs from "fs";
// var fs = require('fs');

// const vampireRawHTML: String = require('./rawhtml.html');
const fileName: string = 'rawhtml.html';
// let fileContent = fs.readFileSync(fileName, 'utf8');




export function About() {
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
        
        </Layout>
        </>

        // lower page with all book list
    );
}