let Button = document.querySelectorAll('.Music #PlayButton');
let Music = document.querySelectorAll('#Music');

let PopUpPlayer = document.querySelector('.PopUpPlayer');
let DownPlayer = document.querySelector('#DownPlayer');
let CurrentTrackName = document.querySelector('#CurrentTrackName');
let CurrentArtistName = document.querySelector('#CurrentArtistName');
let MusicImage = document.querySelector('.MusicImage');

let PlayPauseButton = document.querySelector('#PlayPauseButton');
let Slider = document.querySelector('#Slider');
let ForwardButton = document.querySelector('#ForwardButton');
let BackwardButton = document.querySelector('#BackwardButton');

let CurrentDuration = document.querySelector('.Control .ProgressPart #CurrentDuration');
let TotalDuration = document.querySelector('.Control .ProgressPart #TotalDuration');

let SmallPlayer = document.querySelector('.SmallPlayer');
let PlayingImage = document.querySelector('.PlayingImage');
let WaveAnimation = document.querySelector('.WaveAnimation');
let UpPlayer = document.querySelector('#UpPlayer');
let MusicName = document.querySelector('#MusicName');
let ArtistName = document.querySelector('#ArtistName');

let IsMusicPlayed = false;
let MusicStatus = false;
let IndexNo = 0;


Button.forEach((Button,Index) => {
  Button.addEventListener('click', function(){

    SmallPlayer.style.transform = 'translateY(0px)';
    
    if (Index != IndexNo) {
      MusicStatus = false;
    }
    
    IndexNo = Index;

    Music[Index].currentTime = 0;

  	if (MusicStatus == false) {
      PlayMusic();
  	}else{
      PauseMusic();	 
  	}

  });
});


function PauseMusic(){
  Music[IndexNo].pause();
  MusicStatus = false;
  clearInterval(UpdateSecond);
  WaveAnimation.style.opacity = '0';
  PlayPauseButton.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
}


 function UpdateSecond(){

	  let Position = 0;

		if(!isNaN(Music[IndexNo].duration)){
		   Position = Music[IndexNo].currentTime * (100 / Music[IndexNo].duration);
		   Slider.value =  Position;
	      }

    let DurationMinutes = Math.floor(Music[IndexNo].duration / 60);
    let DurationSeconds = Math.floor(Music[IndexNo].duration - DurationMinutes * 60);
    TotalDuration.textContent = DurationMinutes + ":" + DurationSeconds;

    let CurrentMinutes = Math.floor(Music[IndexNo].currentTime / 60);
    let CurrentSeconds = Math.floor(Music[IndexNo].currentTime - CurrentMinutes * 60);

    if (CurrentSeconds < 10) { CurrentSeconds = "0" + CurrentSeconds; }
    if (DurationSeconds < 10) { DurationSeconds = "0" + DurationSeconds; }

    CurrentDuration.textContent = CurrentMinutes + ":" + CurrentSeconds;

	if (Music[IndexNo].ended) {
      clearInterval(UpdateSecond);
  	  WaveAnimation.style.opacity = '0';
      PlayPauseButton.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
    }
 }
 

UpPlayer.addEventListener('click', function(){
   PopUpPlayer.style.transform = 'translateY(0%)';
});


DownPlayer.addEventListener('click', function(){
   PopUpPlayer.style.transform = 'translateY(110%)';
});


PlayPauseButton.addEventListener('click', function(){
    if (MusicStatus == false) {
  		Music[IndexNo].play();
      MusicStatus = true;
      WaveAnimation.style.opacity = '1';
  		this.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i>';
  	}else{
  		Music[IndexNo].pause();
      MusicStatus = false;
      WaveAnimation.style.opacity = '0';
      this.innerHTML = '<i class="fas fa-play" aria-hidden="true"></i>';
  	}
});


function ChangeDuration(){
	let SliderPosition = Music[IndexNo].duration * (Slider.value / 100);
	Music[IndexNo].currentTime = SliderPosition;
}


ForwardButton.addEventListener('click', function(){
   
   IndexNo = IndexNo + 1;
    if (IndexNo == AllMusic.length) {
      IndexNo = 0;
    }
  
    Music[IndexNo].currentTime = 0;
      PlayMusic();
});


BackwardButton.addEventListener('click', function(){
    
    if (IndexNo == 0) {
      IndexNo = AllMusic.length-1;
    }else{
      IndexNo = IndexNo -1;
    }

    Music[IndexNo].currentTime = 0;

    PlayMusic();
});


function PlayMusic(){
  Music[IndexNo].play();
  
  if (IsMusicPlayed == true) {
      document.querySelector(".ActiveMusic").pause();
      document.querySelector(".ActiveMusic").classList.remove("ActiveMusic");
  }else{
        IsMusicPlayed = true;
    }
    
  Music[IndexNo].classList.add("ActiveMusic");

  MusicStatus = true;
  setInterval(UpdateSecond, 1000);
  WaveAnimation.style.opacity = '1';
  PopUpPlayer.style.transform = 'translateY(0%)';

  MusicImage.innerHTML = `<img src="${AllMusic[IndexNo].Image}" />`;
  PlayingImage.innerHTML = `<img src="${AllMusic[IndexNo].Image}" />`;

  MusicName.innerHTML = AllMusic[IndexNo].Name;
  ArtistName.innerHTML = AllMusic[IndexNo].Artist;

  CurrentTrackName.innerHTML = AllMusic[IndexNo].Name;
  CurrentArtistName.innerHTML = AllMusic[IndexNo].Artist;
  PlayPauseButton.innerHTML = '<i class="fas fa-pause" aria-hidden="true"></i>';
}
