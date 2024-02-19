let songNumber=0;
let audioElement=new Audio('songs/0.mp3');
let musicPlay=document.getElementById('M-Play');
let progressBar=document.getElementById('pg-bar');
let gif=document.getElementById('gif-image'); 
let songItems=Array.from(document.getElementsByClassName('songs'));
let currentSong=document.getElementById('current-song');


let songs=[
    {songName:"Blue_Eyes", filePath:"songs/0.mp3", coverPath:"images/1.jpg",duration:"4:35"},
    {songName:"Dillagi", filePath:"songs/1.mp3", coverPath:"images/2.jpg",duration:"5:35"},
    {songName:"Faded", filePath:"songs/2.mp3", coverPath:"images/3.jpg",duration:"3:55"},
    {songName:"Kabhi Shaam Dhale", filePath:"songs/3.mp3", coverPath:"images/4.jpg",duration:"4:25"},
    {songName:"Mere Ram Ji", filePath:"songs/4.mp3", coverPath:"images/5.jpg",duration:"4:30"},
    {songName:"Rafta Rafta", filePath:"songs/5.mp3", coverPath:"images/6.jpg",duration:"3:45"},
    {songName:"Tera Mera Hai Pyaar", filePath:"songs/6.mp3", coverPath:"images/7.jpg",duration:"4:50"}
]

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("sname")[0].innerText=songs[i].songName;
    element.getElementsByClassName("time")[0].innerText=songs[i].duration;
});

musicPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        musicPlay.classList.remove('fa-play');
        musicPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        musicPlay.classList.remove('fa-pause');
        musicPlay.classList.add('fa-play');
        gif.style.opacity=0;
        pauseAll();
    }
});


audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;
});

progressBar.addEventListener('change',()=>{
    audioElement.currentTime=(progressBar.value*audioElement.duration)/100;
});

const pauseAll=()=>{
    Array.from(document.getElementsByClassName('play-song')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('play-song')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        pauseAll();
        songNumber=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songNumber}.mp3`;
        currentSong.innerText=songs[songNumber].songName;
        audioElement.currentTime=0;
        audioElement.play();
        musicPlay.classList.remove('fa-play');
        musicPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    })
});

document.getElementById('forward').addEventListener('click',()=>{
    if(songNumber == 6){
        songNumber=0;
    }else{
        songNumber=songNumber+1;
    }
    audioElement.src=`songs/${songNumber}.mp3`;
    currentSong.innerText=songs[songNumber].songName;
    audioElement.currentTime=0;
    audioElement.play();
    musicPlay.classList.remove('fa-play');
    musicPlay.classList.add('fa-pause');
});

document.getElementById('backward').addEventListener('click',()=>{
    if(songNumber == 0){
        songNumber=6;
    }else{
        songNumber=songNumber-1;
    }
    audioElement.src=`songs/${songNumber}.mp3`;
    currentSong.innerText=songs[songNumber].songName;
    audioElement.currentTime=0;
    audioElement.play();
    musicPlay.classList.remove('fa-play');
    musicPlay.classList.add('fa-pause');
});

