document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen Fix (Auto Close Maksimal 1.5 detik)
    const loadingScreen = document.getElementById('loading-screen');
    const hideLoading = () => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
        }
    };
    
    window.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 1500); // Cadangan otomatis hilang jika internet lambat

    // 2. Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 25;
            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const counterSection = document.getElementById('counter');
    window.addEventListener('scroll', () => {
        if (!counterSection) return;
        const sectionTop = counterSection.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100 && !animated) {
            animated = true;
            animateCounters();
        }
    });

    // 4. People Grid & Modal
    const peopleGrid = document.getElementById('peopleGrid');
    const searchInput = document.getElementById('searchStudent');
    const modalOverlay = document.getElementById('profileModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    function renderPeople(data) {
        if (!peopleGrid) return;
        peopleGrid.innerHTML = '';
        if (!data || data.length === 0) {
            peopleGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nama tidak ditemukan...</p>`;
            return;
        }

        data.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            card.innerHTML = `
                <div class="avatar-wrapper">
                    <img src="${person.photo}" alt="${person.name}" loading="lazy">
                </div>
                <h3 class="person-name">${person.name}</h3>
                <span class="person-nickname">"${person.nickname}"</span>
            `;

            card.addEventListener('click', () => openModal(person));
            peopleGrid.appendChild(card);
        });
    }

    if (typeof studentsData !== 'undefined') {
        renderPeople(studentsData);
    }

    if (searchInput && typeof studentsData !== 'undefined') {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = studentsData.filter(student => 
                student.name.toLowerCase().includes(keyword) || 
                student.nickname.toLowerCase().includes(keyword)
            );
            renderPeople(filtered);
        });
    }

    function openModal(person) {
        if (!modalOverlay || !modalBody) return;
        modalBody.innerHTML = `
            <div style="text-align:center;">
                <img src="${person.photo}" style="width:110px; height:110px; border-radius:50%; object-fit:cover; margin-bottom:10px;">
                <h2>${person.name}</h2>
                <p style="font-style:italic; color:var(--coral); margin-bottom:15px;">"${person.quote || 'No quote'}"</p>
            </div>
            <div style="text-align:left; font-size:0.9rem; line-height:1.6;">
                <p><strong>TTL:</strong> ${person.ttl || '-'}</p>
                <p><strong>Hobi:</strong> ${person.hobi || '-'}</p>
                <p><strong>Pesan & Kesan:</strong> ${person.pesan || '-'}</p>
            </div>
        `;
        modalOverlay.classList.add('active');
    }

    if (modalClose) modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove('active');
        });
    }

    // 5. Gallery Filter & Lightbox
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            lightboxImg.src = img.src;
            lightboxCaption.innerText = caption ? caption.innerText : '';
            lightboxModal.classList.add('active');
        });
    });

    document.getElementById('lightboxClose')?.addEventListener('click', () => lightboxModal.classList.remove('active'));
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) lightboxModal.classList.remove('active');
        });
    }

    // 6. Wish Form
    const wishForm = document.getElementById('wishForm');
    const wishesFeed = document.getElementById('wishesFeed');

    if (wishForm) {
        wishForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const sender = document.getElementById('wishSender').value;
            const message = document.getElementById('wishMessage').value;
            if (sender && message) {
                const card = document.createElement('div');
                card.className = 'wish-card';
                card.innerHTML = `
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <strong>${sender}</strong>
                        <small style="color:#888;">Baru saja</small>
                    </div>
                    <p style="font-style:italic; font-size:0.9rem;">"${message}"</p>
                `;
                wishesFeed.prepend(card);
                wishForm.reset();
            }
        });
    }

    // 7. Music Player
    const musicBtn = document.getElementById('musicBtn');
    const bgAudio = document.getElementById('bgAudio');
    let isPlaying = false;

    if (musicBtn && bgAudio) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                bgAudio.pause();
                musicBtn.classList.remove('playing');
                isPlaying = false;
            } else {
                bgAudio.play();
                musicBtn.classList.add('playing');
                isPlaying = true;
            }
        });
    }
});
