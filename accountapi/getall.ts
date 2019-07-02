import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let accounts: ChainObject[] = [ChainObject.parse("1.2.27"), ChainObject.parse("1.2.28")]
const all = api.accountApi.getAll(accounts)
                .subscribe(result => console.log(result))

