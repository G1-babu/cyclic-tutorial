const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    
    console.log(firstname,lastname,email);

    const data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url  =  "https://us9.api.mailchimp.com/3.0/lists/62a2fb5224";

    const options = {
        method:"POST",
        auth:"jeevan5:6bd1a9143f0747befc090ea6de61f1d5-us9"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});



app.listen(3000 || process.env.PORT ,function(req,res){
    console.log("Server is running on port 3000");
});

// API Key 6bd1a9143f0747befc090ea6de61f1d5-us9

// List ID 62a2fb5224
