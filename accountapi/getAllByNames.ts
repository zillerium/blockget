import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let searchTerm: string[] = ["sdk-account-1560938311", "public-account-9"];
const all = api.accountApi.getAllByNames(searchTerm)
    .subscribe(result => {
        console.log(result);
    })


