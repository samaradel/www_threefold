// QR Code

var TIMEOUT = 60000; // 60 seconds
var qrCode = undefined;
var STATUS = {
    OK: 'ok',
    EXPIRED: 'expired',
    ERROR: 'error'
};

function renderQrCode(jwt) {
    console.log("Showing QR code");
    toggle(STATUS.OK);

    if (qrCode) {
        qrCode.clear();
        qrCode.makeCode(jwt);
    } else {
        qrCode = new QRCode(document.getElementById("qrcode"), {
            text: jwt,
            correctLevel: QRCode.CorrectLevel.M,
            width: 700,
            height: 700
        });
    }

    setTimeout(qrTimedOut, TIMEOUT);
}

function toggle(status) {
    $.each(STATUS, function(i, s) {
        $('#qr-text .' + s).toggle(s == status);
        $('#qrcode #' + s + '-overlay').toggle(s == status);
    });
}

function qrTimedOut() {
    console.log("QR code is expired");
    toggle(STATUS.EXPIRED);
}

function refreshCode() {
    console.log("Refreshing QR code");

    $.ajax({
        url: '/forward/v1/oauth/jwt/refresh?validity=' + (5 + TIMEOUT / 1000), // margin of 5 seconds
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", 'bearer ' + readCookie("caddyoauth"));
        },
        success: function(data) {
            renderQrCode(data);
        },
        error: function() {
            console.error('Could not get the JWT');
            toggle(STATUS.ERROR);
        }
    });
}

$('#qrcode #refresh-button').click(refreshCode);

refreshCode();