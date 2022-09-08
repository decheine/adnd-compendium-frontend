import axios from 'axios';

const API: string = "http://localhost:8080";
// const API: string = "http://3.18.51.8:8080";


export class AppService {


    public static async getMonster(monster_key: string): Promise<any> {
        const response = await axios.get(API + "/api/appendix/" + monster_key);
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