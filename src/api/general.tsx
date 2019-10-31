
import axios from 'axios';
import { AxiosResponse} from "axios";


const instanse =  axios.create({
    baseURL: 'https://reqres.in/api/',
    responseType: "json"
});


export const usersApi = {
    getUser(id: number | string): Promise<AxiosResponse>{
        return instanse.get(`users/${id}`)
    },
    getUsersList(page:number, per_page?: number):Promise<AxiosResponse> {
        interface IParams {
            page?: number| null
            per_page?: number | null
        }
        let params: IParams = {
            page: page ,
            per_page: per_page? per_page : null
        };
        return instanse.get(`users/`, {params: params})
    }
};