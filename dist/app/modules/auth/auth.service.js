"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var http_status_1 = __importDefault(require("http-status"));
var database_1 = require("../../db/database");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var comparePassword_1 = __importDefault(require("../../utils/helper/comparePassword"));
var isExpired_1 = __importDefault(require("../../utils/helper/isExpired"));
var user_entity_1 = require("../users/user/user.entity");
var user_authentication_entity_1 = require("../users/userAuthentication/user_authentication.entity");
var getExpiryTime_1 = __importDefault(require("../../utils/helper/getExpiryTime"));
var getOtp_1 = __importDefault(require("../../utils/helper/getOtp"));
var sendEmail_1 = require("../../utils/sendEmail");
var getHashedPassword_1 = __importDefault(require("../../utils/helper/getHashedPassword"));
var jwt_1 = require("../../utils/jwt/jwt");
var config_1 = require("../../config");
var createUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, userProfile, userAuthentication, userRepo, createUser;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {
                    email: data.email
                };
                return [4 /*yield*/, (0, getHashedPassword_1.default)(data.password)];
            case 1:
                userData = (_a.password = _b.sent(),
                    _a);
                userProfile = {
                    fullName: data.fullName,
                };
                userAuthentication = {
                    otp: (0, getOtp_1.default)(5).toString(),
                    token: null,
                    expDate: (0, getExpiryTime_1.default)(5),
                };
                userRepo = database_1.myDataSource.getRepository(user_entity_1.User);
                createUser = userRepo.create(__assign(__assign({}, userData), { userProfile: userProfile, authentication: userAuthentication }));
                return [4 /*yield*/, userRepo.save(createUser)];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var userLogin = function (loginData) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, tokenData, accessToken, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.myDataSource.getRepository(user_entity_1.User).findOne({
                    where: { email: loginData.email },
                    relations: ["userProfile", "authentication"],
                })];
            case 1:
                userData = _a.sent();
                console.log("object", userData);
                if (!userData) {
                    throw new Error("Invalid credentials: email");
                }
                return [4 /*yield*/, (0, comparePassword_1.default)(loginData.password, userData.password)];
            case 2:
                if (!(_a.sent())) {
                    throw new Error("Invalid credentials: password");
                }
                if (!userData.isVerified) {
                    throw new Error("You are not varified.");
                }
                if (userData.isBlocked) {
                    throw new Error("You are blocked");
                }
                if (userData.isDeleted) {
                    throw new Error("Account deleted");
                }
                tokenData = {
                    userRole: userData.role,
                    userEmail: userData.email,
                    userId: userData.id,
                };
                accessToken = jwt_1.jsonWebToken.generateToken(tokenData, config_1.appConfig.jwt.jwt_access_secret, config_1.appConfig.jwt.jwt_access_exprire);
                refreshToken = jwt_1.jsonWebToken.generateToken(tokenData, config_1.appConfig.jwt.jwt_refresh_secret, config_1.appConfig.jwt.jwt_refresh_exprire);
                return [2 /*return*/, {
                        userData: userData,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    }];
        }
    });
}); };
var verifyUser = function (email, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, auth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = database_1.myDataSource.getRepository(user_entity_1.User);
                return [4 /*yield*/, userRepo.findOne({
                        where: { email: email },
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User not found.");
                }
                auth = user.authentication;
                if (!auth || !auth.otp || !auth.expDate) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "No OTP request found.");
                }
                if ((0, isExpired_1.default)(auth.expDate)) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "OTP has expired.");
                }
                if (auth.otp !== otp) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "OTP is incorrect.");
                }
                if (user.isVerified) {
                    user.needToResetPass = !user.isVerified;
                }
                else {
                    user.isVerified = true;
                }
                auth.otp = null;
                auth.expDate = null;
                return [4 /*yield*/, userRepo.save(user)];
            case 2:
                _a.sent();
                return [2 /*return*/, {
                        accessToken: "",
                        refreshToken: "",
                        user: __assign(__assign({}, user), { password: "" }),
                    }];
        }
    });
}); };
var forgotPasswordRequest = function (email) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var resendCode = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, authRepo, userData, authentication, otp, expDate, updatedAuth;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = database_1.myDataSource.getRepository(user_entity_1.User);
                authRepo = database_1.myDataSource.getRepository(user_authentication_entity_1.UserAuthentication);
                return [4 /*yield*/, userRepo.findOne({ where: { email: email } })];
            case 1:
                userData = _a.sent();
                if (!userData || !userData.authentication) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User not found.");
                }
                authentication = userData.authentication;
                if (!authentication.otp) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "We can't send you code.");
                }
                if (!(0, isExpired_1.default)(authentication.expDate)) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Use your previous code. Code is still valid.");
                }
                otp = (0, getOtp_1.default)(5);
                expDate = (0, getExpiryTime_1.default)(5);
                return [4 /*yield*/, authRepo.preload({
                        id: authentication.id,
                        expDate: expDate,
                        otp: otp.toString(),
                    })];
            case 2:
                updatedAuth = _a.sent();
                if (!updatedAuth) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to send code. Try again.");
                }
                return [4 /*yield*/, database_1.myDataSource.transaction(function (transactionalEntityManager) { return __awaiter(void 0, void 0, void 0, function () {
                        var error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, (0, sendEmail_1.sendEmail)(email, "verification code", otp.toString())];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, transactionalEntityManager.save(user_authentication_entity_1.UserAuthentication, updatedAuth)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    error_1 = _a.sent();
                                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to send code. Try again.");
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 3:
                _a.sent();
                return [2 /*return*/, { message: "Code sent" }];
        }
    });
}); };
var resetPassword = function (token, userData) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var getNewAccessToken = function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
var updatePassword = function (userId, passData) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.AuthService = {
    createUser: createUser,
    userLogin: userLogin,
    verifyUser: verifyUser,
    forgotPasswordRequest: forgotPasswordRequest,
    resetPassword: resetPassword,
    getNewAccessToken: getNewAccessToken,
    updatePassword: updatePassword,
    resendCode: resendCode,
};
