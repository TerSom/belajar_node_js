const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const {loadContact,findContact,addContact ,cekDuplicate} = require("./utils/contacts")
const { check, validationResult , body} = require('express-validator');
const { contains } = require('validator');
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')
// third party middleware
app.use(expressEjsLayouts)

// build in middleware
app.use(express.static("public"))
app.use(express.urlencoded( {extended : true}))

// konfigurasi flash
app.use(cookieParser("secret"))
app.use(session({
  cookie : {max : 6000},
  secret : "secret",
  resave : true,
  saveUninitialized : true
})
)
app.use(flash())

app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama : "terry",
      kelas : "PPLG 2"
    },
    {
      nama : "Umay",
      kelas : "PPLG 2"
    },
    {
      nama : "Somay",
      kelas : "PPLG 2"
    },
  ]

  res.render("index", {
    name : "terry", 
    title : "Halaman Home",
    mahasiswa,
    layout : 'layouts/main-layout'
  })
})

app.get("/about", (req,res,next) => {
  res.render("about", {
    title : "Halaman About",
    layout : 'layouts/main-layout'
  })
})

app.get("/contact", (req,res) => {
  const contacts = loadContact()
  res.render("contact", {
    title : "Halaman Contact",
    layout : 'layouts/main-layout',
    contacts,
    msg: req.flash("msg")
  })
})

app.get("/contact/add", (req,res) => {
  res.render("contact-add", {
    title : "halaman add contact",
    layout : "layouts/main-layout"
  })
})

app.post('/contact', [
  body("email").custom((value) => {
    const duplicate = cekDuplicate(value)
    if (duplicate) {
      throw new Error("Email sudah di gunakan")
    }
    return true
  }),
  check("email", "email tidak valid").isEmail(),
  check("noHp", "nomer hp tidak valid").isMobilePhone("id-ID")
], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.render("contact-add", {
      title: "halaman add contact",
      layout: "layouts/main-layout",
      errors: errors.array(),
    })
  }else{
    addContact(req.body)
    req.flash("msg", "data contact berhasil di tambahkan")
    res.redirect("/contact")
  }
})



app.get("/contact/:email", (req,res) => {
  const contact = findContact(req.params.email)

  res.render("detail", {
    title : "Halaman detail Contact",
    layout : 'layouts/main-layout',
    contact
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((req,res) => {
  res.status(404)
  res.send("<h1>404 NOT FOUND</h1>")
})