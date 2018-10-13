Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _1 = require("./../");
var element_registry_1 = require("nativescript-angular/element-registry");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var RadCalendarComponent = /** @class */ (function () {
    function RadCalendarComponent(_elementRef, _iterableDiffers) {
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this.doCheckDelay = 5;
        this._calendar = _elementRef.nativeElement;
    }
    Object.defineProperty(RadCalendarComponent.prototype, "eventSource", {
        set: function (value) {
            this._eventSource = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && CollectionUtils.isListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._eventSource).create(function (index, item) { return item; });
            }
            this._calendar.eventSource = this._eventSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendarComponent.prototype, "nativeElement", {
        get: function () {
            return this._calendar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadCalendarComponent.prototype, "calendar", {
        get: function () {
            return this._calendar;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendarComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            var changes = this._differ.diff(this._eventSource);
            if (changes) {
                this._calendar.reload();
            }
        }
    };
    RadCalendarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'RadCalendar',
                    template: '',
                },] },
    ];
    /** @nocollapse */
    RadCalendarComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, decorators: [{ type: core_1.Inject, args: [core_1.ElementRef,] },] },
        { type: core_1.IterableDiffers, decorators: [{ type: core_1.Inject, args: [core_1.IterableDiffers,] },] },
    ]; };
    RadCalendarComponent.propDecorators = {
        "eventSource": [{ type: core_1.Input },],
    };
    return RadCalendarComponent;
}());
exports.RadCalendarComponent = RadCalendarComponent;
////////////////////
// Copied from angular 2 @angular/common/src/facade/collection
// Copied from angular 2 @angular/common/src/facade/collection
var CollectionUtils;
// Copied from angular 2 @angular/common/src/facade/collection
(function (CollectionUtils) {
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    function isBlank(obj) {
        return obj === undefined || obj === null;
    }
    var _symbolIterator = null;
    var globalScope;
    function getSymbolIterator() {
        if (isBlank(_symbolIterator)) {
            if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
                _symbolIterator = Symbol.iterator;
            }
            else {
                // es6-shim specific logic
                var keys = Object.getOwnPropertyNames(Map.prototype);
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (key !== 'entries' && key !== 'size' &&
                        Map.prototype[key] === Map.prototype['entries']) {
                        _symbolIterator = key;
                    }
                }
            }
        }
        return _symbolIterator;
    }
    function isJsObject(o) {
        return o !== null && (typeof o === 'function' || typeof o === 'object');
    }
    function isArray(obj) {
        return Array.isArray(obj);
    }
    function isListLikeIterable(obj) {
        if (!isJsObject(obj))
            return false;
        return isArray(obj) ||
            (!(obj instanceof Map) && // JS Map are iterables but return entries as [k, v]
                // JS Map are iterables but return entries as [k, v]
                getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
    }
    CollectionUtils.isListLikeIterable = isListLikeIterable;
})(CollectionUtils || (CollectionUtils = {}));
exports.CALENDAR_DIRECTIVES = [RadCalendarComponent];
if (!global.isCalendarRegistered) {
    element_registry_1.registerElement("RadCalendar", function () { return _1.RadCalendar; });
    global.isCalendarRegistered = true;
}
var NativeScriptUICalendarModule = /** @class */ (function () {
    function NativeScriptUICalendarModule() {
    }
    NativeScriptUICalendarModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [exports.CALENDAR_DIRECTIVES],
                    exports: [exports.CALENDAR_DIRECTIVES]
                },] },
    ];
    return NativeScriptUICalendarModule;
}());
exports.NativeScriptUICalendarModule = NativeScriptUICalendarModule;
