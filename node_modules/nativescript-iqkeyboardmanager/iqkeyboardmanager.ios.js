"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var content_view_1 = require("tns-core-modules/ui/content-view");
var PreviousNextView = (function (_super) {
    __extends(PreviousNextView, _super);
    function PreviousNextView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreviousNextView.prototype.createNativeView = function () {
        return IQPreviousNextView.new();
    };
    return PreviousNextView;
}(content_view_1.ContentView));
exports.PreviousNextView = PreviousNextView;
