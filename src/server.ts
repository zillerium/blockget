import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';


import * as accountRoutes from './routes/account';
import * as contentRoutes from './routes/content';

const app = express();


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


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

    



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server bound to PORT: ${PORT}`)
})
