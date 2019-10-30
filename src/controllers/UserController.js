const User = require('../models/User');

module.exports = {

    async history(req,res){
        let {user} = req.body;
        const checkExistence = await User.find({user:user});

        if(typeof(checkExistence[0])!="undefined"){
            return res.json(checkExistence[0].history);
        } else {
            return res.json({});
        }
    },

    async newRegister(req,res) {

        let {user} = req.body;
        const checkExistence = await User.find({user:user});
        
        if(typeof(checkExistence[0])!="undefined"){

            const userUpdated = await User.updateOne({ user: user }, 
                { avaiable: checkExistence[0].avaiable + 7 ,
                friend:checkExistence[0].friend + 1})
            return res.json(userUpdated);

        } else {

            const newUser = await User.create({
                user: user,
                avaiable: 7,
                friend: 1,
                history : []
            });
            return res.json(newUser);

        }
    },

    async newInsert(req,res) {
        let {user,quantity,coordinate,date,adress} = req.body;
        const checkExistence = await User.find({user:user});

        if(typeof(checkExistence[0])!="undefined"){

            if(checkExistence[0].avaiable < quantity ){
                //erro
                if(checkExistence[0].avaiable == 0){
                    return res.json({erro : "Usuário sem adesivos disponíveis"})
                } else {
                    return res.json({erro : "Quantidade para aplicação menor que disponível"})
                }
            } else {
                // pode aplicar
                var historyD = checkExistence[0].history
                historyD.push({quantity:quantity,
                                coordinate:coordinate,
                                date:date,
                                adress:adress})
                const userUpdated = await User.updateOne({ user: user }, 
                    { avaiable: checkExistence[0].avaiable - quantity,
                        history: historyD
                    })
                return res.json({erro : "None"});
            }
        } else {
            // erro
            return res.json({erro : "Usuário sem adesivos disponíveis"});

        }
    }

};

