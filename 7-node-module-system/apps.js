// mengambil argument dari comand lain
const command = (process.argv[2])
if (command === "update"){
  console.log("update kocak")
}else if (command === "delete"){
  console.log("delet kocak")
  
}else if (command === "list"){
  console.log("nih listnya")
}

const contacts = require("../contact-app/contacts")

const main = async () => {
  const nama = await contacts.tulisPertanyaan("masukan nama anda : ");
  const noHp = await contacts.tulisPertanyaan("masukan NoHp anda : ");
  const email = await contacts.tulisPertanyaan("masukan email anda : ");

  contacts.simpanContact(nama,noHp,email)
};

main()
