var db = require("./database"),
//fillDB = require("./fill-test-db"),//it contains examples of filling DB with relevant data
    initService = require("./init-service");

var sequelize = db.sequelize;

sequelize.authenticate().complete(function(err) {
    if (err) {
        console.log('Unable to connect to the database: ', err)
    } else {
        console.log('Connection with database has been established successfully.')
        db.defineTables().then(function () {
            //fillDB.fillTablesWithFakeData();
            initService.runService();
        });
    }
});