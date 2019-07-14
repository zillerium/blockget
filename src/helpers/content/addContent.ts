import "reflect-metadata";
import { DCoreSdk, ChainObject, Credentials, RegionalPrice, Synopsis, DCoreConstants, AssetAmount } from "dcorejs-sdk";
import * as WebSocket from 'ws';
import * as moment from "moment";
import * as Long from 'long';
// create the API
const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));


// author credentials
const testCredentials:Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

// co authors
const coAuthors = [];

// content uri
const contentURI = 'https://drive.google.com/open?id=1_eBFQ6GBQ1MsWHTQUHvZj6i0tOx5cXTv';

const testAssetAmount = new AssetAmount(Long.ZERO, DCoreConstants.DCT_ASSET_ID);
const regionalPrice = new RegionalPrice(testAssetAmount)
const regionalPrices: RegionalPrice[] = [regionalPrice]; 

const expiration = moment('2019-07-20');

const synopsis = new Synopsis('Hello', 'World');


//
apiws.contentApi.add(testCredentials, coAuthors, contentURI, regionalPrices, expiration, synopsis )
    .toPromise().then(result => console.log(result))
                .catch(err => console.log(err.message))