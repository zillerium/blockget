## Requests and Responses

Following is the list of requests that could be made to the server along with their corresponding responses:

1. Creating an Account <br><br>

Method: POST 
Endpoint: /createAccount <br>
Payload: Payload should have `account`, which should be the `Account name` that is to be created<br>
Script: curl -H "Content-Type: application/json" -d '{ "account": "trevor3"}' http://blockget.store:3000/createAccount<br><br>
Response: {"message":"Correct"}

2. Checking whether an account exists <br><br>
Method: POST<br> 
Endpoint: /accountExists<br>
Payload: `account` whose existence is to be validated 
Script: curl -H "Content-Type: application/json" -d '{ "account": "trevor3"}' http://blockget.store:3000/accountExists<br><br>
Response: {"exists":true,"message":"Correct"}

3. Get Balances of accounts<br><br>
Method: POST <br>
Endpoint: /getFullAccounts<br>
Payload: `accounts` - an array of account ids
Script: curl -H "Content-Type: application/json" -d '{ "accounts": ["trevor3", "public-account-9"]}' http://blockget.store:3000/getFullAccounts<br><br>
Response: {"balances":[{accountName: balance}],"message":"Correct"}

4. Create an NFT type <br><br>
Method: POST <br>
Endpoint: /mintNFT<br>
Script: curl -H "Content-Type: application/json" -d '{"accountName":"public-account-9", "symbol":"TES", "description":"TEST", "max_supply": 200000}' http://blockget.store:3000/mintNFT<br><br>
Response: 
{"id":"594e5edeca06ac4d47e9dd304db9b375b7094ed6","blockNum":521002,"trxNum":0,"transaction":{"refBlockNum":62249,"refBlockPrefix":2866807378,"expiration":"2019-07-20T18:40:04.000Z","operations":[{"extensions":[],"type":46,"id":41}],"extensions":[],"signatures":["2066a18f7a65a032ce9aef5370ff67d470cfd4cda8a6529d806e124c2715af07bb5f19f19cd06c7ca7faf9555ed8e70138c2111af12a07d1b8f93fdede40db700b"],"opResults":[[1,"1.10.9"]]}}

5. Get NFT information by symbol<br><br>
Method: POST <br>
Endpoint: /getAllNFTDataBySymbol<br>
Payload: `symbols` - array of NFT symbols<br>
Script: curl -H "Content-Type: application/json" -d '{ "symbols": ["CAR"]}' http://blockget.store:3000/getAllNFTsaBySymbol<br><br>
Response:
 {"data":[{"id":{"instance":{"low":4,"high":0,"unsigned":true},"fullBytes":{"type":"Buffer","data":[4,0,0,0,0,0,10,1]},"objectType":{"space":1,"type":10},"objectId":"1.10.4"},"symbol":"CAR","options":{"issuer":{"instance":{"low":27,"high":0,"unsigned":true},"fullBytes":{"type":"Buffer","data":[27,0,0,0,0,0,2,1]},"objectType":{"space":1,"type":2},"objectId":"1.2.27"},"maxSupply":100,"fixedMaxSupply":false,"description":"CAR - real world object"},"definitions":[{"type":"string","unique":true,"modifiable":"issuer","name":"VIN"},{"type":"string","unique":false,"modifiable":"issuer","name":"make"},{"type":"string","unique":false,"modifiable":"issuer","name":"model"},{"type":"integer","unique":false,"modifiable":"issuer","name":"year first registration"}],"transferable":true,"currentSupply":0}]}

 6. Get NFT information by object id<br><br>
 Method: POST <br>
 Endpoint: /getAllNFTDataByObjectIds<br>
 Payload: `objectIds` - array of NFT object ids on decent
 Script: curl -H "Content-Type: application/json" -d '{ "objectIds": ["1.10.4]}' http://blockget.store:3000/getAllNFTsByObjectIds<br><br>
 Response:
 {"data":[{"id":{"instance":{"low":4,"high":0,"unsigned":true},"fullBytes":{"type":"Buffer","data":[4,0,0,0,0,0,10,1]},"objectType":{"space":1,"type":10},"objectId":"1.10.4"},"symbol":"CAR","options":{"issuer":{"instance":{"low":27,"high":0,"unsigned":true},"fullBytes":{"type":"Buffer","data":[27,0,0,0,0,0,2,1]},"objectType":{"space":1,"type":2},"objectId":"1.2.27"},"maxSupply":100,"fixedMaxSupply":false,"description":"CAR - real world object"},"definitions":[{"type":"string","unique":true,"modifiable":"issuer","name":"VIN"},{"type":"string","unique":false,"modifiable":"issuer","name":"make"},{"type":"string","unique":false,"modifiable":"issuer","name":"model"},{"type":"integer","unique":false,"modifiable":"issuer","name":"year first registration"}],"transferable":true,"currentSupply":0}]}