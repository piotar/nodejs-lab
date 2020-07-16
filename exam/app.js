require("dotenv").config();

const { ObjectId } = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_CONNECTION;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db("Ads_Board").collection("Ads_collection");
  //   const userCollection = client.db("Ads_Board").collection("Ads_users"); // możliwa jest modyfikacja kilku kolekcji na raz, np ogłoszeń i userwó

  //   console.log(await collection.find().toArray()); //pobieranie całej kolekcji

  //   dodawanie do kolekcji
  //   await collection.insertOne({
  //     title: "Jeep",
  //     category: ["cars", "AGD"],
  //     author: "Johnny Rambo",
  //     active: true,
  //     price: 18000,
  //     description: "selling Jeep with washdisher inside, year 2000",
  //     phone: 668979444,
  //   });

  // //wyszukiwanie w kolekcji
  //   console.log(await collection.find({ active: false }).toArray());

  //  modyfikacja wielu rekordów
  //   await collection.updateMany({}, { $set: { createDate: "16.07.2020" } }); //doda pole createDate do każdego rekordu

  // modyfikacja jednego na podstawie id:
  //   await collection.updateOne(
  //     { _id: ObjectId("5f109bcc4433bd00204a4484") },
  //     { $set: { active: false } }
  //   );

  // kasowanie wielu
  //   const result = await collection.deleteMany({
  //     _id: ObjectId("5f109fec59873831a8ed5ef0"),
  //   });

  //   console.log(result); // każde polecenie zwraca obiekt z masą informacji. Możemy tam np sprawdzić deleteCount - ile rekordów usunięto

  console.log(await collection.find().toArray());

  client.close();
});
