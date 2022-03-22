const express = require("express");
const app = express();
const axios = require('axios');
const path = require("path");

// Helmet
const helmet = require("helmet");
app.use(helmet());

//Parse json data in objects
app.use(express.json());

app.post("/", (req, res) => {
    let userURL = "";
    const query = req.body.query;
    const entity = req.body.entity;

    if(entity){
        userURL = (`https://itunes.apple.com/search?term=${query}&entity=${entity}&limit=10`);
    }
    else{
        userURL = (`https://itunes.apple.com/search?term=${query}&limit=10`);
    }

    // Return the fetched data and send it to the front-end as json
    axios.get(userURL)
        .then(response => res.json(response.data.results))
        .catch(err => err)
    }
)


// Tell heroku to deply build folder
if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
}


// Start listening to requests on port 3001
app.listen(process.env.PORT || 3001, () => {
    console.log("server started on port 3001");
})

//Resources:
// Video owner: Martand Singh
// Video title: Call External API Using Node Js https & request module
// URL: https://youtu.be/ZbtZ_79UmjI