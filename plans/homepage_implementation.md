# Homepage Implementation Plan

## Overview
Create a complete homepage (index.html) for the Mini Arcade game center with links to four game files:
1. `game1.html` - 體感粒子互動 (Gesture Particle Interaction)
2. `game2.html` - 猜數字遊戲 (Number Guessing Game)
3. `game3.html` - 經典包剪揼 (Rock Paper Scissors)
4. `snake.html` - 經典貪食蛇 (Classic Snake Game)

## Design Decision
Use Design 1 from `_1/code.html` as the base because:
- It has a more polished, modern design with glowing borders
- Includes dark/light mode toggle functionality
- Has better responsive design
- Already structured for 4 game cards matching our games

## Implementation Tasks

### 1. Create index.html
- Copy the structure from `_1/code.html`
- Modify game cards to be clickable links (`<a href="game1.html">`)
- Update button text to "立即開始" (Start Now)
- Ensure dark/light mode toggle works with localStorage
- Add smooth hover animations
- Include proper meta tags and title

### 2. Verify Game Page Links
All game pages already have "返回主頁" links pointing to `index.html`:
- `game1.html`: Line 22 - `<a id="back" href="index.html">← 返回主頁</a>`
- `game2.html`: Line 22 - `<a href="index.html">← 返回主頁</a>`
- `game3.html`: Line 27 - `<a href="index.html">← 返回主頁</a>`
- `snake.html`: Line 25 - `<a href="index.html">← 返回主頁</a>`

No changes needed to game pages.

### 3. Additional Features
- Add click feedback animation on game cards
- Save theme preference in localStorage
- Responsive design for mobile devices
- Accessibility improvements (proper contrast, aria labels)

## File Structure
```
c:/Users/MIRKO/OneDrive/桌面/S4 Art+CS/New folder/idk/
├── index.html (NEW - homepage)
├── game1.html (體感粒子互動)
├── game2.html (猜數字遊戲)
├── game3.html (經典包剪揼)
├── snake.html (經典貪食蛇)
├── style.css
├── script.js
├── _1/ (design 1 - dark version)
├── _2/ (design 2 - light version)
└── plans/ (this document)
```

## Technical Details
- Uses Tailwind CSS via CDN
- Google Fonts: Space Grotesk
- Material Symbols Icons
- Dark mode uses `class="dark"` on html element
- JavaScript for theme toggle and interactions

## Testing Checklist
- [ ] index.html loads correctly
- [ ] All 4 game cards link to correct game pages
- [ ] Dark/light mode toggle works
- [ ] Game pages link back to index.html
- [ ] Responsive design works on mobile
- [ ] No broken links or 404 errors