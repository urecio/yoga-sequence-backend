/**
 * Module to register custom dynamic roles
 *
 * @param app
 */

module.exports = function(app) {

  /**
   * Registers $active role
   */
   var Role = app.models.Role;
   var util = require("util");

  Role.registerResolver('$inactive', function(role, context, next) {
    console.log(util.inspect(context, {showHidden: true, depth:0}));
  });
};
