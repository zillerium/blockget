import "reflect-metadata";
import { DCoreSdk, Address } from "dcorejs-sdk";
// var  DCoreSdk   = require("dcorejs-sdk");

// create the API
const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
// get account by name, resolves to account id '1.2.27'
let address: Address[] = [Address.parse("DCT6TjLhr8uESvgtxrbWuXNAN3vcqzBMw5eyEup3PMiD2gnVxeuTb")];
const disposable = api.accountApi.findAllReferencesByKeys(address)
    .subscribe((account) => console.log(account));

