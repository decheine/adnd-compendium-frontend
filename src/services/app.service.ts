import axios from 'axios';

export class AppService {


    public async getMonster(monster_key: any): Promise<any> {
        const response = await axios.get("/api/appendix/" + monster_key);
        return response.data;
    }

    // public async getAllMonsters(monster_key: any): Promise<any> {
    //     const response = await axios.get("/api/appendix/" + monster_key);
    //     return response.data;
    // }

    public async addUser(user: any) {
        const response = await axios.post(`/api/user`, {user});
        return response.data;
    }

}