const ReceiptViewModel = require("./receipt-view-model");
const receiptViewModel = new ReceiptViewModel();

exports.pageLoaded = function (args) {
    const page = args.object;
    page.bindingContext = receiptViewModel;
}
