var Ostatus = "";
var objects = [];
var audio = document.getElementById('bell');

function setup() {
     canvas = createCanvas(680, 580);
     canvas.center();
     video = createCapture(VIDEO);
     video.size(680 , 580);
     video.hide();
     objectDetector = ml5.objectDetector('cocossd', modelLoaded);
     document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
     console.log('CoCoSSD Model Loaded !');
     Ostatus = true;
     objectDetector.detect(video, gotResult);
}

function draw() {
     image(video , 0 , 0 , 680 , 580);
     document.getElementById('baby_status').innerHTML = "BABY NOT FOUND";
     if (Ostatus == true) {
          objectDetector.detect(video, gotResult);
          for (i = 0;i < objects.length;i++) {
               document.getElementById('status').innerHTML = "Status : Objects Detected";
               if (objects[ i ].label == 'person') {
                    document.getElementById('baby_status').innerHTML = "PERSON / BABY FOUND";
                    audio.pause();
                    audio.currentTime = 0;
               }else {
                    audio.play();
               }
               fill("#FF0000");
               percentage = floor(objects[i].confidence * 100);
               objectX = objects[i].x;
               objectY = objects[i].y;
               objectWidth = objects[i].width;
               objectHeight = objects[i].height;
               text(objects[i].label + " " + percentage + "%" , objectX + 15 , objectY + 15);
               noFill();
               stroke("#FF0000");
               rect(objectX , objectY , objectWidth , objectHeight);
          }
     }
}

function gotResult(error , results) {
     if (error) {
          console.log(error);
     }else {
//           console.log(results);
          objects = results;
     }
} 
