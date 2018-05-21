//code modified from video here: https://www.youtube.com/watch?v=4YQ4svkETS0

var i = 0;
var images = [];
var time = 5000;

//image list

images[0] ='content/headshotcombo.jpg';
images[1] ='content/About1.jpg_large';
images[2] ='content/workshop1.jpg';
images[3] ='content/workshopping.jpg';

//function to change image

function changeImg(){
    document.slide.src = images[i];

    if(i < images.length -1){
        i++;
    }else {
        i = 0;
    }
    setTimeout("changeImg()", time);
}

window.onload = changeImg;


