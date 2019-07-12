import "reflect-metadata";
import * as WebSocket from 'ws';

import { DCoreSdk, ObjectType, ECKeyPair, Credentials, ChainObject, Authority  } from "dcorejs-sdk";
// var  DCoreSdk   = require("dcorejs-sdk");

// create the API
const api = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));


//@TODO: dynamically generate Private Key in the required format
// registrar
const registrar:Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

const keys = ECKeyPair.generate()
const PUBLIC_KEY = keys.publicAddress;

export const create = (accountName: string) : void => {
    api.accountApi.create(registrar, accountName, PUBLIC_KEY)
               .subscribe(transaction => console.log(transaction))


// check after account creation or any other account that exists
const doesAccountExist = api.accountApi.exist(accountName)
                            .subscribe(result => console.log(result))
}