import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

const app = express();

import "reflect-metadata";
import { DCoreSdk, ChainObject } from "dcorejs-sdk";

const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" })
async function getFullAccounts (searchTerm: string[])  {
    console.log("search term fn " + searchTerm);
    return api.accountApi.getFullAccounts(searchTerm);
}



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
	    balance={"balance":item[1].balances[0].balance.low}
	    console.log("balance is " +balance)
        }
        res.status(200).send(balance)
    })
})
    



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server bound to PORT: ${PORT}`)
})
