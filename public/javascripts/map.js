/*jslint browser:true, for:true */
/*global google, $ */
var data_labels = [];
//マップの基礎データ設定
var latlng = new google.maps.LatLng(35.654938, 139.7479837);
var options = {
    zoom: 11,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById('map'), options);
//マーカーを入れる配列を定義
var markers = [];



//マーカーを全部消す関数
function deleteMarkers(markers) {
    'use strict';
    var j;
    for (j = 0; j < markers.length; j = j + 1) {
        markers[j].setMap(null);
    }
    markers = [];
}

//itemによって作るマーカー（グラフ）を変える関数
function createMarkers(data, item, scale, markers) {
    'use strict';
    //グラフの横幅
    var graph_w = 15;
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        if (data[i][item] !== null) {
            icon = {
                path: 'M 0 0 h ' + graph_w + ' v ' + (-data[i][item] * scale) + 'h -' + graph_w + ' z',
                strokeColor: 'black',
                strokeWeight: 3,
                fillColor: 'red',
                fillOpacity: 0.9
            };
            latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);

            marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: icon
            });
            markers.push(marker);
        }
    }
}

var settingEventlistener = function (id, kind, scale, data, markers) {
    'use strict';
    var element;
    element = document.getElementById(id);
    element.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, kind, scale, markers);
        //クリックによるページ切替を行わない処理
        event.preventDefault();
    });
};

$(document).ready(function () {
    'use strict';
    $.getJSON("/waterparks.json", function (data) {
        data_labels = [
            {id: "d1", kind: "e_coli", scale: 1 / 40},
            {id: "d2", kind: "coliform_bacteria", scale: 1 / 40},
            {id: "d3", kind: "cod", scale: 10},
            {id: "d4", kind: "water_temperature", scale: 4},
            {id: "d5", kind: "total_residual_cl", scale: 150},
            {id: "d6", kind: "nh3_n", scale: 500},
            {id: "d7", kind: "ph", scale: 12}
        ];
        var i;
        for (i = 0; i < data_labels.length; i = i + 1) {
            settingEventlistener(data_labels[i].id, data_labels[i].kind, data_labels[i].scale, data, markers);
        }
    });
});