"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("application");
var enums_1 = require("ui/enums");
var timer_1 = require("timer");
var geolocation_common_1 = require("./geolocation.common");
var permissions = require("nativescript-permissions");
var REQUEST_ENABLE_LOCATION = 4269;
var _onEnableLocationSuccess = null;
var _onEnableLocationFail = null;
var locationListeners = {};
var watchIdCounter = 0;
var fusedLocationClient;
function _ensureLocationClient() {
    fusedLocationClient = fusedLocationClient ||
        com.google.android.gms.location.LocationServices.getFusedLocationProviderClient(application_1.android.context);
}
application_1.android.on(application_1.AndroidApplication.activityResultEvent, function (args) {
    if (args.requestCode === REQUEST_ENABLE_LOCATION) {
        if (args.resultCode === 0) {
            if (_onEnableLocationFail) {
                _onEnableLocationFail("Location not enabled.");
            }
        }
        else if (_onEnableLocationSuccess) {
            _onEnableLocationSuccess();
        }
    }
});
function isAirplaneModeOn() {
    return android.provider.Settings.System.getInt(application_1.android.context.getContentResolver(), android.provider.Settings.System.AIRPLANE_MODE_ON) !== 0;
}
function isProviderEnabled(provider) {
    try {
        var locationManager = application_1.android.context
            .getSystemService(android.content.Context.LOCATION_SERVICE);
        return locationManager.isProviderEnabled(provider);
    }
    catch (ex) {
        return false;
    }
}
function getCurrentLocation(options) {
    return new Promise(function (resolve, reject) {
        enableLocationRequest().then(function () {
            if (options.timeout === 0) {
                LocationManager.getLastLocation(options.maximumAge, resolve, reject);
            }
            else {
                var locationRequest = _getLocationRequest(options);
                var watchId_1 = _getNextWatchId();
                var locationCallback = _getLocationCallback(watchId_1, function (nativeLocation) {
                    clearWatch(watchId_1);
                    resolve(new Location(nativeLocation));
                });
                LocationManager.requestLocationUpdates(locationRequest, locationCallback);
                var timerId_1 = timer_1.setTimeout(function () {
                    clearWatch(watchId_1);
                    timer_1.clearTimeout(timerId_1);
                    reject(new Error("Timeout while searching for location!"));
                }, options.timeout || geolocation_common_1.defaultGetLocationTimeout);
            }
        }, reject);
    });
}
exports.getCurrentLocation = getCurrentLocation;
function _getNextWatchId() {
    var watchId = ++watchIdCounter;
    return watchId;
}
function _getLocationCallback(watchId, onLocation) {
    var LocationCallback = com.google.android.gms.location.LocationCallback.extend({
        onLocationResult: function (locationResult) {
            this.onLocation(locationResult.getLastLocation());
        }
    });
    var locationCallback = new LocationCallback();
    locationCallback.onLocation = onLocation;
    locationListeners[watchId] = locationCallback;
    return locationCallback;
}
function _getLocationRequest(options) {
    var mLocationRequest = new com.google.android.gms.location.LocationRequest();
    var updateTime = options.updateTime === 0 ? 0 : options.updateTime || geolocation_common_1.minTimeUpdate;
    mLocationRequest.setInterval(updateTime);
    var minUpdateTime = options.minimumUpdateTime === 0 ?
        0 : options.minimumUpdateTime || Math.min(updateTime, geolocation_common_1.fastestTimeUpdate);
    mLocationRequest.setFastestInterval(minUpdateTime);
    if (options.updateDistance) {
        mLocationRequest.setSmallestDisplacement(options.updateDistance);
    }
    if (options.desiredAccuracy === enums_1.Accuracy.high) {
        mLocationRequest.setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_HIGH_ACCURACY);
    }
    else {
        mLocationRequest.setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
    }
    return mLocationRequest;
}
function _requestLocationPermissions() {
    return new Promise(function (resolve, reject) {
        if (LocationManager.shouldSkipChecks()) {
            resolve();
        }
        else {
            permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION).then(resolve, reject);
        }
    });
}
function _getLocationListener(maxAge, onLocation, onError) {
    return _getTaskSuccessListener(function (nativeLocation) {
        if (nativeLocation != null) {
            var location_1 = new Location(nativeLocation);
            if (typeof maxAge === "number" && nativeLocation != null) {
                if (location_1.timestamp.valueOf() + maxAge > new Date().valueOf()) {
                    onLocation(location_1);
                }
                else {
                    onError(new Error("Last known location too old!"));
                }
            }
            else {
                onLocation(location_1);
            }
        }
        else {
            onError(new Error("There is no last known location!"));
        }
    });
}
function _getTaskSuccessListener(done) {
    return new com.google.android.gms.tasks.OnSuccessListener({
        onSuccess: done
    });
}
function _getTaskFailListener(done) {
    return new com.google.android.gms.tasks.OnFailureListener({
        onFailure: done
    });
}
function watchLocation(successCallback, errorCallback, options) {
    var zonedSuccessCallback = zonedCallback(successCallback);
    var zonedErrorCallback = zonedCallback(errorCallback);
    if ((!permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) ||
        !_isGooglePlayServicesAvailable()) && !LocationManager.shouldSkipChecks()) {
        throw new Error('Cannot watch location. Call "enableLocationRequest" first');
    }
    var locationRequest = _getLocationRequest(options);
    var watchId = _getNextWatchId();
    var locationCallback = _getLocationCallback(watchId, function (nativeLocation) {
        zonedSuccessCallback(new Location(nativeLocation));
    });
    LocationManager.requestLocationUpdates(locationRequest, locationCallback);
    return watchId;
}
exports.watchLocation = watchLocation;
function clearWatch(watchId) {
    var listener = locationListeners[watchId];
    if (listener) {
        LocationManager.removeLocationUpdates(listener);
        delete locationListeners[watchId];
    }
}
exports.clearWatch = clearWatch;
function enableLocationRequest(always) {
    return new Promise(function (resolve, reject) {
        _requestLocationPermissions().then(function () {
            _makeGooglePlayServicesAvailable().then(function () {
                _isLocationServiceEnabled().then(function () {
                    resolve();
                }, function (ex) {
                    if (typeof ex.getStatusCode === "function") {
                        var statusCode = ex.getStatusCode();
                        if (statusCode === com.google.android.gms.location.LocationSettingsStatusCodes.RESOLUTION_REQUIRED) {
                            try {
                                _onEnableLocationSuccess = resolve;
                                _onEnableLocationFail = reject;
                                return ex.startResolutionForResult(application_1.android.foregroundActivity, REQUEST_ENABLE_LOCATION);
                            }
                            catch (sendEx) {
                                return resolve();
                            }
                        }
                        else if (statusCode === com.google.android.gms.location.LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE
                            && isAirplaneModeOn()
                            && isProviderEnabled(android.location.LocationManager.GPS_PROVIDER)) {
                            return resolve();
                        }
                    }
                    reject(new Error("Cannot enable the location service. " + ex));
                });
            }, reject);
        }, reject);
    });
}
exports.enableLocationRequest = enableLocationRequest;
function _makeGooglePlayServicesAvailable() {
    return new Promise(function (resolve, reject) {
        if (_isGooglePlayServicesAvailable()) {
            resolve();
            return;
        }
        var googleApiAvailability = com.google.android.gms.common.GoogleApiAvailability.getInstance();
        googleApiAvailability.makeGooglePlayServicesAvailable(application_1.android.foregroundActivity)
            .addOnSuccessListener(_getTaskSuccessListener(resolve))
            .addOnFailureListener(_getTaskFailListener(reject));
    });
}
function _isGooglePlayServicesAvailable() {
    if (LocationManager.shouldSkipChecks()) {
        return true;
    }
    var isLocationServiceEnabled = true;
    var googleApiAvailability = com.google.android.gms.common.GoogleApiAvailability.getInstance();
    var resultCode = googleApiAvailability.isGooglePlayServicesAvailable(application_1.android.context);
    if (resultCode !== com.google.android.gms.common.ConnectionResult.SUCCESS) {
        isLocationServiceEnabled = false;
    }
    return isLocationServiceEnabled;
}
function _isLocationServiceEnabled(options) {
    return new Promise(function (resolve, reject) {
        if (LocationManager.shouldSkipChecks()) {
            resolve(true);
            return;
        }
        options = options || { desiredAccuracy: enums_1.Accuracy.high, updateTime: 0, updateDistance: 0, maximumAge: 0, timeout: 0 };
        var locationRequest = _getLocationRequest(options);
        var locationSettingsBuilder = new com.google.android.gms.location.LocationSettingsRequest.Builder();
        locationSettingsBuilder.addLocationRequest(locationRequest);
        locationSettingsBuilder.setAlwaysShow(true);
        var locationSettingsClient = com.google.android.gms.location.LocationServices.getSettingsClient(application_1.android.context);
        locationSettingsClient.checkLocationSettings(locationSettingsBuilder.build())
            .addOnSuccessListener(_getTaskSuccessListener(function (a) {
            resolve();
        }))
            .addOnFailureListener(_getTaskFailListener(function (ex) {
            reject(ex);
        }));
    });
}
function isEnabled(options) {
    return new Promise(function (resolve, reject) {
        if (!_isGooglePlayServicesAvailable() ||
            !permissions.hasPermission(android.Manifest.permission.ACCESS_FINE_LOCATION)) {
            resolve(false);
        }
        else {
            _isLocationServiceEnabled(options).then(function () {
                resolve(true);
            }, function (ex) {
                if (typeof ex.getStatusCode === "function"
                    && ex.getStatusCode() === com.google.android.gms.location.LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE
                    && isAirplaneModeOn()
                    && isProviderEnabled(android.location.LocationManager.GPS_PROVIDER)) {
                    return resolve(true);
                }
                resolve(false);
            });
        }
    });
}
exports.isEnabled = isEnabled;
function distance(loc1, loc2) {
    if (!loc1.android) {
        loc1.android = androidLocationFromLocation(loc1);
    }
    if (!loc2.android) {
        loc2.android = androidLocationFromLocation(loc2);
    }
    return loc1.android.distanceTo(loc2.android);
}
exports.distance = distance;
function androidLocationFromLocation(location) {
    var androidLocation = new android.location.Location("custom");
    androidLocation.setLatitude(location.latitude);
    androidLocation.setLongitude(location.longitude);
    if (location.altitude) {
        androidLocation.setAltitude(location.altitude);
    }
    if (location.speed) {
        androidLocation.setSpeed(float(location.speed));
    }
    if (location.direction) {
        androidLocation.setBearing(float(location.direction));
    }
    if (location.timestamp) {
        try {
            androidLocation.setTime(long(location.timestamp.getTime()));
        }
        catch (e) {
            console.error("invalid location timestamp");
        }
    }
    return androidLocation;
}
var LocationManager = (function () {
    function LocationManager() {
    }
    LocationManager.getLastLocation = function (maximumAge, resolve, reject) {
        _ensureLocationClient();
        return fusedLocationClient.getLastLocation()
            .addOnSuccessListener(_getLocationListener(maximumAge, resolve, reject))
            .addOnFailureListener(_getTaskFailListener(function (e) { return reject(new Error(e.getMessage())); }));
    };
    LocationManager.requestLocationUpdates = function (locationRequest, locationCallback) {
        _ensureLocationClient();
        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);
    };
    LocationManager.removeLocationUpdates = function (listener) {
        _ensureLocationClient();
        fusedLocationClient.removeLocationUpdates(listener);
    };
    LocationManager.shouldSkipChecks = function () {
        return false;
    };
    LocationManager.setMockLocationManager = function (MockLocationManager) {
        LocationManager.getLastLocation = MockLocationManager.getLastLocation;
        LocationManager.requestLocationUpdates = MockLocationManager.requestLocationUpdates;
        LocationManager.removeLocationUpdates = MockLocationManager.removeLocationUpdates;
        LocationManager.shouldSkipChecks = MockLocationManager.shouldSkipChecks;
    };
    return LocationManager;
}());
exports.LocationManager = LocationManager;
var Location = (function (_super) {
    __extends(Location, _super);
    function Location(androidLocation) {
        var _this = _super.call(this) || this;
        if (androidLocation) {
            _this.android = androidLocation;
            _this.latitude = androidLocation.getLatitude();
            _this.longitude = androidLocation.getLongitude();
            _this.altitude = androidLocation.getAltitude();
            _this.horizontalAccuracy = androidLocation.getAccuracy();
            _this.verticalAccuracy = androidLocation.getAccuracy();
            _this.speed = androidLocation.getSpeed();
            _this.direction = androidLocation.getBearing();
            _this.timestamp = new Date(androidLocation.getTime());
        }
        return _this;
    }
    return Location;
}(geolocation_common_1.LocationBase));
exports.Location = Location;
function setCustomLocationManager(MockLocationManager) {
    LocationManager.setMockLocationManager(MockLocationManager);
}
exports.setCustomLocationManager = setCustomLocationManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvbG9jYXRpb24uYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlb2xvY2F0aW9uLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBZ0Y7QUFDaEYsa0NBQW9DO0FBQ3BDLCtCQUFpRDtBQUNqRCwyREFBaUg7QUFFakgsc0RBQXdEO0FBR3hELElBQUksdUJBQXVCLEdBQUcsSUFBSSxDQUFDO0FBQ25DLElBQUksd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0FBQ3BDLElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBRWpDLElBQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN2QixJQUFJLG1CQUFtQixDQUFDO0FBRXhCO0lBRUksbUJBQW1CLEdBQUcsbUJBQW1CO1FBQ3JDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMscUJBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEgsQ0FBQztBQUVELHFCQUFrQixDQUFDLEVBQUUsQ0FBQyxnQ0FBa0IsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLElBQVM7SUFDN0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztnQkFDeEIscUJBQXFCLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNuRCxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDbEMsd0JBQXdCLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0wsQ0FB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b2lkQXBwbGljYXRpb24gfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgeyBzZXRUaW1lb3V0LCBjbGVhclRpbWVvdXQgfSBmcm9tIFwidGltZXJcIjtcbmltcG9ydCB7IExvY2F0aW9uQmFzZSwgZGVmYXVsdEdldExvY2F0aW9uVGltZW91dCwgZmFzdGVzdFRpbWVVcGRhdGUsIG1pblRpbWVVcGRhdGUgfSBmcm9tIFwiLi9nZW9sb2NhdGlvbi5jb21tb25cIjtcbmltcG9ydCB7IE9wdGlvbnMsIHN1Y2Nlc3NDYWxsYmFja1R5cGUsIGVycm9yQ2FsbGJhY2tUeXBlIH0gZnJvbSBcIi4vbG9jYXRpb24tbW9uaXRvclwiO1xuaW1wb3J0ICogYXMgcGVybWlzc2lvbnMgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wZXJtaXNzaW9uc1wiO1xuXG5kZWNsYXJlIHZhciBjb206IGFueTtcbmxldCBSRVFVRVNUX0VOQUJMRV9MT0NBVElPTiA9IDQyNjk7IC8vIHJhbmRvbSBudW1iZXJcbmxldCBfb25FbmFibGVMb2NhdGlvblN1Y2Nlc3MgPSBudWxsO1xubGV0IF9vbkVuYWJsZUxvY2F0aW9uRmFpbCA9IG51bGw7XG5cbmNvbnN0IGxvY2F0aW9uTGlzdGVuZXJzID0ge307XG5sZXQgd2F0Y2hJZENvdW50ZXIgPSAwO1xubGV0IGZ1c2VkTG9jYXRpb25DbGllbnQ7XG5cbmZ1bmN0aW9uIF9lbnN1cmVMb2NhdGlvbkNsaWVudCgpIHtcbiAgICAvLyBXcmFwcGVkIGluIGEgZnVuY3Rpb24gYXMgd2Ugc2hvdWxkIG5vdCBhY2Nlc3MgamF2YSBvYmplY3QgdGhlcmUgYmVjYXVzZSBvZiB0aGUgc25hcHNob3RzLlxuICAgIGZ1c2VkTG9jYXRpb25DbGllbnQgPSBmdXNlZExvY2F0aW9uQ2xpZW50IHx8XG4gICAgICAgIGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25TZXJ2aWNlcy5nZXRGdXNlZExvY2F0aW9uUHJvdmlkZXJDbGllbnQoYW5kcm9pZEFwcEluc3RhbmNlLmNvbnRleHQpO1xufVxuXG5hbmRyb2lkQXBwSW5zdGFuY2Uub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5UmVzdWx0RXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBhbnkpIHtcbiAgICBpZiAoYXJncy5yZXF1ZXN0Q29kZSA9PT0gUkVRVUVTVF9FTkFCTEVfTE9DQVRJT04pIHtcbiAgICAgICAgaWYgKGFyZ3MucmVzdWx0Q29kZSA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKF9vbkVuYWJsZUxvY2F0aW9uRmFpbCkge1xuICAgICAgICAgICAgICAgIF9vbkVuYWJsZUxvY2F0aW9uRmFpbChcIkxvY2F0aW9uIG5vdCBlbmFibGVkLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChfb25FbmFibGVMb2NhdGlvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIF9vbkVuYWJsZUxvY2F0aW9uU3VjY2VzcygpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGlzQWlycGxhbmVNb2RlT24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFuZHJvaWQucHJvdmlkZXIuU2V0dGluZ3MuU3lzdGVtLmdldEludChhbmRyb2lkQXBwSW5zdGFuY2UuY29udGV4dC5nZXRDb250ZW50UmVzb2x2ZXIoKSxcbiAgICAgICAgYW5kcm9pZC5wcm92aWRlci5TZXR0aW5ncy5TeXN0ZW0uQUlSUExBTkVfTU9ERV9PTikgIT09IDA7XG59XG5cbmZ1bmN0aW9uIGlzUHJvdmlkZXJFbmFibGVkKHByb3ZpZGVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBsb2NhdGlvbk1hbmFnZXI6IGFuZHJvaWQubG9jYXRpb24uTG9jYXRpb25NYW5hZ2VyID0gKDxhbmRyb2lkLmNvbnRlbnQuQ29udGV4dD5hbmRyb2lkQXBwSW5zdGFuY2UuY29udGV4dClcbiAgICAgICAgICAgIC5nZXRTeXN0ZW1TZXJ2aWNlKGFuZHJvaWQuY29udGVudC5Db250ZXh0LkxPQ0FUSU9OX1NFUlZJQ0UpO1xuICAgICAgICByZXR1cm4gbG9jYXRpb25NYW5hZ2VyLmlzUHJvdmlkZXJFbmFibGVkKHByb3ZpZGVyKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VycmVudExvY2F0aW9uKG9wdGlvbnM6IE9wdGlvbnMpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZW5hYmxlTG9jYXRpb25SZXF1ZXN0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy50aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IGxhc3Qga25vd25cbiAgICAgICAgICAgICAgICBMb2NhdGlvbk1hbmFnZXIuZ2V0TGFzdExvY2F0aW9uKG9wdGlvbnMubWF4aW11bUFnZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gd2FpdCBmb3IgdGhlIGV4YWN0IGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uUmVxdWVzdCA9IF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgbGV0IHdhdGNoSWQgPSBfZ2V0TmV4dFdhdGNoSWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYXRpb25DYWxsYmFjayA9IF9nZXRMb2NhdGlvbkNhbGxiYWNrKHdhdGNoSWQsIChuYXRpdmVMb2NhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjbGVhcldhdGNoKHdhdGNoSWQpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBMb2NhdGlvbihuYXRpdmVMb2NhdGlvbikpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgTG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RMb2NhdGlvblVwZGF0ZXMobG9jYXRpb25SZXF1ZXN0LCBsb2NhdGlvbkNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lcklkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyV2F0Y2god2F0Y2hJZCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIlRpbWVvdXQgd2hpbGUgc2VhcmNoaW5nIGZvciBsb2NhdGlvbiFcIikpO1xuICAgICAgICAgICAgICAgIH0sIG9wdGlvbnMudGltZW91dCB8fCBkZWZhdWx0R2V0TG9jYXRpb25UaW1lb3V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gX2dldE5leHRXYXRjaElkKCkge1xuICAgIGxldCB3YXRjaElkID0gKyt3YXRjaElkQ291bnRlcjtcbiAgICByZXR1cm4gd2F0Y2hJZDtcbn1cblxuZnVuY3Rpb24gX2dldExvY2F0aW9uQ2FsbGJhY2sod2F0Y2hJZCwgb25Mb2NhdGlvbik6IGFueSB7XG4gICAgbGV0IExvY2F0aW9uQ2FsbGJhY2sgPSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uQ2FsbGJhY2suZXh0ZW5kKHtcbiAgICAgICAgLy8gSU1QT1JUQU5UOiBEbyBub3QgdG91Y2ggYW55IHNjb3BlIHZhcmlhYmxlcyBoZXJlLiBUaGUgSmF2YSBkZWZpbml0aW9uIG9mIHRoZSBjbGFzcyBpcyBjYWNoZWRcbiAgICAgICAgLy8gaW50ZXJuYWxseSBpbiBOYXRpdmVTY3JpcHQgYW5kIGlmIHdlIGRpcmVjdGx5IHVzZSAnd2F0Y2hJZCcgb3IgJ29uTG9jYXRpb24nIGhlcmUsIHdlIHdpbGxcbiAgICAgICAgLy8gYWx3YXlzIHJlY2VpdmUgdGhlIHJlZmVyZW5jZXMgZnJvbSB0aGUgZmlyc3QgJ19nZXRMb2NhdGlvbkNhbGxiYWNrJyBtZXRob2QgY2FsbCEhIVxuICAgICAgICBvbkxvY2F0aW9uUmVzdWx0OiBmdW5jdGlvbiAobG9jYXRpb25SZXN1bHQpIHtcbiAgICAgICAgICAgIHRoaXMub25Mb2NhdGlvbihsb2NhdGlvblJlc3VsdC5nZXRMYXN0TG9jYXRpb24oKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGxldCBsb2NhdGlvbkNhbGxiYWNrID0gbmV3IExvY2F0aW9uQ2FsbGJhY2soKTtcbiAgICAvLyBXb3JrYXJvdW5kIGZvciB0aGUgYWJvdmUtbWVudGlvbmVkIE5vdGVcbiAgICBsb2NhdGlvbkNhbGxiYWNrLm9uTG9jYXRpb24gPSBvbkxvY2F0aW9uO1xuXG4gICAgbG9jYXRpb25MaXN0ZW5lcnNbd2F0Y2hJZF0gPSBsb2NhdGlvbkNhbGxiYWNrO1xuXG4gICAgcmV0dXJuIGxvY2F0aW9uQ2FsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9uczogT3B0aW9ucyk6IGFueSB7XG4gICAgbGV0IG1Mb2NhdGlvblJlcXVlc3QgPSBuZXcgY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblJlcXVlc3QoKTtcbiAgICBsZXQgdXBkYXRlVGltZSA9IG9wdGlvbnMudXBkYXRlVGltZSA9PT0gMCA/IDAgOiBvcHRpb25zLnVwZGF0ZVRpbWUgfHwgbWluVGltZVVwZGF0ZTtcbiAgICBtTG9jYXRpb25SZXF1ZXN0LnNldEludGVydmFsKHVwZGF0ZVRpbWUpO1xuICAgIGxldCBtaW5VcGRhdGVUaW1lID0gb3B0aW9ucy5taW5pbXVtVXBkYXRlVGltZSA9PT0gMCA/XG4gICAgICAgIDAgOiBvcHRpb25zLm1pbmltdW1VcGRhdGVUaW1lIHx8IE1hdGgubWluKHVwZGF0ZVRpbWUsIGZhc3Rlc3RUaW1lVXBkYXRlKTtcbiAgICBtTG9jYXRpb25SZXF1ZXN0LnNldEZhc3Rlc3RJbnRlcnZhbChtaW5VcGRhdGVUaW1lKTtcbiAgICBpZiAob3B0aW9ucy51cGRhdGVEaXN0YW5jZSkge1xuICAgICAgICBtTG9jYXRpb25SZXF1ZXN0LnNldFNtYWxsZXN0RGlzcGxhY2VtZW50KG9wdGlvbnMudXBkYXRlRGlzdGFuY2UpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kZXNpcmVkQWNjdXJhY3kgPT09IEFjY3VyYWN5LmhpZ2gpIHtcbiAgICAgICAgbUxvY2F0aW9uUmVxdWVzdC5zZXRQcmlvcml0eShjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uUmVxdWVzdC5QUklPUklUWV9ISUdIX0FDQ1VSQUNZKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtTG9jYXRpb25SZXF1ZXN0LnNldFByaW9yaXR5KGNvbS5nb29nbGUuYW5kcm9pZC5nbXMubG9jYXRpb24uTG9jYXRpb25SZXF1ZXN0LlBSSU9SSVRZX0JBTEFOQ0VEX1BPV0VSX0FDQ1VSQUNZKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbUxvY2F0aW9uUmVxdWVzdDtcbn1cblxuZnVuY3Rpb24gX3JlcXVlc3RMb2NhdGlvblBlcm1pc3Npb25zKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGVybWlzc2lvbnMucmVxdWVzdFBlcm1pc3Npb24oKDxhbnk+YW5kcm9pZCkuTWFuaWZlc3QucGVybWlzc2lvbi5BQ0NFU1NfRklORV9MT0NBVElPTikudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRMb2NhdGlvbkxpc3RlbmVyKG1heEFnZSwgb25Mb2NhdGlvbiwgb25FcnJvcikge1xuICAgIHJldHVybiBfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcigobmF0aXZlTG9jYXRpb246IGFuZHJvaWQubG9jYXRpb24uTG9jYXRpb24pID0+IHtcbiAgICAgICAgaWYgKG5hdGl2ZUxvY2F0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBsb2NhdGlvbiA9IG5ldyBMb2NhdGlvbihuYXRpdmVMb2NhdGlvbik7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG1heEFnZSA9PT0gXCJudW1iZXJcIiAmJiBuYXRpdmVMb2NhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnRpbWVzdGFtcC52YWx1ZU9mKCkgKyBtYXhBZ2UgPiBuZXcgRGF0ZSgpLnZhbHVlT2YoKSkge1xuICAgICAgICAgICAgICAgICAgICBvbkxvY2F0aW9uKGxvY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIkxhc3Qga25vd24gbG9jYXRpb24gdG9vIG9sZCFcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb25Mb2NhdGlvbihsb2NhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcIlRoZXJlIGlzIG5vIGxhc3Qga25vd24gbG9jYXRpb24hXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcihkb25lOiAocmVzdWx0KSA9PiB2b2lkKSB7XG4gICAgcmV0dXJuIG5ldyBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLnRhc2tzLk9uU3VjY2Vzc0xpc3RlbmVyKHtcbiAgICAgICAgb25TdWNjZXNzOiBkb25lXG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9nZXRUYXNrRmFpbExpc3RlbmVyKGRvbmU6IChleGNlcHRpb24pID0+IHZvaWQpIHtcbiAgICByZXR1cm4gbmV3IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMudGFza3MuT25GYWlsdXJlTGlzdGVuZXIoe1xuICAgICAgICBvbkZhaWx1cmU6IGRvbmVcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhdGNoTG9jYXRpb24oc3VjY2Vzc0NhbGxiYWNrOiBzdWNjZXNzQ2FsbGJhY2tUeXBlLCBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrVHlwZSwgb3B0aW9uczogT3B0aW9ucyk6IG51bWJlciB7XG4gICAgLy8gd3JhcCBpbiB6b25lZCBjYWxsYmFjayBpbiBvcmRlciB0byBhdm9pZCBVSSBnbGl0Y2hlcyBpbiBBbmd1bGFyIGFwcGxpY2F0aW9uc1xuICAgIC8vIGNoZWNrIGh0dHBzOi8vZ2l0aHViLmNvbS9OYXRpdmVTY3JpcHQvTmF0aXZlU2NyaXB0L2lzc3Vlcy8yMjI5XG4gICAgY29uc3Qgem9uZWRTdWNjZXNzQ2FsbGJhY2sgPSB6b25lZENhbGxiYWNrKHN1Y2Nlc3NDYWxsYmFjayk7XG4gICAgY29uc3Qgem9uZWRFcnJvckNhbGxiYWNrID0gem9uZWRDYWxsYmFjayhlcnJvckNhbGxiYWNrKTtcblxuICAgIGlmICgoIXBlcm1pc3Npb25zLmhhc1Blcm1pc3Npb24oKDxhbnk+YW5kcm9pZCkuTWFuaWZlc3QucGVybWlzc2lvbi5BQ0NFU1NfRklORV9MT0NBVElPTikgfHxcbiAgICAgICAgIV9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpKSAmJiAhTG9jYXRpb25NYW5hZ2VyLnNob3VsZFNraXBDaGVja3MoKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB3YXRjaCBsb2NhdGlvbi4gQ2FsbCBcImVuYWJsZUxvY2F0aW9uUmVxdWVzdFwiIGZpcnN0Jyk7XG4gICAgfVxuXG4gICAgbGV0IGxvY2F0aW9uUmVxdWVzdCA9IF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucyk7XG4gICAgbGV0IHdhdGNoSWQgPSBfZ2V0TmV4dFdhdGNoSWQoKTtcbiAgICBjb25zdCBsb2NhdGlvbkNhbGxiYWNrID0gX2dldExvY2F0aW9uQ2FsbGJhY2sod2F0Y2hJZCwgKG5hdGl2ZUxvY2F0aW9uKSA9PiB7XG4gICAgICAgIHpvbmVkU3VjY2Vzc0NhbGxiYWNrKG5ldyBMb2NhdGlvbihuYXRpdmVMb2NhdGlvbikpO1xuICAgIH0pO1xuXG4gICAgTG9jYXRpb25NYW5hZ2VyLnJlcXVlc3RMb2NhdGlvblVwZGF0ZXMobG9jYXRpb25SZXF1ZXN0LCBsb2NhdGlvbkNhbGxiYWNrKTtcblxuICAgIHJldHVybiB3YXRjaElkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJXYXRjaCh3YXRjaElkOiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgbGlzdGVuZXIgPSBsb2NhdGlvbkxpc3RlbmVyc1t3YXRjaElkXTtcbiAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgTG9jYXRpb25NYW5hZ2VyLnJlbW92ZUxvY2F0aW9uVXBkYXRlcyhsaXN0ZW5lcik7XG4gICAgICAgIGRlbGV0ZSBsb2NhdGlvbkxpc3RlbmVyc1t3YXRjaElkXTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVMb2NhdGlvblJlcXVlc3QoYWx3YXlzPzogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIF9yZXF1ZXN0TG9jYXRpb25QZXJtaXNzaW9ucygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgX21ha2VHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBfaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCAoZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBleC5nZXRTdGF0dXNDb2RlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0NvZGUgPSBleC5nZXRTdGF0dXNDb2RlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzQ29kZSA9PT0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNldHRpbmdzU3RhdHVzQ29kZXMuUkVTT0xVVElPTl9SRVFVSVJFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhY2hlIHJlc29sdmUgYW5kIHJlamVjdCBjYWxsYmFja3MgaW4gb3JkZXIgdG8gY2FsbCB0aGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIFJFUVVFU1RfRU5BQkxFX0xPQ0FUSU9OIEFjdGl2aXR5IFJlc3VsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb25FbmFibGVMb2NhdGlvblN1Y2Nlc3MgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfb25FbmFibGVMb2NhdGlvbkZhaWwgPSByZWplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleC5zdGFydFJlc29sdXRpb25Gb3JSZXN1bHQoYW5kcm9pZEFwcEluc3RhbmNlLmZvcmVncm91bmRBY3Rpdml0eSwgUkVRVUVTVF9FTkFCTEVfTE9DQVRJT04pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKHNlbmRFeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgdGhlIGVycm9yLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdHVzQ29kZSA9PT0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNldHRpbmdzU3RhdHVzQ29kZXMuU0VUVElOR1NfQ0hBTkdFX1VOQVZBSUxBQkxFXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgaXNBaXJwbGFuZU1vZGVPbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgaXNQcm92aWRlckVuYWJsZWQoYW5kcm9pZC5sb2NhdGlvbi5Mb2NhdGlvbk1hbmFnZXIuR1BTX1BST1ZJREVSKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIkNhbm5vdCBlbmFibGUgdGhlIGxvY2F0aW9uIHNlcnZpY2UuIFwiICsgZXgpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIF9tYWtlR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChfaXNHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoKSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBnb29nbGVBcGlBdmFpbGFiaWxpdHkgPSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmNvbW1vbi5Hb29nbGVBcGlBdmFpbGFiaWxpdHkuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgZ29vZ2xlQXBpQXZhaWxhYmlsaXR5Lm1ha2VHb29nbGVQbGF5U2VydmljZXNBdmFpbGFibGUoYW5kcm9pZEFwcEluc3RhbmNlLmZvcmVncm91bmRBY3Rpdml0eSlcbiAgICAgICAgICAgIC5hZGRPblN1Y2Nlc3NMaXN0ZW5lcihfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcihyZXNvbHZlKSlcbiAgICAgICAgICAgIC5hZGRPbkZhaWx1cmVMaXN0ZW5lcihfZ2V0VGFza0ZhaWxMaXN0ZW5lcihyZWplY3QpKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gX2lzR29vZ2xlUGxheVNlcnZpY2VzQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmIChMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcygpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxldCBpc0xvY2F0aW9uU2VydmljZUVuYWJsZWQgPSB0cnVlO1xuICAgIGxldCBnb29nbGVBcGlBdmFpbGFiaWxpdHkgPSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmNvbW1vbi5Hb29nbGVBcGlBdmFpbGFiaWxpdHkuZ2V0SW5zdGFuY2UoKTtcbiAgICBsZXQgcmVzdWx0Q29kZSA9IGdvb2dsZUFwaUF2YWlsYWJpbGl0eS5pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZShhbmRyb2lkQXBwSW5zdGFuY2UuY29udGV4dCk7XG4gICAgaWYgKHJlc3VsdENvZGUgIT09IGNvbS5nb29nbGUuYW5kcm9pZC5nbXMuY29tbW9uLkNvbm5lY3Rpb25SZXN1bHQuU1VDQ0VTUykge1xuICAgICAgICBpc0xvY2F0aW9uU2VydmljZUVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkO1xufVxuXG5mdW5jdGlvbiBfaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkKG9wdGlvbnM/OiBPcHRpb25zKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKExvY2F0aW9uTWFuYWdlci5zaG91bGRTa2lwQ2hlY2tzKCkpIHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7IGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCwgdXBkYXRlVGltZTogMCwgdXBkYXRlRGlzdGFuY2U6IDAsIG1heGltdW1BZ2U6IDAsIHRpbWVvdXQ6IDAgfTtcbiAgICAgICAgbGV0IGxvY2F0aW9uUmVxdWVzdCA9IF9nZXRMb2NhdGlvblJlcXVlc3Qob3B0aW9ucyk7XG4gICAgICAgIGxldCBsb2NhdGlvblNldHRpbmdzQnVpbGRlciA9IG5ldyBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uU2V0dGluZ3NSZXF1ZXN0LkJ1aWxkZXIoKTtcbiAgICAgICAgbG9jYXRpb25TZXR0aW5nc0J1aWxkZXIuYWRkTG9jYXRpb25SZXF1ZXN0KGxvY2F0aW9uUmVxdWVzdCk7XG4gICAgICAgIGxvY2F0aW9uU2V0dGluZ3NCdWlsZGVyLnNldEFsd2F5c1Nob3codHJ1ZSk7XG4gICAgICAgIGxldCBsb2NhdGlvblNldHRpbmdzQ2xpZW50ID0gY29tLmdvb2dsZS5hbmRyb2lkLmdtcy5sb2NhdGlvbi5Mb2NhdGlvblNlcnZpY2VzLmdldFNldHRpbmdzQ2xpZW50KGFuZHJvaWRBcHBJbnN0YW5jZS5jb250ZXh0KTtcbiAgICAgICAgbG9jYXRpb25TZXR0aW5nc0NsaWVudC5jaGVja0xvY2F0aW9uU2V0dGluZ3MobG9jYXRpb25TZXR0aW5nc0J1aWxkZXIuYnVpbGQoKSlcbiAgICAgICAgICAgIC5hZGRPblN1Y2Nlc3NMaXN0ZW5lcihfZ2V0VGFza1N1Y2Nlc3NMaXN0ZW5lcigoYSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgLmFkZE9uRmFpbHVyZUxpc3RlbmVyKF9nZXRUYXNrRmFpbExpc3RlbmVyKChleCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VuYWJsZWQob3B0aW9ucz86IE9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIV9pc0dvb2dsZVBsYXlTZXJ2aWNlc0F2YWlsYWJsZSgpIHx8XG4gICAgICAgICAgICAhcGVybWlzc2lvbnMuaGFzUGVybWlzc2lvbigoPGFueT5hbmRyb2lkKS5NYW5pZmVzdC5wZXJtaXNzaW9uLkFDQ0VTU19GSU5FX0xPQ0FUSU9OKSkge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfaXNMb2NhdGlvblNlcnZpY2VFbmFibGVkKG9wdGlvbnMpLnRoZW4oXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH0sIChleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV4LmdldFN0YXR1c0NvZGUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgZXguZ2V0U3RhdHVzQ29kZSgpID09PSBjb20uZ29vZ2xlLmFuZHJvaWQuZ21zLmxvY2F0aW9uLkxvY2F0aW9uU2V0dGluZ3NTdGF0dXNDb2Rlcy5TRVRUSU5HU19DSEFOR0VfVU5BVkFJTEFCTEVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIGlzQWlycGxhbmVNb2RlT24oKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgaXNQcm92aWRlckVuYWJsZWQoYW5kcm9pZC5sb2NhdGlvbi5Mb2NhdGlvbk1hbmFnZXIuR1BTX1BST1ZJREVSKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlKGxvYzE6IExvY2F0aW9uLCBsb2MyOiBMb2NhdGlvbik6IG51bWJlciB7XG4gICAgaWYgKCFsb2MxLmFuZHJvaWQpIHtcbiAgICAgICAgbG9jMS5hbmRyb2lkID0gYW5kcm9pZExvY2F0aW9uRnJvbUxvY2F0aW9uKGxvYzEpO1xuICAgIH1cblxuICAgIGlmICghbG9jMi5hbmRyb2lkKSB7XG4gICAgICAgIGxvYzIuYW5kcm9pZCA9IGFuZHJvaWRMb2NhdGlvbkZyb21Mb2NhdGlvbihsb2MyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9jMS5hbmRyb2lkLmRpc3RhbmNlVG8obG9jMi5hbmRyb2lkKTtcbn1cblxuZnVuY3Rpb24gYW5kcm9pZExvY2F0aW9uRnJvbUxvY2F0aW9uKGxvY2F0aW9uOiBMb2NhdGlvbik6IGFuZHJvaWQubG9jYXRpb24uTG9jYXRpb24ge1xuICAgIGxldCBhbmRyb2lkTG9jYXRpb24gPSBuZXcgYW5kcm9pZC5sb2NhdGlvbi5Mb2NhdGlvbihcImN1c3RvbVwiKTtcbiAgICBhbmRyb2lkTG9jYXRpb24uc2V0TGF0aXR1ZGUobG9jYXRpb24ubGF0aXR1ZGUpO1xuICAgIGFuZHJvaWRMb2NhdGlvbi5zZXRMb25naXR1ZGUobG9jYXRpb24ubG9uZ2l0dWRlKTtcbiAgICBpZiAobG9jYXRpb24uYWx0aXR1ZGUpIHtcbiAgICAgICAgYW5kcm9pZExvY2F0aW9uLnNldEFsdGl0dWRlKGxvY2F0aW9uLmFsdGl0dWRlKTtcbiAgICB9XG4gICAgaWYgKGxvY2F0aW9uLnNwZWVkKSB7XG4gICAgICAgIGFuZHJvaWRMb2NhdGlvbi5zZXRTcGVlZChmbG9hdChsb2NhdGlvbi5zcGVlZCkpO1xuICAgIH1cbiAgICBpZiAobG9jYXRpb24uZGlyZWN0aW9uKSB7XG4gICAgICAgIGFuZHJvaWRMb2NhdGlvbi5zZXRCZWFyaW5nKGZsb2F0KGxvY2F0aW9uLmRpcmVjdGlvbikpO1xuICAgIH1cbiAgICBpZiAobG9jYXRpb24udGltZXN0YW1wKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhbmRyb2lkTG9jYXRpb24uc2V0VGltZShsb25nKGxvY2F0aW9uLnRpbWVzdGFtcC5nZXRUaW1lKCkpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImludmFsaWQgbG9jYXRpb24gdGltZXN0YW1wXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuZHJvaWRMb2NhdGlvbjtcbn1cblxuLy8gYWJzY3RhY3Rpb24gZm9yIHVuaXQgdGVzdGluZ1xuZXhwb3J0IGNsYXNzIExvY2F0aW9uTWFuYWdlciB7XG4gICAgc3RhdGljIGdldExhc3RMb2NhdGlvbihtYXhpbXVtQWdlLCByZXNvbHZlLCByZWplY3QpOiBQcm9taXNlPExvY2F0aW9uPiB7XG4gICAgICAgIF9lbnN1cmVMb2NhdGlvbkNsaWVudCgpO1xuICAgICAgICByZXR1cm4gZnVzZWRMb2NhdGlvbkNsaWVudC5nZXRMYXN0TG9jYXRpb24oKVxuICAgICAgICAgICAgLmFkZE9uU3VjY2Vzc0xpc3RlbmVyKF9nZXRMb2NhdGlvbkxpc3RlbmVyKG1heGltdW1BZ2UsIHJlc29sdmUsIHJlamVjdCkpXG4gICAgICAgICAgICAuYWRkT25GYWlsdXJlTGlzdGVuZXIoX2dldFRhc2tGYWlsTGlzdGVuZXIoKGUpID0+IHJlamVjdChuZXcgRXJyb3IoZS5nZXRNZXNzYWdlKCkpKSkpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXF1ZXN0TG9jYXRpb25VcGRhdGVzKGxvY2F0aW9uUmVxdWVzdCwgbG9jYXRpb25DYWxsYmFjayk6IHZvaWQge1xuICAgICAgICBfZW5zdXJlTG9jYXRpb25DbGllbnQoKTtcbiAgICAgICAgZnVzZWRMb2NhdGlvbkNsaWVudC5yZXF1ZXN0TG9jYXRpb25VcGRhdGVzKGxvY2F0aW9uUmVxdWVzdCwgbG9jYXRpb25DYWxsYmFjaywgbnVsbCAvKiBMb29wZXIgKi8pO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVMb2NhdGlvblVwZGF0ZXMobGlzdGVuZXIpIHtcbiAgICAgICAgX2Vuc3VyZUxvY2F0aW9uQ2xpZW50KCk7XG4gICAgICAgIGZ1c2VkTG9jYXRpb25DbGllbnQucmVtb3ZlTG9jYXRpb25VcGRhdGVzKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdWxkU2tpcENoZWNrcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXRNb2NrTG9jYXRpb25NYW5hZ2VyKE1vY2tMb2NhdGlvbk1hbmFnZXIpIHtcbiAgICAgICAgTG9jYXRpb25NYW5hZ2VyLmdldExhc3RMb2NhdGlvbiA9IE1vY2tMb2NhdGlvbk1hbmFnZXIuZ2V0TGFzdExvY2F0aW9uO1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIucmVxdWVzdExvY2F0aW9uVXBkYXRlcyA9IE1vY2tMb2NhdGlvbk1hbmFnZXIucmVxdWVzdExvY2F0aW9uVXBkYXRlcztcbiAgICAgICAgTG9jYXRpb25NYW5hZ2VyLnJlbW92ZUxvY2F0aW9uVXBkYXRlcyA9IE1vY2tMb2NhdGlvbk1hbmFnZXIucmVtb3ZlTG9jYXRpb25VcGRhdGVzO1xuICAgICAgICBMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcyA9IE1vY2tMb2NhdGlvbk1hbmFnZXIuc2hvdWxkU2tpcENoZWNrcztcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2NhdGlvbiBleHRlbmRzIExvY2F0aW9uQmFzZSB7XG4gICAgcHVibGljIGFuZHJvaWQ6IGFuZHJvaWQubG9jYXRpb24uTG9jYXRpb247ICAvLyBhbmRyb2lkIExvY2F0aW9uXG5cbiAgICBjb25zdHJ1Y3RvcihhbmRyb2lkTG9jYXRpb246IGFuZHJvaWQubG9jYXRpb24uTG9jYXRpb24pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKGFuZHJvaWRMb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5hbmRyb2lkID0gYW5kcm9pZExvY2F0aW9uO1xuICAgICAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGFuZHJvaWRMb2NhdGlvbi5nZXRMYXRpdHVkZSgpO1xuICAgICAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBhbmRyb2lkTG9jYXRpb24uZ2V0TG9uZ2l0dWRlKCk7XG4gICAgICAgICAgICB0aGlzLmFsdGl0dWRlID0gYW5kcm9pZExvY2F0aW9uLmdldEFsdGl0dWRlKCk7XG4gICAgICAgICAgICB0aGlzLmhvcml6b250YWxBY2N1cmFjeSA9IGFuZHJvaWRMb2NhdGlvbi5nZXRBY2N1cmFjeSgpO1xuICAgICAgICAgICAgdGhpcy52ZXJ0aWNhbEFjY3VyYWN5ID0gYW5kcm9pZExvY2F0aW9uLmdldEFjY3VyYWN5KCk7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gYW5kcm9pZExvY2F0aW9uLmdldFNwZWVkKCk7XG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IGFuZHJvaWRMb2NhdGlvbi5nZXRCZWFyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKGFuZHJvaWRMb2NhdGlvbi5nZXRUaW1lKCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyB1c2VkIGZyb20gdW5pdCB0ZXN0c1xuZXhwb3J0IGZ1bmN0aW9uIHNldEN1c3RvbUxvY2F0aW9uTWFuYWdlcihNb2NrTG9jYXRpb25NYW5hZ2VyKSB7XG4gICAgTG9jYXRpb25NYW5hZ2VyLnNldE1vY2tMb2NhdGlvbk1hbmFnZXIoTW9ja0xvY2F0aW9uTWFuYWdlcik7XG59XG4iXX0=