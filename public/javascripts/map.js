//マップの基礎データ設定
var latlng = new google.maps.LatLng(35.654938, 139.7479837);
var options = {
    zoom: 15,
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

//大腸菌のマーカー（グラフ）を生成関数
function createEcolimarkers(data, markers) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].e_coli / 40) + 'h -20 z',
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

//大腸菌群のマーカー（グラフ）を生成関数
function createBacteriamarkers(data) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].coliform_bacteria / 40) + 'h -20 z',
            strokeColor: 'black',
            strokeWeight: 3,
            fillColor: 'magenta',
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

//CODのマーカー（グラフ）を生成関数
function createCodmarkers(data) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].cod * 10) + 'h -20 z',
            strokeColor: 'black',
            strokeWeight: 3,
            fillColor: 'green',
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

//水温のマーカー（グラフ）を生成関数
function createTmarkers(data) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].water_temperature * 4) + 'h -20 z',
            strokeColor: 'black',
            strokeWeight: 3,
            fillColor: 'cyan',
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

//総残留塩素のマーカー（グラフ）を生成関数
function createClmarkers(data) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].total_residual_cl * 900) + 'h -20 z',
            strokeColor: 'black',
            strokeWeight: 3,
            fillColor: 'yellow',
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

//アンモニウム態窒素のマーカー（グラフ）を生成関数
function createNH3markers(data) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].nh3_n * 500) + 'h -20 z',
            strokeColor: 'black',
            strokeWeight: 3,
            fillColor: 'pink',
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

//PHのマーカー（グラフ）を生成関数
function createPHmarkers(data) {
    'use strict';
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        icon = {
            path: 'M 0 0 h 20 v ' + (-data[i].ph * 12) + 'h -20 z',
            strokeColor: 'black',
            strokeWeight: 3,
            fillColor: 'purple',
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

//itemによって作るマーカー（グラフ）を変える関数
function createMarkers(data, item, markers) {
    'use strict';
    if (item === "temperature") {
        createTmarkers(data, markers);
    } else if (item === 'cod') {
        createCodmarkers(data, markers);
    } else if (item === 'e_coli') {
        createEcolimarkers(data, markers);
    } else if (item === 'coliform_bacteria') {
        createBacteriamarkers(data, markers);
    } else if (item === 'total_residual_cl') {
        createClmarkers(data, markers);
    } else if (item === 'nh3_n') {
        createNH3markers(data, markers);
    } else if (item === 'ph') {
        createPHmarkers(data, markers);
    }
}
//JSONデータを習得
$.getJSON("/waterparks.json", function (data) {
    'use strict';

    var p1, p2, p3, p4, p5, p6, p7;
    
    //項目クリックによるイベントを習得（P1~P7の7項目）
    p1 = document.getElementById("d1");
    p1.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'e_coli', markers);
        //クリックによるページ切替を行わない処理
        event.preventDefault();
        console.log("get1");
    });

    p2 = document.getElementById("d2");
    p2.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'coliform_bacteria', markers);
        event.preventDefault();
        console.log("get2");
    });

    p3 = document.getElementById("d3");
    p3.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'cod', markers);
        event.preventDefault();
        console.log("get3");
    });

    p4 = document.getElementById("d4");
    p4.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'temperature', markers);
        event.preventDefault();
        console.log("get4");
    });

    p5 = document.getElementById("d5");
    p5.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'total_residual_cl', markers);
        event.preventDefault();
        console.log("get5");
    });

    p6 = document.getElementById("d6");
    p6.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'nh3_n', markers);
        event.preventDefault();
        console.log("get6");
    });

    p7 = document.getElementById("d7");
    p7.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, 'ph', markers);
        event.preventDefault();
        console.log(data);
    });
});
