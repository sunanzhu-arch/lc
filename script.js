document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createFallingPetals();
    initSlider();
    initRevealButton();
    initClickableHearts();
    initCountdown();
    initMusicPlayer();
    loadCustomContent();
});

function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝'];
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (16 + Math.random() * 20) + 'px';
        heart.style.animationDelay = Math.random() * 8 + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        container.appendChild(heart);
    }
}

function createFallingPetals() {
    const container = document.querySelector('.petals-container');
    const petalEmojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '💐'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (20 + Math.random() * 25) + 'px';
        petal.style.animationDelay = Math.random() * 10 + 's';
        petal.style.animationDuration = (8 + Math.random() * 6) + 's';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        container.appendChild(petal);
    }
}

function initSlider() {
    const slider = document.querySelector('.slider');
    const thumb = document.getElementById('sliderThumb');
    const lockScreen = document.getElementById('lockScreen');
    const content = document.getElementById('content');
    
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    thumb.addEventListener('mousedown', startDrag);
    thumb.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        thumb.classList.add('dragging');
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentX = clientX - startX;
        
        const maxX = slider.offsetWidth - thumb.offsetWidth;
        const newLeft = Math.max(0, Math.min(currentX, maxX));
        
        thumb.style.left = newLeft + 'px';
        
        if (newLeft >= maxX * 0.9) {
            unlock();
        }
    }
    
    function endDrag() {
        isDragging = false;
        thumb.classList.remove('dragging');
        
        if (currentX < slider.offsetWidth - thumb.offsetWidth - 10) {
            thumb.style.left = '0px';
        }
        
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', endDrag);
    }
    
    function unlock() {
        lockScreen.classList.add('hidden');
        content.style.display = 'block';
    }
}

function initRevealButton() {
    const btn = document.getElementById('revealBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const messages = [
        '每一天都想见到你\n每一刻都想陪伴你\n余生很长，我想和你一起走下去 ❤️',
        '你的笑容是我每天的阳光\n你的声音是我最美的旋律\n我爱你 💖',
        '从相遇的那一刻起\n我的心就属于你\n永远爱你 💕',
        '你是我生命中最美好的遇见\n愿与你携手走过每一个春夏秋冬 💗'
    ];
    
    let isRevealed = false;
    
    btn.addEventListener('click', function() {
        if (!isRevealed) {
            hiddenMessage.classList.add('show');
            btn.innerHTML = '💝 再换一条消息';
            isRevealed = true;
        } else {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            hiddenMessage.querySelector('p').innerHTML = randomMessage.replace(/\n/g, '<br>');
        }
    });
}

function initClickableHearts() {
    const hearts = document.querySelectorAll('.click-heart');
    const heartColors = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎'];
    
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            const currentIndex = heartColors.indexOf(this.textContent);
            const nextIndex = (currentIndex + 1) % heartColors.length;
            this.textContent = heartColors[nextIndex];
            this.classList.add('clicked');
            
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 500);
        });
    });
}

function initCountdown() {
    const startDate = localStorage.getItem('loveStartDate') || '2024-02-14';
    updateCountdown(startDate);
    
    setInterval(() => {
        updateCountdown(startDate);
    }, 1000);
}

function updateCountdown(startDate) {
    const start = new Date(startDate);
    const now = new Date();
    const diff = now - start;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function initMusicPlayer() {
    const musicBtn = document.getElementById('musicBtn');
    const audio = document.getElementById('backgroundMusic');
    const customMusic = localStorage.getItem('customMusicUrl');
    
    if (customMusic) {
        audio.src = customMusic;
    }
    
    musicBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<span class="music-icon">🎶</span>';
            }).catch(err => {
                console.log('播放失败:', err);
            });
        } else {
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<span class="music-icon">🎵</span>';
        }
    });
}

function loadCustomContent() {
    const customTitle = localStorage.getItem('customTitle');
    const customMessage = localStorage.getItem('customMessage');
    const customPhoto = localStorage.getItem('customPhoto');
    const customSignature = localStorage.getItem('customSignature');
    
    if (customTitle) {
        document.getElementById('mainTitle').textContent = customTitle;
    }
    
    if (customMessage) {
        document.getElementById('messageContent').innerHTML = customMessage.replace(/\n/g, '<br>');
    }
    
    if (customPhoto) {
        document.getElementById('lovePhoto').src = customPhoto;
    }
    
    if (customSignature) {
        document.querySelector('.signature').textContent = customSignature;
    }
}