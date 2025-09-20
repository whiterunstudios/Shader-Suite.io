const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // transparent background

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Light/Dark mode toggle

const toggleBtn = document.getElementById('mode-toggle');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  if(document.body.classList.contains('light-mode')) {
    toggleBtn.textContent = 'Dark Mode';
  } else {
    toggleBtn.textContent = 'Light Mode';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const donateWidget = document.querySelector(".donate-widget-header");
  const donateToggle = donateWidget.querySelector(".donate-tab-header");

  let closeTimeout;

  // Toggle open/close on click
  donateToggle.addEventListener("click", () => {
    clearTimeout(closeTimeout);
    const isOpen = donateWidget.classList.toggle("open");
    donateToggle.setAttribute("aria-expanded", isOpen);
  });

  // Open on hover, close with delay on mouseleave
  donateWidget.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
    donateWidget.classList.add("open");
    donateToggle.setAttribute("aria-expanded", true);
  });

  donateWidget.addEventListener("mouseleave", () => {
    // Delay closing by 300ms
    closeTimeout = setTimeout(() => {
      donateWidget.classList.remove("open");
      donateToggle.setAttribute("aria-expanded", false);
    }, 300);
  });

  // Click outside closes immediately
  document.addEventListener("click", (e) => {
    if (!donateWidget.contains(e.target)) {
      clearTimeout(closeTimeout);
      donateWidget.classList.remove("open");
      donateToggle.setAttribute("aria-expanded", false);
    }
  });

  // Escape key closes immediately
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      clearTimeout(closeTimeout);
      donateWidget.classList.remove("open");
      donateToggle.setAttribute("aria-expanded", false);
      donateToggle.focus();
    }
  });
});

