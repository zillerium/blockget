import "reflect-metadata";
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as WebSocket from 'ws';
import { DCoreSdk, ObjectType, ECKeyPair, Credentials, ChainObject, NftRef  } from "dcorejs-sdk";
import { NftDataType } from "dcorejs-sdk/dist/models/NftDataType";
import { NftFieldType } from "dcorejs-sdk/dist/models/NftFieldType";
import { NftModifiableBy } from "dcorejs-sdk/dist/models/NftModifiableBy";


// import * as accountRoutes from './routes/account';
// import * as contentRoutes from './routes/content';
import { NftDefinition } from "dcorejs-sdk/dist/models/NftModel";

const app = express();
const globalAny:any = global;

// globalAny.apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-socket.dcore.io"));
// globalAny.apiRs = DCoreSdk.createForHttp({ baseUrl: 'https://testnet.dcore.io'});

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, x-access-token');
  next();
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
// app.use('/api/v1/account', accountRoutes.default);
// app.use('/api/v1/content', contentRoutes.default);
//  app.use('/api/v1/nft', nftRoutes.default)

const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-socket.dcore.io"));

// account functions
async function create (accountName: string)  {
    // registrar of an account - an already existing account required for account creation
    const registrar:Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

    const keys = ECKeyPair.generate()
    const PUBLIC_KEY = keys.publicAddress;

    apiws.accountApi.create(registrar, accountName, PUBLIC_KEY)
               .subscribe(transaction => console.log(transaction))
}


async function getFullAccounts (searchTerm: string[])  {
    console.log("search term fn " + searchTerm);
    return api.accountApi.getFullAccounts(searchTerm);
}

const api = DCoreSdk.createForHttp({ baseUrl: "https://testnet-api.dcore.io/" });


// account routes
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
    var  { account } = req.body;

    await create(account);

    let msg = {"message":"Correct"};
    res.status(200).send(msg);
})

async function checkAccount(account: string) {
    return apiws.accountApi.exist(account)
}


app.post('/accountExists', async (req, res) => {

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



app.post('/getFullAccounts', async (req, res) => {
    let balances: object[] = [];
    var { accounts } = req.body;

    //const result = await api.accountApi.getFullAccounts(searchTerm);
    const result = await getFullAccounts(accounts);
    result.subscribe(response => {
        for (let item of response.entries()){
            console.log(item[1].account)
        balances.push({[item[0]]: item[1].balances[0].balance.low})
        }
        res.status(200).send({balances, message: 'Correct'})
    })
});


// nft route
app.post('/mintNFT', async (req, res) => {
    const { accountName, symbol, description, max_supply } = req.body;
    let nftCreationResult;
    try {
        nftCreationResult = await mintNFT(accountName, symbol, description, max_supply);
        nftCreationResult.subscribe(tnx => {
            return res.status(200).send(JSON.stringify(tnx));
        }) 
    } catch(err){
        console.log(err.message)
    }
   
});


// render route
app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});


// nft functions
const mintNFT = (accountName, sym, desc, supply) => {

    // how do you wan to define the issuer here?
    const issuer: Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

    // symbol
    const symbol: string = sym;

    // description
    const description: string = desc;

    // fields - I am waiting on your feedback on how to accept these from the user or whether they are needed to be accepted from users
    const field1 = new NftDataType(NftFieldType.String, true, NftModifiableBy.Issuer, "VIN");
    const field2 = new NftDataType(NftFieldType.String, false, NftModifiableBy.Issuer, "make");
    const field3 = new NftDataType(NftFieldType.String, false, NftModifiableBy.Issuer, "model");
    const field4 = new NftDataType(NftFieldType.Integer, false, NftModifiableBy.Issuer, "year_first_registration");
    // definitions
    const definitions: NftDataType[] = [
        field1,
        field2,
        field3,
        field4
    ];

    // max supply
    const maxSupply: number = Number(supply);

    // fixed max supply
    const fixedMaxSupply: boolean = false;

    // transferable
    const transferable: boolean = true;

    // broadcast
    const broadcast: boolean = true;

    return apiws.nftApi.create(issuer, symbol, maxSupply, fixedMaxSupply, description, definitions, transferable);
};

app.post('/issueNFT', async (req, res) => {
    const { to, VIN, make, model, year_first_registration } = req.body;

    const data = {
        VIN,
        make,
        model,
        year_first_registration
};

    const result = await issueNFT(to, data);
    console.log(result)
//     result.subscribe(transaction => {console.log(transaction);
//         res.status(200).send({ msg: 'Success!' })
//    });
});



app.post('/getAllNFTs', async (req, res) => {
    const { symbols } = req.body;
    const result = await getAllNFTs(symbols);
    result.subscribe(nfts => res.status(200).send({nfts}));
});

const getAllNFTs = (symbols: string[]) => {
    return apiws.nftApi.getAllBySymbol(symbols);
};

app.post('/getAllNFTsBySymbol', async (req, res) => {
    const { symbols } = req.body;
    const result = await getAllNFTsBySymbol(symbols);
    result.subscribe(data => res.status(200).send({ data }))

})

const getAllNFTsBySymbol = (symbols: string[]) => {
    //const ids:ChainObject[]  = symbols.map(id => ChainObject.parse(id));
    return apiws.nftApi.getAllBySymbol(symbols)
}

app.post('/getAllNFTsByObjectId', async (req, res) => {
    const { objectIds } = req.body;
    const result = await getAllNFTsByObjectId(objectIds);
    result.subscribe(data => res.status(200).send({ data }))

})

const getAllNFTsByObjectId = (objectIds: string[]) => {
    const ids:ChainObject[]  = objectIds.map(id => ChainObject.parse(id));
    return apiws.nftApi.getAll(ids);
}

app.post('/getAllNFTDataByObjectId', async (req, res) => {
    const { objectIds } = req.body;
    const result = await getAllNFTDataByObjectId(objectIds);
    result.subscribe(data => res.status(200).send({ data }))

})

const getAllNFTDataByObjectId = (objectIds: string[]) => {
    const ids:ChainObject[]  = objectIds.map(id => ChainObject.parse(id));
    return apiws.nftApi.getAllData([ChainObject.parse('1.2.27')]);
}

const issueNFT = (to: string, data) => {
    // how do you wan to define the issuer here?
    const issuer: Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

    // symbol
    const symbol: NftRef = "TES";

    // to address
    const toAddress: ChainObject = ChainObject.parse("1.2.27");

    //data
     // fields - I am waiting on your feedback on how to accept these from the user or whether they are needed to be accepted from users
     const field1 = new NftDataType(NftFieldType.String, true, NftModifiableBy.Issuer, "VIN");
     const field2 = new NftDataType(NftFieldType.String, false, NftModifiableBy.Issuer, "make");
     const field3 = new NftDataType(NftFieldType.String, false, NftModifiableBy.Issuer, "model");
     const field4 = new NftDataType(NftFieldType.Integer, false, NftModifiableBy.Issuer, "year_first_registration");
     // definitions
     const definitions: NftDataType[] = [
         field1,
         field2,
         field3,
         field4
     ];

    
    //let dataModel: NftDefinition = new NftDefinition["WAUZZZ8K6AA103083", "AUDI", "A7", 2014];
    //dataModel.definition = definitions;
    // let values: any = ["WAUZZZ8K6AA103083","AUDI","A7",2014]
    // NftDefinition.DEFINITION = definitions;
    // NftDefinition.createUpdate(NftDefinition.DEFINITION, values)
    // // data model with values
    //return apiws.nftApi.issue(issuer, symbol , toAddress, dataModel);
};

app.post('/transferNFT', async (req, res) => {
    const { to, nftId } = req.body;
    const result = await transferNFT(to, nftId);
    result.subscribe(tnx => console.log(tnx))
})
const transferNFT = (to: string, nft: string) => {
    // how do you wan to define the issuer here?
    const issuer: Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

     // to address
     const toAddress: ChainObject = ChainObject.parse("1.2.28");

     // nft id
     const nftId: ChainObject = ChainObject.parse("1.10.4");

    return apiws.nftApi.transfer(issuer, toAddress, nftId);

};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server bound to PORT: ${PORT}`)
})
