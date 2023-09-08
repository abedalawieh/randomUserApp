import express from "express";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import { db } from "./db.js";
import router from "./routes/users.js";
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST,GET,PUT,DELETE"],
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../senior-project/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
app.use("/api", router);
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? ";

    db.query(sql, [username], async (err, data) => {
      if (err) {
        console.log(err);
        return res.json({ Message: "Server Side Error" });
      } else if (data.length > 0) {
        const userpass = data[0];
        const id = userpass.id;
        if (password === userpass.password) {
          // Correctly compare the passwords (not recommended for production)
          return res.status(200).json({ Status: "Success", id });
        } else {
          return res.json({
            Message:
              "Incorrect login details. Please check your password and try again",
          });
        }
      } else {
        return res.json({
          Message:
            "The profile you requested could not be found. Please ensure the information is correct and try again.",
        });
      }
    });
  } catch (e) {
    res.status(500).send("Something went wrong!!!");
  }
});

app.listen(8800, () => {
  console.log("Running on port 8800");
});
