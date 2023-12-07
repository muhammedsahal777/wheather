import express from "express";
import axios from 'axios';
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const apiKey = '2e13b3236e2e9b7ba9641b2dd4457e10';

app.get("/" , (req,res)=> {
    res.render("index.ejs");
});

app.post("/", async(req,res) => {
 const lat = req.body.lat;
 const lon= req.body.lon;
try{
        const result = await axios.get("https://api.openweathermap.org/data/2.5/weather",{
            params:{
                lon:lon,
                lat:lat,
                appid:apiKey
            }
        });
       res.render("index.ejs" , {content:JSON.stringify(result.data)});
    }catch(error){
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port,()=>{
    console.log(`your port is running on port ${port}`);
});