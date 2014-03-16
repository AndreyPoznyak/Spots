var Sequelize = require("sequelize");

//conneting without password
var sequelize = new Sequelize('hotspots', 'root', null, {
    dialect: "mysql"
});

var Coordinate = sequelize.define('Coordinate', {
    longitude: Sequelize.FLOAT(15, 12),
    latitude: Sequelize.FLOAT(15, 12),
    strength: Sequelize.INTEGER
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