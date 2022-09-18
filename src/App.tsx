
// import useLocalStorage from 'use-local-storage'
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, matchRoutes, useLocation } from 'react-router-dom';

// import "bootstrap/dist/css/bootstrap.min.css";

import { AppService } from './services/app.service';
import { DataService } from './services/DataService';

import Navbar from './components/Navbar/Navbar';
import {Home, Catalog} from './components/pages';

import {MonsterPageLoader } from './components/MonsterPage';
// import {MonsterPage} from "./components/MonsterPage";
import BookMonsterListLoader from "./components/BookMonsterList";
import MonsterLink from './components/MonsterLink';
import SettingPage from "./components/pages/Catalog/SettingPage";
import BookPage from "./components/pages/Catalog/BookPage";
import { About } from "./components/pages/About/About";

import './App.css';
import BreadCrumb from "./components/BreadCrumb/BreadCrumbFrame";
import Appendix from "./components/pages/Appendix/AppendixPage";



const routes = [
  {path: "/Catalog/:category", element: <SettingPage/>}
];


const useCurrentPath = () => {
  const location = useLocation()
  const [{ route }] = matchRoutes(routes, location)!

  return route.path
}

function App() {
  const appService = new AppService();

  // Dark Mode eventually
  // const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');


  return (
    <>
    {/* <MonsterLink monster_key="aarakath" />
    <MonsterLink monster_key="aarakocr" /> */}
    
    {/* <MonsterPageLoader monster_key="aarakath"/> */}
    <Router>
      <Navbar/>
      {/* <BreadCrumb title="Home"/> */}
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
      </Routes>
    </Router>
    </>
  );
}

export default App;