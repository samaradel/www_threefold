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
$(function() {
    var render = function(dataset) {
        var rjteam = $("<div></div>").addClass('rj-team');
        var details = dataset;
        var added = []
        if(details) {
          while(true) {
              if(added.length === details.length) {
                break;
              }
              var index = Math.floor(Math.random() * details.length);
              if (added.includes(index)) {
                continue;
              }
              added.push(index);
              var random_details = details[index];
              var parent = $("<div>").addClass("rj-team-member");
              var a = $("<div>").addClass('member-photo').click(toggleBio);
              var img = $("<img/>").addClass('rj-team-member-photo-rollover');
              img.prop('src', '../avatars/' + encodeURIComponent(random_details.avatar));
              a.append(img);
              parent.append(a);
              var div = $("<div>").addClass("rj-team-member-info-text").css('display', 'none');
                  var imgCol = $("<div>").addClass('col-md-3 col-sm-5');
                  var dataCol = $("<div>").addClass('col-md-7 col-sm-7');
                  var close = $('<div>').addClass('close-bio').text('x');
                  div.append(imgCol);
                  imgCol.append($("<img/>").prop("src", "../avatars/" + encodeURIComponent(random_details.avatar)));
                  div.append(dataCol);
                  dataCol.append($("<div>").addClass('member-name').text(random_details.name));
                  dataCol.append($("<div>").addClass('bio-excerpt').text(random_details.description));
                  div.append(close);
                  parent.append(div);
                  rjteam.append(parent);
          }
        }

        return rjteam;
    };
    var toggleBio = function() {
        $(".rj-team-member .member-photo").click(function() {
            $(this).parent().siblings().children(".member-photo").removeClass("selected"), $(this).toggleClass("selected"), $(this).parent().siblings().children(".rj-team-member-info-text").hide(), $(this).siblings(".rj-team-member-info-text").toggle();
            var a = $(this).siblings(".rj-team-member-info-text").offset();
            $("body").animate({
                scrollTop: a
            }), $(".close-bio").click(function() {
                $(this).parent().siblings(".member-photo").removeClass("selected"), $(this).parent(".rj-team-member-info-text").hide()
            })
        })
    }

    var activateTeamFilter = function() {
        $("#teamFilterText").prop("disabled", !1), $("#teamFilterText").on("input", function() {
            var a = $("#teamFilterText").val();
            "" == a ? $(".rj-team-member").show() : ($(".rj-team-member").hide(), $(".rj-team-member:Contains('" + a + "')").show())
        })
    }

    var unselectDiv = function() {
        $(document).click(function(a) {
            $(a.target).closest(".rj-team-member .member-photo").length || $(".rj-team-member .member-photo").is(":visible") && ($(".rj-team-member-info-text").hide(), $(".member-photo").removeClass("selected"))
        })
    }

    $("#team-test").append(render(team));
});
