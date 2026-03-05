(function (global) {
  class OdsHospitalSearchService {
    constructor() {
      this.apiBasePath = '/api';
    }

    async searchHospitals(query, maxCandidates = 30) {
      const trimmed = (query || '').trim();
      if (!trimmed) {
        return [];
      }

      const normalizedQuery = trimmed.toLowerCase();
      const isThreeCharacterCodeQuery = /^[a-zA-Z0-9]{3}$/.test(trimmed);

      const reportRows = await this.fetchTrustReport();
      const candidates = reportRows
        .filter(
          (row) =>
            isThreeCharacterCodeQuery
              ? row.code.toLowerCase() === normalizedQuery
              : row.name.toLowerCase().includes(normalizedQuery) ||
                row.code.toLowerCase().includes(normalizedQuery)
        )
        .slice(0, maxCandidates);

      const details = await Promise.all(
        candidates.map((candidate) => this.fetchOrganisationDetail(candidate.code))
      );

      return details
        .filter(Boolean)
        .filter((detail) => this.isActiveNhsFoundationTrust(detail.main))
        .map((detail) => ({
          code: detail.main.id,
          name: detail.main.name,
          status: detail.main.status,
          primaryRoleName: detail.main.primaryRoleName,
          roleNames: detail.main.roleName || [],
          igContacts: (detail.igManagement || [])
            .filter((item) => item.name || item.email || item.igManagementRole)
            .map((item) => ({
              igManagementRole: item.igManagementRole || '',
              name: item.name || '',
              email: item.email || ''
            }))
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    }

    async fetchTrustReport() {
      const response = await fetch(`${this.apiBasePath}/getReport?report=etr`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trust report: ${response.status}`);
      }

      const csv = await response.text();
      const rows = parseCsv(csv);

      return rows
        .filter((row) => row.length > 1)
        .map((row) => ({
          code: (row[0] || '').trim(),
          name: (row[1] || '').trim()
        }))
        .filter((row) => row.code && row.name);
    }

    async fetchOrganisationDetail(code) {
      const response = await fetch(
        `${this.apiBasePath}/search/singleOrganisationSearchByCode?code=${encodeURIComponent(code)}`
      );

      if (!response.ok) {
        return null;
      }

      return response.json();
    }

    isActiveNhsFoundationTrust(main) {
      const isActive = (main.status || '').toLowerCase() === 'active';
      const isNhsTrust = (main.primaryRoleName || '').toUpperCase() === 'NHS TRUST';
      const roleNames = main.roleName || [];
      const isFoundationTrust = roleNames.some((role) => (role || '').toUpperCase().includes('FOUNDATION TRUST'));

      return isActive && isNhsTrust && isFoundationTrust;
    }
  }

  function parseCsv(text) {
    const rows = [];
    let currentRow = [];
    let currentValue = '';
    let inQuotes = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const nextChar = text[index + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentValue += '"';
          index += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === ',' && !inQuotes) {
        currentRow.push(currentValue);
        currentValue = '';
        continue;
      }

      if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          index += 1;
        }
        currentRow.push(currentValue);
        if (currentRow.some((value) => value.trim().length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentValue = '';
        continue;
      }

      currentValue += char;
    }

    if (currentValue.length > 0 || currentRow.length > 0) {
      currentRow.push(currentValue);
      if (currentRow.some((value) => value.trim().length > 0)) {
        rows.push(currentRow);
      }
    }

    return rows;
  }

  global.OdsHospitalSearchService = OdsHospitalSearchService;
})(typeof window !== 'undefined' ? window : this);
