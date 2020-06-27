  
const { ObjectId } = require('mongodb');                                // trzeba wydobyc ObjectId z mongodb, aby wykorzystywac wyszukiwanie/zmiany po Id kluczu

require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;



function createTask(task, completed) {
    return {task, completed}
}

async function create(collection, task, completed) {
    try{
        const taskItem = createTask(task, completed)
        await collection.insertOne(taskItem);
    } catch (error) {
        console.log(error);
    }
}

async function getTodos(collection) {
    const result = await collection.find().toArray();
    console.log(result);
    return result;
}

async function updateCompleted(collectionm, id, completed) {

}

const uri = process.env.MONGODB_CONNECTION;                            // przy pomocy pakietu dotenv przekazujemy dane do logowania do bazy nie udostepniajac ich np do gita (przy pomocy utworzonego pliku .env)
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true } );
client.connect(async err => {
  const collection = client.db("todo").collection("tasks");            // pobranie z serwera bazy todo kolekcje tasks

  await getTodos(collection);

  const result = await collection.find().toArray();
  console.log(result);



  // await create(collection, 'kupić jajka', false);                    // tworzy nowy element (kolekcje) w bazie - przy odkomentowaniu
  

  await collection.updateOne({ _id : ObjectId('5ef74f70ed69ac29e43024ff') }, { $set: { completed: true }} )    // mozna po id modyfikowac trzeba pobrac ObjectId z naszego MongoDB
//   await collection.updateOne({ task : 'kupić jajka' }, { $set: { completed: true }} )            // można po nazwie (zmienia 1 napotkana wartosc)

  const deleteResult = await collection.updateOne({ _id : ObjectId('5ef74f70ed69ac29e43024ff') }, { $set: { completed: true }} ) 
  console.log(deleteResult);        // zwraca cały obiekt z przypisania collection

  await getTodos(collection);

  // perform actions on the collection object
  client.close();
});
