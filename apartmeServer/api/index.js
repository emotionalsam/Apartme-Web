const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/profile");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${originalname}.jpg`);
  },
});
const upload = multer({ storage: storage });

const contractStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/contracts/");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${originalname}.pdf`);
  },
});
const uploadContract = multer({ storage: contractStorage });

const postsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/posts");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${originalname}.jpg`);
  },
});
const uploadPosts = multer({ storage: postsStorage });

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "apartme",
});

con.connect();

router.get("/", function (req, res) {
  res.send("Birds home page");
});

router.post("/register", function (req, res) {
  const { name, email, pass } = req.body;
  const sql = `INSERT INTO users (email, name, pass) VALUES (?, ?, ?);`;
  bcrypt.hash(pass, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    con.query(sql, [email, name, hash], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Something wrong happened, please try again");
      }
      res.send("Account has successfully been made!");
    });
  });
});

router.post("/auth", function (req, res) {
  const { email, pass } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?;`;

  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(203).send("Something wrong happened, please try again");
    }
    if (result.length) {
      bcrypt.compare(pass, result[0].pass, (err, response) => {
        if (err) {
          console.log(err);
          return res
            .status(203)
            .send("Something wrong happened, please try again");
        }
        res.status(200).send({
          name: result[0].name,
          email: result[0].email,
          pre: result[0].pre,
          buildings: result[0].buildings ? result[0].buildings.split(",") : [],
          owner: result[0].owner,
          room: result[0].room,
          floor: result[0].floor,
          status: result[0].status,
          phone: result[0].phone,
          location: result[0].location,
          profile: result[0].profile,
          cache: result[0].cache,
        });
      });
    } else {
      res.status(203).send("No such email was found, please try again");
    }
  });
});

router.post("/pre", function (req, res) {
  let user = req.body;
  const sql = `UPDATE users SET pre = 1 WHERE email=?`;

  con.query(sql, [user.email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(203).send("Something wrong happened, please try again");
    }
    res.status(200).send({ ...user, pre: 1 });
  });
});

router.post("/getbuildings", function (req, res) {
  let { owner } = req.body;
  const sql = `SELECT * FROM buildings WHERE owner = ?`;

  con.query(sql, [owner], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(203).send("Something wrong happened, please try again");
    }
    res.status(200).send(result);
  });
});

router.post("/addbuilding", (req, res) => {
  const { user, name, location, floors, rooms } = req.body;
  const sql = `INSERT INTO buildings (owner,name,floor,rooms,location) VALUES (?,?,?,?,?);`;
  con.query(sql, [user.email, name, floors, rooms, location], (err, result) => {
    if (err) {
      return res
        .status(400)
        .send({ error: "Failed to add the building, please try again!" });
    }
    const sql2 = `UPDATE users SET buildings = ? WHERE email = ?`;
    con.query(
      sql2,
      [[...user.buildings, name].join(","), user.email],
      (err, result) => {
        if (err) {
          return res
            .status(400)
            .send({ error: "Failed to add the building, please try again!" });
        }
        res.status(200).send({ ...user, buildings: [...user.buildings, name] });
      }
    );
  });
});

router.post("/addreview", function (req, res) {
  const { email, review, rate, building, owner } = req.body;
  let sql = `SELECT review FROM reviews WHERE email = ? and building = ? and owner = ? ORDER BY date DESC`;
  con.query(sql, [email, building, owner], (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    if (result.length) {
      let sql = `UPDATE reviews SET review = ?,rate=? WHERE email = ?`;
      con.query(sql, [review, rate, email], (err, result) => {
        if (err) {
          console.log(err);
          return res.send("Something wrong happened, please try again");
        }
        res.status(200).send("Review has been submitted successfully");
      });
    } else {
      let sql = `INSERT INTO reviews (email,review,rate,building,owner) VALUES (?, ?, ?, ?, ?);`;
      con.query(sql, [email, review, rate, building, owner], (err, result) => {
        if (err) {
          console.log(err);
          return res.send("Something wrong happened, please try again");
        }
        res.status(200).send("Review has been submitted successfully");
      });
    }
  });
});

router.post("/getreview", function (req, res) {
  const { email } = req.body;
  const sql = `SELECT review,rate FROM reviews WHERE email = ? ORDER BY date DESC`;
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send(result[0]);
  });
});

router.post("/getallreviews", function (req, res) {
  const { owner } = req.body;
  const sql = `SELECT review,rate,building,email FROM reviews WHERE owner = ? ORDER BY date DESC`;
  con.query(sql, [owner], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send(result);
  });
});

router.post("/getallpeople", function (req, res) {
  const { owner, building, floor, room } = req.body;
  const sql = `SELECT email,status FROM users WHERE buildings = ? and owner = ? and floor = ? and room = ? ORDER BY date DESC`;
  con.query(sql, [building, owner, floor, room], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send(result);
  });
});
router.post("/addpeople", function (req, res) {
  const { email, floor, room, building, owner } = req.body;
  const sql = `UPDATE users SET floor = ?,room=?,buildings=?,owner=?,status="Pending" WHERE email = ? and pre = 0 `;
  con.query(sql, [floor, room, building, owner, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send("Successfull added the person");
  });
});
router.post("/updateprofile", function (req, res) {
  const { email, name, phone, location } = req.body;
  const sql = `UPDATE users SET name = ?,phone=?,location=? WHERE email = ?`;
  con.query(sql, [name, phone, location, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send("Successfull updated the person");
  });
});
router.post("/deletepeople", function (req, res) {
  const { email, status } = req.body;
  let state = status ? "Declined" : "NULL";
  const sql = `UPDATE users SET floor = NULL,room=NULL,buildings=NULL,owner=NULL,status=? WHERE email = ? `;
  con.query(sql, [state, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send("Successfull deleted the person");
  });
});

router.post("/accept", function (req, res) {
  const { email } = req.body;
  const sql = `UPDATE users SET status="Accepted" WHERE email = ? `;
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send("Successfull deleted the person");
  });
});

router.post("/getwarning", function (req, res) {
  const { owner, building, floor } = req.body;
  const sql = `SELECT * FROM warning WHERE owner = ? and building =? and floor=?`;
  con.query(sql, [owner, building, floor], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send(result.length > 0 ? result[0].description : "");
  });
});

router.post("/getallwarnings", function (req, res) {
  const { owner, building } = req.body;
  const sql = `SELECT * FROM warning WHERE owner = ? and building =?`;
  con.query(sql, [owner, building], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send(result);
  });
});

router.post("/deletewarning", function (req, res) {
  const { owner, building, floor } = req.body;
  const sql = `DELETE FROM warning WHERE owner = ? and building =? and floor=?`;
  con.query(sql, [owner, building, floor], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send("Successfully deleted the alert");
  });
});

router.post("/addwarning", function (req, res) {
  const { owner, building, floor, description } = req.body;
  let sql = `SELECT * FROM warning WHERE owner = ? and building =? and floor=?`;
  con.query(sql, [owner, building, floor], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    if (result.length > 0) {
      let sql = `UPDATE warning SET description = ? WHERE owner = ? and building =? and floor=? `;
      con.query(sql, [description, owner, building, floor], (err, result) => {
        if (err) {
          console.log(err);
          return res.send("Something wrong happened, please try again");
        }
        res.status(200).send(description);
      });
    } else {
      let sql = `INSERT INTO warning (owner,building,floor,description) VALUES (?,?,?,?)`;
      con.query(sql, [owner, building, floor, description], (err, result) => {
        if (err) {
          console.log(err);
          return res.send("Something wrong happened, please try again");
        }
        res.status(200).send(description);
      });
    }
  });
});

router.post("/uploadprofile", upload.single("profile"), function (req, res) {
  const { originalname } = req.file;
  const cache = Math.floor(Math.random() * 100);
  const sql = `UPDATE users SET profile = ?,cache=? WHERE email = ? `;
  con.query(sql, [originalname, cache, originalname], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send({ cache });
  });
});
router.post(
  "/uploadcontract",
  uploadContract.single("contract"),
  function (req, res) {
    res.status(200).send("Yes");
  }
);

router.post("/uploadposts", uploadPosts.single("posts"), function (req, res) {
  const { originalname } = req.file;
  const { title, description, floor, room, owner, building } = req.headers;
  const [email, i, indic] = originalname.split("-");
  let sql = `SELECT * FROM posts WHERE user = ? and indic =?`;
  con.query(sql, [email, indic], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    if (result.length > 0) {
      const col = i == 1 ? "b" : "c";
      let sql = `UPDATE posts SET ${col} = ? WHERE user = ? and indic =? `;
      con.query(sql, [originalname, email, indic], (err, result) => {
        if (err) {
          console.log(err);
          return res.send("Something wrong happened, please try again");
        }
        res.status(200).send("Success");
      });
    } else {
      let sql = `INSERT INTO posts (user,a,indic,title,description,floor,room,owner,building) VALUES (?,?,?,?,?,?,?,?,?)`;
      con.query(
        sql,
        [
          email,
          originalname,
          indic,
          title,
          description,
          floor,
          room,
          owner,
          building,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.send("Something wrong happened, please try again");
          }
          res.status(200).send("Success");
        }
      );
    }
  });
});

router.post("/deletepost", (req, res) => {
  const { id } = req.body;
  const sql = "DELETE FROM posts WHERE id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send("post has been deleted");
  });
});

router.post("/addnotification", (req, res) => {
  const { to, from, msg, building, state } = req.body;
  let sql;
  if (to) {
    console.log("noti to user");
    if (state) {
      sql = "INSERT INTO noti (first,second,message,state) VALUES (?,?,?,1)";
    } else {
      sql = "INSERT INTO noti (first,second,message) VALUES (?,?,?)";
    }
    con.query(sql, [from, to, msg], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Something wrong happened, please try again");
      }
      res.status(200).send("noti has been sent successfully");
    });
  } else {
    console.log("noti to building");
    if (state) {
      sql = "INSERT INTO noti (first,message,building,state) VALUES (?,?,?,1)";
    } else {
      sql = "INSERT INTO noti (first,message,building) VALUES (?,?,?)";
    }
    con.query(sql, [from, msg, building], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Something wrong happened, please try again");
      }
      res.status(200).send("noti has been sent successfully");
    });
  }
});

router.post("/getnotification", (req, res) => {
  const { email, pre, building } = req.body;
  let sql;
  if (pre) {
    sql = "SELECT * FROM noti WHERE second = ? ORDER BY id DESC";
    con.query(sql, [email], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Something wrong happened, please try again");
      }
      res.status(200).send(result);
    });
  } else {
    sql = "SELECT * FROM noti WHERE second = ? or building=? ORDER BY id DESC";
    con.query(sql, [email, building], (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Something wrong happened, please try again");
      }
      res.status(200).send(result);
    });
  }
});

router.post("/getpost", function (req, res) {
  const { email, pre } = req.body;
  console.log(email, pre);
  let sql;
  if (pre === 1) {
    sql = `SELECT * FROM posts WHERE owner = ? ORDER BY id DESC`;
  } else {
    sql = `SELECT * FROM posts WHERE user = ? ORDER BY id DESC`;
  }
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Something wrong happened, please try again");
    }
    res.status(200).send(result);
  });
});

module.exports = router;
