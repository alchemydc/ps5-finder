/* find ps5's and notify to discord
   first query vendor, parse HTML, and notify if in stock
*/

const axios = require('axios').default;
// axios.<method> will now provide autocomplete and parameter typings

const AMAZON_URI: string = 'https://www.amazon.com/dp/B08FC6MR62';
const AMAZON_NO_STOCK: string = 'Currently unavailable';

const VENDOR: { name: string, url: string, out_of_stock_string: string } [] = [
    { "name": "amazon", "url": "https://www.amazon.com/dp/B08FC6MR62", "out_of_stock_string": "Currently unavailable" },
    { "name": "bestbuy", "url": "https://www.bestbuy.com/site/sony-playstation-5-digital-edition-console/6430161.p?skuId=6430161", "out_of_stock_string": "Sold Out" },
    //{ "name": "walmart", "url": "https://www.walmart.com/ip/Sony-PlayStation-5-Video-Game-Console/165545420", "out_of_stock_string": "Sold out" },
    { "name": "gamestop", "url": "https://www.gamestop.com/consoles-hardware/playstation-5/consoles/products/playstation-5/229025.html", "out_of_stock_string": "Out of stock" },
    //{ "name": "target", "url": "https://www.target.com/p/playstation-5-console/-/A-81114595", "out_of_stock_string": "product not available" },
    ];


// main
let message: string = 'Hello, World!';
console.log(message);

for(let vendor of VENDOR){
    console.log('Checking PS5 stock for ' + vendor.name + ' at url ' + vendor.url + ' using checkstring "' + vendor.out_of_stock_string + '"');
    getURL(vendor.url).then(res => parseResponse(vendor.name, vendor.url, vendor.out_of_stock_string, res));
    
}

// end main

async function getURL(uri:string) {
    try {
      const response = await axios.get(uri);
      console.log('request successful');
      //console.log(response.data);
      return(response.data);

    } catch (error) {
      console.log('error caught');
      console.error(error);
      process.exit(1)
    }
  }

function parseResponse(name: string, url: string, out_of_stock_string: string, response: string) {
    if (response.search(out_of_stock_string) == -1) {
        console.log('In stock!!!');
        sendAlert('PS5 found at ' + name + ': ' + url)
    } else {
        console.log(name + ' is out of stock :(');
    } 
}

function sendAlert(message: string) {
    console.log(message)
}


