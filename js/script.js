var rows = 3;
var columns = 3;

/* ランダムモードかどうか */
var isRandomMode = false;

/* あらかじめ画像のリストをグローバルで登録 */
var imgMap= [];
imgMap.push('tile1.jpg');
imgMap.push('tile2.jpg');
imgMap.push('tile3.jpg');

/* 現在の画像 */
var currentImg = imgMap[0];

$(document).ready(function(){

    addTrConetnts();
    putButtons();
    // $(document).on('click', 'img', function(){
    //     changeImg(this);
    // });
    $(document).on('click', 'button', function(){
        changeAllImg(this);
    });

});

function setCurrentImg(a) {
    currentImg = a;
}

function getCurrentImg() {
    return currentImg;
}

function addTrConetnts(){

    for(var i = 0; i < rows; ++i) {
        $('tbody').append('<tr>' + addTdContents() + '</tr>');
    }
}

function addTdContents(){

    var contents = '';
    for(var i = 0; i < columns; ++i) {
        contents += '<td>' + renderImage(getNextUniqueImg()) + '</td>';
    }
    return contents;
}

function renderImage(img) {

    return '<img src="./img/' + img + '" alt="">';
}

function changeImg(obj) {

    var img = getNextUniqueImg();
    $(obj).parent().html(renderImage(img));
}

function getNextUniqueImg() {

    if (isRandomMode) {
        do {
            var r = Math.floor(Math.random() * imgMap.length);
        } while(imgMap[r] == getCurrentImg());

        setCurrentImg(imgMap[r]);
        return getCurrentImg();
    }
    else {
        for (i = 0; i < imgMap.length; ++i) {
            if (imgMap[i] == getCurrentImg()) {
                setCurrentImg((i == imgMap.length - 1) ? imgMap[0] : imgMap[i + 1]);
                return getCurrentImg();
            }
        }
    }
}

function putButtons() {
    for (i = 0; i < imgMap.length; ++i) {
        $('table').before('<button id="' + i +'" type="button">' + imgMap[i] + '</button>');
    }
}

function changeAllImg(button) {
    var buttonID = $(button).attr('id');
    $('img').parent().html(renderImage(imgMap[buttonID]));
}
