// api/new-meetup
// POST api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = req.body;
        const { title, image, address, description } = data;

        try {
            const client = new MongoClient('mongodb+srv://<name>:<password>@cluster0.ml4ovdd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
            await client.connect();

            const dbName = "myFirstDatabase";
            const collectionName = "meetups";

            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            const result = await collection.insertOne(data);

            client.close();

            res.status(201).json({ message: 'meetup inserted' })
        } catch (error) {
            console.log('what is the error :: ', error)
        }
    }
}

export default handler;
