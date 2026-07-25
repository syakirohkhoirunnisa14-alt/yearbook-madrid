// Sample Data Foto Kenangan (Ganti src dengan foto asli kalian)
const sofiaPhotos = [
  { src: "sofia1.jpeg", caption: "Hari pertama sekilah guyss🥰" },
  { src: "sofia6.jpeg", caption: "Ini pas projek pertama ga sih??" },
  { src: "sofia3.jpeg", caption: "Ini foto-foto gabut" },
  { src: "sofia5.jpeg", caption: "Kunjed pertama kitaa😍" },
  { src: "sofia2.jpeg", caption: "Gw lupa ini kapan🙄" },
  { src: "sofia4.jpeg", caption: "Sama zah Aya😭" }
];

const latviaPhotos = [
  { src: "https://via.placeholder.com/400x300/D7BCE8/ffffff?text=Latvia+1", caption: "Masa-masa XI Latvia yang makin kompak" },
  { src: "https://via.placeholder.com/400x300/FFDAC1/ffffff?text=Latvia+2", caption: "Kunjed & Rihlah kelas" },
  { src: "https://via.placeholder.com/400x300/FFF5BA/ffffff?text=Latvia+3", caption: "Ulang tahun bersama Zah Eed" }
];

const madridPhotos = [
  { src: "madrid1.jpeg", caption: "Foto bersama Zah Iput & kejutan ultah di kelas Madrid! 🎉" },
  { src: "https://via.placeholder.com/400x300/B5EAD7/ffffff?text=Madrid+2", caption: "Nonton bareng sembunyi-sembunyi" },
  { src: "https://via.placeholder.com/400x300/FFB7B2/ffffff?text=Madrid+3", caption: "Momen wisuda & perpisahan hangat" }
];

// Render Carousel Galeri
function renderGallery(photos, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  photos.forEach(photo => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.onclick = () => openLightbox(photo.src, photo.caption);

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
function openLightbox(src, caption) {
  const lightbox = document.getElementById("lightboxModal");
  document.getElementById("lightboxImg").src = src;
  document.getElementById("lightboxCaption").textContent = caption;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightboxModal").style.display = "none";
}

// Render Profiles
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

// Render Wishes Grid
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

// Search Filter
function searchMember() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = studentsData.filter(m => 
    m.name.toLowerCase().includes(input) || 
    m.nickname.toLowerCase().includes(input)
  );
  renderProfiles(filtered);
}

// Profile Modal
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
      <hr style="margin: 12px 0; border: none; border-top: 1px id #E2F0CB;">
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

// Event Init
document.addEventListener("DOMContentLoaded", () => {
  renderProfiles(studentsData);
  renderGallery(sofiaPhotos, "sofiaGallery");
  renderGallery(latviaPhotos, "latviaGallery");
  renderGallery(madridPhotos, "madridGallery");
  renderWishes(studentsData);
});
