const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)

app.get('/', (req, res) => {
  // res.sendFile("./index.html", {root: __dirname})

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

app.get("/about", (req,res) => {
  res.render("about", {
    title : "Halaman About",
    layout : 'layouts/main-layout'
  })
})

app.get("/contact", (req,res) => {
  res.render("contact", {
    title : "Halaman Contact",
    layout : 'layouts/main-layout'
  })
})

app.get("/product/:id", (req,res) => {
  res.send(`product ID : ${req.params.id} <br> category : ${req.query.category}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/", (req,res) => {
  res.status(404)
  res.send("<h1>404 NOT FOUND</h1>")
})