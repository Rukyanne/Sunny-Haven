document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('[data-search-input]');
  const searchResults = document.querySelector('[data-search-results]');
  const properties = Array.from(document.querySelectorAll('.property-card'));

  if (!searchInput || !searchResults) return;

  const allItems = properties.map((card) => ({
    element: card,
    text: card.dataset.searchText || card.querySelector('h3')?.textContent?.toLowerCase() || ''
  }));

  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    if (!query) {
      searchResults.innerHTML = '';
      properties.forEach((card) => card.style.display = '');
      return;
    }

    const matches = allItems.filter((item) => item.text.includes(query));
    properties.forEach((card) => (card.style.display = 'none'));
    matches.forEach((item) => (item.element.style.display = ''));

    searchResults.innerHTML = matches.length
      ? `<p class="notice">Showing ${matches.length} matching properties.</p>`
      : '<div class="empty-state">No properties match your search yet.</div>';
  });
});
