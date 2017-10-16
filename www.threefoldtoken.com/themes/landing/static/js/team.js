/*
 * Copyright 2017 GIG Technology NV
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @@license_version:1.3@@
 */

$(function () {
  var render = function (xpositions, ypositions, dataset, width, height) {
    var table = $("<table></table>");
    var tbody = $("<tbody></tbody>");
    table.append(tbody).css('line-height', '0px');
    var y=0;
    for (y=0; y<ypositions; y++) {
      var tr = $("<tr></tr>");
      // tr.css('padding', '0px').css('margin', '0px').css('padding', '0px').css('border-width', '0px');
      var x=0;
      for (x=0; x<xpositions; x++) {
        var details = dataset[x+"x"+y];
        var td = $("<td></td>");
        var overlay = $("<div></div>").addClass("overlay");
        var img = $("<img/>").css('filter', 'grayscale(100%)');
        if (details) {
          var parent = $("<div></div>").addClass("overview");
          td.append(parent);
          var a = $("<a></a>").addClass('overview-top').click(showOverview).click(function(){
             $(this).find('img').css('filter', 'grayscale(0%)')}).css('cursor', 'pointer');
          parent.append(a);
          a.append(img);
        } else {
          parent = td;
          parent.append(img);
        }
        // td.css('padding', '0px').css('margin', '0px').css('padding', '0px').css('border-width', '0px');
        if (details) {
          img.prop('src', '../avatars/'+ encodeURIComponent(details['avatar']));
        }
        // else {
        //   img.prop('src', 'https://docs.greenitglobe.com/ThreeFold/www_threefold_dynamic_contents/raw/master/avatars/baby.jpg');
        // }
        img.height(height).width(width).css('max-width', width+'px').css('max-height', height+'px').css('min-width', width+'px').css('min-height', height+'px');
        // if (x == 0) {
        //   img.css('margin-left', '0px');
        // }
        // if (x + 1 == xpositions){
        //   img.css('margin-right', '0px');
        // }
        if (details) {
          var div = $("<div></div>").addClass("overview-contents").hide();
          parent.append(div);
          div.append($("<div></div>").addClass("close").append($("<a></a>").click(closeOverview).click(function(){
             $('.overview').find('img').css('filter', 'grayscale(100%)')}).css('cursor', 'pointer').text("x").css('color', '#fff')));
          div.append($("<h2></h2>").text(details["name"]));
          div.append($("<p></p>").text(details["description"]));
          div.append($("<h2></h2>").text('hobbies', details["name"]).css('padding-top', '15px'));
          div.append($("<p></p>").text(details["hobbies"]).css('padding-bottom', '15px'));
          div.append($("<a><i class='fa fa-linkedin-square fa-2'></i></a>").attr('href', details["linked_in"]).css({
            'color': '#fff',
            'font-size': '0.7em',
            'padding-left': '10px'
          }));
          div.append($("<a><i class='fa fa-envelope fa-2'></i></a>").attr('href', 'mailto:' + details["emails"]).css({
            'color': '#fff',
            'font-size': '0.7em',
            'padding-left': '25px'
          }));
          div.append($("<a><i class='fa fa-github-square fa-2'></i></a>").attr('href', details["github"]).css({
            'color': '#fff',
            'font-size': '0.7em',
            'padding-left': '25px'
          }));
          div.append($("<a><i class='fa fa-telegram fa-2'></i></a>").attr('href', 'https://t.me/' + details["telegram"]).css({
            'color': '#fff',
            'font-size': '0.7em',
            'padding-left': '25px'
          }));
        }
        tr.append(td);
      }
      tbody.append(tr);
    }
    return table;
  };
  var showOverview = function () {
    var me = $(this);
    var pos = me.position();
    me.parent().find('.overview-contents').css('top', pos.top - 140).show();
    me.parent().find('.overview-contents').addClass('visible').removeClass('invisible');
    //$('.overview a.overview-top').addClass('invisible').removeClass('visible');
  }

  var closeOverview = function () {
    $(this).parent().parent().hide();
    $(this).parent().parent().addClass('invisible').removeClass('visible');
    //$('.overview a.overview-top').addClass('visible').removeClass('invisible');
  }

  $("#team-test").append(render(5, 17, team, 150, 150));
});
