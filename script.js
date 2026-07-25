document.addEventListener("DOMContentLoaded", () => {
  initNavbarEffects();
  initMembersSection();
  initTimelineScrollEffects();
  initWishWall();
  initWishModalEvents();
  startFloatingHearts();
  initMusicPlayer();
  initRippleEffect();
  initScrollAnimations();
});

// 1. LOADING SCREEN FADE OUT
window.addEventListener("load", () => {
  const loaderScreen = document.getElementById("loader-screen");
  if (loaderScreen) {
    setTimeout(() => {
      loaderScreen.classList.add("fade-out");
      document.body.style.overflow = "auto";
    }, 2000);
  }
});

// 2. NAVBAR & SCROLLSPY
function initNavbarEffects() {
  const navbar = document.getElementById("navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("is-active");
      navMenu.classList.toggle("is-active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("is-active");
        navMenu.classList.remove("is-active");
      });
    });
  }
}

// 3. MEMBERS SECTION & MODAL (LAMA)
const membersData = [
  { name: "Sofia Member", quote: "Dream big, shine bright.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80", bio: "Always finding joy in little moments." },
  { name: "Latvia Friend", quote: "Memories last forever.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80", bio: "Passionate about art and design." },
  { name: "Madrid Student", quote: "Together we thrive.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80", bio: "Living life one adventure at a time." }
];

function initMembersSection() {
  const grid = document.getElementById("members-grid");
  if (!grid) return;

  grid.innerHTML = "";
  membersData.forEach((member) => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.innerHTML = `
      <img class="member-photo" src="${member.photo}" alt="${member.name}" loading="lazy">
      <h3 class="member-name">${member.name}</h3>
      <p class="member-quote">“${member.quote}”</p>
    `;
    card.addEventListener("click", () => openMemberModal(member));
    grid.appendChild(card);
  });

  const modal = document.getElementById("member-modal");
  const backdrop = document.getElementById("member-modal-backdrop");
  const closeBtn = document.getElementById("member-modal-close");

  const closeModal = () => modal && modal.classList.remove("active");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
}

function openMemberModal(member) {
  const modal = document.getElementById("member-modal");
  const body = document.getElementById("member-modal-body");
  if (!modal || !body) return;

  body.innerHTML = `
    <img src="${member.photo}" alt="${member.name}" style="width:100%; height:260px; object-fit:cover; border-radius:16px; margin-bottom:20px;">
    <h2 style="font-family:'Cormorant Garamond', serif; font-size:2.2rem; margin-bottom:8px;">${member.name}</h2>
    <p style="font-style:italic; color:var(--text-secondary); margin-bottom:16px;">“${member.quote}”</p>
    <p style="font-size:0.95rem;">${member.bio}</p>
  `;

  modal.classList.add("active");
}

// 4. TIMELINE SCROLL PROGRESS & HIGHLIGHTS
function initTimelineScrollEffects() {
  const progressLine = document.getElementById("timeline-progress");
  const timelineWrapper = document.querySelector(".timeline-wrapper");
  const cardWrappers = document.querySelectorAll(".timeline-card-wrapper");
  const yearNodes = document.querySelectorAll(".timeline-node");

  if (!timelineWrapper || !progressLine) return;

  window.addEventListener("scroll", () => {
    const rect = timelineWrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = rect.height;
    const currentProgress = windowHeight / 2 - rect.top;
    
    let percentage = (currentProgress / totalHeight) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    progressLine.style.height = `${percentage}%`;
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
      }
    });
  }, { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" });

  cardWrappers.forEach((card) => observer.observe(card));
  yearNodes.forEach((node) => observer.observe(node));
}

// 5. WISH WALL & MARQUEE
const pastelCardBgs = [
  "linear-gradient(135deg, #FFF9F5 0%, #FFEFE8 100%)",
  "linear-gradient(135deg, #F5F9FF 0%, #EBF3FF 100%)",
  "linear-gradient(135deg, #FAF7FF 0%, #F0EAFF 100%)",
  "linear-gradient(135deg, #F6FAF5 0%, #EAF5E9 100%)"
];

function initWishWall() {
  const dummyMembers = [
    { name: "Sofia Member", wish: "May our Madrid journey be full of laughter, growth, and everlasting bonds.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", role: "Class Member" },
    { name: "Latvia Friend", wish: "Hoping that every single one of us finds our true passion after graduation.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", role: "Class Member" },
    { name: "Madrid Student", wish: "To all painted memories we created together, cheers to our bright future!", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", role: "Class Member" }
  ];

  const track = document.getElementById("wish-track");
  if (!track) return;

  const fullList = [...dummyMembers, ...dummyMembers, ...dummyMembers];
  track.innerHTML = "";

  fullList.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "wish-card";
    card.style.background = pastelCardBgs[index % pastelCardBgs.length];
    card.innerHTML = `
      <p class="wish-text">“${item.wish}”</p>
      <div class="wish-author">
        <img class="wish-avatar" src="${item.photo}" alt="${item.name}" loading="lazy">
        <div>
          <h4 style="font-size:0.9rem; font-weight:600;">${item.name}</h4>
          <span style="font-size:0.75rem; color:var(--text-secondary);">${item.role}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openWishModal(item));
    track.appendChild(card);
  });
}

function initWishModalEvents() {
  const modal = document.getElementById("wish-modal");
  const backdrop = document.getElementById("wish-modal-backdrop");
  const closeBtn = document.getElementById("wish-modal-close");

  const closeModal = () => modal && modal.classList.remove("active");

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
}

function openWishModal(item) {
  const modal = document.getElementById("wish-modal");
  if (!modal) return;

  document.getElementById("wish-modal-text").textContent = item.wish;
  document.getElementById("wish-modal-name").textContent = item.name;
  document.getElementById("wish-modal-role").textContent = item.role;
  document.getElementById("wish-modal-avatar").style.backgroundImage = `url(${item.photo})`;

  modal.classList.add("active");
}

function startFloatingHearts() {
  const container = document.getElementById("hearts-container");
  if (!container) return;

  const icons = ["🤍", "✨", "🌸"];
  setInterval(() => {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${Math.random() * 90 + 5}%`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 8000);
  }, 2500);
}

// 6. FLOATING MUSIC PLAYER
function initMusicPlayer() {
  const musicWidget = document.querySelector(".music-player-widget");
  const musicBtn = document.getElementById("music-toggle-btn");
  const musicIcon = document.getElementById("music-icon");
  let isPlaying = false;

  if (!musicBtn || !musicWidget) return;

  musicBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      musicWidget.classList.add("show-player");
      musicBtn.classList.add("is-playing");
      if (musicIcon) musicIcon.textContent = "🔊";
    } else {
      musicWidget.classList.remove("show-player");
      musicBtn.classList.remove("is-playing");
      if (musicIcon) musicIcon.textContent = "🎵";
    }
  });
}

// 7. RIPPLE & SCROLL REVEAL
function initRippleEffect() {
  document.querySelectorAll(".btn, .music-float-btn, .wish-card, .member-card").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement("span");
      circle.className = "ripple-wave";
      const diameter = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
}

function initScrollAnimations() {
  const targets = document.querySelectorAll("section, .section-header-center");
  targets.forEach((el) => el.classList.add("reveal-slide-up"));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((target) => observer.observe(target));
}
