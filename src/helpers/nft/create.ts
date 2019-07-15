import "reflect-metadata";
import { DCoreSdk, ChainObject, Credentials, RegionalPrice, Synopsis, DCoreConstants, AssetAmount } from "dcorejs-sdk";
import * as WebSocket from 'ws';
import { NftDataType } from "dcorejs-sdk/dist/models/NftDataType";
import { NftFieldType } from "dcorejs-sdk/dist/models/NftFieldType";
import { NftModifiableBy } from "dcorejs-sdk/dist/models/NftModifiableBy";

const apiws = DCoreSdk.createForWebSocket(() => new WebSocket("wss://testnet-socket.dcore.io"));

const createNft = (accountName, sym, desc, supply) => {

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
    const field4 = new NftDataType(NftFieldType.Integer, false, NftModifiableBy.Issuer, "year first registration");
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
}

export default createNft;

