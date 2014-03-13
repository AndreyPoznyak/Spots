exports.defineTables = function (Sequelize, sequelize) {
    createTables(Sequelize, sequelize);
    sequelize.sync({ force: true }).complete(function(err) {
        if (err) {
            console.log('An error occurred while creating the tables:', err);
            return false;
        } else {
            console.log('All tables created!');
            return true;
        }
    });
}

function createTables(Sequelize, sequelize) {
    //tables creation
    var Coordinate = sequelize.define('Coordinate', {
        longitude: Sequelize.FLOAT,
        latitude: Sequelize.FLOAT,
        strength: Sequelize.INTEGER
    }, {
        timestamps: false
    });

    var Hotspot = sequelize.define('Hotspot', {
        name: Sequelize.STRING,
        longitude: Sequelize.FLOAT,
        latitude: Sequelize.FLOAT,
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
    Coordinate.belongsTo(Hotspot);

    User.hasMany(Hotspot);
    Hotspot.belongsTo(User);
};