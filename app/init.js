var Sequelize = require("sequelize"),
    initDB = require("./init-db");

//conneting without password
var sequelize = new Sequelize('hotspots', 'root', null, {
	dialect: "mysql"
});

sequelize.authenticate().complete(function(err) {
    if (err) {
        console.log('Unable to connect to the database: ', err)
    } else {
        console.log('Connection with database has been established successfully.')
        initDB.defineTables(Sequelize, sequelize);
    }
});