/*jslint devel:true, browser:true */
/*global $, window */

// 横幅 WIDTH関数を宣言
function resizeWidth() {
    'use strict';

    var mainWidth = mainWidth = $(window).width() - 450;

    $('#map').css('width', mainWidth);
}

// 高さ HEIGHT関数を宣言
function resizeHeight() {
    'use strict';

    var marginBottom = 50,
        mainOffsetTop = $('#main').offset().top,
        mainHeight = $(window).height() - mainOffsetTop - marginBottom;

    $('#main').css('height', mainHeight + 'px');
    $('#map').css('height', mainHeight + 'px');
}

// 画面のリサイズ
$(document).ready(function () {
    'use strict';

    resizeWidth();
    resizeHeight();
});

$(window).on('resize', function () {
    'use strict';

    resizeWidth();
    resizeHeight();
});
