var Sequelize = require("sequelize"),
    Q = require("q");

//connecting without password
var sequelize = new Sequelize('hotspots', 'root', null, {
    dialect: "mysql"
});

var Coordinate = sequelize.define('Coordinate', {
    longitude: Sequelize.FLOAT(15, 12),
    latitude: Sequelize.FLOAT(15, 12)
}, {
    timestamps: false
});

var Hotspot = sequelize.define('Hotspot', {
    name: Sequelize.STRING,
    bssid: Sequelize.STRING,
    longitude: Sequelize.FLOAT(15, 12),
    latitude: Sequelize.FLOAT(15, 12),
    determined: Sequelize.BOOLEAN,
    password: Sequelize.STRING
}, {
    timestamps: false
});

var User = sequelize.define('User', {
    name: Sequelize.STRING
});

//one-to-many relations
Hotspot.hasMany(Coordinate);
Coordinate.hasMany(Hotspot);

Hotspot.belongsTo(User);
User.hasMany(Hotspot);

exports.User = User;
exports.Hotspot = Hotspot;
exports.Coordinate = Coordinate;
exports.sequelize = sequelize;


var deferred = Q.defer(),
    force = false;           //forcing the tables to be created from the beggining

exports.defineTables = function () {
    sequelize.sync({ force: force }).complete(function(err) {
        if (err) {
            console.log('An error occurred while creating the tables: ', err);
            deferred.reject();
        } else {
            console.log('All tables created!');
            deferred.resolve();
        }
    });
    return deferred.promise;
};