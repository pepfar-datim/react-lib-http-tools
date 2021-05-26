
let registeredMocks = {};

export function registerSendMock(method:string, url:string, response: object):Promise<any>{
    return new Promise((resolve)=>{
        registeredMocks[url] = {method, response, resolve};
    });
}

function isMocked(url:string):boolean{
    return registeredMocks[url];
}

export function mockSendData(mtd:string, url:string, data:any):Promise<object>{
    url = url.replace(/^http.+\/api/,'');
    if (!isMocked(url)) throw new Error(`sending data to server in test env: ${url}`);
    let {response, method, resolve} = registeredMocks[url];
    resolve(data);
    if (mtd!==method) throw new Error(`Send data HTTP method not matching ${mtd} vs ${method}`);
    return Promise.resolve(response);
}