const assert = require("chai").assert;
const axios = require('axios');

async function axiosFetch(){
    const query = "the weeknd";
    const entity = "album";
    const userURL = `https://itunes.apple.com/search?term=${query}&entity=${entity}&limit=10`;

    const data = await axios.get(userURL);
    return data;
}


describe("App",() => {
    it("axios fetch should return an array of objects",() => {
        assert.typeOf(axiosFetch(),'promise');
    })
})


// Resources:
// Video owner: Traversy Media
// Video title: Intro To JavaScript Unit Testing With Mocha JS & Chai
// URL: https://youtu.be/MLTRHc5dk6s