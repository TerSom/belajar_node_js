const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const { check, validationResult, body, Result } = require("express-validator");
const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

// setup ejs
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { max: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.listen(port, () => {
  console.log(`mongo contact App | listeing at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "terry",
      kelas: "PPLG 2",
    },
    {
      nama: "Umay",
      kelas: "PPLG 2",
    },
    {
      nama: "Somay",
      kelas: "PPLG 2",
    },
  ];

  res.render("index", {
    name: "terry",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

// halaman about
app.get("/about", (req, res, next) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// halaman contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

app.get("/contact/add", (req, res) => {
  res.render("contact-add", {
    title: "halaman add contact",
    layout: "layouts/main-layout",
  });
});

app.post(
  "/contact",
  [
    body("email").custom(async (value) => {
      const duplicate = await Contact.findOne({ email: value });
      if (duplicate) {
        throw new Error("Email sudah di gunakan");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("noHp", "nomer hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("contact-add", {
        title: "halaman add contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body).then((result) => {
        req.flash("msg", "data contact berhasil di tambahkan");
        res.redirect("/contact");
      });
    }
  }
);

app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "data contact berhasil di delete");
    res.redirect("/contact");
  });
});

app.get("/contact/edit/:email", async (req, res) => {
  const contacts = await Contact.findOne({ email: req.params.email });

  res.render("contact-edit", {
    title: "halaman edit contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

app.put(
  "/contact",
  [
    body("email").custom(async (value, { req }) => {
      const duplicate = await Contact.findOne({ email: value });

      if(value !== req.body.oldEmail && duplicate) {
        throw new Error("Email sudah di gunakan");
      }
      return true;
    }),
    check("email", "email tidak valid").isEmail(),
    check("noHp", "nomer hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("contact-edit", {
        title: "halaman edit contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contacts: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHp: req.body.noHp,
          },
        }
      ).then(() => {
        req.flash("msg", "data contact berhasil diubah");
        res.redirect("/contact");
      });
    }
  }
);

// halaman detail
app.get("/contact/:email", async (req, res) => {
  const contact = await Contact.findOne({ email: req.params.email });

  res.render("detail", {
    title: "Halaman detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});
