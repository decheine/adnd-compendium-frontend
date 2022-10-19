import axios from 'axios';

// IMPORT GLOBALS FROM GLOBALS
import { GLOBALS } from '../data/GLOBALS';


export class DataService {
    monsterTitles: Map<string, string> | undefined;

    // get monster titles from json file fetched from /api/appendix/all/titles
    static async getMonsterTitles(): Promise<any> {
        console.log("calling getMonsterTitles");
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/all/titles");
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
        console.log("DataService", response)
        return response.data;
    }

    static async getCatalog(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/catalog");
        console.log("DataService", response)
        return response.data;
    }

}