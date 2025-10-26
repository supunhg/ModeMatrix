# ModeMatrix

A modern web-based statistical calculator for finding the mode (most frequent value) in datasets. Built with vanilla HTML, CSS, and JavaScript for simplicity and performance.

🚀 **[Live Demo](https://supunhg.github.io/ModeMatrix)**

## What is ModeMatrix?

ModeMatrix is a simple yet powerful tool that helps you calculate the mode of numerical datasets. The **mode** is the value that appears most frequently in a set of numbers. This tool provides an intuitive spreadsheet-like interface for data entry and instant mode calculation.

## Features

- ✅ **Interactive Data Grid** - Spreadsheet-style interface with dynamic rows and columns
- ✅ **Mode Calculation** - Calculate the mode for each row of data instantly
- ✅ **CSV Export** - Export your data and results with timestamped filenames
- ✅ **Calculation History** - Automatically saves up to 50 calculations in browser storage
- ✅ **Theme Support** - Toggle between light and dark themes with persistent preference
- ✅ **Keyboard Shortcuts** - Navigate efficiently with Enter, Shift+Enter, and more
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- ✅ **No Backend Required** - Runs entirely in the browser, no server needed
- ✅ **Privacy First** - All data stays local in your browser

## How to Use

### Data Entry
1. Click any cell in the grid and enter a number
2. Use keyboard shortcuts to navigate:
   - **Tab** - Move to next cell (right)
   - **Enter** - Move to next row (same column)
   - **Shift + Enter** - Move to top of next column
   - **Ctrl + Shift + Enter** - Calculate mode instantly
3. Use **Add Row** / **Remove Row** buttons to manage rows
4. Use **Add Column** / **Remove Column** buttons to manage columns

### Calculating Mode
1. Enter your data in the grid
2. Click **Calculate Mode** button (or press Ctrl+Shift+Enter)
3. Results appear showing the mode for each row
4. Click **Export to CSV** to download your data

### History Management
- All calculations are automatically saved to browser storage
- View past calculations in the **History** tab
- Export any previous calculation to CSV
- Clear history with **Clear History** button

### Theme Toggle
- Click the 🌙/☀️ button to switch between light and dark themes
- Your preference is saved automatically

## Tech Stack

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)** - Pure vanilla JavaScript, no frameworks or dependencies
- **LocalStorage API** - For persistent history and theme preferences
- **Google Fonts** - Inter font family

## Project Structure

```
ModeMatrix/
├── index.html      # Main HTML structure and layout
├── styles.css      # All styling, themes, and responsive design
├── script.js       # Application logic and functionality
├── README.md       # Project documentation
└── LICENSE         # MIT License
```

## Screenshots

<img width="1409" height="597" alt="image" src="https://github.com/user-attachments/assets/0a016377-7778-45f9-a5a6-1cc6ca899fc5" />
<img width="1396" height="709" alt="image" src="https://github.com/user-attachments/assets/65f28bfc-ed3c-43b2-b9de-42da844d644d" />
<img width="1356" height="487" alt="image" src="https://github.com/user-attachments/assets/06541fa1-3ee8-4c0e-a35c-38ba54358bdf" />

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/supunhg/ModeMatrix.git
cd ModeMatrix
```

### Run Locally

**Option 1:** Simply open `index.html` in your web browser

**Option 2:** Use a local development server (recommended):

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "main" branch as source
4. Your site will be live at `https://yourusername.github.io/ModeMatrix`

## Future Enhancements

- [ ] Import CSV files for analysis
- [ ] Additional statistical measures (mean, median, range, standard deviation)
- [ ] Data visualization with charts and graphs
- [ ] Multiple dataset management with tabs
- [ ] Undo/Redo functionality
- [ ] Print and PDF export options
- [ ] Keyboard shortcuts reference overlay
- [ ] Support for text/categorical data mode calculation

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Opera (latest)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Supun Hewagamage**

---

⭐ Star this repository if you find it useful!
