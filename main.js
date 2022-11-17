song="";
music="";

function preload()
{
    song=loadSound("music.mp3");
    music=loadSound("beliver.mp3");
}

score_rightwrist=0;
score_leftwrist=0;

rightwristx=0;
rightwristy=0;

leftwristx=0;
leftwristy=0;

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log('Posenet is Initialized!');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_rightwrist = results[0].pose.keypoints[10].score;
        score_leftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist="+score_rightwrist+"scoreLeftWrist="+score_leftwrist);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx+"rightwristy="+rightwristy);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx+"leftwristy="+leftwristy);

    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#ffffff");
    stroke("#eb4710");

    if(score_rightwrist>0.2)
    {
        circle(rightwristx,rightwristy,20);
        song.play();
        song.setVolume(1);
        document.getElementById("songLabel").innerHTML="Song name= Music 1";
    }

    if(score_leftwrist >0.2)
    {
        circle(leftwristx,leftwristy,20);
        music.play();
        song.setVolume(1);
        document.getElementById("songLabel").innerHTML="Song name= Beliver by Imagine Dragons";
    } 
} 