import { Router } from 'express';
import "reflect-metadata";
import * as WebSocket from 'ws';
import { DCoreSdk, ObjectType, ECKeyPair, Credentials, ChainObject, Authority  } from "dcorejs-sdk";

const router = Router();

const api = DCoreSdk.createForHttp({ baseUrl: 'http://testnet-api.dcore.io'})
const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));


const registrar:Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");



router.post('/addContent', async (req, res) => {
    const { account, hash } = req.body; 
    const accountDetails = await api.accountApi.getFullAccounts([account]).toPromise()
    console.log(accountDetails);


})

export default router;