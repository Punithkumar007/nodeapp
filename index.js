import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT;

dotenv.config();

async function createConnection() {

    const MONGO_URL = process.env.MONGO_URI;
    //Todo

    const client = new MongoClient(MONGO_URL);
    try {
        await client.connect();
        return client;
        // getPollById(client, "4");
    } catch (err) {
        console.log(err);
    }
}

async function insertPoll(client, poll) {
    const results = await client.db("constentants").collection('poll').insertMany(poll);
    console.log("Inserted Successfully", results);
}

async function getPollById(client, id) {
    const results = await client.db("constentants").collection('poll').findOne({ id: id });
    console.log("Successfully Connected");
    return results;
}

async function getPolls(client, filter) {
    const results = await client.db("constentants").collection('poll').find({}).toArray();
    console.log("Successfully Connected");
    return results;
}

// async function getPollsByContent(client, content) {
//     const results = await client.db("constentants").collection('poll').find({content:content.filter((data) => data.}).toArray();
//     console.log("Successfully Connected");
//     return results;
// }
createConnection();

app.get("/", (request, response) => {
    response.send("Welcome to my node app");
});

app.get("/poll", async (request, response) => {

    const client = await createConnection();
    const contestant = await getPolls(client, {});
    response.send(contestant);
});

app.get("/poll/:id", async (request, response) => {
    const id = request.params.id;

    const client = await createConnection();
    const contestant = await getPollById(client, id);
    response.send(contestant);
});

app.get("/poll/name/:companyname", async (request, response) => {
    const companyname = request.params.companyname;
    const client = await createConnection();
    const contestants = await getPolls(client, { company: companyname });
    response.send(contestants);
});

app.get("/poll/content/:search", async (request, response) => {
    const search = request.params.search;
    const client = await createConnection();
    const contestants = await getPolls(client, { content: { $regex: 'search', $options: 'i' } });
    response.send(contestants);
});

app.listen(PORT, () => console.log("The server is started in ", PORT));