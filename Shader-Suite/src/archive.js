// Example preset data array
const presets = [
  { id: 1, title: "Golden Hour", game: "fs25", version: "2", img: "images/preset1.jpg" },
  { id: 2, title: "Sunrise Glow", game: "fs25", version: "2", img: "images/preset2.jpg" },
  { id: 3, title: "Rustic Warmth", game: "fs25", version: "3", img: "images/preset3.jpg" },
  { id: 4, title: "Vintage Light", game: "fs22", version: "3", img: "images/preset4.jpg" },
  { id: 5, title: "Cool Breeze", game: "fs19", version: "1", img: "images/preset5.jpg" },
  // Add more presets here
];

const presetsPerPage = 6;
let currentPage = 1;

const archivePresetsEl = document.getElementById('archive-presets');
const paginationEl = document.getElementById('pagination');

const gameSelect = document.getElementById('game-select');
const versionSelect = document.getElementById('version-select');
const searchInput = document.getElementById('search-input');

function filterPresets() {
  const selectedGame = gameSelect.value;
  const selectedVersion = versionSelect.value;
  const searchTerm = searchInput.value.toLowerCase();

  return presets.filter(preset => {
    const matchesGame = selectedGame === 'all' || preset.game === selectedGame;
    const matchesVersion = selectedVersion === 'all' || preset.version === selectedVersion;
    const matchesSearch = preset.title.toLowerCase().includes(searchTerm);
    return matchesGame && matchesVersion && matchesSearch;
  });
}

function renderPresets(page = 1) {
  currentPage = page;
  const filteredPresets = filterPresets();
  const startIndex = (page - 1) * presetsPerPage;
  const endIndex = startIndex + presetsPerPage;
  const presetsToShow = filteredPresets.slice(startIndex, endIndex);

  archivePresetsEl.innerHTML = '';

  if (presetsToShow.length === 0) {
    archivePresetsEl.innerHTML = '<p style="text-align:center; color:#ccc;">No presets found.</p>';
    paginationEl.innerHTML = '';
    return;
  }

  presetsToShow.forEach(preset => {
    const card = document.createElement('div');
    card.className = 'preset-card';
    card.innerHTML = `
      <img src="${preset.img}" alt="${preset.title}" />
      <h3>${preset.title}</h3>
      <a href="#" class="download-btn">Download</a>
    `;
    archivePresetsEl.appendChild(card);
  });

  renderPagination(filteredPresets.length);
}

function renderPagination(totalPresets) {
  const totalPages = Math.ceil(totalPresets / presetsPerPage);
  paginationEl.innerHTML = '';

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.addEventListener('click', () => renderPresets(i));
    paginationEl.appendChild(btn);
  }
}

// Event listeners for filters/search
gameSelect.addEventListener('change', () => renderPresets(1));
versionSelect.addEventListener('change', () => renderPresets(1));
searchInput.addEventListener('input', () => renderPresets(1));

// Initial render
renderPresets();

