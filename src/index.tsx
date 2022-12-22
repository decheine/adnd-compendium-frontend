import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataService, DataProvider } from './services/DataService';

import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type SettingType = {
  setting_key: string,
  setting_name: string,
  source_books: Array<string>
}

declare global {
  var data_provider: DataProvider;
  var monster_titles: Map<string, string>;
  var book_titles: Map<string, string>;
  var monster_keys: Array<string>;
  var catalog: Array<Object>
  var settings: Array<SettingType>
  var setting_titles: Array<string>;
  var categories_books: Map<string, Array<string>>;
  // var categories_books: Object;

}

global.data_provider = new DataProvider();

// const dataService = new DataService();

// Instead of fetching the data during preLaunch, just set up the global structures that will
// hold the data. Only should fetch data when it absolutely needs to.
// what if api is down? user would probably refresh
async function preLaunchOperation(){
  // if(!global.monster_titles){
  //   console.log("Loading monster titles");
  //   await DataService.getMonsterTitles().then((data): any => {
  //     console.log("global.monster_titles", data);
  //     global.monster_titles = new Map<string, string>(Object.entries(data))
  //   });
  // }

  if(!global.book_titles){
    await DataService.getBookTitles().then((data): any => {
      global.book_titles = new Map<string, string>(Object.entries(data))
    });
  }
  
  if(global.monster_keys === undefined){
    global.monster_keys = new Array<string>();
    await DataService.getMonsterKeys().then((data): any => {
      // console.log(data);
      global.monster_keys = data["monster_keys"];
    });
    console.log("global.monster_keys: ", global.monster_keys);
  }

  if(global.settings === undefined){
    global.settings = new Array<SettingType>();
    await DataService.getSettings().then((data): any => {
      global.settings = data;
      console.log("global.settings",data )
    });
  }

  if(global.setting_titles === undefined){
    global.setting_titles = new Array<string>();
    for(let i = 0; i < global.settings.length; i++){
      global.setting_titles.push(global.settings[i].setting_name);
    }
    console.log("global.setting_titles", global.setting_titles)
  }

  if(global.catalog === undefined){
    global.catalog = new Array<Object>();
    await DataService.getCatalog().then((data): any => {
      global.catalog = data;
      console.log("global.catalog",data )
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
  // const hp_url = "https://completecompendium.com/";
  const hp_url = "/";

  console.log("preLaunchOperation complete");
  console.log("public_url", hp_url);
  root.render(
    // <React.StrictMode>
      <HashRouter basename={hp_url}>
      {/* <BrowserRouter basename={process.env.PUBLIC_URL}> */}
        <App />
      {/* </BrowserRouter> */}
      </HashRouter>
    // </React.StrictMode>
  );
 });
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
