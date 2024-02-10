var express = require("express");
var mysql = require("mysql2");
var fileuploader = require("express-fileupload");
var app = express();
app.listen(2024, function () {
  console.log("Server Started");
});
app.get("/", function (req, resp) {
    resp.sendFile(process.cwd() + "/public/index.html");
  });
  app.use(express.static("public"));
  app.use(fileuploader());

app.use(express.urlencoded(true));
  //==========DataBase
  var dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "cgg@65830",
    database: "codecomets",
    dateStrings: true
  }

  var dbCon = mysql.createConnection(dbConfig);
  dbCon.connect(function (err) {
    if (err == null)
      console.log("Connected Successfully");
    else
      resp.send(err);
  })

  ///-----------Restaurant profile================================================
  app.post("/submit-process", function (req, resp) {
    //  resp.send("Data Reached");
    var fileName = "nopic.jpg";
    if (req.files != null) {
      //console.log(process.cwd());
      fileName = req.files.ppic.name;
      var path = process.cwd() + "/public/upload/" + fileName;
      req.files.ppic.mv(path);
    }
    console.log(req.files);
    var emailid = req.body.txtEmail;
    var name = req.body.txtname;
    var contact = req.body.txtcontact;
    var address = req.body.txtaddress;
    var city = req.body.combocity;
    var id = req.body.idproof;
    console.log(req.body);
    dbCon.query("insert into donors values(?,?,?,?,?,?,?)", [emailid, name, contact, address, city, id, fileName], function (err) {
      if (err == null) {
        resp.send("Record saved successfullyyyyyyy");
      }
      else {
        resp.send(err);
      }
    })
    //resp.query("Welcome"+req.body.txtEmail +" "+"Name"+req.body.txtname+" "+" Contact"+req.body.txtcontact+" "+"Adress"+req.body.txtaddress+"City"+city+"dob"+dob+"Gender"+gender+"Id"+id+"Pic"+fileName);
  });


  //===========search=====
  app.get("/json-record", function (req, resp) {
    //fixed                             //same seq. as in table
    dbCon.query("select * from donors where emailid=?", [req.query.kuchemail], function (err, resultJSONKuch) {
      if (err == null) {
        resp.send(resultJSONKuch);
      }
  
      else
        resp.send(err);
  
    })
  })


  //============Avail Food================================
  app.get("/submit", function (req, resp) {

    dbCon.query("insert into foodavailable(name,food,qty,packing,dos,status) values(?,?,?,?,current_date(),1)", [req.query.kuchname, req.query.kuchfood, req.query.kuchquantity, req.query.kuchpacking], function (err) {
      if (err == null) {
        resp.send("Record Saved successfully")
      }
      else {
        resp.send(err);
      }
    })
  
  })

  //========= rest dash=============
  app.get("/get-angular-all-records", function (req, resp) {
    //fixed                               //same seq. as in table
    dbCon.query("SELECT * FROM foodavailable;", function (err, resultTableJSON) {
      if (err == null)
        resp.send(resultTableJSON);
      else
        resp.send(err);
    })
  })


  app.get("/do-angular-delete", function (req, resp) {
    //saving data in table
    var name = req.query.namekuch;
  
  
    //fixed                             //same seq. as in table
    dbCon.query("delete from foodavailable where name=?", [name], function (err, result) {
      if (err == null) {
        if (result.affectedRows == 1)
          resp.send("Account Removed Successssfullllyyyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!");
        else
          resp.send("Inavlid Email id");
      }
      else
        resp.send(err);
    })
  })



  //=================

//======================Sign Up=================
app.get("/chk-submit", function (req, resp) {


  dbCon.query("insert into user(email,pwd,type1,dos,status) values(?,?,?,current_date(),1)", [req.query.kuchemail, req.query.kuchpwd, req.query.kuchtype], function (err) {
    if (err == null) {
      resp.send("Record Saved successfully")
      transporter.sendMail(options, function (err, info) {
        if (err) {
          console.log(err);
          return;
        }
        else
          console.log("sent: " + info.response);

      })
    }
    else {
      resp.send(err);
    }
  })
  

})
  

//==================Log In================
app.get("/chk-login-submit", function (req, resp) {
  dbCon.query("select * from user where email=? && pwd=?", [req.query.kuchemail, req.query.kuchpwd], function (err, resultJSONTable) {
    if (err == null) {
      if (resultJSONTable.length > 0) {
        if (resultJSONTable[0].status == 1) {
          resp.send(resultJSONTable[0].type1);
        }
        else {
          resp.send("USER BLOCKED");
        }
      }
      else {
        resp.send("INVALID EMAIL OR PASSWORD");
      }
    }
    else {
      resp.send(err);
    }
  });
});


//===========find Citites==========
app.get("/get-cities", function (req, resp) {
  //fixed                             //same seq. as in table
  dbCon.query("select distinct city from donors", function (err, resultTableJSON) {
    if (err == null)
      resp.send(resultTableJSON);
    else
      resp.send(err);
  })
})

//===============`
app.get("/fetch-donors", function (req, resp) {
  // console.log(req.query);
 
  var city = req.query.cityKuch;

  var query = "select * from donors  inner join foodavailable on donors.name= foodavailable.name where donors.city=?";


  dbCon.query(query, [city], function (err, resultTable) {
    // console.log(resultTable+"      "+err);
    if (err == null)
      resp.send(resultTable);
    else
      resp.send(err);
  })
})
//=================

app.post("/vol-submit-process", function (req, resp) {
  //  resp.send("Data Reached");
  var fileName = "nopic.jpg";
  if (req.files != null) {
    //console.log(process.cwd());
    fileName = req.files.ppic.name;
    var path = process.cwd() + "/public/upload/" + fileName;
    req.files.ppic.mv(path);
  }
  console.log(req.files);
  var emailid = req.body.txtEmail;
  var name = req.body.txtname;
  var contact = req.body.txtcontact;
  var address = req.body.txtaddress;
  var city = req.body.combocity;
  var id = req.body.idproof;
  console.log(req.body);
  dbCon.query("insert into volunteer values(?,?,?,?,?,?,?)", [emailid, name, contact, address, city, id, fileName], function (err) {
    if (err == null) {
      resp.send("Record saved successfullyyyyyyy");
    }
    else {
      resp.send(err);
    }
  })
  //resp.query("Welcome"+req.body.txtEmail +" "+"Name"+req.body.txtname+" "+" Contact"+req.body.txtcontact+" "+"Adress"+req.body.txtaddress+"City"+city+"dob"+dob+"Gender"+gender+"Id"+id+"Pic"+fileName);
});


//===========search=====
app.get("/json-record-2", function (req, resp) {
  //fixed                             //same seq. as in table
  dbCon.query("select * from volunteer where emailid=?", [req.query.kuchemail], function (err, resultJSONKuch) {
    if (err == null) {
      resp.send(resultJSONKuch);
    }

    else
      resp.send(err);

  })
})