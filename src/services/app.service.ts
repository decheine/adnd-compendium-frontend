import axios from 'axios';

// import GLOBALS
import { GLOBALS } from '../data/GLOBALS';

export class AppService {


    public static async getMonster(monster_key: string): Promise<any> {
        const response = await axios.get(GLOBALS.API_ENDPOINT + "/api/appendix/" + monster_key);
        return response.data;
    }

    // public async getAllMonsters(monster_key: any): Promise<any> {
    //     const response = await axios.get("/api/appendix/" + monster_key);
    //     return response.data;
    // }

    public static async addUser(user: any) {
        const response = await axios.post(`/api/user`, {user});
        return response.data;
    }

}