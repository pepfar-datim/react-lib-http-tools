import {baseUrl} from "../shared/config";
import {getViaTestCache, sendDataViaTest} from "../test/apiCache";

export function makeUrl(url:string):string{
    return baseUrl+'api'+url;
}

export function getData(url:string, options?:any):Promise<any>{
    return getViaTestCache(makeUrl(url),options);
}
export function postData(url:string, data:any, contentType?:string):Promise<any>{
    return httpCall('POST', url, data, contentType)
}

export function postFormData(url:string, data:string):Promise<any>{
    return httpCall('POST', url, data)
}

export function patchData(url:string, data:any):Promise<any>{
    return httpCall('PATCH', url, data)
}

export function putData(url:string, data:any):Promise<any>{
    return httpCall('PUT', url, data)
}

export function deleteData(url:string, data?:any):Promise<any>{
    return httpCall('DELETE', url, data||null);
}

function httpCall(method:string, url:string, data:any, content?:string):Promise<any>{
    return sendDataViaTest(method, makeUrl(url), data, content);
}