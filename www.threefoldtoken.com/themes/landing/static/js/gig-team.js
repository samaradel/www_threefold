/*
 * Copyright 2017 ThreeFold Foundation
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
"use strict.";
$(function () {
    var render = function (dataset) {
        var rjteam = $("<div></div>").addClass('rj-team');

        function sortRank(a, b) {
            return a.rank - b.rank;
        }
        var details = dataset.sort(sortRank);
        var added = [];
        if (details) {
            for (var i = 0; i < details.length; ++i) {
                if (added.length === details.length) {
                    break;
                }
                added.push(details);
                var parent = $("<div>").addClass("rj-team-member");
                var a = $("<div>").addClass('member-photo');
                var img = $("<img/>").addClass('rj-team-member-photo-rollover');
                img.prop('src', '../avatars/' + encodeURIComponent(details[i].avatar));
                a.append(img);
                parent.append(a)
                var div = $("<div>").addClass("rj-team-member-info-text").css('display', 'none');
                var imgCol = $("<div>").addClass('col-sm-3');
                var dataCol = $("<div>").addClass('col-sm-9');
                var close = $('<div>').addClass('close-bio').text('x');

                if (details[i].core == "gig" && details[i].rank > 0 || details[i].login == "despiegk") {
                    div.append(imgCol);
                    imgCol.append($("<img/>").prop("src", "../avatars/" + encodeURIComponent(details[i].avatar)));
                    div.append(dataCol);
                    dataCol.append($("<div>").addClass('member-name').text(details[i].name));
                    dataCol.append($("<div>").addClass('bio-excerpt').text(details[i].description));
                    div.append(close);
                    parent.append(div);
                    rjteam.append(parent);
                }
            }
        }
        return rjteam;
    };

    function toggleBio() {
        $(".rj-team-member .member-photo").click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().children(".member-photo").removeClass("selected"), $(this).toggleClass("selected"), $(this).parent().siblings().children(".rj-team-member-info-text").hide(), $(this).siblings(".rj-team-member-info-text").toggle();
            var a = $(this).siblings(".rj-team-member-info-text").offset();
            $("body").animate({
                scrollTop: a
            }), $(".close-bio").click(function () {
                $(this).parent().siblings(".member-photo").removeClass("selected"), $(this).parent(".rj-team-member-info-text").hide()
            })
        })
        return false;
    }

    function activateTeamFilter() {
        $("#teamFilterText").prop("disabled", !1), $("#teamFilterText").on("input", function () {
            var a = $("#teamFilterText").val();
            "" == a ? $(".rj-team-member").show() : ($(".rj-team-member").hide(), $(".rj-team-member:Contains('" + a + "')").show())
        })
    }

    function unselectDiv() {
        $(document).click(function (a) {
            $(a.target).closest(".rj-team-member .member-photo").length || $(".rj-team-member .member-photo").is(":visible") && ($(".rj-team-member-info-text").hide(), $(".member-photo").removeClass("selected"))
        })
    }

    toggleBio();
    unselectDiv();
    activateTeamFilter();

    $("#gig").append(render(team));


});