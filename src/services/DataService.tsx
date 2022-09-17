import axios from 'axios';

// IMPORT GLOBALS FROM GLOBALS
import { GLOBALS } from '../data/GLOBALS';


export class DataService {
    static getBookData(id: string) {
        throw new Error("Method not implemented.");
    }

    // get monster titles from json file fetched from /api/appendix/all/titles
    public async getMonsterTitles(): Promise<any> {
        console.log("calling getMonsterTitles");
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/all/titles");
        return response.data;
    }

    static async getMonster(monster_key: any): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/" + monster_key);
        return response.data;
    }

    // public async getAllMonsters(monster_key: any): Promise<any> {
    //     const response = await axios.get("/api/appendix/" + monster_key);
    //     return response.data;
    // }

    // Get Book Data
    public async getBookData(publish_id: any): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/catalog/" + publish_id);
        return response.data;
    }

    public async getBookTitles(): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/data/book_titles");
        return response.data;
    }

}