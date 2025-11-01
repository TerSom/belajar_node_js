// core module
// file system

const fs = require("fs");

// // synchronous
// try{
//     fs.writeFileSync("data/test.txt","Membuat text denha synchronous")
// }catch(err){
//     console.log(err)
// }

// // asynchronous
// fs.writeFile("data/test.txt", "membuat text dengan asynchronous", (e) => {
//     console.log(e)
// })

// meembaca isi file
// const data = fs.readFileSync("data/test.txt", 'utf-8')
// console.log(data)

// // membaca iisi file asynchronous
// fs.readFile("data/test.txt", 'utf-8', (err,data) => {
//     if (err) throw err
//     console.log(data)
// })

// readline
const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });

rl.question("masukan nama kamu : ", (nama) => {
  rl.question("masukan umur kamu : ", (umur) => {
    const contact = { nama, umur };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
    console.log("terima kasih sudah memasukan data");
    rl.close();
  });
});
