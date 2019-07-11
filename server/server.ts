import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { create } from './helpers/create';
import { getFullAccounts } from './helpers/getFullAccounts'

const app = express();


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.post('/create', (req, res) => {
   const { account } = req.body;
    create(account);
    res.status(200).send('Done')
});

app.get('/getFullAccounts', async (req, res) => {
    let finalResponse = [];
    const result = await getFullAccounts();
    result.subscribe(response => {
        for (let item of response.entries()){
            finalResponse.push({ [item[0]]: item[1].balances[0].balance.low})
        }
        res.status(200).send(JSON.stringify(finalResponse))
    })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server bound to PORT: ${PORT}`)
})