
// import useLocalStorage from 'use-local-storage'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// Replacing BrowserRouter with HashRouter to allow for hosting on GitHub Pages
// import { HashRouter as Router, Routes, Route, matchRoutes, useLocation, HashRouter } from 'react-router-dom';


// import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navbar/Navbar';
import {Home, Catalog} from './components/pages';

import {MonsterPageLoader } from './components/MonsterPage';
// import {MonsterPage} from "./components/MonsterPage";
// import MonsterLink from './components/MonsterLinks';
import SettingPage from "./components/pages/Catalog/SettingPage";
import BookPage from "./components/pages/Catalog/BookPage";
import { About } from "./components/pages/About/About";

import './App.css';
import Appendix from "./components/pages/Appendix/AppendixPage";
import ScrollToTop from "./components/ScrollToTop";
import { SearchPage } from "./components/pages/Search/SearchPage";


// const routes = [
//   {path: "/Catalog/:category", element: <SettingPage/>}
// ];

// const useCurrentPath = () => {
//   const location = useLocation()
//   const [{ route }] = matchRoutes(routes, location)!

//   return route.path
// }

function App() {

  // Dark Mode eventually
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  // Load the catalog

  return (
    <>
    {/* <MonsterLink monster_key="aarakath" />
    <MonsterLink monster_key="aarakocr" /> */}
    
    {/* <MonsterPageLoader monster_key="aarakath"/> */}
    
      <Navbar/>
      {/* <BreadCrumb title="Home"/> */}
      <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Catalog" element = {<Catalog/>} />
        <Route path="/Catalog/all/:publish_id" element = {<BookPage/>} />
        <Route path="/Catalog/:category" element = {<SettingPage/>} />
        <Route path="/Catalog/:category/:publish_id" element = {<BookPage/>} />
        <Route path="/Catalog/:category/:publish_id/:monster_key" element = {<MonsterPageLoader/>} />
        <Route path="/About" element = {<About/>} />
        {/* Appendix */}
        <Route path="/appendix" element = {<Appendix/>}/>
        <Route path="/appendix/:monster_key" element = {<MonsterPageLoader/>}/>
        {/* Search */}
        <Route path="/search" element = {<SearchPage/>} />
        <Route path="/search/:monster_key" element = {<MonsterPageLoader/>} />

      </Routes>
      </ScrollToTop>
    
    </>
  );
}

export default App;