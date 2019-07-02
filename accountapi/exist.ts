import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let accountname: string = "sdk-account-1560938311";
const all = api.accountApi.exist(accountname)
    .subscribe(result => {
        console.log(result);
    })


