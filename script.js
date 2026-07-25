document.addEventListener("DOMContentLoaded", () => {
  // Fetch Data dari data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      renderMembers(data.members);
      renderWishes(data.members);
    })
    .catch((error) => console.error("Gagal memuat data:", error));

  // Audio Player Logic
  const musicBtn = document.getElementById("music-btn");
  const bgMusic = document.getElementById("bg-music");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
      musicBtn.textContent = "🎵";
    } else {
      bgMusic.play();
      musicBtn.classList.add("playing");
      musicBtn.textContent = "🎶";
    }
    isPlaying = !isPlaying;
  });

  // Modal Functionality
  const modal = document.getElementById("profile-modal");
  const modalClose = document.getElementById("modal-close");

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

// Render 33 Anggota Kelas ke dalam Carousel Horizontal
function renderMembers(members) {
  const carousel = document.getElementById("members-carousel");
  carousel.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.innerHTML = `
      <img src="${member.photo}" alt="${member.name}" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.role}</p>
    `;

    // Klik untuk membuka detail di modal pop-up
    card.addEventListener("click", () => openModal(member));
    carousel.appendChild(card);
  });
}

// Buka Modal Detail Profil
function openModal(member) {
  const modal = document.getElementById("profile-modal");
  document.getElementById("modal-img").src = member.photo;
  document.getElementById("modal-name").textContent = member.name;
  document.getElementById("modal-role").textContent = member.role;
  document.getElementById("modal-quote").textContent = `"${member.quote || 'Painted memories will stay forever.'}"`;
  document.getElementById("modal-harapan").textContent = member.harapan || 'Sukses selalu untuk kelas Madrid!';

  modal.classList.add("active");
}

// Render Ucapan Harapan
function renderWishes(members) {
  const wishesGrid = document.getElementById("wishes-grid");
  wishesGrid.innerHTML = "";

  members.forEach((member) => {
    if (member.harapan) {
      const wishCard = document.createElement("div");
      wishCard.className = "wish-card";
      wishCard.innerHTML = `
        <h4>${member.name}</h4>
        <p>"${member.harapan}"</p>
      `;
      wishesGrid.appendChild(wishCard);
    }
  });
}
