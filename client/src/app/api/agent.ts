
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../Router/Route";

const sleep = () => new Promise(resolve => setTimeout(resolve , 500));


axios.defaults.baseURL = 'http://localhost:5000/api/';

const reponseBody =(response   : AxiosResponse) =>  response.data;

axios.interceptors.response.use(async response => {
    await sleep() ;
    return response ;
},(error :AxiosError) => {
    const {data,status} = error.response as AxiosResponse ;
    switch(status){
        case 400 : 
            if(data.errors){
                const modelStateErrors : string[] = []
                for (const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401 :
            toast.error(data.title);
            break;
        case 500 :
            router.navigate('/server-error',{state : {error : data}})
            break;
        default :
            break;
    }

    return Promise.reject(error)
}) // recupérer la reponse de l'api

const requests = {
    get :(url : string) => axios.get(url).then(reponseBody),
    post :(url : string, body : object) => axios.post(url,body).then(reponseBody),
    put :(url : string,  body : object ) => axios.put(url,body).then(reponseBody),
    delete :(url : string) => axios.delete(url).then(reponseBody)
}

const Catalog ={
    list : () => requests.get('products'),
    details :(id : number) => requests.get(`products/${id}`)
}
const TestErrors ={
    get400Error : () => requests.get('buggy/bad-request'),
    get401Error : () => requests.get('buggy/unauthorised'),
    get404Error : () => requests.get('buggy/not-found'),
    get500Error : () => requests.get('buggy/server-error'),
    getvalidationError : () => requests.get('buggy/validation-error'),
}


const agent = {
    Catalog ,TestErrors
}
export default agent