const certificates = [
  { img: "assets/global.png", caption: "Oracle Fusion Cloud Development Training — 2025" },
  { img: "assets/integration.png", caption: "Oracle Cloud Infrastructure Application Integration Professional — 2025" },
  { img: "assets/Redwood.png", caption: "Oracle Redwood Application Certified Developer Associate — 2025" },
  { img: "assets/OCI.png", caption: "Oracle Cloud Infrastructure Certified Foundations Associate — 2025" },
  { img: "assets/OCI_AI.png", caption: "Oracle Cloud Infrastructure Certified AI Foundations Associate — 2025" },
  { img: "assets/APEX.png", caption: "Oracle APEX Developer Professional — 2025" },
  { img: "assets/Next_FTC-1.png", caption: "Oracle Fusion Technical Consultant Training — 2024" },
  { img: "assets/alx_software.png", caption: "12-Month ALX Software Engineering Program — 2024" },
  { img: "assets/Front-end NanoDegree.png", caption: "Front-End Nanodegree Program — 2023" },
  { img: "assets/Full Stack Web Developer Nanodegree Program_2019_udacity.png", caption: "Full Stack Web Developer Nanodegree Program — 2019" },
];

let currentCertIndex = 0;
let lastFocusedElement = null;

function updateCertDisplay() {
  const cert = certificates[currentCertIndex];
  const image = document.getElementById("certImage");

  image.src = cert.img;
  image.alt = `${cert.caption} certificate`;
  document.getElementById("certCaption").textContent = cert.caption;
}

function openModal(index) {
  const modal = document.getElementById("certModal");

  currentCertIndex = index;
  lastFocusedElement = document.activeElement;
  updateCertDisplay();

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  const modal = document.getElementById("certModal");

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function changeCert(direction) {
  currentCertIndex =
    (currentCertIndex + direction + certificates.length) % certificates.length;
  updateCertDisplay();
}

function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuIcon = menuToggle.querySelector("i");
  const nav = document.querySelector(".nav-menu");

  function setMenu(open) {
    nav.classList.toggle("show", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menuIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  }

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1020) {
      setMenu(false);
    }
  });

  return setMenu;
}

function initializeModal() {
  const modal = document.getElementById("certModal");

  document.querySelectorAll("[data-cert-index]").forEach((item) => {
    item.addEventListener("click", () => openModal(Number(item.dataset.certIndex)));
  });

  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.querySelector(".prev").addEventListener("click", () => changeCert(-1));
  modal.querySelector(".next").addEventListener("click", () => changeCert(1));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const setMenu = initializeNavigation();

  initializeModal();
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("certModal");
    const isModalOpen = modal.classList.contains("is-open");

    if (event.key === "Escape") {
      if (isModalOpen) {
        closeModal();
      }
      setMenu(false);
    }

    if (!isModalOpen) {
      return;
    }

    if (event.key === "ArrowLeft") {
      changeCert(-1);
    }

    if (event.key === "ArrowRight") {
      changeCert(1);
    }

    // Keep keyboard focus inside the open dialog.
    if (event.key === "Tab") {
      const focusable = modal.querySelectorAll("button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
});
