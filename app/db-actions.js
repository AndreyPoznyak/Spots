var db = require("./database"),
    Q = require("q"),
    _ = require("lodash");

var User = db.User,
    Hotspot = db.Hotspot,
    Coordinate = db.Coordinate;

exports.addHotSpot = function (spot) {
    if (spot && spot.name && spot.bssid && spot.longitude && spot.latitude) {
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
                console.log("This spot already exists in DB: ", spot.name);  //TODO: write this logic
            }
        });
        return true;
    } else {
        console.log("Not enough info about hotspot passed!");
        return false;
    }
};

//TODO: add specific parameters
//TODO: add more info to reponse
exports.getHotSpots = function () {
    var hotspots = [],
        def = new Q.defer();

    Hotspot.findAll().success(function (spots) {
        if (spots) {
            hotspots = _.map(spots, function (spot) {
                return {
                    name: spot.name,
                    bssid: spot.bssid,
                    longitude: spot.longitude,
                    latitude: spot.latitude,
                    password: spot.password
                }
            });
            def.resolve(hotspots);
        } else {
            def.reject();
        }
    });

    return def.promise;
};