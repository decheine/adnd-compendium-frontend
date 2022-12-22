import axios from 'axios';
import React, { useState } from 'react';

// IMPORT GLOBALS FROM GLOBALS
import { GLOBALS } from '../data/GLOBALS';

type SettingType = {
    setting_key: string,
    setting_name: string,
    source_books: Array<string>
  }

/**
 * Data list
 * monster_titles: Map<string, string>;
 * book_titles: Map<string, string>;
 * monster_keys: Array<string>;
 * catalog: Array<Object>
 * settings: Array<SettingType>
 * setting_titles: Array<string>;
 * categories_books: Map<string, Array<string>>;
 */

class DataProvider {
    
    // monsterTitles: Map<string, string> | undefined;

    // const [monster_titles, setMonsterTitles] = React.useState(new Map<string, string>());
    monster_titles!: Map<string, string>
    book_titles: Map<string, string> | undefined
    monster_keys: Array<string> | undefined
    catalog: Array<Object> | undefined
    settings: Array<SettingType> | undefined
    setting_titles: Array<string> | undefined
    categories_books: Map<string, Array<string>> | undefined

    constructor(){
        this.monster_titles = new Map<string, string>;
        this.book_titles = new Map<string, string>;
        this.monster_keys = new Array<string>;
        this.catalog = new Array<Object>
        this.settings = new Array<SettingType>
        this.setting_titles = new Array<string>;
        this.categories_books = new Map<string, Array<string>>;
    }

    // get monster titles from json file fetched from /api/appendix/all/titles
    async fetchMonsterTitles(): Promise<any> {
        console.log("calling getMonsterTitles");
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/all/titles");
        // global.monster_titles = 
        this.monster_titles = new Map<string, string>(Object.entries(response.data))
        return response.data;
    }

    getLocalTitles(): Map<string, string> {
        return this.monster_titles
    }


    // async getMonster(monster_key: any): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/" + monster_key);
    //     return response.data;
    // }

    // async getMonsterKeys(): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix");
    //     return response.data;
    // }

    // // Get Book Data
    // async getBookData(publish_id: any): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/catalog/" + publish_id);
    //     return response.data;
    // }

    // async getBookTitles(): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/data/book_titles");
    //     return response.data;
    // }

    // async getStatistics(): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/statistics");
    //     return response.data;
    // }

    // async getSettings(): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/settings");
    //     // console.log("DataService", response)
    //     return response.data;
    // }

    // async getCatalog(): Promise<any> {
    //     const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/catalog");
    //     // console.log("DataService", response)
    //     return response.data;
    // }

};

const DataService = class dataService {
    monsterTitles: Map<string, string> | undefined;

    // get monster titles from json file fetched from /api/appendix/all/titles
    static async getMonsterTitles(): Promise<any> {
        console.log("calling getMonsterTitles");
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/all/titles");
        // monsterTitles = response.data;
        return response.data;
    }

    static async getMonster(monster_key: any): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/" + monster_key);
        return response.data;
    }

    static async getMonsterKeys(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix");
        return response.data;
    }

    // Get Book Data
    static async getBookData(publish_id: any): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/catalog/" + publish_id);
        return response.data;
    }

    static async getBookTitles(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/data/book_titles");
        return response.data;
    }

    static async getStatistics(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/statistics");
        return response.data;
    }

    static async getSettings(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/settings");
        // console.log("DataService", response)
        return response.data;
    }

    static async getCatalog(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/catalog");
        // console.log("DataService", response)
        return response.data;
    }

}

export {DataService, DataProvider}
    