document.getElementById("load-song").addEventListener("click", function () {
  const songTitle = document.getElementById("song-title").value;

  fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
    .then((res) => res.json())
    .then((data) => {
      data = data.data.slice(0, 10); // to get proper array, write data twice
      const songContainer = document.getElementById("song-container");

      for (let i = 0; i < data.length; i++) {
        const song = data[i];
        const div = document.createElement("div");
        div.classList = "single-result row align-items-center my-3 p-3";
        div.innerHTML = `<div class="col-md-9">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <p class="author lead">
                              Album by <strong>${song.artist.name}</strong>
                            </p>
                          </div>
                          <div class="col-md-3 text-md-right text-center">
                            <button onclick="getFullLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                          </div>`;
        songContainer.appendChild(div);
      }
    });
});

function getFullLyric(artist, title) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((res) => res.json())
    .then((data) => {
      handleSingleLyric(data, title);
    });
}

function handleSingleLyric(data, title) {
  const lyricContainer = document.getElementById("lyric-container");

  const div = document.createElement("div");
  div.classList = "single-lyrics text-center";
  div.innerHTML = `<button class="btn go-back"></button>
                    <h2 class="text-success mb-4">${title}</h2>`;

  const pre = document.createElement("pre");
  pre.classList = "lyric text-white";
  if (data.error) {
    pre.innerHTML = "<h1>Lyrics Not Found</h1>";
  } else {
    pre.innerText = data.lyrics;
  }

  const reloadBtn = document.createElement("button");
  reloadBtn.innerText = "Search Again";
  reloadBtn.classList = "btn btn-success btn-lg btn-block mb-5";
  reloadBtn.addEventListener("click", () => {
    location.reload();
  });

  div.appendChild(pre);
  lyricContainer.append(div, reloadBtn);
}
