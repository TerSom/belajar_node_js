const fs = require("fs");
const chalk = require("chalk")
const validator = require("validator")


const warning = chalk.hex('#FA3E3E').inverse.bold;
const success = chalk.hex('#22bb33').inverse.bold
const daftar = chalk.blue.inverse.bold

// membuat folder jika tidak ada data
const drPath = "./data";
if (!fs.existsSync(drPath)) {
  fs.mkdirSync(drPath);
}

// membuat file jika tida ada data
const flPath = "./data/contacts.json";
if (!fs.existsSync(flPath)) {
  fs.writeFileSync(flPath, "[]", "utf-8");
}

const loadContact = () =>{
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts
}

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact()

  // check email format
  if (!validator.isEmail(email)) {
    console.log(warning("email tidak valid"))
    return false
  }

  // check duplicate email
  const duplicate = contacts.find((contact) => contact.email === email)
  if (duplicate) {
    console.log(warning("email sudah terdaftar"))
    return false
  }

  // cek no hp
  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(warning("Nomor hp tidak valid"))
    return false
  }

  contacts.push(contact);
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(success("terima kasih sudah memasukan data"));
};

const listContact = () => {
  const contacts = loadContact()
  contacts.forEach((contact, i) => {
    console.log(`
      ${daftar(`------CONTACT NAMA DAN NOMER HANDPHONE------`)}
      ${i + 1}. ${contact.nama} - ${contact.noHp}
      ${daftar(`--------------------END---------------------`)}
      `)
  });
}

const detailContact = (email) => {
  const contacts = loadContact()
  
  const contact = contacts.find((contact) => contact.email.toLowerCase() === email.toLowerCase())
  if(contact) {
    console.log(`
      ${daftar(`---------------DETAIL CONTACTS-----------------`)}
      1. ${contact.nama} - ${contact.noHp} - ${contact.email}
      ${daftar(`--------------------END------------------------`)}
      `)
  }else{
    console.log(warning(`${email} ini tidak di temukan`))
  }
}

const deleteContact = (nama) => {
  const contacts = loadContact()
  const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

  if (contacts.length === newContacts.length){
    console.log(warning(`${nama} tidak ditemukan`))
    return false
  }

  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(success(`contact ${nama} berhasil di hapus`));
}

module.exports = {simpanContact,listContact,detailContact,deleteContact}
