"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_route_1 = require("../modules/users/user/user.route");
var auth_route_1 = require("../modules/auth/auth.route");
var userProfile_route_1 = require("../modules/users/userProfile/userProfile.route");
var router = (0, express_1.Router)();
var apiRoutes = [
    { path: "/user", route: user_route_1.UserRoute },
    { path: "/user", route: userProfile_route_1.UserProfileRoute },
    { path: "/auth", route: auth_route_1.AuthRoute },
];
apiRoutes.forEach(function (route) { return router.use(route.path, route.route); });
exports.default = router;
