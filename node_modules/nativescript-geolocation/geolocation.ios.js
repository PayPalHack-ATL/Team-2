"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("ui/enums");
var timer_1 = require("timer");
var geolocation_common_1 = require("./geolocation.common");
var Platform = require("platform");
var locationManagers = {};
var locationListeners = {};
var watchId = 0;
var LocationListenerImpl = (function (_super) {
    __extends(LocationListenerImpl, _super);
    function LocationListenerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocationListenerImpl.initWithLocationError = function (successCallback, error) {
        var listener = LocationListenerImpl.new();
        watchId++;
        listener.id = watchId;
        listener._onLocation = successCallback;
        listener._onError = error;
        return listener;
    };
    LocationListenerImpl.initWithPromiseCallbacks = function (resolve, reject, authorizeAlways) {
        if (authorizeAlways === void 0) { authorizeAlways = false; }
        var listener = LocationListenerImpl.new();
        watchId++;
        listener.id = watchId;
        listener._resolve = resolve;
        listener._reject = reject;
        listener.authorizeAlways = authorizeAlways;
        return listener;
    };
    LocationListenerImpl.prototype.locationManagerDidUpdateLocations = function (manager, locations) {
        if (this._onLocation) {
            for (var i = 0, count = locations.count; i < count; i++) {
                var location_1 = locationFromCLLocation(locations.objectAtIndex(i));
                this._onLocation(location_1);
            }
        }
    };
    LocationListenerImpl.prototype.locationManagerDidFailWithError = function (manager, error) {
        if (this._onError) {
            this._onError(new Error(error.localizedDescription));
        }
    };
    LocationListenerImpl.prototype.locationManagerDidChangeAuthorizationStatus = function (manager, status) {
        switch (status) {
            case CLAuthorizationStatus.kCLAuthorizationStatusNotDetermined:
                break;
            case CLAuthorizationStatus.kCLAuthorizationStatusRestricted:
                break;
            case CLAuthorizationStatus.kCLAuthorizationStatusDenied:
                if (this._reject) {
                    LocationMonitor.stopLocationMonitoring(this.id);
                    this._reject(new Error("Authorization Denied."));
                }
                break;
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedAlways:
                if (this.authorizeAlways && this._resolve) {
                    LocationMonitor.stopLocationMonitoring(this.id);
                    this._resolve();
                }
                else if (this._reject) {
                    LocationMonitor.stopLocationMonitoring(this.id);
                    this._reject(new Error("Authorization Denied."));
                }
                break;
            case CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse:
                if (!this.authorizeAlways && this._resolve) {
                    LocationMonitor.stopLocationMonitoring(this.id);
                    this._resolve();
                }
                else if (this._reject) {
                    LocationMonitor.stopLocationMonitoring(this.id);
                    this._reject(new Error("Authorization Denied."));
                }
                break;
            default:
                break;
        }
    };
    LocationListenerImpl.ObjCProtocols = [CLLocationManagerDelegate];
    return LocationListenerImpl;
}(NSObject));
function locationFromCLLocation(clLocation) {
    var location = new Location();
    location.latitude = clLocation.coordinate.latitude;
    location.longitude = clLocation.coordinate.longitude;
    location.altitude = clLocation.altitude;
    location.horizontalAccuracy = clLocation.horizontalAccuracy;
    location.verticalAccuracy = clLocation.verticalAccuracy;
    location.speed = clLocation.speed;
    location.direction = clLocation.course;
    var timeIntervalSince1970 = NSDate.dateWithTimeIntervalSinceDate(0, clLocation.timestamp).timeIntervalSince1970;
    location.timestamp = new Date(timeIntervalSince1970 * 1000);
    location.ios = clLocation;
    return location;
}
function clLocationFromLocation(location) {
    var hAccuracy = location.horizontalAccuracy ? location.horizontalAccuracy : -1;
    var vAccuracy = location.verticalAccuracy ? location.verticalAccuracy : -1;
    var speed = location.speed ? location.speed : -1;
    var course = location.direction ? location.direction : -1;
    var altitude = location.altitude ? location.altitude : -1;
    var timestamp = location.timestamp ? location.timestamp : null;
    var iosLocation = CLLocation.alloc()
        .initWithCoordinateAltitudeHorizontalAccuracyVerticalAccuracyCourseSpeedTimestamp(CLLocationCoordinate2DMake(location.latitude, location.longitude), altitude, hAccuracy, vAccuracy, course, speed, timestamp);
    return iosLocation;
}
function getCurrentLocation(options) {
    return new Promise(function (resolve, reject) {
        enableLocationRequest().then(function () {
            options = options || {};
            if (options.timeout === 0) {
                var lastLocation = LocationMonitor.getLastKnownLocation();
                if (lastLocation) {
                    if (typeof options.maximumAge === "number") {
                        if (lastLocation.timestamp.valueOf() + options.maximumAge > new Date().valueOf()) {
                            resolve(lastLocation);
                        }
                        else {
                            reject(new Error("Last known location too old!"));
                        }
                    }
                    else {
                        resolve(lastLocation);
                    }
                }
                else {
                    reject(new Error("There is no last known location!"));
                }
            }
            else {
                var timerId_1;
                var locListener_1;
                var stopTimerAndMonitor_1 = function (locListenerId) {
                    if (timerId_1 !== undefined) {
                        timer_1.clearTimeout(timerId_1);
                    }
                    LocationMonitor.stopLocationMonitoring(locListenerId);
                };
                var successCallback = function (location) {
                    if (typeof options.maximumAge === "number" && location.timestamp.valueOf() + options.maximumAge < new Date().valueOf()) {
                        return;
                    }
                    stopTimerAndMonitor_1(locListener_1.id);
                    resolve(location);
                };
                locListener_1 = LocationListenerImpl.initWithLocationError(successCallback);
                try {
                    LocationMonitor.startLocationMonitoring(options, locListener_1);
                }
                catch (e) {
                    stopTimerAndMonitor_1(locListener_1.id);
                    reject(e);
                }
                if (typeof options.timeout === "number") {
                    timerId_1 = timer_1.setTimeout(function () {
                        LocationMonitor.stopLocationMonitoring(locListener_1.id);
                        reject(new Error("Timeout while searching for location!"));
                    }, options.timeout || geolocation_common_1.defaultGetLocationTimeout);
                }
            }
        }, reject);
    });
}
exports.getCurrentLocation = getCurrentLocation;
function watchLocation(successCallback, errorCallback, options) {
    var zonedSuccessCallback = global.zonedCallback(successCallback);
    var zonedErrorCallback = global.zonedCallback(errorCallback);
    var locListener = LocationListenerImpl.initWithLocationError(zonedSuccessCallback, zonedErrorCallback);
    try {
        var iosLocManager = getIOSLocationManager(locListener, options);
        iosLocManager.startUpdatingLocation();
        return locListener.id;
    }
    catch (e) {
        LocationMonitor.stopLocationMonitoring(locListener.id);
        zonedErrorCallback(e);
        return null;
    }
}
exports.watchLocation = watchLocation;
function clearWatch(_watchId) {
    LocationMonitor.stopLocationMonitoring(_watchId);
}
exports.clearWatch = clearWatch;
function enableLocationRequest(always) {
    return new Promise(function (resolve, reject) {
        if (_isEnabled()) {
            resolve();
            return;
        }
        var listener = LocationListenerImpl.initWithPromiseCallbacks(resolve, reject, always);
        try {
            var manager = getIOSLocationManager(listener, null);
            if (always) {
                manager.requestAlwaysAuthorization();
            }
            else {
                manager.requestWhenInUseAuthorization();
            }
        }
        catch (e) {
            LocationMonitor.stopLocationMonitoring(listener.id);
            reject(e);
        }
    });
}
exports.enableLocationRequest = enableLocationRequest;
function _isEnabled(options) {
    if (CLLocationManager.locationServicesEnabled()) {
        var AUTORIZED_WHEN_IN_USE = CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedWhenInUse;
        return (CLLocationManager.authorizationStatus() === AUTORIZED_WHEN_IN_USE
            || CLLocationManager.authorizationStatus() === CLAuthorizationStatus.kCLAuthorizationStatusAuthorizedAlways
            || CLLocationManager.authorizationStatus() === CLAuthorizationStatus.kCLAuthorizationStatusAuthorized);
    }
    return false;
}
function isEnabled() {
    return new Promise(function (resolve, reject) {
        resolve(_isEnabled());
    });
}
exports.isEnabled = isEnabled;
function distance(loc1, loc2) {
    if (!loc1.ios) {
        loc1.ios = clLocationFromLocation(loc1);
    }
    if (!loc2.ios) {
        loc2.ios = clLocationFromLocation(loc2);
    }
    return loc1.ios.distanceFromLocation(loc2.ios);
}
exports.distance = distance;
var LocationMonitor = (function () {
    function LocationMonitor() {
    }
    LocationMonitor.getLastKnownLocation = function () {
        var iosLocation;
        for (var locManagerId in locationManagers) {
            if (locationManagers.hasOwnProperty(locManagerId)) {
                var tempLocation = locationManagers[locManagerId].location;
                if (!iosLocation || tempLocation.timestamp > iosLocation.timestamp) {
                    iosLocation = tempLocation;
                }
            }
        }
        if (iosLocation) {
            return locationFromCLLocation(iosLocation);
        }
        var locListener = LocationListenerImpl.initWithLocationError(null);
        iosLocation = getIOSLocationManager(locListener, null).location;
        if (iosLocation) {
            return locationFromCLLocation(iosLocation);
        }
        return null;
    };
    LocationMonitor.startLocationMonitoring = function (options, locListener) {
        var iosLocManager = getIOSLocationManager(locListener, options);
        iosLocManager.startUpdatingLocation();
    };
    LocationMonitor.stopLocationMonitoring = function (iosLocManagerId) {
        if (locationManagers[iosLocManagerId]) {
            locationManagers[iosLocManagerId].stopUpdatingLocation();
            locationManagers[iosLocManagerId].delegate = null;
            delete locationManagers[iosLocManagerId];
            delete locationListeners[iosLocManagerId];
        }
    };
    LocationMonitor.createiOSLocationManager = function (locListener, options) {
        var iosLocManager = new CLLocationManager();
        iosLocManager.delegate = locListener;
        iosLocManager.desiredAccuracy = options ? options.desiredAccuracy : enums_1.Accuracy.high;
        iosLocManager.distanceFilter = options ? options.updateDistance : geolocation_common_1.minRangeUpdate;
        locationManagers[locListener.id] = iosLocManager;
        locationListeners[locListener.id] = locListener;
        if (parseInt(Platform.device.osVersion.split(".")[0]) >= 9) {
            iosLocManager.allowsBackgroundLocationUpdates =
                options && options.iosAllowsBackgroundLocationUpdates != null ?
                    options.iosAllowsBackgroundLocationUpdates : false;
        }
        iosLocManager.pausesLocationUpdatesAutomatically =
            options && options.iosPausesLocationUpdatesAutomatically != null ?
                options.iosPausesLocationUpdatesAutomatically : true;
        return iosLocManager;
    };
    return LocationMonitor;
}());
exports.LocationMonitor = LocationMonitor;
var iosLocationManager;
function getIOSLocationManager(locListener, options) {
    if (!iosLocationManager) {
        return LocationMonitor.createiOSLocationManager(locListener, options);
    }
    else {
        var manager = new iosLocationManager();
        manager.delegate = locListener;
        manager.desiredAccuracy = options ? options.desiredAccuracy : enums_1.Accuracy.high;
        manager.distanceFilter = options ? options.updateDistance : geolocation_common_1.minRangeUpdate;
        locationManagers[locListener.id] = manager;
        locationListeners[locListener.id] = locListener;
        return manager;
    }
}
function setCustomLocationManager(manager) {
    iosLocationManager = function () { return manager; };
}
exports.setCustomLocationManager = setCustomLocationManager;
var Location = (function (_super) {
    __extends(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Location;
}(geolocation_common_1.LocationBase));
exports.Location = Location;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VvbG9jYXRpb24uaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQW9DO0FBQ3BDLCtCQUFpRDtBQUVqRCwyREFJOEI7QUFNOUIsbUNBQXFDO0FBRXJDLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLElBQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUVoQjtJQUFtQyx3Q0FBUTtJQUEzQzs7SUF3RkEsQ0FBQztJQTlFaUIsMENBQXFCLEdBQW5DLFVBQW9DLGVBQW9DLEVBQ3BFLEtBQXlCO1FBQ3pCLElBQUksUUFBUSxHQUF5QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoRSxPQUFPLEVBQUUsQ0FBQztRQUNWLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVhLDZDQUF3QixHQUF0QyxVQUF1QyxPQUFtQixFQUN0RCxNQUE4QixFQUM5QixlQUFnQztRQUFoQyxnQ0FBQSxFQUFBLHVCQUFnQztRQUNoQyxJQUFJLFFBQVEsR0FBeUIsb0JBQW9CLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEUsT0FBTyxFQUFFLENBQUM7UUFDVixRQUFRLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUN0QixRQUFRLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUM1QixRQUFRLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMxQixRQUFRLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUUzQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxnRUFBaUMsR0FB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QUFjLENBQUMsQ0FBQyxDQUFDLG1DQUFjLENBQUM7UUFFM0UsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUMzQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBRWhELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztBQUNMLENBQUM7QUFHRCxrQ0FBeUMsT0FBTztJQUM1QyxrQkFBa0IsR0FBRyxjQUFjLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUZELDREQUVDO0FBRUQ7SUFBOEIsNEJBQVk7SUFBMUM7O0lBRUEsQ0FBQztJQUFELGVBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBOEIsaUNBQVksR0FFekM7QUFGWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgeyBzZXRUaW1lb3V0LCBjbGVhclRpbWVvdXQgfSBmcm9tIFwidGltZXJcIjtcbmltcG9ydCB7IHdyaXRlIH0gZnJvbSBcInRyYWNlXCI7XG5pbXBvcnQge1xuICAgIExvY2F0aW9uQmFzZSxcbiAgICBkZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0LFxuICAgIG1pblJhbmdlVXBkYXRlXG59IGZyb20gXCIuL2dlb2xvY2F0aW9uLmNvbW1vblwiO1xuaW1wb3J0IHtcbiAgICBPcHRpb25zLFxuICAgIHN1Y2Nlc3NDYWxsYmFja1R5cGUsXG4gICAgZXJyb3JDYWxsYmFja1R5cGVcbn0gZnJvbSBcIi4vbG9jYXRpb24tbW9uaXRvclwiO1xuaW1wb3J0ICogYXMgUGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG5cbmNvbnN0IGxvY2F0aW9uTWFuYWdlcnMgPSB7fTtcbmNvbnN0IGxvY2F0aW9uTGlzdGVuZXJzID0ge307XG5sZXQgd2F0Y2hJZCA9IDA7XG5cbmNsYXNzIExvY2F0aW9uTGlzdGVuZXJJbXBsIGV4dGVuZHMgTlNPYmplY3QgaW1wbGVtZW50cyBDTExvY2F0aW9uTWFuYWdlckRlbGVnYXRlIHtcbiAgICBwdWJsaWMgc3RhdGljIE9iakNQcm90b2NvbHMgPSBbQ0xMb2NhdGlvbk1hbmFnZXJEZWxlZ2F0ZV07IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dmFyaWFibGUtbmFtZVxuXG4gICAgcHVibGljIGF1dGhvcml6ZUFsd2F5czogYm9vbGVhbjtcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9vbkxvY2F0aW9uOiBzdWNjZXNzQ2FsbGJhY2tUeXBlO1xuICAgIHByaXZhdGUgX29uRXJyb3I6IGVycm9yQ2FsbGJhY2tUeXBlO1xuICAgIHByaXZhdGUgX3Jlc29sdmU6ICgpID0+IHZvaWQ7XG4gICAgcHJpdmF0ZSBfcmVqZWN0OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbml0V2l0aExvY2F0aW9uRXJyb3Ioc3VjY2Vzc0NhbGxiYWNrOiBzdWNjZXNzQ2FsbGJhY2tUeXBlLFxuICAgICAgICBlcnJvcj86IGVycm9yQ2FsbGJhY2tUeXBlKTogTG9jYXRpb25MaXN0ZW5lckltcGwge1xuICAgICAgICBsZXQgbGlzdGVuZXIgPSA8TG9jYXRpb25MaXN0ZW5lckltcGw+TG9jYXRpb25MaXN0ZW5lckltcGwubmV3KCk7XG4gICAgICAgIHdhdGNoSWQrKztcbiAgICAgICAgbGlzdGVuZXIuaWQgPSB3YXRjaElkO1xuICAgICAgICBsaXN0ZW5lci5fb25Mb2NhdGlvbiA9IHN1Y2Nlc3NDYWxsYmFjaztcbiAgICAgICAgbGlzdGVuZXIuX29uRXJyb3IgPSBlcnJvcjtcblxuICAgICAgICByZXR1cm4gbGlzdGVuZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbml0V2l0aFByb21pc2VDYWxsYmFja3MocmVzb2x2ZTogKCkgPT4gdm9pZCxcbiAgICAgICAgcmVqZWN0OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkLFxuICAgICAgICBhdXRob3JpemVBbHdheXM6IGJvb2xlYW4gPSBmYWxzZSk6IExvY2F0aW9uTGlzdGVuZXJJbXBsIHtcbiAgICAgICAgbGV0IGxpc3RlbmVyID0gPExvY2F0aW9uTGlzdGVuZXJJbXBsPkxvY2F0aW9uTGlzdGVuZXJJbXBsLm5ldygpO1xuICAgICAgICB3YXRjaElkKys7XG4gICAgICAgIGxpc3RlbmVyLmlkID0gd2F0Y2hJZDtcbiAgICAgICAgbGlzdGVuZXIuX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgICAgICBsaXN0ZW5lci5fcmVqZWN0ID0gcmVqZWN0O1xuICAgICAgICBsaXN0ZW5lci5hdXRob3JpemVBbHdheXMgPSBhdXRob3JpemVBbHdheXM7XG5cbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb2NhdGlvbk1hbmFnZXJEaWRVcGRhdGVMb2NhdGlvbnMobWFuYWdlcjogQ0xMb2NhdGlvbk1hbmFnZXIsIGxvY2F0aW9uczogTlNBcnJheTxDTExvY2F0aW9uPik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb25Mb2NhdGlvbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGNvdW50ID0gbG9jYXRpb25zLmNvdW50OyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IGxvY2F0aW9uRnJvbUNMTG9jYXRpb24oPENMTG9jYXRpb24+bG9jYXRpb25zLm9iamVjdEF0SW5kZXgoaSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uTG9jYXRpb24obG9jYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvY2F0aW9uTWFuYWdlckRpZEZhaWxXaXRoRXJyb3IobWFuYWdlcjogQ0xMb2NhdGlvbk1hbmFnZXIsIGVycm9yOiBOU0Vycm9yKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9vbkVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLl9vbkVycm9yKG5ldyBFcnJvcihlcnJvci5sb2NhbGl6ZWREZXNjcmlwdGlvbikpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGxvY2F0aW9uTWFuYWdlckRpZENoYW5nZUF1dGhvcml6YXRpb25TdGF0dXMobWFuYWdlcjogQ0xMb2NhdGlvbk1hbmFnZXIsIHN0YXR1czogQ0xBdXRob3JpemF0aW9uU3RhdHVzKSB7XG4gICAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICBjYXNlIENMQXV0aG9yaXphdGlvblN0YXR1cy5rQ0xBdXRob3JpemF0aW9uU3RhdHVzTm90RGV0ZXJtaW5lZDpcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBDTEF1dGhvcml6YXRpb25TdGF0dXMua0NMQXV0aG9yaXphdGlvblN0YXR1c1Jlc3RyaWN0ZWQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ0xBdXRob3JpemF0aW9uU3RhdHVzLmtDTEF1dGhvcml6YXRpb25TdGF0dXNEZW5pZWQ6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3JlamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyh0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVqZWN0KG5ldyBFcnJvcihcIkF1dGhvcml6YXRpb24gRGVuaWVkLlwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIENMQXV0aG9yaXphdGlvblN0YXR1cy5rQ0xBdXRob3JpemF0aW9uU3RhdHVzQXV0aG9yaXplZEFsd2F5czpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRob3JpemVBbHdheXMgJiYgdGhpcy5fcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyh0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKHRoaXMuaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWplY3QobmV3IEVycm9yKFwiQXV0aG9yaXphdGlvbiBEZW5pZWQuXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgQ0xBdXRob3JpemF0aW9uU3RhdHVzLmtDTEF1dGhvcml6YXRpb25TdGF0dXNBdXRob3JpemVkV2hlbkluVXNlOlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5hdXRob3JpemVBbHdheXMgJiYgdGhpcy5fcmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyh0aGlzLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKHRoaXMuaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZWplY3QobmV3IEVycm9yKFwiQXV0aG9yaXphdGlvbiBEZW5pZWQuXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGxvY2F0aW9uRnJvbUNMTG9jYXRpb24oY2xMb2NhdGlvbjogQ0xMb2NhdGlvbik6IExvY2F0aW9uIHtcbiAgICBsZXQgbG9jYXRpb24gPSBuZXcgTG9jYXRpb24oKTtcbiAgICBsb2NhdGlvbi5sYXRpdHVkZSA9IGNsTG9jYXRpb24uY29vcmRpbmF0ZS5sYXRpdHVkZTtcbiAgICBsb2NhdGlvbi5sb25naXR1ZGUgPSBjbExvY2F0aW9uLmNvb3JkaW5hdGUubG9uZ2l0dWRlO1xuICAgIGxvY2F0aW9uLmFsdGl0dWRlID0gY2xMb2NhdGlvbi5hbHRpdHVkZTtcbiAgICBsb2NhdGlvbi5ob3Jpem9udGFsQWNjdXJhY3kgPSBjbExvY2F0aW9uLmhvcml6b250YWxBY2N1cmFjeTtcbiAgICBsb2NhdGlvbi52ZXJ0aWNhbEFjY3VyYWN5ID0gY2xMb2NhdGlvbi52ZXJ0aWNhbEFjY3VyYWN5O1xuICAgIGxvY2F0aW9uLnNwZWVkID0gY2xMb2NhdGlvbi5zcGVlZDtcbiAgICBsb2NhdGlvbi5kaXJlY3Rpb24gPSBjbExvY2F0aW9uLmNvdXJzZTtcbiAgICBsZXQgdGltZUludGVydmFsU2luY2UxOTcwID0gTlNEYXRlLmRhdGVXaXRoVGltZUludGVydmFsU2luY2VEYXRlKDAsIGNsTG9jYXRpb24udGltZXN0YW1wKS50aW1lSW50ZXJ2YWxTaW5jZTE5NzA7XG4gICAgbG9jYXRpb24udGltZXN0YW1wID0gbmV3IERhdGUodGltZUludGVydmFsU2luY2UxOTcwICogMTAwMCk7XG4gICAgbG9jYXRpb24uaW9zID0gY2xMb2NhdGlvbjtcbiAgICByZXR1cm4gbG9jYXRpb247XG59XG5cbmZ1bmN0aW9uIGNsTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jYXRpb246IExvY2F0aW9uKTogQ0xMb2NhdGlvbiB7XG4gICAgbGV0IGhBY2N1cmFjeSA9IGxvY2F0aW9uLmhvcml6b250YWxBY2N1cmFjeSA/IGxvY2F0aW9uLmhvcml6b250YWxBY2N1cmFjeSA6IC0xO1xuICAgIGxldCB2QWNjdXJhY3kgPSBsb2NhdGlvbi52ZXJ0aWNhbEFjY3VyYWN5ID8gbG9jYXRpb24udmVydGljYWxBY2N1cmFjeSA6IC0xO1xuICAgIGxldCBzcGVlZCA9IGxvY2F0aW9uLnNwZWVkID8gbG9jYXRpb24uc3BlZWQgOiAtMTtcbiAgICBsZXQgY291cnNlID0gbG9jYXRpb24uZGlyZWN0aW9uID8gbG9jYXRpb24uZGlyZWN0aW9uIDogLTE7XG4gICAgbGV0IGFsdGl0dWRlID0gbG9jYXRpb24uYWx0aXR1ZGUgPyBsb2NhdGlvbi5hbHRpdHVkZSA6IC0xO1xuICAgIGxldCB0aW1lc3RhbXAgPSBsb2NhdGlvbi50aW1lc3RhbXAgPyBsb2NhdGlvbi50aW1lc3RhbXAgOiBudWxsO1xuICAgIGxldCBpb3NMb2NhdGlvbiA9IENMTG9jYXRpb24uYWxsb2MoKVxuICAgICAgICAuaW5pdFdpdGhDb29yZGluYXRlQWx0aXR1ZGVIb3Jpem9udGFsQWNjdXJhY3lWZXJ0aWNhbEFjY3VyYWN5Q291cnNlU3BlZWRUaW1lc3RhbXAoXG4gICAgICAgIENMTG9jYXRpb25Db29yZGluYXRlMkRNYWtlKGxvY2F0aW9uLmxhdGl0dWRlLCBsb2NhdGlvbi5sb25naXR1ZGUpLFxuICAgICAgICBhbHRpdHVkZSxcbiAgICAgICAgaEFjY3VyYWN5LFxuICAgICAgICB2QWNjdXJhY3ksXG4gICAgICAgIGNvdXJzZSxcbiAgICAgICAgc3BlZWQsXG4gICAgICAgIHRpbWVzdGFtcFxuICAgICAgICApO1xuICAgIHJldHVybiBpb3NMb2NhdGlvbjtcbn1cblxuLy8gb3B0aW9ucyAtIGRlc2lyZWRBY2N1cmFjeSwgdXBkYXRlRGlzdGFuY2UsIG1pbmltdW1VcGRhdGVUaW1lLCBtYXhpbXVtQWdlLCB0aW1lb3V0XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKG9wdGlvbnM6IE9wdGlvbnMpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRpbWVvdXQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBzaG91bGQgdGFrZSBhbnkgY2FjaGVkIGxvY2F0aW9uIGUuZy4gbGFzdEtub3duTG9jYXRpb25cbiAgICAgICAgICAgICAgICBsZXQgbGFzdExvY2F0aW9uID0gTG9jYXRpb25Nb25pdG9yLmdldExhc3RLbm93bkxvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4aW11bUFnZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RMb2NhdGlvbi50aW1lc3RhbXAudmFsdWVPZigpICsgb3B0aW9ucy5tYXhpbXVtQWdlID4gbmV3IERhdGUoKS52YWx1ZU9mKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGxhc3RMb2NhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJMYXN0IGtub3duIGxvY2F0aW9uIHRvbyBvbGQhXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobGFzdExvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJUaGVyZSBpcyBubyBsYXN0IGtub3duIGxvY2F0aW9uIVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdGltZXJJZDtcbiAgICAgICAgICAgICAgICBsZXQgbG9jTGlzdGVuZXI7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RvcFRpbWVyQW5kTW9uaXRvciA9IGZ1bmN0aW9uIChsb2NMaXN0ZW5lcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxvY0xpc3RlbmVySWQpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBsZXQgc3VjY2Vzc0NhbGxiYWNrID0gZnVuY3Rpb24gKGxvY2F0aW9uOiBMb2NhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4aW11bUFnZSA9PT0gXCJudW1iZXJcIiAmJiBsb2NhdGlvbi50aW1lc3RhbXAudmFsdWVPZigpICsgb3B0aW9ucy5tYXhpbXVtQWdlIDwgbmV3IERhdGUoKS52YWx1ZU9mKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybmVkIGxvY2F0aW9uIGlzIHRvbyBvbGQsIGJ1dCB3ZSBzdGlsbCBoYXZlIHNvbWUgdGltZSBiZWZvcmUgdGhlIHRpbWVvdXQgc28gbWF5YmUgd2FpdCBhIGJpdD9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHN0b3BUaW1lckFuZE1vbml0b3IobG9jTGlzdGVuZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbG9jTGlzdGVuZXIgPSBMb2NhdGlvbkxpc3RlbmVySW1wbC5pbml0V2l0aExvY2F0aW9uRXJyb3Ioc3VjY2Vzc0NhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RhcnRMb2NhdGlvbk1vbml0b3Jpbmcob3B0aW9ucywgbG9jTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcFRpbWVyQW5kTW9uaXRvcihsb2NMaXN0ZW5lci5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMudGltZW91dCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyhsb2NMaXN0ZW5lci5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiVGltZW91dCB3aGlsZSBzZWFyY2hpbmcgZm9yIGxvY2F0aW9uIVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZW91dCB8fCBkZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3YXRjaExvY2F0aW9uKHN1Y2Nlc3NDYWxsYmFjazogc3VjY2Vzc0NhbGxiYWNrVHlwZSxcbiAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrVHlwZSxcbiAgICBvcHRpb25zOiBPcHRpb25zKTogbnVtYmVyIHtcbiAgICBsZXQgem9uZWRTdWNjZXNzQ2FsbGJhY2sgPSAoPGFueT5nbG9iYWwpLnpvbmVkQ2FsbGJhY2soc3VjY2Vzc0NhbGxiYWNrKTtcbiAgICBsZXQgem9uZWRFcnJvckNhbGxiYWNrID0gKDxhbnk+Z2xvYmFsKS56b25lZENhbGxiYWNrKGVycm9yQ2FsbGJhY2spO1xuICAgIGxldCBsb2NMaXN0ZW5lciA9IExvY2F0aW9uTGlzdGVuZXJJbXBsLmluaXRXaXRoTG9jYXRpb25FcnJvcih6b25lZFN1Y2Nlc3NDYWxsYmFjaywgem9uZWRFcnJvckNhbGxiYWNrKTtcbiAgICB0cnkge1xuICAgICAgICBsZXQgaW9zTG9jTWFuYWdlciA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgICAgIGlvc0xvY01hbmFnZXIuc3RhcnRVcGRhdGluZ0xvY2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBsb2NMaXN0ZW5lci5pZDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxvY0xpc3RlbmVyLmlkKTtcbiAgICAgICAgem9uZWRFcnJvckNhbGxiYWNrKGUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhcldhdGNoKF93YXRjaElkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBMb2NhdGlvbk1vbml0b3Iuc3RvcExvY2F0aW9uTW9uaXRvcmluZyhfd2F0Y2hJZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVMb2NhdGlvblJlcXVlc3QoYWx3YXlzPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsaXN0ZW5lciA9IExvY2F0aW9uTGlzdGVuZXJJbXBsLmluaXRXaXRoUHJvbWlzZUNhbGxiYWNrcyhyZXNvbHZlLCByZWplY3QsIGFsd2F5cyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgbWFuYWdlciA9IGdldElPU0xvY2F0aW9uTWFuYWdlcihsaXN0ZW5lciwgbnVsbCk7XG4gICAgICAgICAgICBpZiAoYWx3YXlzKSB7XG4gICAgICAgICAgICAgICAgbWFuYWdlci5yZXF1ZXN0QWx3YXlzQXV0aG9yaXphdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYW5hZ2VyLnJlcXVlc3RXaGVuSW5Vc2VBdXRob3JpemF0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIExvY2F0aW9uTW9uaXRvci5zdG9wTG9jYXRpb25Nb25pdG9yaW5nKGxpc3RlbmVyLmlkKTtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfaXNFbmFibGVkKG9wdGlvbnM/OiBPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgaWYgKENMTG9jYXRpb25NYW5hZ2VyLmxvY2F0aW9uU2VydmljZXNFbmFibGVkKCkpIHtcbiAgICAgICAgLy8gQ0xBdXRob3JpemF0aW9uU3RhdHVzLmtDTEF1dGhvcml6YXRpb25TdGF0dXNBdXRob3JpemVkV2hlbkluVXNlIGFuZFxuICAgICAgICAvLyBDTEF1dGhvcml6YXRpb25TdGF0dXMua0NMQXV0aG9yaXphdGlvblN0YXR1c0F1dGhvcml6ZWRBbHdheXMgYXJlIG9wdGlvbnMgdGhhdCBhcmUgYXZhaWxhYmxlIGluIGlPUyA4LjArXG4gICAgICAgIC8vIHdoaWxlIENMQXV0aG9yaXphdGlvblN0YXR1cy5rQ0xBdXRob3JpemF0aW9uU3RhdHVzQXV0aG9yaXplZCBpcyBoZXJlIHRvIHN1cHBvcnQgaU9TIDguMC0uXG4gICAgICAgIGNvbnN0IEFVVE9SSVpFRF9XSEVOX0lOX1VTRSA9IENMQXV0aG9yaXphdGlvblN0YXR1cy5rQ0xBdXRob3JpemF0aW9uU3RhdHVzQXV0aG9yaXplZFdoZW5JblVzZTtcblxuICAgICAgICByZXR1cm4gKENMTG9jYXRpb25NYW5hZ2VyLmF1dGhvcml6YXRpb25TdGF0dXMoKSA9PT0gQVVUT1JJWkVEX1dIRU5fSU5fVVNFXG4gICAgICAgICAgICB8fCBDTExvY2F0aW9uTWFuYWdlci5hdXRob3JpemF0aW9uU3RhdHVzKCkgPT09IENMQXV0aG9yaXphdGlvblN0YXR1cy5rQ0xBdXRob3JpemF0aW9uU3RhdHVzQXV0aG9yaXplZEFsd2F5c1xuICAgICAgICAgICAgfHwgQ0xMb2NhdGlvbk1hbmFnZXIuYXV0aG9yaXphdGlvblN0YXR1cygpID09PSBDTEF1dGhvcml6YXRpb25TdGF0dXMua0NMQXV0aG9yaXphdGlvblN0YXR1c0F1dGhvcml6ZWQpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VuYWJsZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVzb2x2ZShfaXNFbmFibGVkKCkpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2UobG9jMTogTG9jYXRpb24sIGxvYzI6IExvY2F0aW9uKTogbnVtYmVyIHtcbiAgICBpZiAoIWxvYzEuaW9zKSB7XG4gICAgICAgIGxvYzEuaW9zID0gY2xMb2NhdGlvbkZyb21Mb2NhdGlvbihsb2MxKTtcbiAgICB9XG4gICAgaWYgKCFsb2MyLmlvcykge1xuICAgICAgICBsb2MyLmlvcyA9IGNsTG9jYXRpb25Gcm9tTG9jYXRpb24obG9jMik7XG4gICAgfVxuICAgIHJldHVybiBsb2MxLmlvcy5kaXN0YW5jZUZyb21Mb2NhdGlvbihsb2MyLmlvcyk7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhdGlvbk1vbml0b3Ige1xuICAgIHN0YXRpYyBnZXRMYXN0S25vd25Mb2NhdGlvbigpOiBMb2NhdGlvbiB7XG4gICAgICAgIGxldCBpb3NMb2NhdGlvbjogQ0xMb2NhdGlvbjtcbiAgICAgICAgZm9yIChsZXQgbG9jTWFuYWdlcklkIGluIGxvY2F0aW9uTWFuYWdlcnMpIHtcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbk1hbmFnZXJzLmhhc093blByb3BlcnR5KGxvY01hbmFnZXJJZCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcExvY2F0aW9uID0gbG9jYXRpb25NYW5hZ2Vyc1tsb2NNYW5hZ2VySWRdLmxvY2F0aW9uO1xuICAgICAgICAgICAgICAgIGlmICghaW9zTG9jYXRpb24gfHwgdGVtcExvY2F0aW9uLnRpbWVzdGFtcCA+IGlvc0xvY2F0aW9uLnRpbWVzdGFtcCkge1xuICAgICAgICAgICAgICAgICAgICBpb3NMb2NhdGlvbiA9IHRlbXBMb2NhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW9zTG9jYXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBsb2NhdGlvbkZyb21DTExvY2F0aW9uKGlvc0xvY2F0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb2NMaXN0ZW5lciA9IExvY2F0aW9uTGlzdGVuZXJJbXBsLmluaXRXaXRoTG9jYXRpb25FcnJvcihudWxsKTtcbiAgICAgICAgaW9zTG9jYXRpb24gPSBnZXRJT1NMb2NhdGlvbk1hbmFnZXIobG9jTGlzdGVuZXIsIG51bGwpLmxvY2F0aW9uO1xuXG4gICAgICAgIGlmIChpb3NMb2NhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uRnJvbUNMTG9jYXRpb24oaW9zTG9jYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBzdGFydExvY2F0aW9uTW9uaXRvcmluZyhvcHRpb25zOiBPcHRpb25zLCBsb2NMaXN0ZW5lcjogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBpb3NMb2NNYW5hZ2VyID0gZ2V0SU9TTG9jYXRpb25NYW5hZ2VyKGxvY0xpc3RlbmVyLCBvcHRpb25zKTtcbiAgICAgICAgaW9zTG9jTWFuYWdlci5zdGFydFVwZGF0aW5nTG9jYXRpb24oKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3RvcExvY2F0aW9uTW9uaXRvcmluZyhpb3NMb2NNYW5hZ2VySWQ6IG51bWJlcikge1xuICAgICAgICBpZiAobG9jYXRpb25NYW5hZ2Vyc1tpb3NMb2NNYW5hZ2VySWRdKSB7XG4gICAgICAgICAgICBsb2NhdGlvbk1hbmFnZXJzW2lvc0xvY01hbmFnZXJJZF0uc3RvcFVwZGF0aW5nTG9jYXRpb24oKTtcbiAgICAgICAgICAgIGxvY2F0aW9uTWFuYWdlcnNbaW9zTG9jTWFuYWdlcklkXS5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICAgICAgICBkZWxldGUgbG9jYXRpb25NYW5hZ2Vyc1tpb3NMb2NNYW5hZ2VySWRdO1xuICAgICAgICAgICAgZGVsZXRlIGxvY2F0aW9uTGlzdGVuZXJzW2lvc0xvY01hbmFnZXJJZF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlaU9TTG9jYXRpb25NYW5hZ2VyKGxvY0xpc3RlbmVyOiBhbnksIG9wdGlvbnM6IE9wdGlvbnMpOiBDTExvY2F0aW9uTWFuYWdlciB7XG4gICAgICAgIGxldCBpb3NMb2NNYW5hZ2VyID0gbmV3IENMTG9jYXRpb25NYW5hZ2VyKCk7XG4gICAgICAgIGlvc0xvY01hbmFnZXIuZGVsZWdhdGUgPSBsb2NMaXN0ZW5lcjtcbiAgICAgICAgaW9zTG9jTWFuYWdlci5kZXNpcmVkQWNjdXJhY3kgPSBvcHRpb25zID8gb3B0aW9ucy5kZXNpcmVkQWNjdXJhY3kgOiBBY2N1cmFjeS5oaWdoO1xuICAgICAgICBpb3NMb2NNYW5hZ2VyLmRpc3RhbmNlRmlsdGVyID0gb3B0aW9ucyA/IG9wdGlvbnMudXBkYXRlRGlzdGFuY2UgOiBtaW5SYW5nZVVwZGF0ZTtcbiAgICAgICAgbG9jYXRpb25NYW5hZ2Vyc1tsb2NMaXN0ZW5lci5pZF0gPSBpb3NMb2NNYW5hZ2VyO1xuICAgICAgICBsb2NhdGlvbkxpc3RlbmVyc1tsb2NMaXN0ZW5lci5pZF0gPSBsb2NMaXN0ZW5lcjtcbiAgICAgICAgaWYgKHBhcnNlSW50KFBsYXRmb3JtLmRldmljZS5vc1ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdKSA+PSA5KSB7XG4gICAgICAgICAgICBpb3NMb2NNYW5hZ2VyLmFsbG93c0JhY2tncm91bmRMb2NhdGlvblVwZGF0ZXMgPVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgJiYgb3B0aW9ucy5pb3NBbGxvd3NCYWNrZ3JvdW5kTG9jYXRpb25VcGRhdGVzICE9IG51bGwgP1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuaW9zQWxsb3dzQmFja2dyb3VuZExvY2F0aW9uVXBkYXRlcyA6IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlvc0xvY01hbmFnZXIucGF1c2VzTG9jYXRpb25VcGRhdGVzQXV0b21hdGljYWxseSA9XG4gICAgICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuaW9zUGF1c2VzTG9jYXRpb25VcGRhdGVzQXV0b21hdGljYWxseSAhPSBudWxsID9cbiAgICAgICAgICAgIG9wdGlvbnMuaW9zUGF1c2VzTG9jYXRpb25VcGRhdGVzQXV0b21hdGljYWxseSA6IHRydWU7XG4gICAgICAgIHJldHVybiBpb3NMb2NNYW5hZ2VyO1xuICAgIH1cbn1cblxubGV0IGlvc0xvY2F0aW9uTWFuYWdlcjogYW55O1xuXG5mdW5jdGlvbiBnZXRJT1NMb2NhdGlvbk1hbmFnZXIobG9jTGlzdGVuZXI6IGFueSwgb3B0aW9uczogT3B0aW9ucyk6IENMTG9jYXRpb25NYW5hZ2VyIHtcbiAgICBpZiAoIWlvc0xvY2F0aW9uTWFuYWdlcikge1xuICAgICAgICByZXR1cm4gTG9jYXRpb25Nb25pdG9yLmNyZWF0ZWlPU0xvY2F0aW9uTWFuYWdlcihsb2NMaXN0ZW5lciwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG1hbmFnZXIgPSBuZXcgaW9zTG9jYXRpb25NYW5hZ2VyKCk7XG5cbiAgICAgICAgbWFuYWdlci5kZWxlZ2F0ZSA9IGxvY0xpc3RlbmVyO1xuICAgICAgICBtYW5hZ2VyLmRlc2lyZWRBY2N1cmFjeSA9IG9wdGlvbnMgPyBvcHRpb25zLmRlc2lyZWRBY2N1cmFjeSA6IEFjY3VyYWN5LmhpZ2g7XG4gICAgICAgIG1hbmFnZXIuZGlzdGFuY2VGaWx0ZXIgPSBvcHRpb25zID8gb3B0aW9ucy51cGRhdGVEaXN0YW5jZSA6IG1pblJhbmdlVXBkYXRlO1xuXG4gICAgICAgIGxvY2F0aW9uTWFuYWdlcnNbbG9jTGlzdGVuZXIuaWRdID0gbWFuYWdlcjtcbiAgICAgICAgbG9jYXRpb25MaXN0ZW5lcnNbbG9jTGlzdGVuZXIuaWRdID0gbG9jTGlzdGVuZXI7XG5cbiAgICAgICAgcmV0dXJuIG1hbmFnZXI7XG4gICAgfVxufVxuXG4vLyB1c2VkIGZvciB0ZXN0cyBvbmx5XG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VzdG9tTG9jYXRpb25NYW5hZ2VyKG1hbmFnZXIpIHtcbiAgICBpb3NMb2NhdGlvbk1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYW5hZ2VyOyB9O1xufVxuXG5leHBvcnQgY2xhc3MgTG9jYXRpb24gZXh0ZW5kcyBMb2NhdGlvbkJhc2Uge1xuICAgIHB1YmxpYyBpb3M6IENMTG9jYXRpb247ICAgICAgLy8gaU9TIG5hdGl2ZSBsb2NhdGlvblxufSJdfQ==