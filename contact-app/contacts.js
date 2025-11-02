const fs = require("fs");
const chalk = require("chalk")
const validator = require("validator")


const warning = chalk.hex('#FA3E3E').inverse.bold;
const success = chalk.hex('#22bb33').inverse.bold

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

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

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

module.exports = {simpanContact}
