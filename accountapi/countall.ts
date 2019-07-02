import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
const all = api.accountApi.countAll()
                .subscribe(result => console.log(result))

