import "reflect-metadata";
import { DCoreSdk } from "dcorejs-sdk";
// var  DCoreSdk   = require("dcorejs-sdk");

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
const disposable = api.accountApi.get("public-account-9")
    .subscribe((account) => console.log(account.id));

