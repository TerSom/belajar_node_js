const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const {loadContact,findContact} = require("./utils/contacts")

const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')
// third party middleware
app.use(expressEjsLayouts)

// build in middleware
app.use(express.static("public"))


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
    contacts
  })
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