# Scientific Calculator

A fully-featured web-based scientific calculator with multiple calculation modes and responsive design. Works great on desktop, tablet, and mobile.

## Features

### Calculation Modes

**Simple Mode** - Basic arithmetic for everyday calculations. Just the essentials: addition, subtraction, multiplication, and division.

**Scientific Mode** - Most of the functions you'd need for scientific and engineering work. Includes trigonometric functions (sin, cos, tan), logarithms (log, ln), powers, roots, factorial, and constants like pi and e.

**Advanced Mode** - The full suite. Everything from Scientific mode plus reciprocal, absolute value, power operations, parentheses, modulo, degree/radian toggle, and extra trigonometric functions.

**Programmer Mode** - Convert between number systems (decimal, hex, binary, octal) and perform bitwise operations (AND, OR, XOR, NOT).

### General Features

- Full keyboard support - use your keyboard for numbers and operations
- Expression history display - see what you've entered
- Angle mode toggle - switch between degrees and radians for trig functions
- Glow effect animations - buttons light up when you click them
- Dark theme - easy on the eyes
- Responsive layout - automatically adapts to your screen size

## How to Use

Open `index.html` in your browser. That's it. No installation needed.

Use the mode buttons at the top to switch between Simple, Scientific, Advanced, and Programmer modes.

### Keyboard Shortcuts

- Numbers: `0-9`
- Basic operations: `+`, `-`, `*`, `/`
- Decimal: `.`
- Calculate: `Enter` or `=`
- Delete last digit: `Backspace`
- Clear all: `Escape`

## Technical Details

Built with vanilla HTML, CSS, and JavaScript. No dependencies, no frameworks.

### File Structure

- `index.html` - Calculator layout and HTML structure
- `styles.css` - Responsive styling and animations
- `script.js` - Calculator logic and event handling

### Browser Support

Works on all modern browsers. Tested on Chrome, Firefox, Safari, and Edge.

## Mobile Experience

The calculator is optimized for touch on phones and tablets. Buttons are sized appropriately for each screen size, and the layout reorganizes automatically when you rotate your device.

## Notes

- Large calculations are shown in exponential notation
- Results are rounded to 10 decimal places to avoid floating-point errors
- Factorial only works with positive integers
- Some operations (like very large powers) might return infinity
