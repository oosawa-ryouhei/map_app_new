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
function createInfoWin(map, marker, data, i, item, name) {
    'use strict';
    //マーカー毎にinfoWindowを作成
    var infoWindow = new google.maps.InfoWindow({
        //情報ウィンドウ内に表示する
        content: '場所：' + data[i].place
                + '<br>調査日：' + data[i].observed
                + '<br>天気：' + data[i].weather
                + '<br>水温：' + data[i].water_temperature
                + '<br>' + name + '：' + data[i][item]
                + '<br>ph：' + data[i].ph
                + '<br>生物：' + data[i].aquatic_organism
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
}

//itemによって作るマーカー（グラフ）を変える関数
function createMarkers(data, item, scale, markers, name, datasets_selected) {
    'use strict';
    
    //グラフの横幅
    var graph_w = 15;
    var arc_y = 5;
    var i, icon, marker;
    for (i = 0; i < data.length; i = i + 1) {
        if (data[i][item] !== null) {
        //if (datasets_selected[i] === data[i].dataset) {
            if (item === "cod") {
                
                icon = {
                    path: 'M 0 0 a ' + graph_w / 2 + ',' + arc_y + '  0 1 0 ' + graph_w + ' 0 v ' + (-data[i][item] * scale) + ' a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + -graph_w + ' 0 a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + graph_w + ' 0 a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + -graph_w + ' 0 z',
                    strokeColor: 'black',
                    strokeWeight: 2,
                    fillColor: data[i].color,
                    fillOpacity: 0.8
                };
            } else if (item === "e_coli") {
                icon = {
                    path: 'M 0 0 a ' + graph_w / 2 + ',' + arc_y + '  0 1 0 ' + graph_w + ' 0 v ' + (-data[i][item] * scale) + ' a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + -graph_w + ' 0 a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + graph_w + ' 0 a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + -graph_w + ' 0 z',
                    strokeColor: 'black',
                    strokeWeight: 2,
                    fillColor: data[i].ecoli_color,
                    fillOpacity: 0.8
                };
            } else {
                icon = {
                    path: 'M 0 0 a ' + graph_w / 2 + ',' + arc_y + '  0 1 0 ' + graph_w + ' 0 v ' + (-data[i][item] * scale) + ' a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + -graph_w + ' 0 a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + graph_w + ' 0 a ' + graph_w / 2 + ',' + arc_y + ' 0 1 1 ' + -graph_w + ' 0 z',
                    strokeColor: 'black',
                    strokeWeight: 2,
                    fillColor: 'cyan',
                    fillOpacity: 0.8
                };
            }
            latlng = new google.maps.LatLng(data[i].latitude, data[i].longitude);

            marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: icon
            });
            markers.push(marker);
            createInfoWin(map, marker, data, i, item, name);
        }
    }
}


var settingEventlistener = function (id, kind, scale, data, markers, name, measurement, info, datasets_selected) {
    'use strict';
    var element;
    element = document.getElementById(id);
    element.addEventListener('click', function (event) {
        deleteMarkers(markers);
        createMarkers(data, kind, scale, markers, name, datasets_selected);
        //クリックによるページ切替を行わない処理
        event.preventDefault();
        selectTxt(name, measurement, info);
    });
};

$(document).ready(function () {
    'use strict';
    $.getJSON("/waterparks.json", function (data) {
        var datasets =[];
        var datasets_selected = [];
        var i, j;
        
        for(i=0; i < data.length; i ++){
            for(j=0; j<datasets.length; j++){
                if(datasets[j] === data[i].dataset){
    	        	break;
                }
            } 
            if(j===datasets.length){
                datasets.push(data[i].dataset);
            }
        }   
        //console.log(datasets);
	    for(i=0; i<datasets.length; i++){
	        $("#datasets_selecter").append("<option value="+datasets[i]+">"+datasets[i]+"</option>");
	    }
	    $('.selectpicker').selectpicker({
                style: 'btn-info',
                size: 4
        });
        $('#datasets_selecter').change(function() {
            
            $("#datasets_selecter option:selected").each(function () {
                datasets_selected.push($(this).text());
            });
            alert(datasets_selected);
            
        });  
        data_labels = [
            {id: "d1", kind: "e_coli", scale: 1 / 40, name: "大腸菌", measurement: "β-グルクロニダーゼ活性を指標とする酵素基質法", info: "大腸菌の説明"},
            {id: "d2", kind: "coliform_bacteria", scale: 1 / 40, name: "大腸菌群", measurement: "β-ガラクトシダーゼ活性を指標とする酵素基質法", info: "大腸菌群の説明"},
            {id: "d3", kind: "cod", scale: 10, name: "COD", measurement: "アルカリ性過マンガン酸カリウム法", info: "CODの説明"},
            {id: "d4", kind: "total_residual_cl", scale: 150, name: "総残留塩素", measurement: "よう化カリウムとDPD比色法", info: "総残留塩素の説明"},
            {id: "d5", kind: "nh3_n", scale: 200, name: "アンモニウム態窒素", measurement: "塩素化剤とサリチル酸ナトリウム", info: "アンモニウム態窒素の説明"},
            {id: "d6", kind: "electric_conductivity", scale: 1 / 5, name: "電気伝導度", measurement: "Multiparameter tester PCSTestr35", info: "電気伝導度の説明"}
        ];
        
        for (i = 0; i < data_labels.length; i = i + 1) {
                settingEventlistener(data_labels[i].id, data_labels[i].kind, data_labels[i].scale, data, markers, data_labels[i].name, data_labels[i].measurement, data_labels[i].info, datasets_selected);
                console.log(datasets_selected);
        }
    });
});

//文字列を変更する関数
function selectTxt(name, measurement, info) {
    'use strict';
    document.getElementById("text").innerHTML = name;
    document.getElementById("info").innerHTML = "<font size = 4><strong>" + name + "の説明</strong></font>"
            + "<br>[ ここに頂いた説明文が入ります。 ]"
            //+ "<br>" + info
            + "<br>"
            + "<br><font size = 4><strong>測定方法:</strong></font><br>"
            + "『" + measurement + "』"
            + "<br>"
            + "<br><font size = 4><strong>グラフの色分け基準値</strong></font>"
            + "<br><font color = cyan>適：水色</font>"
            + "<br>-大腸菌：100個/100ml以下<br>-COD:2mg/1以下<br>"
            + "<br><font color = green>可：緑</font>"
            + "<br>-大腸菌：1,000個/100ml以下<br>-COD:8mg/1以下<br>"
            + "<br><font color = red>不適：赤</font>"
            + "<br>-大腸菌：1,000個/100ml超<br>-COD:8mg/1超";
    
}
