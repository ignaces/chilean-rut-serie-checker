# chilean-rut-serie-checker
This little utility (you can call it *microservice*) serves an API that validates if the chilean oficial identity document is valid or not. It's build on Node + Puppeteer (Chrome Headless mode).


## Getting Started
You should install these dependencies to get this up and running:
* [Node 8.+](https://nodejs.org)
* [Express](https://expressjs.com/)
* [body-parser](https://www.npmjs.com/package/body-parser)


Install `Puppeteer`. Its not stable and repository is updated daily. If you want to avail the latest functionality you can install it directly from its GitHub repository. Puppeteer includes its own chrome / chromium, that is guaranteed to work headless. So each time you install / update puppeteer, it will download its specific chrome version.

```
$ npm i --save puppeteer
```


Run the code with

```
$ node index.js
```

## Usage

***GET api/validate***

Query strings:

    serie: *document serie*
    username: *identity number*
    type: *identity type*
    
Example response:
    200 OK
    
    {
        "status": false,
        "message": "Vigente"
    }
