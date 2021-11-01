let AllMusic = [
   {
     Name: "A Thousand Years",
     Path: "music/01.mp3",
     Image: "images/01.jpg",
     Artist: "Christina Perri"
   },
   {
     Name: "My Heart Will Go On",
     Path: "music/02.mp3",
     Image: "images/01.jpg",
     Artist: "Celine Dion"
   },
   {
    Name: "Bad Liar",
    Path: "music/03.mp3",
    Image: "images/01.jpg",
    Artist: "Imagine Dragons"
  }
];

let Tracks = document.querySelector('.Track');

for (let i = 0; i < AllMusic.length; i++) {

  let Html = ` <div class="Music">
      <div class="Image">
      <img src="${AllMusic[i].Image}"/>
      </div>
      <div class="More">
      <audio src="${AllMusic[i].Path}" id="Music"></audio>
      <div class="MusicInfo">
         <p id="Title">${AllMusic[i].Name}</p>
         <p>${AllMusic[i].Artist}</p>
      </div>
      <button id="PlayButton"><i class="fas fa-play" aria-hidden="true"></i></button>
      </div>
    </div>`;

  Tracks.insertAdjacentHTML("beforeend", Html);
};
