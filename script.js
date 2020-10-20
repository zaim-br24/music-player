const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('name');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const lightMode = document.getElementById('light');
const darkMode = document.getElementById('dark');

// document.documentElement.setAttribute('data-theme')
let isPlaying = false;
// song index
let i = 0;
const songs = [
    {
        name:'jacinto-1',
        title:'Eleric Chill Machine',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-2',
        title:'Seven Nation Army (Remix)',
        artist:'Jacinto Design'
    },
    {
        name:'jacinto-3',
        title:'Gooodnight / Queen',
        artist:'Jacinto Design'
    },
    {
        name:'metric-1',
        title:'Front Of Your Door',
        artist:'Jacinto Design'
    }
];
// play the song
function playSong(){
       isPlaying = true;
       music.play();
       playBtn.setAttribute('title', 'pause')
       playBtn.classList.replace('fa-play', 'fa-pause')
};
// pause the song
function pauseSong(){
        isPlaying = false;
        music.pause();   
        playBtn.setAttribute('title', 'play')    
        playBtn.classList.replace('fa-pause', 'fa-play')
};
// get display the current music
function displaySong(data){
    img.src ='/img/'+data[i].name +'.jpg';
    title.textContent = data[i].title;
    artist.textContent = data[i].artist
    music.src = '/music/'+data[i].name+'.mp3';
};
// go to the previous song
function prevSong(songs){
    i--
    if(i < 0) i = songs.length -1
    displaySong(songs);
    playSong();
};
// go to the next song
function nextSong(songs){
    i++
    if(i > songs.length -1) i = 0
    displaySong(songs);    
    playSong();

};

// update progress  bar
function updateProgressBar(e){
    if(isPlaying){
        const {duration , currentTime} = e.srcElement;
        const progressPercentage = (currentTime / duration) * 100
        progress.style.width = progressPercentage+'%'
            // calculate display for duration
            const durationMinute = Math.floor(duration / 60);
            let durationSecend = Math.floor(duration % 60);
            if(durationSecend < 10){
                durationSecend = `0${durationSecend}`;
            }

            // delay switch duration Elmenet to avoid NaN
            if(durationSecend){
                durationEl.textContent = `${durationMinute}:${durationSecend}`
            }
           // calculate display for current
           const currentMinute = Math.floor(currentTime / 60);
           let currentSecend = Math.floor(currentTime % 60);
           if(currentSecend < 10){
               currentSecend = `0${currentSecend}`;
           }
           // delay switch current Elmenet to avoid NaN
           if(currentSecend){
            currentTimeEl.textContent = `${currentMinute}:${currentSecend}`
           }
    }
}

function setProgressBar(e){
    const width = this.clientWidth  // get the width of the bar
    console.log('width',width)
    const clickX = e.offsetX;  // get the width of progress bar 
    console.log("clickX" ,clickX)
    const {duration} = music ;  // duration of the music
    console.log("duration", duration)
    const res =  music.currentTime = (clickX / width) * duration;  // update  currentTime of the music 
    
    console.log('currentTime', res / 60)

}
// events
prevBtn.addEventListener('click', ()=> prevSong(songs))
playBtn.addEventListener('click', ()=> isPlaying ? pauseSong() : playSong())
nextBtn.addEventListener('click', ()=> nextSong(songs))
// event update progress  bar
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',()=> nextSong(songs));
progressContainer.addEventListener('click',setProgressBar);

// theme
darkMode.addEventListener('click',()=> document.documentElement.setAttribute('data-theme','dark'));
lightMode.addEventListener('click',()=> document.documentElement.setAttribute('data-theme','ligth'));














