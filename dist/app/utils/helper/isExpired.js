"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the provided expiration date has already passed.
 * @param expDate - The expiration date to compare
 * @returns true if expired, false otherwise
 */
var isExpired = function (expDate) {
    if (!expDate)
        return true; // Treat null as expired
    return new Date() > new Date(expDate);
};
exports.default = isExpired;
