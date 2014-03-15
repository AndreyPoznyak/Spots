var db = require("./database");

var User = db.User,
    Hotspot = db.Hotspot,
    Coordinate = db.Coordinate;

exports.fillTablesWithFakeData = function () {
    for (var i = 0; i < 100; i++) {
        User.create({
            name: "testuser" + i
        }).complete(function(error) {
            if (error) {
                console.log("User creation failed!")
            }
        });
    }
    for (var ii = 0; ii < 40; ii++) {
        Hotspot.create({
            name: "testhotspot" + ii,
            longitude: 53.9013306 + Math.random() * 0.0000001,
            latitude: 27.5694953 + Math.random() * 0.0000001,
            determined: false,
            password: "password" + ii
        }).complete(function (error) {
            if (error) {
                console.log("Hotspot creation failed!")
            }
        });
    }
};