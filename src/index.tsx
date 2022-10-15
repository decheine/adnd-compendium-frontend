import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataService } from './services/DataService';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare global {
  var monster_titles: Map<string, string>;
  var book_titles: Map<string, string>;
  var monster_keys: Array<string>;
  var catalog: Array<Object>

}

// const dataService = new DataService();


async function preLaunchOperation(){
  global.monster_titles = new Map<string, string>();
  global.book_titles = new Map<string, string>();
  // console.log("global.monster_titles.size: " + global.monster_titles.size);
  if(global.monster_titles.size == 0){
    // console.log("Loading monster titles");
    await DataService.getMonsterTitles().then((data): any => {
      // console.log("getMonsterTitles", data);
      for(let key in data){
        global.monster_titles.set(key, data[key]);
      }
    });
  } else {
    // console.log("Already loaded monster titles");
  }

  if(global.book_titles.size == 0){
    // console.log("Loading book titles");
    await DataService.getBookTitles().then((data): any => {
      // for loop iterating over item in data
      // console.log(data);
      for (let key in data) {
        // console.log(data[key]);
        globalThis.book_titles.set(key, data[key]);
      }

      // console.log(data);
    });
  }
  
  if(global.monster_keys === undefined){
    global.monster_keys = new Array<string>();
    await DataService.getMonsterKeys().then((data): any => {
      // console.log(data);
      global.monster_keys = data["monster_keys"];
    });
    // console.log("global.monster_keys: ", global.monster_keys);
  }

  if(global.catalog === undefined){
    global.catalog = new Array<Object>();
    await DataService.getCatalog().then((data: Promise<any>): any => {
      // global.catalog = data;
      console.log("DataSErvice getCatalog,",data )
    });
  }

  return;
}



// Prelaunch operations

 preLaunchOperation().then(() => {
  console.log("preLaunchOperation complete");
  console.log("prelaunch global.monster_titles.size: " + global.monster_titles.size);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
 });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
