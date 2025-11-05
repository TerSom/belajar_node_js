const fs = require("fs");

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

// cari contact berdasarkan email
const findContact = (email) => {
  const contacts = loadContact()
  const contact = contacts.find((contact) => contact.email === email)
  return contact
}

const saveContact = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))
}

const addContact = (contact) => {
  const contacts = loadContact()
  contacts.push(contact)
  saveContact(contacts)
}

const cekDuplicate = (email) => {
  const contacts = loadContact()
  const duplicate = contacts.find((contact) => contact.email === email)
  return duplicate
}



module.exports = {loadContact,findContact,addContact,cekDuplicate}