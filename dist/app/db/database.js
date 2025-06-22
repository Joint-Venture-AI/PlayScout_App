"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../modules/users/user/user.entity");
var userProfile_entity_1 = require("../modules/users/userProfile/userProfile.entity");
var user_authentication_entity_1 = require("../modules/users/userAuthentication/user_authentication.entity");
var config_1 = require("../config");
exports.myDataSource = new typeorm_1.DataSource({
    type: config_1.appConfig.database.type,
    host: config_1.appConfig.database.host,
    port: config_1.appConfig.database.port,
    username: config_1.appConfig.database.username,
    password: config_1.appConfig.database.password,
    //password: "postgres", office
    database: config_1.appConfig.database.db_name,
    entities: [user_entity_1.User, userProfile_entity_1.UserProfile, user_authentication_entity_1.UserAuthentication],
    //logging: true,
    synchronize: true,
});
