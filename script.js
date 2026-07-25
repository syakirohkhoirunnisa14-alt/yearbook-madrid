// Variabel Global untuk Galeri (Penting!)
const sofiaPhotos = [
   { src: "sofia1.jpeg", caption: "Hari pertama sekilah guyss🥰" },
   { src: "sofia6.jpeg", caption: "Ini pas projek pertama ga sih??" },
   { src: "sofia3.jpeg", caption: "Ini foto-foto gabut" },
   { src: "sofia5.jpeg", caption: "Kunjed pertama kitaa😍" },
   { src: "sovia2.jpeg", caption: "Gw lupa ini kapan🙄" },
   { src: "sofia4.jpeg", caption: "Sama zah Aya😭" }
];

const latviaPhotos = [
    { src: "https://via.placeholder.com/400x300/D7BCE8/ffffff?text=Latvia+1", caption: "Masa-masa XI Latvia yang makin kompak" },
    { src: "https://via.placeholder.com/400x300/FFDAC1/ffffff?text=Latvia+2", caption: "Kunjed & Rihlah kelas" },
    { src: "https://via.placeholder.com/400x300/FFF5BA/ffffff?text=Latvia+3", caption: "Ulang tahun bersama Zah Eed" },
    // Tambahkan foto latvia lain disini
];

const madridPhotos = [
    { src: "madrid1.jpeg", caption: "Foto bersama Zah Iput & kejutan ultah di kelas Madrid! 🎉" },
    { src: "https://via.placeholder.com/400x300/B5EAD7/ffffff?text=Madrid+2", caption: "Nonton bareng sembunyi-sembunyi" },
    { src: "https://via.placeholder.com/400x300/FFB7B2/ffffff?text=Madrid+3", caption: "Momen wisuda & perpisahan hangat" },
    // Tambahkan foto madrid lain disini
];

// Variabel untuk melacak status Lightbox
let currentImageSet = []; // Menyimpan kumpulan foto mana yang sedang dibuka (sofia/latvia/madrid)
let currentImageIndex = 0; // Menyimpan indeks foto yang sedang ditampilkan

// Render Carousel Galeri (Updated to support indexing)
function renderGallery(photos, containerId, imageSetName) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    photos.forEach((photo, index) => {
        const card = document.createElement("div");
        card.className = "photo-card";
        // Ubah onclick untuk merekam kumpulan foto dan indeksnya
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

// Lightbox Fullscreen Modal (Updated for Sliding)
function openLightbox(imageSetName, index) {
    const lightbox = document.getElementById("lightboxModal");
    
    // Tentukan kumpulan foto mana yang akan digunakan
    if (imageSetName === 'sofia') {
        currentImageSet = sofiaPhotos;
    } else if (imageSetName === 'latvia') {
        currentImageSet = latviaPhotos;
    } else if (imageSetName === 'madrid') {
        currentImageSet = madridPhotos;
    }
    
    currentImageIndex = index; // Atur indeks foto pertama yang dibuka
    updateLightboxImage(); // Tampilkan gambar sesuai indeks
    
    lightbox.style.display = "flex";
    
    // Tambahkan event listener untuk keyboard (panah kiri/kanan, esc)
    document.addEventListener('keydown', handleKeydown);
}

// Update Konten Di Dalam Lightbox
function updateLightboxImage() {
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    
    // Matikan opacity untuk transisi
    lightboxImg.style.opacity = 0;
    
    // Set sumber gambar dan caption baru setelah transisi
    setTimeout(() => {
        lightboxImg.src = currentImageSet[currentImageIndex].src;
        lightboxCaption.textContent = currentImageSet[currentImageIndex].caption;
        // Hidupkan opacity kembali
        lightboxImg.style.opacity = 1;
    }, 50); // Delay kecil untuk efek transisi halus
}

// Ganti Gambar (Prev/Next)
function changeImage(direction) {
    currentImageIndex += direction;
    
    // Logika berputar (jika sampai ujung, kembali ke awal/akhir)
    if (currentImageIndex >= currentImageSet.length) {
        currentImageIndex = 0; // Kembali ke foto pertama
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentImageSet.length - 1; // Kembali ke foto terakhir
    }
    
    updateLightboxImage();
}

// Tutup Lightbox
function closeLightbox() {
    document.getElementById("lightboxModal").style.display = "none";
    // Hapus event listener keyboard agar tidak bentrok
    document.removeEventListener('keydown', handleKeydown);
}

// Menangani navigasi keyboard (gester dengan tombol panah)
function handleKeydown(e) {
    if (document.getElementById("lightboxModal").style.display === "flex") {
        if (e.key === "ArrowLeft") {
            changeImage(-1); // Panah kiri: sebelumnya
        } else if (e.key === "ArrowRight") {
            changeImage(1); // Panah kanan: berikutnya
        } else if (e.key === "Escape") {
            closeLightbox(); // ESC: tutup
        }
    }
}

// Render Profiles (Tetap)
function renderProfiles(data) {
    const container = document.getElementById("membersContainer");
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

// Render Wishes Grid (Tetap)
function renderWishes(data) {
    const container = document.getElementById("wishesContainer");
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

// Search Filter (Tetap)
function searchMember() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const filtered = studentsData.filter(m =>
        m.name.toLowerCase().includes(input) ||
        m.nickname.toLowerCase().includes(input)
    );
    renderProfiles(filtered);
}

// Profile Modal (Tetap)
function openModal(member) {
    const modal = document.getElementById("profileModal");
    const body = document.getElementById("modalBody");

    body.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${member.image}" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 4px solid #FFB7B2;" onerror="this.src='https://via.placeholder.com/150/FFB7B2/ffffff?text=${member.nickname}'">
      <h2 style="color: #5A4A42; font-family: 'Playfair Display', serif; margin-top: 10px;">${member.name}</h2>
      <p style="color: #FF7B89; font-weight: 600; font-size: 13px;">"${member.nickname}" — ${member.role || 'Siswi Madrid'}</p>
    </div>
    <div style="font-size: 12px; line-height: 1.6; color: #555;">
      <p><strong>Ciri Khas:</strong> ${member.traits ? member.traits.join(", ") : '-'}</p>
      <p><strong>Hobi:</strong> ${member.hobby || '-'}</p>
      <p><strong>Makanan Favorit:</strong> ${member.favFood || '-'}</p>
      <p><strong>Lagu Favorit:</strong> ${member.favSong || '-'}</p>
      <p style="margin-top: 6px;"><strong>Quote:</strong> <em>"${member.quote || '-'}"</em></p>
      <hr style="margin: 12px 0; border: none; border-top: 1px solid #E2F0CB;">
      <p><strong>Kesan 3 Tahun:</strong> ${member.impression || '-'}</p>
      <p style="margin-top: 4px;"><strong>Pesan untuk Kelas:</strong> ${member.messageForClass || '-'}</p>
      <p style="margin-top: 4px;"><strong>Harapan Masa Depan:</strong> ${member.futureHope || '-'}</p>
    </div>
  `;

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("profileModal").style.display = "none";
}

// Toggle Audio (Tetap)
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

// Event Init (Update untuk support indexing)
document.addEventListener("DOMContentLoaded", () => {
    renderProfiles(studentsData);
    
    // Tentukan kumpulan mana yang sedang ditampilkan
    renderGallery(sofiaPhotos, "sofiaGallery", 'sofia');
    renderGallery(latviaPhotos, "latviaGallery", 'latvia');
    renderGallery(madridPhotos, "madridGallery", 'madrid');
    
    renderWishes(studentsData);
});
