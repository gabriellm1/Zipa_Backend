const Token = require('../models/Token');
const crypto = require('crypto');
 

 

module.exports = {

    async store(req,res) {
        let {lote,num} = req.body;
        
         
        const payload = JSON.stringify({
            'lote': lote,
            'num':num,
            'dataFab': Date.now()
        });
         
        const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
        const secret = 'zipa-project';
         
        const data = base64Payload;
         
        const signature = crypto
            .createHmac('sha1', secret)
            .update(data)
            .digest('base64');
         
        const signatureUrl = signature
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')
        console.log(signatureUrl)
        
        const prod = await Token.create({
            lote,
            num,
            dataFab: Date.now(),
            token:signatureUrl
        });

        return res.json(prod);
    },

    async validation(req,res) {
        let {key} = req.body;
        const posts = await Token.find({token:key})
        // deve apagar o token da base em seguida
        return res.json(posts);
    },


};
