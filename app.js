document.addEventListener('DOMContentLoaded', function () {
  /* サービスセクション：エフェクト追加処理 */
  const processBtn = document.getElementById('processBtn');
  const audioFileInput = document.getElementById('audioFile');
  const effectSelect = document.getElementById('effectSelect');
  const loadingDiv = document.getElementById('loading');
  const resultDiv = document.getElementById('result');
  const audioPlayer = document.getElementById('audioPlayer');
  const downloadLink = document.getElementById('downloadLink');

  const API_URL = 'https://your-render-backend-url.com/process';

  processBtn.addEventListener('click', function () {
    const file = audioFileInput.files[0];
    if (!file) {
      alert('音声ファイルを選択してください。');
      return;
    }

    const effect = effectSelect.value;
    const formData = new FormData();
    formData.append('audio', file);
    formData.append('effect', effect);

    loadingDiv.style.display = 'block';
    resultDiv.style.display = 'none';

    fetch(API_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('エラーが発生しました');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        audioPlayer.src = url;
        downloadLink.href = url;
        loadingDiv.style.display = 'none';
        resultDiv.style.display = 'block';
      })
      .catch((err) => {
        console.error(err);
        alert('処理中にエラーが発生しました');
        loadingDiv.style.display = 'none';
      });
  });

  /* 事例セクション：カルーセルとサンプル再生処理 */
  const albumDisplay = document.getElementById('albumDisplay');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const effectSelectExample = document.getElementById('effectSelectExample');
  const applyEffectBtn = document.getElementById('applyEffectBtn');
  const audioExample = document.getElementById('audioExample');
  const audioSource = document.getElementById('audioSource');

  const albums = [
    {
      title: '',
      cover: 'jazz.jpg',
      audio: 'jazz.mp3',
    },
    {
      title: '',
      cover: 'chill.jpg',
      audio: 'chill.mp3',
    },
    {
      title: '',
      cover: 'rap.jpg',
      audio: 'rap.mp3',
    },
  ];
  let currentAlbum = 0;

  function updateAlbumDisplay() {
    const album = albums[currentAlbum];
    albumDisplay.innerHTML = `
        <img src="${album.cover}" alt="${album.title}" style="width:100%; height:100%;">
        <div class="album-title">${album.title}</div>
      `;
    audioSource.src = album.audio;
    audioExample.load();
  }

  applyEffectBtn.addEventListener('click', function () {
    const effect = effectSelectExample.value;
    console.log(`適用するサウンドエフェクト: ${effect}`);
    // サンプル再生のため、エフェクトはログ出力のみ
    audioExample.play();
  });

  prevBtn.addEventListener('click', function () {
    currentAlbum = (currentAlbum - 1 + albums.length) % albums.length;
    updateAlbumDisplay();
  });

  nextBtn.addEventListener('click', function () {
    currentAlbum = (currentAlbum + 1) % albums.length;
    updateAlbumDisplay();
  });

  updateAlbumDisplay();
});
