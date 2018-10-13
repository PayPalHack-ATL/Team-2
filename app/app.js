const application = require("application");
const backendService = require("~/services/backend-service");

backendService.setup(); // Initialize Kinvey Backend

application.start({ moduleName: "login/login-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
