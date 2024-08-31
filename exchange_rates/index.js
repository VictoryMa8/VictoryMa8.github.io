import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3023;

const apiKey = "78a4e04c3f49a8ce4698ad7a"
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// object includes name of base currency, name of comparison currency, base rate, comparison rate
let comparison = {
    compareName1: '',
    compareName2: '',
    compare1: 0,
    compare2: 0
}

// function to find the comparison
function compareEquation(compare1, compare2) {
    compare1 = compare1 * 100;
    compare2 = compare2 * 100;
    compare2 = compare2 / compare1;
    compare1 = compare1 / compare1;
    return [compare1, compare2];
}

app.get("/", async (req, res) => {
    try {
      const result = await axios.get(apiURL);
      let arrayTopTen = [
        // place, name, rate
        { place: "United States of America", name: "USD", rate: result.data.conversion_rates.USD },
        { place: "European Union", name: "EUR", rate: result.data.conversion_rates.EUR },
        { place: "Japan", name: "JPY", rate: result.data.conversion_rates.JPY },
        { place: "United Kingdom", name: "GBP", rate: result.data.conversion_rates.GBP },
        { place: "People's Republic of China", name: "CNY", rate: result.data.conversion_rates.CNY },
        { place: "Australia", name: "AUD", rate: result.data.conversion_rates.AUD },
        { place: "Canada", name: "CAD", rate: result.data.conversion_rates.CAD },
        { place: "Switzerland & Liechtenstein", name: "CHF", rate: result.data.conversion_rates.CHF },
        { place: "Hong Kong", name: "HKD", rate: result.data.conversion_rates.HKD },
        { place: "Republic of Singapore", name: "SGD", rate: result.data.conversion_rates.SGD }
    ];
    
    let compareArray = compareEquation(comparison.compare1, comparison.compare2);
    compareArray.push(comparison.compareName1);
    compareArray.push(comparison.compareName2);
    console.log(compareArray);
    
    res.render("index.ejs", { 
        data: result.data, 
        arrayTopTen: arrayTopTen,
        compareArray: compareArray
    });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
});

app.post("/compare", async (req, res) => {
    try {
        const result = await axios.get(apiURL)
        let arrayTopTen = [
            // most common place(s) of utilization, iso code, exchange rate
            { place: "United States of America", name: "USD", rate: result.data.conversion_rates.USD },
            { place: "European Union", name: "EUR", rate: result.data.conversion_rates.EUR },
            { place: "Japan", name: "JPY", rate: result.data.conversion_rates.JPY },
            { place: "United Kingdom", name: "GBP", rate: result.data.conversion_rates.GBP },
            { place: "People's Republic of China", name: "CNY", rate: result.data.conversion_rates.CNY },
            { place: "Australia", name: "AUD", rate: result.data.conversion_rates.AUD },
            { place: "Canada", name: "CAD", rate: result.data.conversion_rates.CAD },
            { place: "Switzerland & Liechtenstein", name: "CHF", rate: result.data.conversion_rates.CHF },
            { place: "Hong Kong Special Administrative Region", name: "HKD", rate: result.data.conversion_rates.HKD },
            { place: "Republic of Singapore", name: "SGD", rate: result.data.conversion_rates.SGD }
        ];

        // comparison object includes: base currency, comparison, and each of the names
        comparison.compareName1 = arrayTopTen[parseInt(req.body["compare-1"])].name;
        comparison.compareName2 = arrayTopTen[parseInt(req.body["compare-2"])].name;
        comparison.compare1 = arrayTopTen[parseInt(req.body["compare-1"])].rate;
        comparison.compare2 = arrayTopTen[parseInt(req.body["compare-2"])].rate;
        
        // redirect afterwards
        res.redirect("/");
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});