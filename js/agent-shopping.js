$("#ImageMapbodyContainer_imgMainMap").click(function () {
    $('.modal-backdrop.fade.in').remove();
});

$(document).ready(function () {
    mapLight();
});

function seatClick(e) {
    var ids = $('#bodyContainer_hfdIDs');
    if (e.className == 'seatActive' || e.className == 'seatLock') {
        e.className = 'seatSelect';
        ids.val(ids.val() + ',' + e.id);
    }
    else if (e.className == 'seatSelect') {
        if (e.getAttribute('t') == "1")
            e.className = 'seatActive';
        else if (e.getAttribute('t') == "2")
            e.className = 'seatLock';
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
function ConfirmMe() {
    if (Page_ClientValidate("Save"))
        return confirm('Are you sure?');
    return false;
}
