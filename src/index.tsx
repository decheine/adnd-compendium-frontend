import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataService } from './services/DataService';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type SettingType = {
  setting_key: string,
  setting_name: string,
  source_books: Array<string>
}

declare global {
  var monster_titles: Map<string, string>;
  var book_titles: Map<string, string>;
  var monster_keys: Array<string>;
  var catalog: Array<Object>
  var settings: Array<SettingType>
  var setting_titles: Array<string>;
  var categories_books: Map<string, Array<string>>;
  // var categories_books: Object;

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

  if(global.settings === undefined){
    global.settings = new Array<SettingType>();
    await DataService.getSettings().then((data): any => {
      global.settings = data;
      console.log("DataService getSettings,",data )
    });
  }

  if(global.setting_titles === undefined){
    global.setting_titles = new Array<string>();
    for(let i = 0; i < global.settings.length; i++){
      global.setting_titles.push(global.settings[i].setting_name);
    }
  }

  if(global.catalog === undefined){
    global.catalog = new Array<Object>();
    await DataService.getCatalog().then((data): any => {
      global.catalog = data;
      console.log("DataSErvice getCatalog,",data )
    });
  }

  if(global.categories_books === undefined){
    global.categories_books = new Map<string, Array<string>>();
    // if(global.catalog !== undefined){
    //   global.catalog
    // }
    // await DataService.getCategoriesBooks().then((data): any => {
    //   global.categories_books = data;
    //   console.log("DataService getCategoriesBooks,",data )
    // });
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
