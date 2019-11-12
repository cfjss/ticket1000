var stripe;
var card;

$(document).ready(function () {
    if ($('.img-map').html() !== undefined) {
        mapLight();
    }

    if ($("#bodyContainer_pnlCreditCard").html() !== undefined) {
        createCardElement();
    }

    if ($("#bodyContainer_hfdSetCardType").val() == '1') {
        cardType();
    }
});

$("#ImageMapbodyContainer_imgMainMap").click(function () {
    $('.modal-backdrop.fade.in').remove();
});

function seatClick(e) {
    var ids = $('#bodyContainer_hfdIDs'); 
    if (e.className == 'seatActive') {
        e.className = 'seatSelect';
        ids.val(ids.val() + ',' + e.id);
    }
    else if (e.className == 'seatSelect') {
        if (e.getAttribute('t') == "1")
            e.className = 'seatActive';
        ids.val(ids.val().replace(',' + e.id, ""));
    }
    return true;
}

function mapLight() {
    $('.img-map').maphilight({
        fill: true,
        fillColor: '000000',
        fillOpacity: 0.3,
        stroke: false,
        fade: true
    });

}
function createCardElement() {
    //stripe = Stripe('');
    stripe = Stripe('pk_test_ILqACRzOxpocVfMfe18JwXPs00oOeDSqkz');

    // Create an instance of Elements.
    var elements = stripe.elements();

    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
        base: {

            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#de0000',
            iconColor: '#fa755a'
        }
    };

    // Create an instance of the card Element.
    card = elements.create('card', { style: style });

    // Add an instance of the card Element into the `card-element` <div>.
    card.mount('#card-element');


    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function (event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

function ConfirmCard(validation) {
    if (Page_ClientValidate(validation)) {
        if ($("#bodyContainer_pnlCreditCard").html() != undefined) {
            if ($('#card-element').hasClass('StripeElement--invalid')) {
                createCardElement();
                return false;
            }
            if ($('#card-element').hasClass('StripeElement--empty')) {
                $('#card-errors').html('Credit card is required');
                createCardElement();
                return false;
            }
            return true;
        }
    }
    createCardElement();
    return false;
}


function handleAction(clientSecret) {
    stripe.handleCardAction(
        clientSecret
    ).then(function (result) {
        if (result.error) {
            alert(result.error);
        } else {
            // The card action has been handled
            // The PaymentIntent can be confirmed again on the server
            fetch('/ajax/confirm_payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_intent_id: result.paymentIntent.id
                })
            }).then(function (confirmResult) {
                return confirmResult.json();
            }).then(handleServerResponse);
        }
    });
}




function payByCreditCard(param) {

    var res = param.split(",");
    var clientSecret = res[0];
    paymentId = res[1];
    var cardholderName = document.getElementById('bodyContainer_txtName').value;
    //var cardNo = document.getElementById('bodyContainer_txtCardNumber').value;

    //card.update({ value: { postalCode: '22222' } });
    //card.update({ value: { CVC: '222' } });
    //card.update({ value: { cardNumber: '4000000000003220' } });

    //////////////////
    try {
        stripe.handleCardPayment(
            clientSecret, card,
            /*element,*/
            {
                payment_method_data: {
                    billing_details: {
                        name: cardholderName
                    }
                }
            }
        ).then(function (result) {
            if (result.error) {
                console.log(result.error)
            } else {
                // The payment has succeeded. Display a success message.
                console.log('Good...success!!!');
            }
        });
    }
    catch (error) {
        console.log(error.message);
    }
    /////////////////////////////
    //stripe.handleCardPayment(
    //    clientSecret,
    //    card,
    //    /*element,*/
    //    {
    //        payment_method_data: {
    //            billing_details: {
    //                name: cardholderName
    //            }
    //        }
    //    }
    //).then(function (result) {
    //    // Handle result.error or result.paymentIntent
    //    if (result.error) {
    //        alert(result.error);
    //    } else {
    //        alert('ok');
    //    }
    //})
    //    .catch((err) => {
    //        console.log(err);
    //    }

    // clientSecret = secretkey;
    // handleAction(clientSecret);

    //stripe.handleCardPayment(
    //    clientSecret,
    //    {
    //        payment_method: paymentId,
    //    }
    //).then(function (result) {
    //    alert(result);
    //});

    //stripe.handleCardPayment(
    //    clientSecret, card, {
    //        payment_method_data: {
    //            billing_details: { name: cardholderName.value }
    //        }
    //    }
    //).then(function (result) {
    //    if (result.error) {
    //        window.location.href = "BuyTicket.aspx?mc=" + res.StatusCode;
    //        alert(result.error);
    //    }
    //    else {
    //        alert(result);
    //        //  window.location.href = "BuyTicket.aspx?srid=1&cd=" + res.PayCode;
    //    }
    //});
}