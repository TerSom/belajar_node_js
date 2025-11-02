const yargs = require("yargs");
const {simpanContact,listContact,detailContact,deleteContact} = require("./contacts")

yargs.command({
  command : "add",
  describe : "menambahkan contact baru",
  builder : {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string"
    },
    email: {
      describe: "Email",
      demandOption: true,
      type: "string"
    },
    noHp: {
      describe: "Nomer Handphone",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    simpanContact(argv.nama,argv.email,argv.noHp)
  }
}).demandCommand()

// menampilkan daftar semua nama dan nohp contact
yargs.command({
  command : "list",
  describe : "Melihat contanct nama dan nomer nandphone",
  handler() {
    listContact()
  }
})

// menampilkan detail sebuah contact
yargs.command({
  command : "detail",
  describe : "menampilkan detail sebuah contact",
  builder : {
    email: {
      describe: "Email",
      demandOption: true,
      type: "string"
    },
  },
  handler(argv) {
    detailContact(argv.email)
  }
})

// menghapus contact berdasarkan nama
yargs.command({
  command : "delete",
  describe : "Menghapus contact berdasarkan nnama",
  builder : {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string"
    },
  },
  handler(argv) {
    deleteContact(argv.nama)
  }
})



yargs.parse()