const observableModule = require("data/observable");
const dialogsModule = require("ui/dialogs");
const topmost = require("ui/frame").topmost;
const braintree = require("braintree");

// Add braintree gateway
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "y9zyhmqmxyxcymdf",
  publicKey: "6kr94tsm4hqcdpk8",
  privateKey: "4602c1d9aec857161008454e9a8273bc"
});


function HomeViewModel() {
  const viewModel = observableModule.fromObject({

	// Approval button on tap function
    onButtonTap1: function () {
	// time out to show processing
      setTimeout(function () {
	// paymentMethodNonce will allow for approval of transaction
          gateway.transaction.sale({
          amount: "20.00",
          paymentMethodNonce: "fake-paypal-billing-agreement-nonce",
          options: {
          submitForSettlement: true
          }
          }, function (err, result) {
          if (result.success) {
          // If successful, navigate to receipt-page
          topmost().navigate("./receipt/receipt-page");
          } else {
          // Handle errors
          }
          });

        },700)

    },
	// Denial button on tap function
    onButtonTap2: function () {
      setTimeout(function () {
        dialogsModule.alert({
          title: "PayPal Teen Alert",
          message: "Your teen's order was not placed. Your account was not charged.",
          okButtonText: "Close"
        }).then(() => {
          console.log("The user closed the alert.");
        });

      }, 700)

    },

	// Data for order preview
    child: {
      childName: "Ed Sheeran",
      childEmail: "edsheeran@me.com",
      product: "Georgia Tech Sweatshirt",
      price: "20.00",
      description: "This is a GT Sweatshirt!",

    },

  });

  return viewModel;
}

module.exports = HomeViewModel;
