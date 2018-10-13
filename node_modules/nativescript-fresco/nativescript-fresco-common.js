"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var ScaleType;
(function (ScaleType) {
    ScaleType.Center = "center";
    ScaleType.CenterCrop = "centerCrop";
    ScaleType.CenterInside = "centerInside";
    ScaleType.FitCenter = "fitCenter";
    ScaleType.FitEnd = "fitEnd";
    ScaleType.FitStart = "fitStart";
    ScaleType.FitXY = "fitXY";
    ScaleType.FocusCrop = "focusCrop";
})(ScaleType = exports.ScaleType || (exports.ScaleType = {}));
var EventData = (function () {
    function EventData() {
    }
    Object.defineProperty(EventData.prototype, "eventName", {
        get: function () {
            return this._eventName;
        },
        set: function (value) {
            this._eventName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventData.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
        },
        enumerable: true,
        configurable: true
    });
    return EventData;
}());
exports.EventData = EventData;
var FrescoDrawee = (function (_super) {
    __extends(FrescoDrawee, _super);
    function FrescoDrawee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrescoDrawee.prototype.onImageUriPropertyChanged = function (oldValue, newValue) {
        this.onImageUriChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onPlaceholderImageUriPropertyChanged = function (oldValue, newValue) {
        this.onPlaceholderImageUriChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onFailureImageUriPropertyChanged = function (oldValue, newValue) {
        this.onFailureImageUriChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onActualImageScaleTypePropertyChanged = function (oldValue, newValue) {
        this.onActualImageScaleTypeChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onFadeDurationPropertyChanged = function (oldValue, newValue) {
        this.onFadeDurationChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onBackgroundUriPropertyChanged = function (oldValue, newValue) {
        this.onBackgroundUriChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onProgressiveRenderingEnabledPropertyChanged = function (oldValue, newValue) {
        this.onProgressiveRenderingEnabledChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onShowProgressBarPropertyChanged = function (oldValue, newValue) {
        this.onShowProgressBarChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onProgressBarColorPropertyChanged = function (oldValue, newValue) {
        this.onProgressBarColorChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onRoundAsCirclePropertyChanged = function (oldValue, newValue) {
        this.onRoundAsCircleChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onRoundTopLeftPropertyChanged = function (oldValue, newValue) {
        this.onRoundTopLeftChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onRoundTopRightPropertyChanged = function (oldValue, newValue) {
        this.onRoundTopRightChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onRoundBottomLeftPropertyChanged = function (oldValue, newValue) {
        this.onRoundBottomLeftChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onRoundBottomRightPropertyChanged = function (oldValue, newValue) {
        this.onRoundBottomRightChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onRoundedCornerRadiusPropertyChanged = function (oldValue, newValue) {
        this.onRoundedCornerRadiusChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onAutoPlayAnimationsPropertyChanged = function (oldValue, newValue) {
        this.onAutoPlayAnimationsPChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onTapToRetryEnabledPropertyChanged = function (oldValue, newValue) {
        this.onTapToRetryEnabledChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onAspectRatioPropertyChanged = function (oldValue, newValue) {
        this.onAspectRatioChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onDecodeWidthPropertyChanged = function (oldValue, newValue) {
        this.onDecodeWidthChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onDecodeHeightPropertyChanged = function (oldValue, newValue) {
        this.onDecodeHeightChanged(oldValue, newValue);
    };
    FrescoDrawee.prototype.onImageUriChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onPlaceholderImageUriChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onFailureImageUriChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onActualImageScaleTypeChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onFadeDurationChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onBackgroundUriChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onProgressiveRenderingEnabledChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onShowProgressBarChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onProgressBarColorChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onRoundAsCircleChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onRoundTopLeftChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onRoundTopRightChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onRoundBottomLeftChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onRoundBottomRightChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onRoundedCornerRadiusChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onAutoPlayAnimationsPChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onTapToRetryEnabledChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onAspectRatioChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onDecodeWidthChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.prototype.onDecodeHeightChanged = function (oldValue, newValue) {
    };
    FrescoDrawee.finalImageSetEvent = "finalImageSet";
    FrescoDrawee.failureEvent = "failure";
    FrescoDrawee.intermediateImageFailedEvent = "intermediateImageFailed";
    FrescoDrawee.intermediateImageSetEvent = "intermediateImageSet";
    FrescoDrawee.releaseEvent = "release";
    FrescoDrawee.submitEvent = "submit";
    FrescoDrawee.imageUriProperty = new view_1.Property({
        name: "imageUri",
        defaultValue: undefined,
        valueConverter: function (v) { return v; },
        valueChanged: function (target, oldValue, newValue) {
            target.onImageUriPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.placeholderImageUriProperty = new view_1.Property({
        name: "placeholderImageUri",
        defaultValue: undefined,
        valueConverter: function (v) { return v; },
        valueChanged: function (target, oldValue, newValue) {
            target.onPlaceholderImageUriPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.failureImageUriProperty = new view_1.Property({
        name: "failureImageUri",
        defaultValue: undefined,
        valueConverter: function (v) { return v; },
        valueChanged: function (target, oldValue, newValue) {
            target.onFailureImageUriPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.actualImageScaleTypeProperty = new view_1.Property({
        name: "actualImageScaleType",
        defaultValue: undefined,
        valueConverter: function (v) { return v; },
        valueChanged: function (target, oldValue, newValue) {
            target.onActualImageScaleTypePropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.fadeDurationProperty = new view_1.Property({
        name: "fadeDuration",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onFadeDurationPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.backgroundUriProperty = new view_1.Property({
        name: "backgroundUri",
        defaultValue: undefined,
        valueConverter: function (v) { return v; },
        valueChanged: function (target, oldValue, newValue) {
            target.onBackgroundUriPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.progressiveRenderingEnabledProperty = new view_1.Property({
        name: "progressiveRenderingEnabled",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onProgressiveRenderingEnabledPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.showProgressBarProperty = new view_1.Property({
        name: "showProgressBar",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onShowProgressBarPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.progressBarColorProperty = new view_1.Property({
        name: "progressBarColor",
        defaultValue: undefined,
        valueConverter: function (v) { return v; },
        valueChanged: function (target, oldValue, newValue) {
            target.onProgressBarColorPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.roundAsCircleProperty = new view_1.Property({
        name: "roundAsCircle",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        affectsLayout: true,
        valueChanged: function (target, oldValue, newValue) {
            target.onRoundAsCirclePropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.roundTopLeftProperty = new view_1.Property({
        name: "roundTopLeft",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        affectsLayout: true,
        valueChanged: function (target, oldValue, newValue) {
            target.onRoundTopLeftPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.roundTopRightProperty = new view_1.Property({
        name: "roundTopRight",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        affectsLayout: true,
        valueChanged: function (target, oldValue, newValue) {
            target.onRoundTopRightPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.roundBottomLeftProperty = new view_1.Property({
        name: "roundBottomLeft",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onRoundBottomLeftPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.roundBottomRightProperty = new view_1.Property({
        name: "roundBottomRight",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onRoundBottomRightPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.roundedCornerRadiusProperty = new view_1.Property({
        name: "roundedCornerRadius",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onRoundedCornerRadiusPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.autoPlayAnimationsProperty = new view_1.Property({
        name: "autoPlayAnimations",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onAutoPlayAnimationsPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.tapToRetryEnabledProperty = new view_1.Property({
        name: "tapToRetryEnabled",
        defaultValue: undefined,
        valueConverter: view_1.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onTapToRetryEnabledPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.aspectRatioProperty = new view_1.Property({
        name: "aspectRatio",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onAspectRatioPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.decodeWidthProperty = new view_1.Property({
        name: "decodeWidth",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onDecodeWidthPropertyChanged(oldValue, newValue);
        },
    });
    FrescoDrawee.decodeHeightProperty = new view_1.Property({
        name: "decodeHeight",
        defaultValue: undefined,
        valueConverter: function (v) { return parseFloat(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onDecodeHeightPropertyChanged(oldValue, newValue);
        },
    });
    return FrescoDrawee;
}(view_1.View));
exports.FrescoDrawee = FrescoDrawee;
FrescoDrawee.imageUriProperty.register(FrescoDrawee);
FrescoDrawee.placeholderImageUriProperty.register(FrescoDrawee);
FrescoDrawee.failureImageUriProperty.register(FrescoDrawee);
FrescoDrawee.actualImageScaleTypeProperty.register(FrescoDrawee);
FrescoDrawee.fadeDurationProperty.register(FrescoDrawee);
FrescoDrawee.backgroundUriProperty.register(FrescoDrawee);
FrescoDrawee.progressiveRenderingEnabledProperty.register(FrescoDrawee);
FrescoDrawee.showProgressBarProperty.register(FrescoDrawee);
FrescoDrawee.progressBarColorProperty.register(FrescoDrawee);
FrescoDrawee.roundAsCircleProperty.register(FrescoDrawee);
FrescoDrawee.roundTopLeftProperty.register(FrescoDrawee);
FrescoDrawee.roundTopRightProperty.register(FrescoDrawee);
FrescoDrawee.roundBottomLeftProperty.register(FrescoDrawee);
FrescoDrawee.roundBottomRightProperty.register(FrescoDrawee);
FrescoDrawee.roundedCornerRadiusProperty.register(FrescoDrawee);
FrescoDrawee.autoPlayAnimationsProperty.register(FrescoDrawee);
FrescoDrawee.tapToRetryEnabledProperty.register(FrescoDrawee);
FrescoDrawee.aspectRatioProperty.register(FrescoDrawee);
FrescoDrawee.decodeWidthProperty.register(FrescoDrawee);
FrescoDrawee.decodeHeightProperty.register(FrescoDrawee);
//# sourceMappingURL=nativescript-fresco-common.js.map