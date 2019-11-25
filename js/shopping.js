var stripe;
var card;

$(document).ready(function () {
    if ($('.img-map').html() !== undefined) {
        mapLight();
    }

    if ($("#bodyContainer_pnlCreditCard").html() !== undefined) {
        createCardElement();
    }

    //if ($("#bodyContainer_hfdSetCardType").val() == '1') {
    //    cardType();
    //}
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
var validateSingleSeats = function () {

    if (hasSingle()) {
        alert("select seats so that no single seat is created");
        return false;
    }
    else {
        return true;
    }
}

function hasSingle() {
    var result = false;

    $.each($('.SeatPanelSeats .seatRow'), function (i, seat) {
        $('.seatSelect', seat).each(function () {
            var tn = $(this).next().attr("class");
            var tp = $(this).prev().attr("class");
            var tnn = $(this).next().next().attr("class");
            var tpp = $(this).prev().prev().attr("class");

            var marginLeft = $(this).css('margin-left');
            var marginRight = $(this).css('margin-right');
            var marginRightPre = $(this).prev().css('margin-right');
            var marginLeftPre = $(this).prev().css('margin-left');


            var direction = $(this).parent().parent().css('direction');
            var isRtl = false;
            if (direction == undefined || direction == 'rtl') {
                isRtl = true;
            }
            // Last Tak
            if (tn == "seatActive" && (tnn == undefined || tnn == "seatRowHeader") && (((marginRight == undefined || marginRight == '0px') && !isRtl) || ((marginLeft == undefined || marginLeft == '0px') && isRtl))) {
                result = true;
                return false;
            }
            // First Tak
            if (tp == "seatActive" && (tpp == undefined || tpp == "seatRowHeader") && (((marginRightPre == undefined || marginRightPre == '0px') && !isRtl) || ((marginLeftPre == undefined || marginLeftPre == '0px') && isRtl))) {
                result = true;
                return false;
            }
            if (tn == "seatActive") {
                if (tnn == 'seatSold' || tnn == 'seatSelect' || tnn == 'seatReserve' || tnn == "seatMyPurchase" || tnn == "seatUnUseable" || tnn == "seatGuest" || tnn == "seatLock") {
                    result = true;

                    if (isRtl) {
                        var c = $(this).next().css('margin-left');
                        if (c !== undefined && c !== '0px') {
                            result = false;
                        }
                    } else {
                        var c = $(this).css('margin-right');
                        if (c !== undefined && c !== '0px') {
                            result = false;
                        }
                    }
                    if (result) {
                        return false;
                    }
                }
            }
            if (tp == "seatActive") {
                if (tpp == 'seatSold' || tpp == 'seatSelect' || tpp == 'seatReserve' || tpp == "seatMyPurchase" || tpp == "seatUnUseable" || tpp == "seatGuest" || tpp == "seatLock") {
                    result = true;

                    if (isRtl) {
                        var c = $(this).prev().css('margin-left');
                        if (c !== undefined && c !== '0px') {
                            result = false;
                        }
                    } else {
                        var c = $(this).prev().css('margin-right');
                        if (c !== undefined && c !== '0px') {
                            result = false;
                        }
                    }

                    if (result) {
                        return false;
                    }

                }
            }

            if (isRtl) {
                // left rahro
                var marginLeftpLtr = $(this).prev().css('margin-left');
                if (tp == "seatActive" && marginLeftpLtr !== undefined && marginLeftpLtr !== '0px') {
                    result = true;

                    var p = $(this).prev().css('margin-left');
                    if (p !== undefined && p !== '0px') {
                        result = false;
                    }

                    var pp = $(this).prev().prev().css('margin-left');
                    if (pp !== undefined && pp !== '0px') {
                        result = false;
                    }
                    if (result)
                        return false;
                }
                var marginLeftpRtl = $(this).prev().prev().css('margin-left');
                if (tp == "seatActive" && marginLeftpRtl !== undefined && marginLeftpRtl !== '0px') {
                    result = true;

                    var c = $(this).prev().css('margin-left');
                    if (c !== undefined && c !== '0px') {
                        result = false;
                    }

                    if (result)
                        return false;
                }
                // right rahro
                var marginLeftnRtl = $(this).next().css('margin-left');
                if (tn == "seatActive" && marginLeftnRtl !== undefined && marginLeftnRtl !== '0px') {
                    result = true;

                    var n = $(this).css('margin-left');
                    if (n !== undefined && n !== '0px') {
                        result = false;
                    }
                    if (result)
                        return false;
                }

            } else {
                // right rahro
                var marginLeftnLtr = $(this).next().css('margin-right');
                if (tn == "seatActive" && marginLeftnLtr !== undefined && marginLeftnLtr !== '0px') {
                    result = true;

                    var n = $(this).next().css('margin-right');
                    if (n !== undefined && n !== '0px') {
                        result = false;
                    }
                    if (result)
                        return false;
                }
                var marginLeftnRtl = $(this).next().css('margin-right');
                if (tn == "seatActive" && marginLeftnRtl !== undefined && marginLeftnRtl !== '0px') {
                    result = true;
                    var c = $(this).css('margin-right');
                    if (c !== undefined && c !== '0px') {
                        result = false;
                    }
                    if (result)
                        return false;
                }
                // left rahro
                var marginLeftpRtl = $(this).prev().prev().css('margin-right');
                if (tp == "seatActive" && marginLeftpRtl !== undefined && marginLeftpRtl !== '0px') {
                    result = true;

                    var p = $(this).prev().css('margin-right');
                    if (p !== undefined && p !== '0px') {
                        result = false;
                    }
                    if (result)
                        return false;
                }
            }
        });
    });
    return result;
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