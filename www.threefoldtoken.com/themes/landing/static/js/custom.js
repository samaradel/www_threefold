(function () {

    function makeTimer() {

      var endTime = new Date("December 1, 2017 12:00:00 EST");
      var endTime = (Date.parse(endTime)) / 1000;

      var now = new Date();
      var now = (Date.parse(now) / 1000);

      var timeLeft = endTime - now;

      var days = Math.floor(timeLeft / 86400);
      var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
      var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
      var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

      if (hours < "10") { hours = "0" + hours; }
      if (minutes < "10") { minutes = "0" + minutes; }
      if (seconds < "10") { seconds = "0" + seconds; }

      $("#days").html(days + "<span>Days</span>");
      $("#hours").html(hours + "<span>Hours</span>");
      $("#minutes").html(minutes + "<span>Minutes</span>");
      $("#seconds").html(seconds + "<span>Seconds</span>");
    }

    setInterval(function() { makeTimer(); }, 1000);

    $('nav a[href$="/' + location.pathname.split("/")[1] + '"]').addClass('active');

    // Mailout

     $('#contact-us').submit(function (event) {
      $.ajax({
        type     : 'POST',
        url      : 'http://www.threefoldtoken.com/www_threefold2.0',
        data     : $('#contact-us').serialize(),
        dataType : 'json',
        encode   : true
      })
      .done(function (data) {
        console.log(data);
        $('#contactThankYou').show();
        $('#contact-us').hide();
        $('#test').hide();
      })
      .fail(function () {
          alert("error");
      });
      event.preventDefault();
    });

    // Display Links

    // if (sessionStorage.getItem('status') != null) {
    //   $('.nav>li.showLink').css("display", "none");
    //   $('.nav>li.hideLink').css("display", "block");
    // }
    // else {
    //   $('.nav>li.showLink').css("display", "block");
    //   $('.nav>li.hideLink').css("display", "none");
    // }

    // QR Code

    var TIMEOUT = 60000; // 60 seconds
    var qrCode = undefined;
    var STATUS = {
        OK : 'ok',
        EXPIRED : 'expired',
        ERROR : 'error'
    };

    function renderQrCode(jwt) {
        console.log("Showing QR code with content: " + jwt);
        toggle(STATUS.OK);

        if (qrCode) {
            qrCode.clear();
            qrCode.makeCode(jwt);
        } else {
            qrCode = new QRCode(document.getElementById("qrcode"), {
                text : jwt,
                correctLevel : QRCode.CorrectLevel.M,
                width : 700,
                height : 700
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
            url : '/forward/v1/oauth/jwt/refresh?validity=' + (5 + TIMEOUT / 1000), // margin of 5 seconds
            beforeSend : function(request) {
                request.setRequestHeader("Authorization", 'bearer ' + readCookie("caddyoauth"));
            },
            success : function(data) {
                renderQrCode(data);
            },
            error : function() {
                console.error('Could not get the JWT');
                toggle(STATUS.ERROR);
            }
        });
    }

    $('#qrcode #refresh-button').click(refreshCode);

    refreshCode();

})();
