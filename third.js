const express =require("express");
const bodyParser = require("body-parser");
const request =require("request");
const https = require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
  res.sendFile(__dirname + "/first.html");
});
app.post("/",function(req, res){
  const name=req.body.fname;
  const email=req.body.memail;
 const pass=req.body.mpass;
  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name,
      PHONE: pass,
      }
    }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/5ec029a2d7";
  const options = {
    method: "POST",
    auth: "sudhanshu:1ca3f8f07884b382c790cb46e6dfb5e7-us7"
  };
 const request=https.request(url,options,function(response){
if(response.statusCode === 200)
{
  res.sendFile(__dirname + "/success.html");
}
else {
  res.sendFile(__dirname + "/failure.html");
}

 });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});
