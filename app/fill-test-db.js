var db = require("./database");

var User = db.User,
    Hotspot = db.Hotspot,
    Coordinate = db.Coordinate;

exports.fillTablesWithFakeData = function () {
    createSomeData();
};

function createSomeData () {
    var randomNumber = 0,
        index,
        spots = [],
        users = [];

    for (index = 0; index < 20; index++) {
        User.create({
            name: "testuser" + index
        }).complete(function(error, user) {
            if (error) {
                console.log("User creation failed!")
            } else {
                users.push(user);
            }
        });
    }

    for (index = 0; index < 40; index++) {
        randomNumber = Math.random();
        Hotspot.create({
            name: "testhotspot" + index,
            //longitude: 53.9013306 + randomNumber * 0.0001,
            //latitude: 27.5694953 + randomNumber * 0.0001,
            bssid: "00:0f:b5:" + parseInt(Math.random() * 100) + ":" + parseInt(Math.random() * 100) + ":" + parseInt(randomNumber * 100),
            determined: false,
            password: "password" + index
        }).complete(function (error, spot) {
            if (error) {
                console.log("Hotspot creation failed!")
            } else {
                spot.setUser(users[parseInt(Math.random() * 19)]);
                spots.push(spot);
            }
        });
    }

    for (index = 0; index < 100; index++) {
        randomNumber = Math.random();
        Coordinate.create({
            longitude: 53.9013306 + randomNumber * 0.0001,
            latitude: 27.5694953 + randomNumber * 0.0001,
            strength: parseInt(randomNumber * 100)
        }).complete(function (error, coordinate) {
            if (error) {
                console.log("Coordinate creation failed");
            } else {
                coordinate.setHotspots([spots[parseInt(Math.random() * 39)]])
            }
        });
    }
};