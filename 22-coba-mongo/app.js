const { MongoClient,ObjectId } = require('mongodb')

// Connection URL
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)

// databaseName
const dbName = "wpu"

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('koneksi berhasil');
  const db = client.db(dbName);
  
//   const result = await db.collection("mahasiswa").insertOne({
//     nama: "terry",
//     email: "terry@gmail.com"
//   })

//   console.log("data berhasil di tambahkan")
//   console.log(result)

// const collections = await db.collection("mahasiswa").insertMany(
//     [
//         {
//             nama: "somay",
//             email: "uamy@gmail.com"
//         },
//         {
//             nama: "gg",
//             email: "gg@gmail.com"
//         }
//     ]
// )

// menampilkan semua data yang ada di collection mahasisswa
// const collections = await db.collection("mahasiswa").find().toArray()

//     collections.forEach(cls => {
//         console.log(cls.nama)
//     });
//     console.log(collections)

// menampilkan data berdasarkan kriteria yang ada di collection mahasisswa
// const collections = await db.collection("mahasiswa").find({_id: new ObjectId('690dc9e103be4effd4929fe4')}).toArray()

//     collections.forEach(cls => {
//         console.log(cls.nama)
//     });
//     console.log(collections)

// mengubah data
// const collections = await db.collection("mahasiswa").updateOne(
//     {
//         _id: new ObjectId('690dc9e103be4effd4929fe4')   
//     },
//     {
//         $set: {
//             nama : "kocakGG",
//             emal : "kocak@gmail.com"
//         }
//     }
// )
//     console.log(collections)

// mengubah many data
// const collections = await db.collection("mahasiswa").updateMany(
//     {
//         nama : "terry"  
//     },
//     {
//         $set: {
//             nama : "terryDoang",
//         }
//     }
// )
//     console.log(collections)

const collections = await db.collection("mahasiswa").deleteMany(
    {
        nama: "terryDoang"
    }
)
    console.log(collections)

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
