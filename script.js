// Data Foto Contoh
const sofiaPhotos = [
   { src: "sofia1.jpeg", caption: "Hari pertama sekilah guyss🥰" },
   { src: "sofia6.jpeg", caption: "Ini pas projek pertama ga sih??" },
   { src: "sofia3.jpeg", caption: "Ini foto-foto gabut" },
   { src: "sofia5.jpeg", caption: "Kunjed pertama kitaa😍" },
   { src: "sovia2.jpeg", caption: "Gw lupa ini kapan🙄" },
   { src: "sofia4.jpeg", caption: "Sama zah Aya😭" }
];

const latviaPhotos = [
    { src: "latvia1.jpeg", caption: "Hari batik🥳" },
    { src: "latvia2.jpeg", caption: "😘" },
    { src: "latvia3.jpeg", caption: "Ini firs time kita pakai basiba😍" },
    { src: "latvia4.jpeg", caption: "Makan bajamba🍲" },
    { src: "latvia5.jpeg", caption: "Waroeng Teteh Latvia💕" },
    { src: "latvia6.jpeg", caption: "Jualann🥰" },
    { src: "latvia7.jpeg", caption: "Mango sticky rice,cireng,es kul-kul dll" },
    { src: "latvia8.jpeg", caption: "Es kelapa jeruk🤩" },
    { src: "latvia11.jpeg", caption: "Literasi hari sabtu" },
    { src: "latvia9.jpeg", caption: "😘" },
    { src: "latvia10.jpeg", caption: "Tebak ini kapan?" },
    { src: "latvia12.jpeg", caption: "Ini projek bikin sabunn" },
    { src: "latvia13.jpeg", caption: "🥰" },
    { src: "latvia14.jpeg", caption: "🤟🤙" },
    { src: "latvia15.jpeg", caption: "✌" },
    { src: "latvia16.jpeg", caption: "Ini kls 11 atau 12😨" },
    { src: "latvia17.jpeg", caption: "Knitting project🧶" },
    { src: "latvia20.jpeg", caption: "Kunjed di BPS💗" },
    { src: "latvia19.jpeg", caption: "Pensi kak Akhtara🤍" },
    { src: "latvia18.jpeg", caption: "🪽🌷" },
];

const madridPhotos = [
    { src: "madrid1.jpeg", caption: "Foto bersama Zah Iput & kejutan ultah di kelas Madrid! 🎉" },
];

let currentImageSet = [];
let currentImageIndex = 0;

// Fungsi Menu Mobile (Hamburger)
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}

function closeMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.remove("active");
}

// Render Carousel Galeri
function renderGallery(photos, containerId, imageSetName) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    photos.forEach((photo, index) => {
        const card = document.createElement("div");
        card.className = "photo-card";
        card.onclick = () => openLightbox(imageSetName, index);

        card.innerHTML = `
      <div class="img-wrapper">
        <img src="${photo.src}" alt="${photo.caption}">
      </div>
      <div class="photo-caption">${photo.caption}</div>
    `;
        container.appendChild(card);
    });
}

// Lightbox Fullscreen Modal
function openLightbox(imageSetName, index) {
    const lightbox = document.getElementById("lightboxModal");
    
    if (imageSetName === 'sofia') currentImageSet = sofiaPhotos;
    else if (imageSetName === 'latvia') currentImageSet = latviaPhotos;
    else if (imageSetName === 'madrid') currentImageSet = madridPhotos;
    
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.style.display = "flex";
    document.addEventListener('keydown', handleKeydown);
}

function updateLightboxImage() {
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = currentImageSet[currentImageIndex].src;
        lightboxCaption.textContent = currentImageSet[currentImageIndex].caption;
        lightboxImg.style.opacity = 1;
    }, 50);
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= currentImageSet.length) currentImageIndex = 0;
    else if (currentImageIndex < 0) currentImageIndex = currentImageSet.length - 1;
    updateLightboxImage();
}

function closeLightbox() {
    document.getElementById("lightboxModal").style.display = "none";
    document.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(e) {
    if (document.getElementById("lightboxModal").style.display === "flex") {
        if (e.key === "ArrowLeft") changeImage(-1);
        else if (e.key === "ArrowRight") changeImage(1);
        else if (e.key === "Escape") closeLightbox();
    }
}

// Render Profiles
function renderProfiles(data) {
    const container = document.getElementById("membersContainer");
    if (!container) return;
    container.innerHTML = "";

    data.forEach((member) => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.onclick = () => openModal(member);

        card.innerHTML = `
      <div class="img-container">
        <img src="${member.image}" alt="${member.nickname}" onerror="this.src='https://via.placeholder.com/150/FFB7B2/ffffff?text=${member.nickname}'">
      </div>
      <span class="member-name">${member.nickname}</span>
    `;
        container.appendChild(card);
    });
}

// Render Wishes
function renderWishes(data) {
    const container = document.getElementById("wishesContainer");
    if (!container) return;
    container.innerHTML = "";

    data.forEach((member) => {
        const card = document.createElement("div");
        card.className = "wish-card";
        card.innerHTML = `
      <h4>${member.name} (${member.nickname})</h4>
      <p>"${member.futureHope || member.messageForClass}"</p>
    `;
        container.appendChild(card);
    });
}

// Search Filter
function searchMember() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtered = studentsData.filter(m =>
        m.name.toLowerCase().includes(input) ||
        m.nickname.toLowerCase().includes(input)
    );
    renderProfiles(filtered);
}

// Modal Detail Profile
function openModal(member) {
    const modal = document.getElementById("profileModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `
    <div style="text-align: center; margin-bottom: 15px;">
      <img src="${member.image}" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; border: 3px solid #FFB7B2;" onerror="this.src='https://via.placeholder.com/150/FFB7B2/ffffff?text=${member.nickname}'">
      <h3 style="color: #5A4A42; font-family: 'Playfair Display', serif; margin-top: 8px;">${member.name}</h3>
      <p style="color: #FF7B89; font-weight: 600; font-size: 12px;">"${member.nickname}" — ${member.role || 'Siswi Madrid'}</p>
    </div>
    <div style="font-size: 11px; line-height: 1.5; color: #555;">
      <p><strong>Ciri Khas:</strong> ${member.traits ? member.traits.join(", ") : '-'}</p>
      <p><strong>Hobi:</strong> ${member.hobby || '-'}</p>
      <p><strong>Lagu Favorit:</strong> ${member.favSong || '-'}</p>
      <p style="margin-top: 4px;"><strong>Quote:</strong> <em>"${member.quote || '-'}"</em></p>
      <hr style="margin: 10px 0; border: none; border-top: 1px solid #E2F0CB;">
      <p><strong>Pesan untuk Kelas:</strong> ${member.messageForClass || '-'}</p>
      <p style="margin-top: 4px;"><strong>Harapan Masa Depan:</strong> ${member.futureHope || '-'}</p>
    </div>
  `;

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("profileModal").style.display = "none";
}

// Toggle Audio
let isPlaying = false;
function toggleMusic() {
    const audio = document.getElementById("bgMusic");
    const icon = document.getElementById("musicIcon");

    if (isPlaying) {
        audio.pause();
        icon.textContent = "🎵";
    } else {
        audio.play();
        icon.textContent = "🎶";
    }
    isPlaying = !isPlaying;
}

// Init
document.addEventListener("DOMContentLoaded", () => {
    if (typeof studentsData !== 'undefined') {
        renderProfiles(studentsData);
        renderWishes(studentsData);
    }
    renderGallery(sofiaPhotos, "sofiaGallery", 'sofia');
    renderGallery(latviaPhotos, "latviaGallery", 'latvia');
    renderGallery(madridPhotos, "madridGallery", 'madrid');
});
