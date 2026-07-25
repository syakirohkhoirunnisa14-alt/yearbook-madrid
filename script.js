// Render daftar 33 profil anggota ke scroll horizontal
function renderProfiles(data) {
  const container = document.getElementById("membersContainer");
  container.innerHTML = "";

  data.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.onclick = () => openModal(member);

    card.innerHTML = `
      <div class="img-container">
        <img src="${member.image}" alt="${member.nickname}" onerror="this.src='https://via.placeholder.com/150/FFD1DC/8C7373?text=${member.nickname}'">
      </div>
      <span class="member-name">${member.nickname}</span>
    `;

    container.appendChild(card);
  });
}

// Render grid ucapan harapan untuk kelas Madrid
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

// Filter Pencarian Anggota
function searchMember() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const filtered = studentsData.filter(m => 
    m.name.toLowerCase().includes(input) || 
    m.nickname.toLowerCase().includes(input)
  );
  renderProfiles(filtered);
}

// Modal Pop-up Detail Anggota
function openModal(member) {
  const modal = document.getElementById("profileModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${member.image}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #FFD1DC;" onerror="this.src='https://via.placeholder.com/150/FFD1DC/8C7373?text=${member.nickname}'">
      <h2 style="color: #6D5959; font-family: 'Playfair Display', serif; margin-top: 10px;">${member.name}</h2>
      <p style="color: #F49AC2; font-weight: 600; font-size: 14px;">"${member.nickname}" — ${member.role || 'Siswi Madrid'}</p>
    </div>
    <div style="font-size: 13px; line-height: 1.6; color: #555;">
      <p><strong>Ciri Khas:</strong> ${member.traits ? member.traits.join(", ") : '-'}</p>
      <p><strong>Hobi:</strong> ${member.hobby || '-'}</p>
      <p><strong>Makanan Favorit:</strong> ${member.favFood || '-'}</p>
      <p><strong>Lagu Favorit:</strong> ${member.favSong || '-'}</p>
      <p style="margin-top: 8px;"><strong>Quote:</strong> <em>"${member.quote || '-'}"</em></p>
      <hr style="margin: 15px 0; border: none; border-top: 1px id #E6E6FA;">
      <p><strong>Kesan 3 Tahun:</strong> ${member.impression || '-'}</p>
      <p style="margin-top: 5px;"><strong>Pesan untuk Kelas:</strong> ${member.messageForClass || '-'}</p>
      <p style="margin-top: 5px;"><strong>Harapan Masa Depan:</strong> ${member.futureHope || '-'}</p>
    </div>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("profileModal").style.display = "none";
}

// Toggle Music Player
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

// Event saat halaman pertama dibuka
document.addEventListener("DOMContentLoaded", () => {
  renderProfiles(studentsData);
  renderWishes(studentsData);
});
