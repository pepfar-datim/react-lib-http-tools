import {getDataInTest} from "./getData/getData.service";
import {mockSendData} from "./sendData/mockSendData.service";
import {baseUrl, isTestEnv} from "../shared/config";

export function getViaTestCache(url:string, options?: any):Promise<any>{
    if (!baseUrl) throw new Error(`'@pepfar-react-lib/http-tools' not initialized. Please run 'apiInit' before first HTTP call.`);
    if (!isTestEnv()) return getDataInProd(url, options);
    else return getDataInTest(url);
}

export function sendDataViaTest(method:string, url:string, data:any, contentType:string='application/json'):Promise<any>{
    if (!isTestEnv()) return sendDataInProd(method, url, data, contentType);
    else return mockSendData(method, url, data);
}

export function getDataInProd(url:string, options?:any):Promise<object>{
    return fetch(url, {credentials: 'include', ...options})
        .then(resp => resp.json());
}

function sendDataInProd(method:string, url:string, data:any, contentType:string){
    return fetch(url, {
        credentials: 'include',
        method: method,
        headers: {
            'Content-Type': contentType,
        },
        body: contentType==='application/json'?JSON.stringify(data):data
    }).then((response)=>{
        if (!response.ok) throw response;
        return response;
    })
}