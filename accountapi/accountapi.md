Methods
countAll
create
createAccountOperation
createCredentials
createMemo
createTransfer
createUpdateOperation
exist
findAll
findAllReferencesByAccount
findAllReferencesByKeys
get
getAll
getAllByNames
getByName
getFullAccounts
getStatistics
listAllRelative
request
transfer
update

Example Account - 

[ Account {
    id:
     ChainObject {
       instance: [Long],
       fullBytes: <Buffer 34 00 00 00 00 00 02 01>,
       objectType: [ObjectType],
       objectId: '1.2.52' },
    registrar:
     ChainObject {
       instance: [Long],
       fullBytes: <Buffer 1b 00 00 00 00 00 02 01>,
       objectType: [ObjectType],
       objectId: '1.2.27' },
    name: 'unit-test-account',
    owner:
     Authority { weightThreshold: 1, accountAuths: [], keyAuths: [Array] },
    active:
     Authority { weightThreshold: 1, accountAuths: [], keyAuths: [Array] },
    options:
     Options {
       memoKey: [Address],
       votingAccount: [ChainObject],
       numMiner: 0,
       votes: [],
       extensions: [],
       allowSubscription: false,
       pricePerSubscribe: [AssetAmount],
       subscriptionPeriod: 0 },
    rightsToPublish:
     Publishing {
       isPublishingManager: false,
       publishRightsReceived: [],
       publishRightsForwarded: [] },
    statistics:
     ChainObject {
       instance: [Long],
       fullBytes: <Buffer 34 00 00 00 00 00 05 02>,
       objectType: [ObjectType],
       objectId: '2.5.52' },
    topControlFlags: 0 } ]
