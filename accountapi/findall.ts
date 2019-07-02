import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let searchTerm: string = "account";
const all = api.accountApi.findAll(searchTerm, undefined, undefined, 4)
    .subscribe(result => {
    let i: number = 0;
    while (i < 4) {
        console.log(result[i].id.instance);
	i++;
	console.log("***********************");
    }
    })


