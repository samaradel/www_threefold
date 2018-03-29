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

$(function () {

	if ($("#map-canvas").length == 0)
		return;

	$("head").append($("<style></style>").text("#bodyContent table { width: 100%; }"));

	var getParameterByName = function (name) {
	    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	};

	var htmlEncode = function (value) {
		value = value.replace("\r", "");
		var lines = value.split(/\n/);
		var paragraphs = [];
		$.each(lines, function (i, str) {
			paragraphs.push($('<div/>').text(str).html());
		});
		return paragraphs.join('<br>');
	};

	var lat_center = getParameterByName('lat');
	var lon_center = getParameterByName('lon');
	var center = lat_center && lon_center ? new google.maps.LatLng(parseFloat(lat_center), parseFloat(lon_center)) : new google.maps.LatLng(50.623211, 4.438007);
	var zoom = parseInt(getParameterByName('zoom') || '2');

    var mapOptions = {
	    	scrollwheel: false,
    		zoom: zoom,
    		center: center,
				styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]},{featureType:"administrative.country",elementType:"all",stylers:[{ visibility:"off" }]}]
	};

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var markers = {};
    var infoWindow = null;

    var last_call = new Date().getTime();

    var getSearchCriteria = function () {
    	last_call = new Date().getTime();
        var center = map.getCenter();
        var map_bounds = map.getBounds();
        var distance = google.maps.geometry.spherical.computeDistanceBetween(map_bounds.getNorthEast(), map_bounds.getSouthWest());
        var radius_in_km = Math.round(distance/2000,0) + 1;
        var params = {
					lat: center.lat(),
					lon: center.lng(),
					distance: radius_in_km,
					last_call: last_call
        };
        return params;
    };

    var infoWindow = null;
    var markers = [];
    var locations = [];
    var oms = null;

    function getBestCoords(lat, lon) {
        for(var i in locations) {
            if(lat + "," + lon == locations[i]) {
                lat += 0.0001;
                lon += 0.0001;
            }
        }

        locations.push(lat + "," + lon);
        locations.sort();

        return new google.maps.LatLng(lat, lon);
    }

    function marking(provider, pool, max_network_speed) {
        var coords = getBestCoords(parseFloat(pool.lat), parseFloat(pool.lon));
				var iconColor = '589b5a';  // green for regular nodes and yellow for forecast nodes
				if (pool.status == "forecast"){
					iconColor = 'ffff00';
				}
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            cursor: 'pointer',
						icon: 'https://chart.apis.google.com/chart?cht=d&chdp=mapsapi&chl=pin%27i%5c%27%5b%27-2%27f%5chv%27a%5c%5dh%5c%5do%5c'+iconColor+'%27fC%5c000000%27tC%5c000000%27eC%5cLauto%27f%5c&ext=.png'
        });

        markers.push(marker);

				var cityCircle = new google.maps.Circle({
			      strokeColor: '#5e98e0',
			      strokeOpacity: 1.0,
			      strokeWeight: 2,
			      fillColor: '#5e98e0',
			      fillOpacity: 0.1 + (0.4 * parseInt(pool['network_speed']) / max_network_speed),
			      map: map,
			      center: coords,
						radius: Math.sqrt(pool['cu_max']*pool['su_max']*pool['tu_max']) * 2
		    });

        var description = $('#markerContentSource').clone();
        $(description).attr('id', '');

        $(description).find('h1').html(provider['name']);
        $(description).find('h2').html(pool['name']);

        $(description).find('.netspeed').html(pool['network_speed'] + ' Mbps');
        $(description).find('.ipv4').html(pool['ipv4_enable'] ? 'Yes' : 'No');
        $(description).find('.ipv6').html(pool['ipv6_enable'] ? 'Yes' : 'No');

        $(description).find('.currency').html(pool['pricing_currency']);

        $(description).find('.planned-cu').html(pool['cu_planned']);
        $(description).find('.planned-su').html(pool['su_planned']);
        $(description).find('.planned-tu').html(pool['tu_planned']);

        $(description).find('.max-cu').html(pool['cu_max']);
        $(description).find('.max-su').html(pool['su_max']);
        $(description).find('.max-tu').html(pool['tu_max']);

        for(var i = 0; i < pool['pricing'].length; i++) {
            var price = pool['pricing'][i];

            var tr = $('<tr>');
            tr.append($('<td>').html("Price (" + price['months'] + " months)"));
            tr.append($('<td>').html(price['cu']));
            tr.append($('<td>').html(price['su']));
            tr.append($('<td>').html(price['tu']));

            $(description).find('.pricing').append(tr);
        }

        oms.addMarker(marker);

        google.maps.event.addListener(marker, 'spider_click', function() {
            if(infoWindow)
                infoWindow.close()

            infoWindow = new google.maps.InfoWindow({
                content: description[0].innerHTML
            });

            google.maps.event.addListener(map, 'closeclick', function () {
                infoWindow = null;
            });

            infoWindow.open(map, marker);
        });
    }

    var refresh = function (search_criteria, cursor) {
        var contents = globalcapacity;
        oms = new OverlappingMarkerSpiderfier(map, {
            markersWontMove: true,
            markersWontHide: true,
            basicFormatEvents: true
        });

        var network_speed = 0;
        for(var provider = 0; provider < contents.length; provider++)
            for(var pool = 0; pool < contents[provider]["resourcepools"].length; pool++) {
                var ns = parseInt(contents[provider]["resourcepools"][pool]['network_speed']);
                if(ns > network_speed)
                    network_speed = ns;
                }

        for(var provider = 0; provider < contents.length; provider++) {
            for(var pool = 0; pool < contents[provider]["resourcepools"].length; pool++)
                marking(contents[provider], contents[provider]["resourcepools"][pool], network_speed);
        }
    };

    refresh();
});
