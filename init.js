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

var Test = sequelize.define('Test', {
  field: Sequelize.STRING
});

sequelize.sync({ force: true }).complete(function(err) {
	if (err) {
		console.log('An error occurred while create the table:', err)
	} else {
		console.log('It worked!')
	}
});