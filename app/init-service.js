var restify = require("restify"),
    dbActions = require("./db-actions");

exports.runService = function () {
    var server = restify.createServer({
        name: "Spots Service"
    });

    //TODO: add appropriate restify handlers
    server.use(restify.bodyParser()); //in order to get correct request params

    server.post("/hotspot", function (request, response, next) {
        console.log("posting hotspot:");
        console.log(request.body);
        dbActions.addHotSpot(JSON.parse(request.body));  //TODO: move it in one place in bodyParser
        response.send("success");          //TODO: return more relevant data
        return next();
    });

    server.get("/hotspots", function (request, response, next) {
        console.log("getting all hotspots");
        response.send();
        return next();
    });

    server.listen("8765", "192.168.1.7", function () {
        console.log(server.name, " is listening at ", server.url);
    });
}