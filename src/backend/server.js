import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
app.use(bodyParser.json());

const callMongoDB = async (dbOperation, res) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', 
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db('my-blog');    
        await dbOperation(db);    
        client.close();

    }catch(e){
        res.status(500).json({
            message: `Error connection to db ${e}`
        });
    }
}

app.get('/api/articles/:name', async (req, res)=> {
        callMongoDB(async(db)=> {
            const articleName = req.params.name;        
            const articleVotes = await db.collection('articles').findOne({
                name: articleName
            })
            res.status(200).json(articleVotes);

        }, res); 
});

app.post('/api/articles/:name/upvote', async (req, res)=> {
    callMongoDB(async(db)=> {
        const articlesVote = req.params.name;
        const articleVotes = await db.collection('articles').findOne({
                name: articlesVote
            });
        await db.collection('articles').updateOne({
                name: articlesVote},
                {"$set" : { upvotes: articleVotes.upvotes + 1,
            }
        });
        const updatedArticleVotes = await db.collection('articles').findOne({
            name: articlesVote
        });
        res.status(200).json(updatedArticleVotes);
    }, res); 
    // articlesVotes[articlesVote].upvotes += 1;    
    // res.status(200).send(`${articlesVote} now has ${articlesVotes[articlesVote].upvotes} visits`);
});

app.post('/api/articles/:name/add-comment', (req, res)=> {
    const { username, text } = req.body;
    const articlesName = req.params.name;

    callMongoDB(async(db)=> {
        const articleVotes =  await db.collection('articles').findOne({
            name: articlesName
        });
        await db.collection('articles').updateOne({
            name: articlesName
        }, {
            "$set": {
                comments: articleVotes.comments.concat({username, text}),
            }
        });
        const updatedArticleVotes = await db.collection('articles').findOne({
            name: articlesName
        });
        res.status(200).json(updatedArticleVotes);

    }, res)
   

    

});

// articlesVotes[articlesName].comments.push({username, text});
// res.status(200).send(articlesVotes[articlesName]);

app.listen(8000, ()=> console.log('listening on port 8000'));
