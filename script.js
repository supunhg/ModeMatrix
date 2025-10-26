// ===== State Management =====
let currentTheme = localStorage.getItem('theme') || 'light';
let calculationHistory = JSON.parse(localStorage.getItem('history')) || [];

// ===== Theme Management =====
function initTheme() {
    document.body.className = `${currentTheme}-theme`;
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = `${currentTheme}-theme`;
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// ===== Tab Management =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');

            // Load history if history tab is clicked
            if (tabName === 'history') {
                renderHistory();
            }
        });
    });
}

// ===== Table Management =====
function addRow() {
    const tableBody = document.getElementById('tableBody');
    const columnCount = document.querySelectorAll('#tableHeader th').length;
    const newRow = document.createElement('tr');
    
    for (let i = 0; i < columnCount; i++) {
        const cell = document.createElement('td');
        cell.innerHTML = '<input type="number" step="any" placeholder="Enter number">';
        newRow.appendChild(cell);
    }
    
    tableBody.appendChild(newRow);
    addInputListeners();
}

function addColumn() {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');
    const columnCount = tableHeader.children.length + 1;
    
    // Add header
    const th = document.createElement('th');
    th.textContent = `Column ${columnCount}`;
    tableHeader.appendChild(th);
    
    // Add cells to all rows
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const cell = document.createElement('td');
        cell.innerHTML = '<input type="number" step="any" placeholder="Enter number">';
        row.appendChild(cell);
    });
    
    addInputListeners();
}

function removeRow() {
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.querySelectorAll('tr');
    
    // Keep at least 1 row
    if (rows.length <= 1) {
        alert('Cannot remove the last row!');
        return;
    }
    
    // Remove last row
    rows[rows.length - 1].remove();
    hideResults();
}

function removeColumn() {
    const tableHeader = document.getElementById('tableHeader');
    const tableBody = document.getElementById('tableBody');
    const headers = tableHeader.querySelectorAll('th');
    
    // Keep at least 1 column
    if (headers.length <= 1) {
        alert('Cannot remove the last column!');
        return;
    }
    
    // Remove last header
    headers[headers.length - 1].remove();
    
    // Remove last cell from all rows
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            cells[cells.length - 1].remove();
        }
    });
    
    hideResults();
}

function clearAll() {
    if (confirm('Are you sure you want to clear all data?')) {
        const inputs = document.querySelectorAll('#tableBody input');
        inputs.forEach(input => input.value = '');
        hideResults();
    }
}

function addInputListeners() {
    const inputs = document.querySelectorAll('#tableBody input');
    inputs.forEach((input, index) => {
        // Remove existing listeners
        input.replaceWith(input.cloneNode(true));
    });
    
    // Re-add listeners
    const newInputs = document.querySelectorAll('#tableBody input');
    const rows = document.querySelectorAll('#tableBody tr');
    const cols = rows.length > 0 ? rows[0].querySelectorAll('input').length : 0;
    
    newInputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                
                // Ctrl+Shift+Enter → Calculate and save
                if (e.ctrlKey && e.shiftKey) {
                    calculateMode();
                }
                // Shift+Enter → Move to top cell of next column (add column if needed)
                else if (e.shiftKey) {
                    const currentCol = index % cols;
                    
                    // If last column, add a new column
                    if (currentCol === cols - 1) {
                        addColumn();
                        // Focus on the top cell of the new column
                        setTimeout(() => {
                            const updatedInputs = document.querySelectorAll('#tableBody input');
                            const updatedCols = document.querySelectorAll('#tableBody tr')[0].querySelectorAll('input').length;
                            const nextIndex = currentCol + 1; // First row, next column
                            if (updatedInputs[nextIndex]) {
                                updatedInputs[nextIndex].focus();
                            }
                        }, 10);
                    } else {
                        // Move to top cell of next column (row 0, next column)
                        const nextColIndex = currentCol + 1;
                        const nextInput = newInputs[nextColIndex];
                        if (nextInput) {
                            nextInput.focus();
                        }
                    }
                }
                // Enter → Move to next row (add row if needed)
                else {
                    const nextRowIndex = index + cols;
                    
                    // If last row, add a new row
                    if (nextRowIndex >= newInputs.length) {
                        addRow();
                        // Focus will be set after row is added
                        setTimeout(() => {
                            const updatedInputs = document.querySelectorAll('#tableBody input');
                            if (updatedInputs[nextRowIndex]) {
                                updatedInputs[nextRowIndex].focus();
                            }
                        }, 10);
                    } else {
                        // Move to same column, next row
                        const nextInput = newInputs[nextRowIndex];
                        if (nextInput) {
                            nextInput.focus();
                        }
                    }
                }
            }
        });
    });
}

// ===== Mode Calculation =====
function calculateMode() {
    const tableBody = document.getElementById('tableBody');
    const rows = tableBody.querySelectorAll('tr');
    const results = [];
    
    rows.forEach((row, rowIndex) => {
        const inputs = row.querySelectorAll('input');
        const values = [];
        
        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value)) {
                values.push(value);
            }
        });
        
        if (values.length > 0) {
            const mode = findMode(values);
            results.push({
                row: rowIndex + 1,
                values: values,
                mode: mode
            });
        }
    });
    
    if (results.length === 0) {
        alert('Please enter some numbers first!');
        return;
    }
    
    displayResults(results);
    saveToHistory(results);
}

function findMode(numbers) {
    const frequency = {};
    let maxFreq = 0;
    
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        maxFreq = Math.max(maxFreq, frequency[num]);
    });
    
    const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq);
    return parseFloat(modes[0]);
}

function displayResults(results) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContent = document.getElementById('resultsContent');
    
    resultsContent.innerHTML = '';
    
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div>
                <span class="result-label">Row ${result.row}:</span>
                <span style="color: var(--text-secondary); margin-left: 0.5rem;">[${result.values.join(', ')}]</span>
            </div>
            <div class="result-value">Mode: ${result.mode}</div>
        `;
        resultsContent.appendChild(resultItem);
    });
    
    resultsSection.style.display = 'block';
    
    // Store current results for CSV export
    window.currentResults = results;
}

function hideResults() {
    document.getElementById('resultsSection').style.display = 'none';
    window.currentResults = null;
}

// ===== CSV Export =====
function exportToCSV() {
    if (!window.currentResults) {
        alert('No results to export!');
        return;
    }
    
    const headers = Array.from(document.querySelectorAll('#tableHeader th'))
        .map(th => th.textContent);
    headers.push('Mode');
    
    let csvContent = headers.join(',') + '\n';
    
    window.currentResults.forEach(result => {
        const row = [...result.values, result.mode];
        csvContent += row.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    a.href = url;
    a.download = `modematrix_${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// ===== History Management =====
function saveToHistory(results) {
    const entry = {
        timestamp: new Date().toISOString(),
        results: results
    };
    
    calculationHistory.unshift(entry);
    
    // Keep only last 50 entries
    if (calculationHistory.length > 50) {
        calculationHistory = calculationHistory.slice(0, 50);
    }
    
    localStorage.setItem('history', JSON.stringify(calculationHistory));
}

function renderHistory() {
    const historyContent = document.getElementById('historyContent');
    
    if (calculationHistory.length === 0) {
        historyContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No calculations yet. Start by entering data in the Data Entry tab!</p>
            </div>
        `;
        return;
    }
    
    historyContent.innerHTML = '';
    
    calculationHistory.forEach((entry, index) => {
        const date = new Date(entry.timestamp);
        const dateStr = date.toLocaleString();
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        let resultsHTML = '<div class="history-data">';
        entry.results.forEach(result => {
            resultsHTML += `
                <div class="history-row">
                    <span style="font-weight: 600;">Row ${result.row}:</span>
                    <span style="color: var(--text-secondary);">[${result.values.join(', ')}]</span>
                    <span style="color: var(--primary); font-weight: 600;">→ Mode: ${result.mode}</span>
                </div>
            `;
        });
        resultsHTML += '</div>';
        
        historyItem.innerHTML = `
            <div class="history-header">
                <strong style="color: var(--primary);">Calculation ${calculationHistory.length - index}</strong>
                <span class="history-date">📅 ${dateStr}</span>
            </div>
            ${resultsHTML}
            <button onclick="exportHistoryItem(${index})" class="btn btn-success" style="margin-top: 1rem;">
                <span>📥</span> Export this calculation
            </button>
        `;
        
        historyContent.appendChild(historyItem);
    });
}

function exportHistoryItem(index) {
    const entry = calculationHistory[index];
    
    let csvContent = 'Values,Mode\n';
    
    entry.results.forEach(result => {
        csvContent += `"[${result.values.join(', ')}]",${result.mode}\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date(entry.timestamp).toISOString().slice(0, 19).replace(/:/g, '-');
    a.href = url;
    a.download = `modematrix_history_${timestamp}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
        calculationHistory = [];
        localStorage.setItem('history', JSON.stringify(calculationHistory));
        renderHistory();
    }
}

// ===== Event Listeners =====
function initEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('addRow').addEventListener('click', addRow);
    document.getElementById('addColumn').addEventListener('click', addColumn);
    document.getElementById('removeRow').addEventListener('click', removeRow);
    document.getElementById('removeColumn').addEventListener('click', removeColumn);
    document.getElementById('clearAll').addEventListener('click', clearAll);
    document.getElementById('calculate').addEventListener('click', calculateMode);
    document.getElementById('exportCSV').addEventListener('click', exportToCSV);
    document.getElementById('clearHistory').addEventListener('click', clearHistory);
    
    addInputListeners();
}

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTabs();
    initEventListeners();
});
