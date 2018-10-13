const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const kinveyAppKey = "kid_SyY8LYO8M";
const kinveyAppSecret = "09282985d7c540f7b076a9c7fd884c77";
const kinveyUsername = "admin";
const kinveyPassword = "admin";

exports.setup = function () {
    Kinvey.init({
        appKey: kinveyAppKey,
        appSecret: kinveyAppSecret
    });
    console.log("some message")
};
