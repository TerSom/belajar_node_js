const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const session = require("express-session")
const cookieParser = require("cookie-parser")
const flash = require("connect-flash")

require('./utils/db')
const Contact = require("./model/contact")

const app = express()
const port = 3000

// setup ejs
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static("public"))
app.use(express.urlencoded( {extended : true}))

app.use(cookieParser("secret"))
app.use(session({
  cookie : {max : 6000},
  secret : "secret",
  resave : true,
  saveUninitialized : true
})
)
app.use(flash())

app.listen(port, () => {
    console.log(`mongo contact App | listeing at http://localhost:${port}`)
})

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

app.get("/contact", async (req,res) => {
  const contacts = await Contact.find()

  res.render("contact", {
    title : "Halaman Contact",
    layout : 'layouts/main-layout',
    contacts,
    msg: req.flash("msg")
  })
})

app.get("/contact/:email", async (req,res) => {
  const contact = await Contact.findOne({ email : req.params.email})

  res.render("detail", {
    title : "Halaman detail Contact",
    layout : 'layouts/main-layout',
    contact
  })
})