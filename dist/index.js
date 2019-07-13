"use strict";
var TEST;
(function (TEST) {
    var EnvEnum;
    (function (EnvEnum) {
        EnvEnum["Development"] = "DEV";
        EnvEnum["QA"] = "QA";
        EnvEnum["Staging"] = "STAGE";
        EnvEnum["Production"] = "PROD";
        EnvEnum["Unkown"] = "UNKNOWN";
    })(EnvEnum = TEST.EnvEnum || (TEST.EnvEnum = {}));
    function browserUrlProvider() {
        //private function to collect document.location info IUrlInfo params are null
        return {
            url: document.location.href,
            host: document.location.host
        };
    }
    function getEnv(urlProvider) {
        if (urlProvider == null) {
            urlProvider = browserUrlProvider();
        }
        // Uses injectiong via IUrlInfo for easier testing.
        // we can inject a mock object instead of hardcoding 
        // a dependency on a browsers document.location object
        // which may not always be available in cases of 
        // node env or in automated testing
        var returnValue;
        switch (urlProvider.host.toLowerCase()) {
            case "mysite.com":
            //fallthrough for prod
            case "login.mysite.com":
                returnValue = EnvEnum.Production;
                break;
            case "qa.mysite.com":
            //fallthrough for qa
            case "loginqa.mysite.com":
                returnValue = EnvEnum.QA;
                break;
            case "staging.mysite.com":
            //fallthrough for stage
            case "loginstaging.mysite.com":
                returnValue = EnvEnum.Staging;
                break;
            case "localhost":
            case "dev.mysite.com":
            //fallthrough for dev
            case "logindev.mysite.com":
                returnValue = EnvEnum.Development;
                break;
            default:
                returnValue = EnvEnum.Unkown;
                break;
        }
        return returnValue;
    }
    TEST.getEnv = getEnv;
})(TEST || (TEST = {}));
//# sourceMappingURL=index.js.map
