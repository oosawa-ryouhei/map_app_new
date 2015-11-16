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

//情報ウィンドウを作成する関数
function createInfoWin(map,marker,data,i,item,name){
    //マーカー毎にinfoWindowを作成
    var infoWindow = new google.maps.InfoWindow({ 
        //情報ウィンドウ内に表示する
        content: '場所：'+ data[i].place + '公園'
                + '<br>調査日：'+ data[i].observed
                + '<br>天気：'+ data[i].weather
                + '<br>'+ name +'：'+ data[i][item]
                + '<br>生物：'
    }); 
    google.maps.event.addListener(marker,'click',function(){
        infoWindow.open(map,marker);
    });
}

//itemによって作るマーカー（グラフ）を変える関数
function createMarkers(data, item, scale, markers, name) {
    'use strict';
    //グラフの横幅
    var graph_w = 15;
    var arc_y = 5;
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        if (data[i][item] !== null) {
            icon = {
                path: 'M 0 0 a ' + graph_w / 2 + ','+ arc_y +'  0 1 0 ' + graph_w + ' 0 v ' + (-data[i][item] * scale) + ' a ' + graph_w / 2 + ','+ arc_y +' 0 1 1 ' + -graph_w + ' 0 a ' + graph_w / 2 + ','+ arc_y +' 0 1 1 ' + graph_w + ' 0 a ' + graph_w / 2 + ','+ arc_y +' 0 1 1 ' + -graph_w + ' 0 z',
                strokeColor: 'black',
                strokeWeight: 2,
                fillColor: 'red',
                fillOpacity: 0.8
            };
            latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);

            marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: icon
            });
            markers.push(marker);
            createInfoWin(map,marker,data,i,item,name);
        }
    }
}

var settingEventlistener = function (id, kind, scale, data, markers, name) {
    'use strict';
    var element;
    element = document.getElementById(id);
    element.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, kind, scale, markers,name);
        //クリックによるページ切替を行わない処理
        event.preventDefault();
        selectTxt(name);
    });
};

$(document).ready(function () {
    'use strict';
    $.getJSON("/waterparks.json", function (data) {
        data_labels = [
            {id: "d1", kind: "e_coli", scale: 1 / 40, name: "大腸菌"},
            {id: "d2", kind: "coliform_bacteria", scale: 1 / 40, name: "大腸菌群"},
            {id: "d3", kind: "cod", scale: 10, name: "COD"},
            {id: "d4", kind: "water_temperature", scale: 4, name: "水温"},
            {id: "d5", kind: "total_residual_cl", scale: 150, name: "総残留塩素"},
            {id: "d6", kind: "nh3_n", scale: 200, name: "アンモニウム態窒素"},
            {id: "d7", kind: "ph", scale: 12, name: "ph"}
        ];
        var i;
        for (i = 0; i < data_labels.length; i = i + 1) {
            settingEventlistener(data_labels[i].id, data_labels[i].kind, data_labels[i].scale, data, markers, data_labels[i].name);
        }
    });
});

//文字列を変更する関数
function selectTxt(name) {
    document.getElementById("text").innerHTML=name;
}

