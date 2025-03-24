document.addEventListener('DOMContentLoaded', () => {
  /* ======================== サービスセクション処理 ======================== */
  const processBtn = document.getElementById('processBtn');
  const audioFileInput = document.getElementById('audioFile');
  const effectSelect = document.getElementById('effectSelect');
  const loadingDiv = document.getElementById('loading');
  const resultDiv = document.getElementById('result');
  const audioPlayer = document.getElementById('audioPlayer');
  const downloadLink = document.getElementById('downloadLink');
  const API_URL = 'https://your-render-backend-url.com/process';

  processBtn.addEventListener('click', () => {
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
        if (!response.ok) throw new Error('エラーが発生しました');
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

  /* ======================== 事例セクション（カルーセル＆サンプル再生） ======================== */
  const albumDisplay = document.getElementById('albumDisplay');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const effectSelectExample = document.getElementById('effectSelectExample');
  const applyEffectBtn = document.getElementById('applyEffectBtn');
  const audioExample = document.getElementById('audioExample');
  const audioSource = document.getElementById('audioSource');

  const albums = [
    { title: '', cover: 'jazz.jpg', audio: 'jazz.mp3' },
    { title: '', cover: 'chill.jpg', audio: 'chill.mp3' },
    { title: '', cover: 'rap.jpg', audio: 'rap.mp3' },
  ];
  let currentAlbum = 0;

  const updateAlbumDisplay = () => {
    const album = albums[currentAlbum];
    albumDisplay.innerHTML = `
      <img src="${album.cover}" alt="${album.title}" style="width:100%; height:100%;">
      <div class="album-title">${album.title}</div>
    `;
    audioSource.src = album.audio;
    audioExample.load();
  };

  applyEffectBtn.addEventListener('click', () => {
    const effect = effectSelectExample.value;
    console.log(`適用するサウンドエフェクト: ${effect}`);
    // サンプル再生のため、エフェクトはログ出力のみ
    audioExample.play();
  });

  prevBtn.addEventListener('click', () => {
    currentAlbum = (currentAlbum - 1 + albums.length) % albums.length;
    updateAlbumDisplay();
  });

  nextBtn.addEventListener('click', () => {
    currentAlbum = (currentAlbum + 1) % albums.length;
    updateAlbumDisplay();
  });

  updateAlbumDisplay();

  /* ======================== セクション間スナップスクロール ======================== */
  const sections = document.querySelectorAll('.section');
  let currentIndex = 0;
  let isScrolling = false;

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: 'smooth' });
    currentIndex = index;
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  };

  window.addEventListener('wheel', (event) => {
    if (isScrolling) return;
    if (event.deltaY > 0) scrollToSection(currentIndex + 1);
    else if (event.deltaY < 0) scrollToSection(currentIndex - 1);
  });

  /* ======================== ポリシーCTAのスクロール ======================== */
  const policyCTA = document.getElementById('policy-cta');
  const serviceSection = document.getElementById('service');

  policyCTA.addEventListener('click', () => {
    serviceSection.scrollIntoView({ behavior: 'smooth' });
  });

  /* ======================== フェードインアニメーション ======================== */
  const fadeElements = document.querySelectorAll('.fade-element');
  const observerOptions = {
    threshold: 0.2,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => fadeObserver.observe(el));
});
