const {contacts} = require("./contacts")

const main = async () => {
  const nama = await contacts.tulisPertanyaan("masukan nama anda : ");
  const noHp = await contacts.tulisPertanyaan("masukan NoHp anda : ");
  const email = await contacts.tulisPertanyaan("masukan email anda : ");

  contacts.simpanContact(nama,noHp,email)
};

main()
