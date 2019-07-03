import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let account: ChainObject[] = [ChainObject.parse("1.2.27")];
const all = api.accountApi.getStatistics(account)
    .subscribe(result => {
        console.log(result);
    })


