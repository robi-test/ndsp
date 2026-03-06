document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('ig-search-form');
  const input = document.getElementById('hospital-query');
  const results = document.getElementById('ig-results');
  const status = document.getElementById('ig-status');

  if (!form || !input || !results || !status || !window.OdsHospitalSearchService) {
    return;
  }

  const service = new window.OdsHospitalSearchService();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = input.value.trim();
    if (!query) {
      return;
    }

    status.textContent = '';
    results.innerHTML = '';

    try {
      const hospitals = await service.searchHospitals(query);
      status.textContent = `Found ${hospitals.length} result(s).`;

      if (!hospitals.length) {
        results.innerHTML = '<p class="nhsuk-body">No active NHS foundation trust hospitals found.</p>';
        return;
      }

      results.innerHTML = hospitals
        .map((hospital) => {
          const contactsHtml = hospital.igContacts.length
            ? `<ul class="nhsuk-list nhsuk-list--bullet">${hospital.igContacts
                .map(
                  (contact) => `<li><strong>${escapeHtml(contact.igManagementRole || 'IG Contact')}</strong>: ${escapeHtml(
                    contact.name || 'Unknown'
                  )}${
                    contact.email
                      ? ` (<a href="mailto:${escapeHtml(contact.email)}">${escapeHtml(contact.email)}</a>)`
                      : ''
                  }</li>`
                )
                .join('')}</ul>`
            : '<p class="nhsuk-body-s">No IG contacts were returned for this organisation.</p>';

          return `
            <article class="nhsuk-card nhsuk-u-margin-bottom-4">
              <div class="nhsuk-card__content">
                <h2 class="nhsuk-card__heading nhsuk-heading-m">${escapeHtml(hospital.name)} (${escapeHtml(
            hospital.code
          )})</h2>
                <p class="nhsuk-body-s">Status: ${escapeHtml(hospital.status)} | Roles: ${escapeHtml(
            (hospital.roleNames || []).join(', ')
          )}</p>
                ${contactsHtml}
              </div>
            </article>
          `;
        })
        .join('');
    } catch (error) {
      status.textContent = `Search failed: ${error.message || error}`;
    }
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
});
