var initDB = require("./init-db"),
    db = require("./database"),
    fillDB = require("./fill-test-db");

var sequelize = db.sequelize;

sequelize.authenticate().complete(function(err) {
    if (err) {
        console.log('Unable to connect to the database: ', err)
    } else {
        console.log('Connection with database has been established successfully.')
        initDB.defineTables(sequelize).then(function () {
            fillDB.fillTablesWithFakeData();
        });
    }
});