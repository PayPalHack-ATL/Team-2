const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");
const topmost = require("ui/frame").topmost;


function HomeViewModel() {
  const viewModel = observableModule.fromObject({

    receipt: {
      orderNumber: "153114556847",
      orderProduct: "Sweatshirt",
      productDescription: "This is a GT sweatshirt!",
      totalPrice: "20.00",
      expectedShipping: "10/25/2018",
        
    },

  });

  return viewModel;
}

module.exports = HomeViewModel;
