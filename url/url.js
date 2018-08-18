const url = require('url');

const parsedUrl = url.parse('https://app.pluralsight.com/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live');
console.log(parsedUrl);

//to parse query string

const parsedUrlWithQueryString = url.parse('https://app.pluralsight.com/player?course=nodejs-advanced&author=samer-buna&name=nodejs-advanced-m5&clip=4&mode=live', true);
console.log(parsedUrlWithQueryString);

//Opposite from object to url

const formattedUrl = url.format(parsedUrl);
console.log(formattedUrl);

//Object to query string

const queryString = require('querystring');

const query = queryString.stringify({
    name: 'Ands',
    web: 'asddas.cos'
});
console.log(query);

//query string to Object

const parsedQuery = queryString.parse(query);
console.log(parsedQuery);