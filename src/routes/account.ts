import { Router } from 'express';
import "reflect-metadata";
import * as WebSocket from 'ws';
import { DCoreSdk, ObjectType, ECKeyPair, Credentials, ChainObject, Authority  } from "dcorejs-sdk";

const router = Router();

const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));


const registrar:Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

const keys = ECKeyPair.generate()
const PUBLIC_KEY = keys.publicAddress;

async function create (accountName: string)  {
    apiws.accountApi.create(registrar, accountName, PUBLIC_KEY)
               .subscribe(transaction => console.log(transaction))
}


async function getFullAccounts (searchTerm: string[])  {
    console.log("search term fn " + searchTerm);
    return api.accountApi.getFullAccounts(searchTerm);
}

const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" });

router.post('/getFullAccountsAll', async (req, res) => {
    //   let finalResponse = [];
    //   const result = await getFullAccounts();
    //   result.subscribe(response => {
    //       for (let item of response.entries()){
    //           finalResponse.push({ [item[0]]: item[1].balances[0].balance.low})
    //       }
    //       res.status(200).send(JSON.stringify(finalResponse))
    //   })
    })
    
    router.post('/createAccount', async (req, res) => {
    let balance;
    var account = req.body.account;

    await create(account);

    let msg = {"message":"Correct"};
    res.status(200).send(msg);
})

async function checkAccount(account: string) {
    return apiws.accountApi.exist(account)
}


router.post('/accountExists', async (req, res) => {

    const { account } = req.body;

    if (!account) {
        return res.status(400).send('Please provide an account name');
    }

    try {
        const exists = await checkAccount(account);
        exists.subscribe(result => {
            let msg = {"exists":result, "message":"Correct"};
            return res.status(200).send(msg);
        });
    } catch (err) {
        return res.status(400).send('Bad Request')
    }
})



router.post('/getFullAccounts', async (req, res) => {
    let balance;
    var account = req.body.account;
    //    account = "sdk-account-1560938311";

    console.log("account - "+ account);
    let searchTerm: string[] = [];
    searchTerm.push(account);

        console.log("searchTerm - "+ searchTerm);
        let searchTerm1: string[] = ["sdk-account-1560938311", "public-account-9"];

        //const result = await api.accountApi.getFullAccounts(searchTerm);
    const result = await getFullAccounts(searchTerm);
    result.subscribe(response => {
        for (let item of response.entries()){
        balance={"balance":item[1].balances[0].balance.low, "message": "Correct"}
        console.log("balance is " +balance)
        }
        res.status(200).send(balance)
    })
});

export default router;