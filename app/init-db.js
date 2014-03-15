var Q = require("q");

var deferred = Q.defer(),
    force = true;//forcing the tables to be created from the beggining

exports.defineTables = function (sequelize) {
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