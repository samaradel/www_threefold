(function () {

    function makeTimer() {

      var endTime = new Date("November 15, 2017 12:00:00 EST");
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
        url      : 'http://threefold2.aydo.com:4040/www_threefold2.0',
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

})();
