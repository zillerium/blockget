import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let searchTerm: string = "account";
const all = api.accountApi.findAll(searchTerm)
                .subscribe(result => console.log(result))

