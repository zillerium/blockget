import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as WebSocket from 'ws';
import { DCoreSdk } from 'dcorejs-sdk';


import * as accountRoutes from './routes/account';
import * as contentRoutes from './routes/content';
import * as nftRoutes from './routes/nft';

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
app.use('/api/v1/account', accountRoutes.default);
app.use('/api/v1/content', contentRoutes.default);
app.use('/api/v1/nft', nftRoutes.default)


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

    



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server bound to PORT: ${PORT}`)
})
