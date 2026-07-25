document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Handler
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
            }
        }, 1200);
    });

    // 2. Hero Parallax Effect
    const heroBg = document.getElementById('heroBg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
        }
    });

    // 3. Navbar Scroll & Blur Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 4. Memory Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 30;

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

    // 5. Timeline Scroll Progress & Active Chapter
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineCards = document.querySelectorAll('.timeline-card');

    window.addEventListener('scroll', () => {
        const timelineSection = document.getElementById('timeline');
        if (!timelineSection) return;

        const rect = timelineSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const visibleHeight = window.innerHeight - rect.top;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            let percentage = (visibleHeight / (sectionHeight + window.innerHeight)) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            if (timelineProgress) timelineProgress.style.height = `${percentage}%`;
        }

        timelineCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight * 0.75) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });

    // 6. Render People Grid & Search Filter
    const peopleGrid = document.getElementById('peopleGrid');
    const searchInput = document.getElementById('searchStudent');
    const modalOverlay = document.getElementById('profileModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    function renderPeople(data) {
        if (!peopleGrid) return;
        peopleGrid.innerHTML = '';

        if (data.length === 0) {
            peopleGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Nama tidak ditemukan...</p>`;
            return;
        }

        data.forEach(person => {
            const card = document.createElement('div');
            card.className = 'person-card';
            card.innerHTML = `
                <div class="avatar-wrapper">
                    <img src="${person.photo}" alt="${person.name}" class="avatar-img" loading="lazy">
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
            <div class="modal-header-profile">
                <div class="modal-avatar-wrapper">
                    <img src="${person.photo}" alt="${person.name}" class="modal-avatar-img">
                </div>
                <h2 class="modal-name">${person.name}</h2>
                <p class="modal-quote">"${person.quote || 'No quote provided.'}"</p>
            </div>
            <div class="modal-details">
                <div class="detail-item">
                    <span class="detail-label">Tempat, Tanggal Lahir</span>
                    <span class="detail-val">${person.ttl || '-'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Hobi</span>
                    <span class="detail-val">${person.hobi || '-'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Pesan & Kesan</span>
                    <span class="detail-val">${person.pesan || '-'}</span>
                </div>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
});
