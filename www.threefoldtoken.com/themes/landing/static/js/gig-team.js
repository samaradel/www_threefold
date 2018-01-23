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
                parent.css({
                    'paddingRight': '20px',
                    'paddingBottom': '20px',
                    'textTransform': 'capitalize',
                    'fontSize': '20px'
                });
                var a = $("<div>").addClass('member-photo');
                var img = $("<img/>");
                var name = $("<div>").addClass('member-name').text(details[i].name);
                name.css('paddingTop', '20px');
                img.prop('src', '../avatars/' + encodeURIComponent(details[i].avatar));
                a.append(img);
                a.append(name);
                parent.append(a)
                var div = $("<div>").addClass("rj-team-member-info-text").css('display', 'none');
                var imgCol = $("<div>").addClass('col-sm-3');
                var dataCol = $("<div>").addClass('col-sm-7');
                var close = $('<div>').addClass('close-bio').text('x');

                if (details[i].core == "gig" && details[i].rank > 0) {
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

    function toggle() {
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
    toggleBio();
    unselectDiv();
    activateTeamFilter();
    $("#gig").append(render(team));
});