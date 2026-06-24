console.log("Страница загружена! js работает");

document.addEventListener('DOMContentLoaded', () => {
    const allSlides = document.querySelectorAll('.slide');
    const navItems = document.querySelectorAll('nav li');
    const dotsContainer = document.getElementById('dotsContainer');
    const modalOverlay = document.getElementById('modal-overlay');
    const page404Overlay = document.getElementById('page404-overlay');

    let currentTab = 'noma';
    let currentSlideIndex = 0;

    const merchData = [
        {
            items: [
                { title: 'МЕРЧ', img: 'Group 51.png', h4: 'МЕРЧ НА КАЖДЫЙ ДЕНЬ', p: ['УДОБНЫЙ ХУДИ ПОДХОДЯЩИЙ ДЛЯ ЛЮБОГО ПУТЕШЕСТВИЯ', 'ВМЕСТИТЕЛЬНЫЙ ШОППЕР ДЛЯ ВАШИХ ВЕЩЕЙ И ПОКУПОК НА ОТДЫХЕ', 'СТИЛЬНАЯ РЕМУВКА ДЛЯ КЛЮЧЕЙ, НАПОМИНАЮЩАЯ ОБ ОТДЫХЕ'] },
                { title: 'ХУДИ', img: 'худи.png', h4: 'ХУДИ «ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ»', p: ['УЮТНЫЙ И СТИЛЬНЫЙ ХУДИ СВОБОДНОГО КРОЯ, СОЗДАННЫЙ СПЕЦИАЛЬНО ДЛЯ ДОЛГИХ ПЕРЕЛЕТОВ, ПОЕЗДОК И КОМФОРТНЫХ ПРОГУЛОК.', 'ЦЕНТРАЛЬНЫЙ ПРИНТ-МАНИФЕСТ «ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ» ДЕЛАЕТ ЭТУ ВЕЩЬ ГЛАВНЫМ ЭЛЕМЕНТОМ ТВОЕГО ДОРОЖНОГО ГАРДЕРОБА.'] },
                { title: 'СУМКА', img: 'шоппер.png', h4: 'КЛЕТЧАТЫЙ ШОППЕР С ЯРКИМ ПРИНТОМ', p: ['ВМЕСТИТЕЛЬНАЯ И ПРОЧНАЯ СУМКА-ШОППЕР, СОЗДАННАЯ ДЛЯ ТЕХ, КТО ЦЕНИТ КОМФОРТ В ДВИЖЕНИИ.', 'ЭТОТ ШОППЕР РАЗРАБОТАН КАК ИДЕАЛЬНЫЙ СПУТНИК ДЛЯ ПУТЕШЕСТВИЙ, ПОЕЗДОК НА ПЛЯЖ ИЛИ ЕЖЕДНЕВНЫХ ПРОГУЛОК ПО ГОРОДУ.'] },
                { title: 'РЕМУВКА', img: 'ремувка.png', h4: 'СТИЛЬНАЯ РЕМУВКА «ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ»', p: ['ЯРКИЙ И ПРАКТИЧНЫЙ АКСЕССУАР, КОТОРЫЙ НЕ ПОЗВОЛИТ ВАШИМ КЛЮЧАМ ЗАТЕРЯТЬСЯ НА ДНЕ РЮКЗАКА.', 'ВЫПОЛНЕН В ФОРМАТЕ КЛАССИЧЕСКОЙ АВИАЦИОННОЙ РЕМУВКИ. СИНИЙ ФАКТУРНЫЙ БРЕЛОК С КОНТРАСТНОЙ НАДПИСЬЮ «ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ»'] }
            ]
        },
        {
            items: [
                { title: 'БУТЫЛКА', img: 'бутылка.png', h4: 'БУТЫЛКА ДЛЯ ВОДЫ', p: ['ВАШ ПОМОЩНИК ДЛЯ ПОДДЕРЖАНИЯ ВОДНОГО БАЛАНСА В ПОЕЗДКАХ'] }
            ]
        },
        {
            items: [
                { title: 'КНИГА', img: 'книга 1.png', h4: 'ЖУРНАЛ ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ', p: ['РАССКАЗЫВАЕТ О ПРОГРАММАХ АГЕНТСТВА, ПОКАЗЫВАЕТ ПРОСТРАНСТВО ВНУТРИ И ОТВЕЧАЕТ НА ВОПРОС: ПОЧЕМУ ИМЕННО МЫ'] },
                { title: 'КНИГА', img: 'книга 2.png', h4: 'ЖУРНАЛ ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ', p: ['РАССКАЗЫВАЕТ О ПРОГРАММАХ АГЕНTSTVA, ПОКАЗЫВАЕT ПРОСТРАНCTBO ВНУTРИ И ОTBEЧAET НA ВOPROS: ПOЧEМY ИMЕННО MЫ'] },
                { title: 'КНИГА', img: 'книга 3.png', h4: 'ЖУРНАЛ ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ', p: ['РАССКАЗЫВАЕТ О ПРОГРАММАХ АГЕНTSTVA, ПОКАЗЫВАЕT ПРОСТРАНCTBO ВНУTРИ И ОTBEЧAET НA ВOPROS: ПOЧEМY ИMЕННО MЫ'] },
                { title: 'КНИГА', img: 'книга 4.png', h4: 'ЖУРНАЛ ПРОФИЛАКТИКА ПУТЕШЕСТВИЙ', p: ['РАССКАЗЫВАЕТ О ПРОГРАММАХ АГЕНTSTVA, ПОКАЗЫВАЕT ПРОСТРАНCTBO ВНУTРИ И ОTBEЧAET НA ВOPROS: ПOЧEМY ИMЕННО MЫ'] }
            ]
        }
    ];

    let currentMerchGroup = 0;
    let currentMerchItem = 0;

    const nomaDotColors = [
        ['#e8a2c2', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
        ['#ffffff', '#e8a2c2', '#ffffff', '#ffffff', '#ffffff'],
        ['#f4e58a', '#f4e58a', '#2a3ab0', '#f4e58a', '#f4e58a'],
        ['#2a3ab0', '#2a3ab0', '#2a3ab0', '#e394c6', '#2a3ab0'],
        ['#f4e58a', '#f4e58a', '#f4e58a', '#f4e58a', '#2a3ab0']
    ];

    function getCurrentSlides() {
        return document.querySelectorAll(`.slide[data-tab="${currentTab}"]`);
    }

    function switchTab(tab) {
        page404Overlay.classList.remove('active');
        currentTab = tab;
        currentSlideIndex = 0;
        if (tab === 'merch') {
            renderMerch(0, 0);
        }
        updateUI();
    }

    function showSlide(index) {
        const currentSlides = getCurrentSlides();
        if (index >= currentSlides.length) index = currentSlides.length - 1;
        if (index < 0) index = 0;
        currentSlideIndex = index;
        updateUI();
    }

    function switchMerchGroup(index) {
        currentMerchGroup = index;
        currentMerchItem = 0;
        renderMerch(currentMerchGroup, currentMerchItem);
        updateUI();
    }

    function switchMerchItem(index) {
        currentMerchItem = index;
        renderMerch(currentMerchGroup, currentMerchItem);
    }

    function renderMerch(groupIndex, itemIndex) {
        const group = merchData[groupIndex];
        if (!group) return;
        const item = group.items[itemIndex];
        if (!item) return;

        document.getElementById('merch-title').textContent = item.title;

        const img = document.getElementById('merch-image');
        img.src = item.img;
        if (groupIndex === 2) {
            img.classList.add('book-image');
        } else {
            img.classList.remove('book-image');
        }

        document.getElementById('merch-h4').textContent = item.h4;

        const pContainer = document.getElementById('merch-p');
        pContainer.innerHTML = '';
        item.p.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            pContainer.appendChild(p);
        });

        const vDotsContainer = document.getElementById('merch-vertical-dots');
        vDotsContainer.innerHTML = '';
        if (group.items.length > 1) {
            for (let i = 0; i < group.items.length; i++) {
                const dot = document.createElement('span');
                dot.className = `v-dot ${i === itemIndex ? 'active' : ''}`;
                dot.addEventListener('click', () => switchMerchItem(i));
                vDotsContainer.appendChild(dot);
            }
            vDotsContainer.style.display = 'flex';
        } else {
            vDotsContainer.style.display = 'none';
        }
    }

    function updateUI() {
        const currentSlides = getCurrentSlides();

        allSlides.forEach(s => s.classList.remove('active'));
        currentSlides.forEach((s, i) => {
            if (i === currentSlideIndex) s.classList.add('active');
        });

        dotsContainer.innerHTML = '';

        if (currentTab === 'catalog') {
            dotsContainer.innerHTML = '';
        } else if (currentTab === 'merch') {
            for (let i = 0; i < 3; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                let color = '#f4e58a';
                if (i === currentMerchGroup) color = '#2a3ab0';
                dot.style.backgroundColor = color;
                dot.addEventListener('click', () => switchMerchGroup(i));
                dotsContainer.appendChild(dot);
            }
        } else {
            for (let i = 0; i < currentSlides.length; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                dot.dataset.index = i;

                if (currentTab === 'noma') {
                    const colorSet = nomaDotColors[currentSlideIndex];
                    dot.style.backgroundColor = (i < colorSet.length) ? colorSet[i] : '#ffffff';
                } else if (currentTab === 'mission') {
                    if (i === currentSlideIndex) {
                        dot.style.backgroundColor = '#e8a2c2';
                    } else {
                        dot.style.backgroundColor = '#ffffff';
                    }
                }

                dot.addEventListener('click', function () {
                    showSlide(parseInt(this.dataset.index));
                });
                dotsContainer.appendChild(dot);
            }
        }

        const nav = document.getElementById('navigation');
        if (currentTab === 'catalog' || currentTab === 'merch') {
            nav.classList.remove('nav-blue');
            nav.classList.add('nav-white');
        } else if (currentTab === 'mission' && currentSlideIndex === 0) {
            nav.classList.remove('nav-white');
            nav.classList.add('nav-blue');
        } else if (currentTab === 'mission' && currentSlideIndex === 1) {
            nav.classList.remove('nav-blue');
            nav.classList.add('nav-white');
        } else if (currentTab === 'noma' && currentSlideIndex === 3) {
            nav.classList.remove('nav-white');
            nav.classList.add('nav-blue');
        } else {
            nav.classList.remove('nav-blue');
            nav.classList.add('nav-white');
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const tab = this.dataset.tab;
            if (tab === 'constructor') {
                page404Overlay.classList.add('active');
                return;
            }
            if (tab !== currentTab) {
                switchTab(tab);
            }
        });
    });

    document.addEventListener('click', function (e) {
        const target = e.target;
        const overlay = target.closest('#playButtonOverlay');

        if (overlay) {
            const video = overlay.parentElement.querySelector('video');
            if (video) {
                if (video.paused) {
                    video.play();
                    overlay.style.display = 'none';
                } else {
                    video.pause();
                    overlay.style.display = 'block';
                }
            }
        }

        if (target.tagName === 'VIDEO') {
            const video = target;
            const overlay = video.parentElement.querySelector('#playButtonOverlay');
            if (video.paused) {
                video.play();
                if (overlay) overlay.style.display = 'none';
            } else {
                video.pause();
                if (overlay) overlay.style.display = 'block';
            }
        }
    });

    document.addEventListener('pause', function (e) {
        if (e.target.tagName === 'VIDEO') {
            const overlay = e.target.parentElement.querySelector('#playButtonOverlay');
            if (overlay) overlay.style.display = 'block';
        }
    }, true);

    document.getElementById('merch-buy-btn').addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
    });

    document.getElementById('modal-submit').addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        page404Overlay.classList.add('active');
    });

    document.getElementById('back-to-main-btn').addEventListener('click', () => {
        page404Overlay.classList.remove('active');
        switchTab('noma');
    });

    switchTab('noma');
});