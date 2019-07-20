import { Router } from 'express';

import create from '../helpers/nft/create';

const router = Router();

router.post('/create', async (req, res) => {
    const { accountName, symbol, description, max_supply } = req.body;
    console.log(req.body)
    const nftCreationResult = await create(accountName, symbol, description, max_supply);
    nftCreationResult.subscribe(tnx => {
        return res.status(200).send(JSON.stringify(tnx));
    }) 
});

export default router;
