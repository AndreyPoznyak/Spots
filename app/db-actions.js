var db = require("./database"),
    Q = require("q"),
    _ = require("lodash");

var User = db.User,
    Hotspot = db.Hotspot,
    Coordinate = db.Coordinate;

exports.addHotSpot = function (spot) {
    if (spot && spot.name && spot.bssid && spot.longitude && spot.latitude && spot.username) {
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
                        checkSpotsUser(createdSpot, spot.username);//setting up relation to user
                        addCoordinate(spot, createdSpot);  //setting up relation to coordinate
                    }
                });
            } else {
                console.log("This spot already exists in DB: ", spot.name);
                addCoordinate(spot, foundSpot);
                //TODO: count more precise position here
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

function checkSpotsUser(spot, user) {
    User.find({
        where: {
            name: user
        }
    }).success(function (foundUser) {
        if (!foundUser) {
            User.create({
                name: user
            }).complete(function (error, createdUser) {
                if (error) {
                    console.log("New user wasn't added to table for some reason")
                } else {
                    spot.setUser(createdUser);
                }
            });
        } else {
            spot.setUser(foundUser);
        }
    });
};

function addCoordinate(coords, spot) {
    Coordinate.find({
        where: {
            latitude: coords.latitude,
            longitude: coords.longitude
        }
    }).success(function (foundCoordinate) {
        if (foundCoordinate) {
            console.log("Such coordinate already exists btw");
            foundCoordinate.setHotspots([spot]);
        } else {
            Coordinate.create({
                latitude: coords.latitude,
                longitude: coords.longitude
            }).complete(function (error, coordinate) {
                if (error) {
                    console.log("New coordinate wasn't added to table")
                } else {
                    coordinate.setHotspots([spot]);
                }
            });
        }
    });
};