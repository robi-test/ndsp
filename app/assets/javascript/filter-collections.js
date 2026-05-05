// This script filters table rows based on the selected collection

document.addEventListener('DOMContentLoaded', function () {
  const collectionSelect = document.getElementById('collection-select');
  const table = document.getElementById('submissions-table');

  function filterRows() {
    const selected = collectionSelect.value;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      // Get file name cell text
      const fileNameCell = row.querySelector('.file-name-cell__text');
      if (!fileNameCell) {
        row.style.display = '';
        return;
      }
      const fileName = fileNameCell.textContent || '';
      // Show/hide based on collection
      if (selected.includes('Lung Cancer Screening')) {
        row.style.display = fileName.startsWith('LCS_') ? '' : 'none';
      } else if (selected.includes('Diagnostic Imaging Data Set')) {
        row.style.display = fileName.startsWith('DID') || fileName.startsWith('DIDS_') ? '' : 'none';
      } else {
        row.style.display = '';
      }
    });
  }

  if (collectionSelect && table) {
    collectionSelect.addEventListener('change', filterRows);
    filterRows(); // Initial filter
  }
});
