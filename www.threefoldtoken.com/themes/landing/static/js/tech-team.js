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

        function compare(a, b) {
            var nameA = a.last_name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.last_name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            // names must be equal
            return 0;
        }

        function sortRank(a, b) {
            return a.rank - b.rank;
        }
        var details = dataset.sort(compare);
        var added = [];

        if (details) {
            for (var i = 0; i < details.length; ++i) {
                if (added.length === details.length) {
                    break;
                }
                if (details[i].core == null) {
                    added.push(details);
                    var parent = $("<div>").addClass("rj-team-member");
                    var a = $("<div>").addClass('member-photo');
                    var img = $("<img/>").addClass('rj-team-member-photo-rollover');
                    img.prop('src', '../avatars/' + encodeURIComponent(details[i].avatar));
                    a.append(img);
                    parent.append(a);
                    var div = $("<div>").addClass("rj-team-member-info-text").css('display', 'none');
                    var imgCol = $("<div>").addClass('col-sm-3');
                    var dataCol = $("<div>").addClass('col-sm-7');
                    var close = $('<div>').addClass('close-bio').text('x');
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
    $("#tech").append(render(team));
    toggleBio();
    unselectDiv();
    activateTeamFilter();
});