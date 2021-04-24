song = "";

leftWristX=0
leftWristY=0

rightWristX=0
rightWristY=0

function setup(){
    canvas= createCanvas(600 , 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses)
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("scoreLeftWrist = " + scoreLeftWrist)

        scoreRightWrist = results[0].pose.keypoints[10].score
        console.log("scoreRightWrist = " + scoreRightWrist)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "  leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "  rightWristY = " + rightWristY);
    }

}

function modelLoaded() {
    console.log("Posenet has come through bifrost");
}

function draw(){
    image(video, 0 , 0 , 600 , 500);
    fill("#FF0000");
    stroke("#FF0000");
       
    circle(rightWristX , rightWristY , 20)
    if (rightWristY > 0 && rightWristY <= 100) {
        song.rate(0.5);
        document.getElementById("mega_Rapidash").innerHTML = "Speed = 0.5x";
    } else if(rightWristY > 100 && rightWristY <= 200) {
        song.rate(1);
        document.getElementById("mega_Rapidash").innerHTML = "Speed = 1x";
    }
    else if(rightWristY > 200 && rightWristY <= 300) {
        song.rate(1.5);
        document.getElementById("mega_Rapidash").innerHTML = "Speed = 1.5x";
    }
    else if(rightWristY > 300 && rightWristY <= 400) {
        song.rate(2);
        document.getElementById("mega_Rapidash").innerHTML = "Speed = 2x";
    }
    else if(rightWristY > 400 && rightWristY <= 500) {
        song.rate(1);
        document.getElementById("mega_Rapidash").innerHTML = "Speed = 1x";
        }
          
    circle(leftWristX , leftWristY , 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("mega_Exploud").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause(){
    song.pause();
}