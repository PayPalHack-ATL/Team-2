function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./ui-sidedrawer.common"));
var commonModule = require("./ui-sidedrawer.common");
var view_1 = require("tns-core-modules/ui/core/view");
var utils = require("tns-core-modules/utils/utils");
var RadSideDrawer = /** @class */ (function (_super) {
    __extends(RadSideDrawer, _super);
    function RadSideDrawer() {
        var _this = _super.call(this) || this;
        var screen = utils.ios.getter(UIScreen, UIScreen.mainScreen);
        _this._ios = TKSideDrawerView.alloc().initWithFrame(screen.bounds);
        _this._nativeDelegate = TKSideDrawerDelegateImpl.new().initWithOwner(_this);
        _this._ios.defaultSideDrawer.width = _this.drawerContentSize;
        _this._ios.defaultSideDrawer.style.blurType = 0;
        _this._ios.defaultSideDrawer.headerView = null;
        _this._ios.defaultSideDrawer.footerView = null;
        _this._ios.defaultSideDrawer.delegate = _this._nativeDelegate;
        _this.setShadowColor(_this.shadowColor);
        return _this;
    }
    Object.defineProperty(RadSideDrawer.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.createNativeView = function () {
        if (!this._isRootView) {
            this.page.on("navigatingFrom", this.onNavigatingFrom, this);
        }
        return this.ios;
    };
    RadSideDrawer.prototype.disposeNativeView = function () {
        if (!this._isRootView) {
            this.page.off("navigatingFrom", this.onNavigatingFrom, this);
        }
    };
    RadSideDrawer.prototype.onNavigatingFrom = function (args) {
        if (this.getIsOpen()) {
            this.closeDrawer();
        }
    };
    RadSideDrawer.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        // TODO: See why timeout is required to sync the backgroundColor.
        if (this._isRootView) {
            setTimeout(function () {
                if (_this._drawerController) {
                    _this._drawerController.view.backgroundColor = _this.drawerContent && _this.drawerContent.nativeViewProtected.backgroundColor;
                }
            });
        }
    };
    RadSideDrawer.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
    };
    // data changed event handlers
    // data changed event handlers
    RadSideDrawer.prototype._onDrawerLocationChanged = 
    // data changed event handlers
    function (oldValue, newValue) {
        if (!newValue) {
            return;
        }
        this.setDrawerLocation(newValue);
    };
    RadSideDrawer.prototype._onShadowColorChanged = function (oldValue, newValue) {
        this.setShadowColor(newValue);
    };
    RadSideDrawer.prototype.setShadowColor = function (color) {
        this._ios.defaultSideDrawer.style.shadowMode = 2;
        this._ios.defaultSideDrawer.style.dimOpacity = 0.42;
        this._ios.defaultSideDrawer.style.shadowRadius = 0;
        this._ios.defaultSideDrawer.style.shadowOpacity = 1; // 0-1, higher is darker
        this._ios.defaultSideDrawer.style.shadowColor = color ? color.ios : RadSideDrawer.shadowColorProperty.defaultValue.ios;
    };
    RadSideDrawer.prototype._onGesturesEnabledChanged = function (oldValue, newValue) {
        var value = newValue;
        this.ios.defaultSideDrawer.allowGestures = value;
    };
    RadSideDrawer.prototype._onAllowEdgeSwipeChanged = function (oldValue, newValue) {
        var value = newValue;
        this.ios.defaultSideDrawer.allowEdgeSwipe = value;
    };
    RadSideDrawer.prototype.setDrawerLocation = function (newLocation) {
        var newLocationToLower = newLocation.toLocaleLowerCase();
        switch (newLocationToLower) {
            case commonModule.SideDrawerLocation.Left.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = 0 /* Left */;
                break;
            case commonModule.SideDrawerLocation.Right.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = 1 /* Right */;
                break;
            case commonModule.SideDrawerLocation.Top.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = 2 /* Top */;
                break;
            case commonModule.SideDrawerLocation.Bottom.toLocaleLowerCase():
                this._ios.defaultSideDrawer.position = 3 /* Bottom */;
                break;
        }
        this.requestLayout();
    };
    RadSideDrawer.prototype._onDrawerContentSizeChanged = function (oldValue, newValue) {
        var value = newValue;
        this._ios.defaultSideDrawer.width = value;
    };
    RadSideDrawer.prototype._onDrawerTransitionChanged = function (oldValue, newValue) {
        var value = newValue;
        var finalVal;
        if (typeof value === "string") {
            switch (value.toLowerCase()) {
                case commonModule.FadeTransitionString: {
                    finalVal = new FadeTransition();
                    break;
                }
                case commonModule.PushTransitionString: {
                    finalVal = new PushTransition();
                    break;
                }
                case commonModule.RevealTransitionString: {
                    finalVal = new RevealTransition();
                    break;
                }
                case commonModule.ReverseSlideOutTransitionString: {
                    finalVal = new ReverseSlideOutTransition();
                    break;
                }
                case commonModule.ScaleDownPusherTransitionString: {
                    finalVal = new ScaleDownPusherTransition();
                    break;
                }
                case commonModule.ScaleUpTransitionString: {
                    finalVal = new ScaleUpTransition();
                    break;
                }
                case commonModule.SlideAlongTransitionString: {
                    finalVal = new SlideAlongTransition();
                    break;
                }
                case commonModule.SlideInOnTopTransitionString: {
                    finalVal = new SlideInOnTopTransition();
                    break;
                }
                default: {
                    console.log("Error: Not supported value (" + value + ") set to 'drawerTransition'");
                    finalVal = new SlideInOnTopTransition();
                    break;
                }
            }
            if (this.drawerTransition !== finalVal) {
                this.drawerTransition = finalVal;
                return;
            }
        }
        else {
            finalVal = value;
        }
        this._ios.defaultSideDrawer.transition = finalVal.getNativeContent();
    };
    RadSideDrawer.prototype._onMainContentChanged = function (oldValue, newValue) {
        if (oldValue) {
            this._removeView(oldValue);
        }
        if (newValue) {
            this._addView(newValue);
        }
    };
    RadSideDrawer.prototype._onDrawerContentChanged = function (oldValue, newValue) {
        if (oldValue) {
            this._drawerController = null;
            this._removeView(oldValue);
        }
        if (newValue) {
            this._addView(newValue);
        }
    };
    Object.defineProperty(RadSideDrawer.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RadSideDrawer.prototype.closeDrawer = function () {
        if (this._ios) {
            this._ios.defaultSideDrawer.dismiss();
            _super.prototype.closeDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.showDrawer = function () {
        if (this._ios) {
            this._ios.defaultSideDrawer.show();
            _super.prototype.showDrawer.call(this);
        }
    };
    RadSideDrawer.prototype.eachChildView = function (callback) {
        var mainContent = this.mainContent;
        if (mainContent) {
            callback(mainContent);
        }
        if (this.drawerContent) {
            callback(this.drawerContent);
        }
    };
    RadSideDrawer.prototype.onLayout = function (left, top, right, bottom) {
        // In the case where the RadSideDrawer is not root view of the app
        // it doesn't have a viewController and childViewControllers. In this case
        // the RadSideDrawer must lay out its children drawerContent and mainContent
        if (!this.viewController) {
            var width = right - left;
            var height = bottom - top;
            var screenWidth = width;
            var screenHeight = height;
            var screen_1 = utils.ios.getter(UIScreen, UIScreen.mainScreen);
            var drawerSize = utils.layout.toDevicePixels(this.drawerContentSize);
            var pos = this._ios.defaultSideDrawer.position;
            if (pos === 2 /* Top */ || pos === 3 /* Bottom */) {
                this.drawerContent.layout(0, 0, right, drawerSize);
            }
            else {
                this.drawerContent.layout(0, 0, drawerSize, bottom);
            }
            this.mainContent.layout(0, 0, width, height);
        }
    };
    RadSideDrawer.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var pos = this._ios.defaultSideDrawer.position;
        var drawerWidth = widthMeasureSpec;
        var drawerHeight = heightMeasureSpec;
        var drawerSize = utils.layout.toDevicePixels(this.drawerContentSize);
        if (pos === 2 /* Top */ || pos === 3 /* Bottom */) {
            view_1.View.measureChild(this, this.drawerContent, drawerWidth, utils.layout.makeMeasureSpec(drawerSize, utils.layout.EXACTLY));
        }
        else {
            view_1.View.measureChild(this, this.drawerContent, utils.layout.makeMeasureSpec(drawerSize, utils.layout.EXACTLY), drawerHeight);
        }
        var result = view_1.View.measureChild(this, this.mainContent, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var widthAndState = view_1.View.resolveSizeAndState(result.measuredWidth, width, widthMode, 0);
        var heightAndState = view_1.View.resolveSizeAndState(result.measuredHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    RadSideDrawer.prototype._addViewToNativeVisualTree = function (child, atIndex) {
        _super.prototype._addViewToNativeVisualTree.call(this, child, atIndex);
        var controller = this.viewController;
        if (child === this.mainContent) {
            this._ios.setMainView(child.nativeViewProtected);
        }
        else if (child === this.drawerContent) {
            if (controller) {
                if (!child.viewController) {
                    child.viewController = this._drawerController = view_1.ios.UILayoutViewController.initWithOwner(new WeakRef(child));
                    var view = this._drawerController.view;
                    view.addSubview(child.nativeViewProtected);
                    this._ios.defaultSideDrawer.content = view;
                }
                else {
                    this._ios.defaultSideDrawer.content = child.nativeViewProtected;
                }
            }
            else {
                this._ios.defaultSideDrawer.content = child.nativeViewProtected;
            }
        }
        var childController = child.viewController;
        if (controller && childController) {
            controller.addChildViewController(childController);
        }
        return true;
    };
    return RadSideDrawer;
}(commonModule.RadSideDrawer));
exports.RadSideDrawer = RadSideDrawer;
//              TRANSITIONS
var 
//              TRANSITIONS
FadeTransition = /** @class */ (function (_super) {
    __extends(FadeTransition, _super);
    function FadeTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FadeTransition.prototype.getNativeContent = function () {
        return 6 /* FadeIn */;
    };
    return FadeTransition;
}(commonModule.DrawerTransitionBase));
exports.FadeTransition = FadeTransition;
var PushTransition = /** @class */ (function (_super) {
    __extends(PushTransition, _super);
    function PushTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PushTransition.prototype.getNativeContent = function () {
        return 2 /* Push */;
    };
    return PushTransition;
}(commonModule.DrawerTransitionBase));
exports.PushTransition = PushTransition;
var RevealTransition = /** @class */ (function (_super) {
    __extends(RevealTransition, _super);
    function RevealTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RevealTransition.prototype.getNativeContent = function () {
        return 1 /* Reveal */;
    };
    return RevealTransition;
}(commonModule.DrawerTransitionBase));
exports.RevealTransition = RevealTransition;
var ReverseSlideOutTransition = /** @class */ (function (_super) {
    __extends(ReverseSlideOutTransition, _super);
    function ReverseSlideOutTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReverseSlideOutTransition.prototype.getNativeContent = function () {
        return 4 /* ReverseSlideOut */;
    };
    return ReverseSlideOutTransition;
}(commonModule.DrawerTransitionBase));
exports.ReverseSlideOutTransition = ReverseSlideOutTransition;
var ScaleDownPusherTransition = /** @class */ (function (_super) {
    __extends(ScaleDownPusherTransition, _super);
    function ScaleDownPusherTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleDownPusherTransition.prototype.getNativeContent = function () {
        return 7 /* ScaleDownPusher */;
    };
    return ScaleDownPusherTransition;
}(commonModule.DrawerTransitionBase));
exports.ScaleDownPusherTransition = ScaleDownPusherTransition;
var ScaleUpTransition = /** @class */ (function (_super) {
    __extends(ScaleUpTransition, _super);
    function ScaleUpTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleUpTransition.prototype.getNativeContent = function () {
        return 5 /* ScaleUp */;
    };
    return ScaleUpTransition;
}(commonModule.DrawerTransitionBase));
exports.ScaleUpTransition = ScaleUpTransition;
var SlideAlongTransition = /** @class */ (function (_super) {
    __extends(SlideAlongTransition, _super);
    function SlideAlongTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideAlongTransition.prototype.getNativeContent = function () {
        return 3 /* SlideAlong */;
    };
    return SlideAlongTransition;
}(commonModule.DrawerTransitionBase));
exports.SlideAlongTransition = SlideAlongTransition;
var SlideInOnTopTransition = /** @class */ (function (_super) {
    __extends(SlideInOnTopTransition, _super);
    function SlideInOnTopTransition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlideInOnTopTransition.prototype.getNativeContent = function () {
        return 0 /* SlideInOnTop */;
    };
    return SlideInOnTopTransition;
}(commonModule.DrawerTransitionBase));
exports.SlideInOnTopTransition = SlideInOnTopTransition;
//      Delegate implementation
var TKSideDrawerDelegateImpl = /** @class */ (function (_super) {
    __extends(TKSideDrawerDelegateImpl, _super);
    function TKSideDrawerDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKSideDrawerDelegateImpl.new = function () {
        return _super.new.call(this);
    };
    TKSideDrawerDelegateImpl.prototype.initWithOwner = function (owner) {
        this._owner = owner;
        return this;
    };
    TKSideDrawerDelegateImpl.prototype.willShowSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerOpeningEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerOpeningEvent,
                object: this._owner,
                returnValue: false
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didShowSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerOpenedEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerOpenedEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.willDismissSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerClosingEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerClosingEvent,
                object: this._owner,
                returnValue: false
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didDismissSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerClosedEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerClosedEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.prototype.didPanSideDrawer = function (sideDrawer) {
        if (this._owner.hasListeners(commonModule.RadSideDrawer.drawerPanEvent)) {
            var args = {
                eventName: commonModule.RadSideDrawer.drawerPanEvent,
                object: this._owner,
            };
            this._owner.notify(args);
        }
    };
    TKSideDrawerDelegateImpl.ObjCProtocols = [TKSideDrawerDelegate];
    return TKSideDrawerDelegateImpl;
}(NSObject));
