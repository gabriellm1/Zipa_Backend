const Post = require('../models/Post');

module.exports = {
    async index(req,res) {
        const posts = await Post.find().sort('-createAt');
        return res.json(posts);
    },
    async store(req,res) {
        let {user,quantity,coordinate} = req.body;

        const checkExistence = await Post.find( { "coordinate.latitude": { $eq: coordinate.latitude},"coordinate.longitude":{ $eq: coordinate.longitude}  });

        if(typeof(checkExistence[0])!="undefined"){
            console.log(typeof(checkExistence[0].quantity))
            console.log(typeof(quantity))
            quantity += checkExistence[0].quantity
            console.log(quantity);
            const post = await Post.create({
                user,
                quantity,
                coordinate,
            });
            await checkExistence[0].delete()
            const marker = {
                coordinate : post.coordinate,
                number : post.quantity
            }
            req.io.emit('newMarker',marker);
            return res.json(post);
        } else {
            const post = await Post.create({
                user,
                quantity,
                coordinate,
            });
            const marker = {
                coordinate : post.coordinate,
                number : post.quantity
            }
            req.io.emit('newMarker',marker);
            return res.json(post);
        }

        
    },

    async markers(req,res) {
        const posts = await Post.find().sort('-coordinates');
        const markers = [];
        let marker;
        for(var i=0;i<posts.length;i++){
            marker = {
                coordinate : posts[i].coordinate,
                number : posts[i].quantity
            }
            markers.push(marker);
        }
        return res.json(markers);
    },
};

