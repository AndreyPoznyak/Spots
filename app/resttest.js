var restify = require("restify");

var server = restify.createServer({
    name: "Spots Service"
});

//server.use(restify.bodyParser());

server.get("/hello", function (request, response, next) {
    response.send("hello man");
    return next();
});

server.listen("8765", "127.0.0.1", function () {
    console.log(server.name, " is listening at ", server.url);
});