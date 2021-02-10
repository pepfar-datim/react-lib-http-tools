export * from "./modules/prod/methods";
export {apiInit,isTestEnv} from "./modules/shared/config";
export {testAs} from "./modules/test/getData/getData.service";
export {initTestApiCache} from "./modules/test/getData/httpStore.service";
export {registerSendMock} from "./modules/test/sendData/mockSendData.service";
export {registerGetMock} from "./modules/test/getData/getMock.service";