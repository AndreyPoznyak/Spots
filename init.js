var Sequelize = require("sequelize");

//conneting without password
var sequelize = new Sequelize('hotspots', 'root', null, {
	dialect: "mysql"
});

sequelize.authenticate().complete(function(err) {
    if (err) {
      console.log('Unable to connect to the database: ', err)
    } else {
      console.log('Connection with database has been established successfully.')
    }
});

defineTables();

sequelize.sync({ force: true }).complete(function(err) {
	if (err) {
		console.log('An error occurred while creating the tables:', err)
	} else {
		console.log('All tables created!')
	}
});

function defineTables() {
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