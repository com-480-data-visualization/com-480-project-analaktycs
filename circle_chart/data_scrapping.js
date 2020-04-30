function scrape(url_){

    console.log("hello world!")

    $.get(url_, function(response) {
        //console.log(response)
    });


    const axios = require("axios");
    const fetchData = async () => {
        const result = await axios.get(url_);
         return cheerio.load(result.data);
    };

}