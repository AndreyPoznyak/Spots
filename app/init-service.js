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

        //TODO: probably wait for operation result and then send response
        var result = dbActions.addHotSpot(JSON.parse(request.body));  //TODO: move it in one place in bodyParser
        response.send({
            success: result
        });
        return next();
    });

    server.get("/hotspots", function (request, response, next) {
        console.log("getting all hotspots");
        dbActions.getHotSpots().then(function (spots) {
            response.send({
                success: true,
                spots: spots
            });
        }, function () {
            response.send({
                success: false,
                message: "No data found"
            });
        });
        return next();
    });

    server.listen("8765", "192.168.1.7", function () {
        console.log(server.name, " is listening at ", server.url);
    });
}