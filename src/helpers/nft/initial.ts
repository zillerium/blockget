import "reflect-metadata";
import { DCoreSdk, ChainObject, Credentials, RegionalPrice, Synopsis, DCoreConstants, AssetAmount } from "dcorejs-sdk";
import * as WebSocket from 'ws';
import { NftDataType } from "dcorejs-sdk/dist/models/NftDataType";
import { NftFieldType } from "dcorejs-sdk/dist/models/NftFieldType";
import { NftModifiableBy } from "dcorejs-sdk/dist/models/NftModifiableBy";

// create the API
const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-api.dcore.io"));

const issuer: Credentials = new Credentials(ChainObject.parse("1.2.27"), "5Hxwqx6JJUBYWjQNt8DomTNJ6r6YK8wDJym4CMAH1zGctFyQtzt");

// symbol
const symbol: string = 'CAR';

// description
const description: string = 'CAR - real world object';

// fields
const field1 = new NftDataType(NftFieldType.String, true, NftModifiableBy.Issuer, "VIN");
const field2 = new NftDataType(NftFieldType.String, false, NftModifiableBy.Issuer, "make");
const field3 = new NftDataType(NftFieldType.String, false, NftModifiableBy.Issuer, "model");
const field4 = new NftDataType(NftFieldType.Integer, false, NftModifiableBy.Issuer, "year first registration");
// definitions
const definitions: NftDataType[] = [
    field1,
    field2,
    field3,
    field4
];

// max supply
const maxSupply: number = 100;

// fixed max supply
const fixedMaxSupply: boolean = false;

// transferable
const transferable: boolean = true;

// broadcast
const broadcast: boolean = true;

// apiws.nftApi.create(issuer, symbol, maxSupply, fixedMaxSupply, description, definitions, transferable)
//             .subscribe(transactionConfirmation => console.log(transactionConfirmation))


//apiws.nftApi.getAll([ChainObject.parse('1.2.27')]).subscribe(test=>console.log(test))

apiws.nftApi.getDataRaw(ChainObject.parse('1.2.27')).subscribe(data => console.log(data))