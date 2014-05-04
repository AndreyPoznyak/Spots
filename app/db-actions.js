var db = require("./database"),
    _ = require("lodash");

var User = db.User,
    Hotspot = db.Hotspot,
    Coordinate = db.Coordinate;

exports.addHotSpot = function (spot) {
    Hotspot.find({
        where: {
            bssid: spot.bssid
        }
    }).success(function (foundSpot) {
        if (!foundSpot) {
            Hotspot.create({
                name: spot.name,
                longitude: spot.longitude,
                latitude: spot.latitude,
                bssid: spot.bssid,
                determined: false,
                password: "password"
            }).complete(function (error, createdSpot) {
                if (error) {
                    console.log("Hotspot creation failed!")
                } else {
                    //createdSpot.setUser();
                }
            });
        } else {
            console.log("This spot already exists in DB: ", spot.name);
        }
    });
};