
export enum Environment{
    test="test",
    development="development",
    production="production"
}
export let baseUrl:string;
export let environment:Environment;
export function apiInit(url:string, env:string){
    baseUrl = url;
    environment = env as Environment;
}
export function isTestEnv():boolean{
    return environment==='test';
}