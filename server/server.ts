import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();

import "reflect-metadata";
import * as WebSocket from 'ws';
import { DCoreSdk, ObjectType, ECKeyPair, Credentials, ChainObject, Authority  } from "dcorejs-sdk";

const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));


const registrar:Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

const keys = ECKeyPair.generate()
const PUBLIC_KEY = keys.publicAddress;

async function create (accountName: string)  {
    apiws.accountApi.create(registrar, accountName, PUBLIC_KEY)
               .subscribe(transaction => console.log(transaction))
}


const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
async function getFullAccounts (searchTerm: string[])  {
    console.log("search term fn " + searchTerm);
    return api.accountApi.getFullAccounts(searchTerm);
}

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.post('/create', (req, res) => {
//   const { account } = req.body;
//    create(account);
//    res.status(200).send('Done')
});

app.post('/getFullAccountsAll', async (req, res) => {
//   let finalResponse = [];
//   const result = await getFullAccounts();
//   result.subscribe(response => {
//       for (let item of response.entries()){
//           finalResponse.push({ [item[0]]: item[1].balances[0].balance.low})
//       }
//       res.status(200).send(JSON.stringify(finalResponse))
//   })
})

app.post('/createAccount', async (req, res) => {
    let balance;
    var account = req.body.account;

    await create(account);

    let msg = {"message":"Correct"};
    res.status(200).send(msg);
})

async function checkAccount(account: string) {
    var exists;
   var existsObj =  await apiws.accountApi.exist(account)
    .subscribe(result => {
     exists=result;
	 console.log(result)
    })
    //console.log("exists = "+exists);
    return exists;
}


app.post('/accountExists', async (req, res) => {

    var account = req.body.account;


    const exists = checkAccount(account);
console.log("account exists"+exists);
    let msg = {"exists":exists, "message":"Correct"};
    res.status(200).send(msg);

})



app.post('/getFullAccounts', async (req, res) => {
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
})
    



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server bound to PORT: ${PORT}`)
})
