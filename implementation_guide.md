# 貪食蛇遊戲增強 - 具體實現指南

## 文件：snake.html

### 1. HTML 結構修改

在現有 Canvas 元素後添加以下 HTML 結構：

```html
<!-- 開始畫面覆蓋層 -->
<div id="start-screen" class="overlay">
  <div class="overlay-content">
    <h1 class="game-title">貪食蛇</h1>
    <p class="game-subtitle">經典貪食蛇遊戲</p>
    
    <div class="game-instructions">
      <div class="instruction-item">
        <span class="instruction-icon">🎮</span>
        <span>使用方向鍵或 WASD 控制蛇的移動</span>
      </div>
      <div class="instruction-item">
        <span class="instruction-icon">🍎</span>
        <span>吃到紅色蘋果可以增加長度和分數</span>
      </div>
      <div class="instruction-item">
        <span class="instruction-icon">💀</span>
        <span>避免撞到牆壁或自己的身體</span>
      </div>
    </div>
    
    <p class="press-key-hint">按任意鍵開始遊戲</p>
    <div class="blink-arrow">▼</div>
  </div>
</div>

<!-- 遊戲結束畫面覆蓋層 -->
<div id="game-over-screen" class="overlay" style="display: none;">
  <div class="overlay-content">
    <h2 class="game-over-title">💀 Game Over</h2>
    
    <div class="score-summary">
      <div class="score-item">
        <span class="score-label">本次分數：</span>
        <span id="final-score" class="score-value">0</span>
      </div>
      <div class="score-item">
        <span class="score-label">最高分數：</span>
        <span id="final-high-score" class="score-value">0</span>
      </div>
      <div class="score-item">
        <span class="score-label">蛇的長度：</span>
        <span id="final-length" class="score-value">3</span>
      </div>
    </div>
    
    <div class="action-buttons">
      <button id="play-again-btn" class="action-btn primary-btn">
        <span class="btn-icon">🔄</span>
        <span>再玩一次</span>
      </button>
      <a href="index.html" class="action-btn secondary-btn">
        <span class="btn-icon">🏠</span>
        <span>返回主頁</span>
      </a>
    </div>
    
    <p class="keyboard-hint">提示：按空格鍵或 Enter 鍵也可以重新開始</p>
  </div>
</div>
```

### 2. CSS 樣式添加

在現有 `<style>` 標籤中添加以下樣式：

```css
/* 覆蓋層基礎樣式 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7, 17, 41, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 8px;
}

.overlay-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

/* 開始畫面樣式 */
.game-title {
  font-size: 3.5rem;
  margin: 0 0 10px;
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(76, 175, 80, 0.3);
}

.game-subtitle {
  color: #9ca3af;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.game-instructions {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin: 25px 0;
  text-align: left;
}

.instruction-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #e6eef8;
}

.instruction-item:last-child {
  margin-bottom: 0;
}

.instruction-icon {
  font-size: 1.5rem;
  margin-right: 15px;
  width: 40px;
  text-align: center;
}

.press-key-hint {
  color: #7c3aed;
  font-size: 1.3rem;
  margin: 25px 0 15px;
  font-weight: 600;
}

.blink-arrow {
  font-size: 2rem;
  color: #7c3aed;
  animation: blink 1.5s infinite;
  margin-top: 10px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* 遊戲結束畫面樣式 */
.game-over-title {
  font-size: 3rem;
  color: #f44336;
  margin: 0 0 30px;
  text-shadow: 0 0 20px rgba(244, 67, 54, 0.5);
}

.score-summary {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 25px;
  margin: 25px 0;
}

.score-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.score-item:last-child {
  margin-bottom: 0;
}

.score-label {
  color: #9ca3af;
}

.score-value {
  color: #4CAF50;
  font-weight: bold;
  font-size: 1.4rem;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  justify-content: center;
}

.action-btn {
  padding: 15px 25px;
  border-radius: 10px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 160px;
}

.primary-btn {
  background: linear-gradient(145deg, #4CAF50, #3d8b40);
  color: white;
}

.primary-btn:hover {
  background: linear-gradient(145deg, #45a049, #367c39);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.3);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #e6eef8;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-icon {
  font-size: 1.3rem;
}

.keyboard-hint {
  color: #9ca3af;
  font-size: 0.9rem;
  margin-top: 20px;
  font-style: italic;
}

/* 遊戲進行中的分數顯示增強 */
#score {
  font-size: 1.8rem;
  font-weight: bold;
  color: #4CAF50;
}

#high {
  font-size: 1.4rem;
  font-weight: bold;
  color: #FFD700;
}

/* 響應式設計 */
@media (max-width: 600px) {
  .overlay-content {
    padding: 25px;
    width: 95%;
  }
  
  .game-title {
    font-size: 2.5rem;
  }
  
  .game-over-title {
    font-size: 2.2rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
  
  .score-item {
    flex-direction: column;
    text-align: center;
    gap: 5px;
  }
}
```

### 3. JavaScript 邏輯修改

在現有 JavaScript 代碼中進行以下修改：

#### 3.1 添加遊戲狀態變量
```javascript
// 在現有變量後添加
let gameState = 'START_SCREEN'; // START_SCREEN, PLAYING, GAME_OVER
let gameLoop;
```

#### 3.2 修改遊戲初始化
```javascript
// 修改現有的 reset 函數
function reset(){
  snake = [];
  for(let i=0;i<3;i++) snake.push({x:5-i,y:5});
  dir = {x:1,y:0};
  placeApple(); 
  score=0; 
  grow=0; 
  updateUI();
  
  // 更新蛇長度顯示
  document.getElementById('final-length').textContent = snake.length;
}
```

#### 3.3 添加開始遊戲函數
```javascript
function startGame() {
  gameState = 'PLAYING';
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('game-over-screen').style.display = 'none';
  
  // 重置遊戲狀態
  reset();
  
  // 開始遊戲循環
  if (gameLoop) clearInterval(gameLoop);
  gameLoop = setInterval(loop, 120);
}
```

#### 3.4 修改遊戲結束邏輯
```javascript
// 修改現有的碰撞檢測邏輯
function update(){
  const head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
  
  // 如果遊戲不在進行中，直接返回
  if (gameState !== 'PLAYING') return;
  
  // wall collision
  if(head.x<0||head.x>=cols||head.y<0||head.y>=rows){ 
    endGame();
    return; 
  }
  
  // self collision
  if(snake.some(s=>s.x===head.x&&s.y===head.y)){ 
    endGame();
    return; 
  }
  
  snake.unshift(head);
  if(apple && head.x===apple.x && head.y===apple.y){ 
    score+=10; 
    grow+=2; 
    placeApple(); 
    updateHigh(); 
    
    // 更新蛇長度顯示
    document.getElementById('final-length').textContent = snake.length;
  }
  if(grow>0){ grow--; } else { snake.pop(); }
  updateUI();
}

// 添加遊戲結束函數
function endGame() {
  gameState = 'GAME_OVER';
  clearInterval(gameLoop);
  
  // 更新遊戲結束畫面信息
  document.getElementById('final-score').textContent = score;
  document.getElementById('final-high-score').textContent = localStorage.getItem('snakeHigh') || 0;
  document.getElementById('final-length').textContent = snake.length;
  
  // 顯示遊戲結束畫面
  document.getElementById('game-over-screen').style.display = 'flex';
}
```

#### 3.5 修改鍵盤事件處理
```javascript
// 修改現有的鍵盤事件監聽
window.addEventListener('keydown', function(e){
  const k = e.key;
  
  // 開始畫面：按任意鍵開始遊戲
  if (gameState === 'START_SCREEN') {
    startGame();
    return;
  }
  
  // 遊戲結束畫面：按空格鍵或Enter鍵重新開始
  if (gameState === 'GAME_OVER') {
    if (k === ' ' || k === 'Enter') {
      startGame();
      return;
    }
  }
  
  // 遊戲進行中：方向鍵控制
  if (gameState === 'PLAYING') {
    if((k==='ArrowUp'||k==='w'||k==='W') && dir.y!==1) dir={x:0,y:-1};
    if((k==='ArrowDown'||k==='s'||k==='S') && dir.y!==-1) dir={x:0,y:1};
    if((k==='ArrowLeft'||k==='a'||k==='A') && dir.x!==1) dir={x:-1,y:0};
    if((k==='ArrowRight'||k==='d'||k==='D') && dir.x!==-1) dir={x:1,y:0};
  }
});
```

#### 3.6 添加按鈕事件監聽
```javascript
// 在現有的事件監聽後添加
document.getElementById('play-again-btn').addEventListener('click', startGame);

// 修改現有的重新開始按鈕
document.getElementById('restart').addEventListener('click', function() {
  if (gameState === 'PLAYING' || gameState === 'GAME_OVER') {
    startGame();
  }
});
```

#### 3.7 修改初始化邏輯
```javascript
// 修改現有的初始化代碼
// 原來的：
// reset(); document.getElementById('high').textContent = localStorage.getItem('snakeHigh')||0;
// setInterval(loop, 120);

// 改為：
reset(); 
document.getElementById('high').textContent = localStorage.getItem('snakeHigh')||0;
// 不自動開始遊戲循環，等待用戶按鍵
// 開始畫面會自動顯示
```

### 4. 最終整合步驟

1. **備份原始文件**：複製 `snake.html` 為 `snake_backup.html`
2. **逐步修改**：按照上述指南逐步修改文件
3. **測試每個功能**：
   - 開始畫面顯示
   - 按任意鍵開始遊戲
   - 遊戲進行中控制
   - 計分系統工作
   - 遊戲結束畫面顯示
   - 「再玩一次」按鈕功能
   - 鍵盤快捷鍵功能
4. **跨瀏覽器測試**：在 Chrome、Firefox、Safari 中測試
5. **移動端測試**：在手機瀏覽器中測試響應式設計

### 5. 預期問題和解決方案

1. **問題**：開始畫面可能遮擋遊戲控制
   - **解決**：確保開始畫面有足夠的 z-index，並且在遊戲開始後正確隱藏

2. **問題**：鍵盤事件衝突
   - **解決**：使用遊戲狀態變量來區分不同狀態下的鍵盤處理

3. **問題**：移動端觸控支持
   - **解決**：確保按鈕足夠大，易於觸控

4. **問題**：性能問題
   - **解決**：使用 CSS 動畫而非 JavaScript 動畫，優化渲染

### 6. 驗收標準

- [ ] 打開遊戲顯示開始畫面
- [ ] 按任意鍵可以開始遊戲
- [ ] 遊戲進行中分數正確顯示和更新
- [ ] 遊戲結束時顯示 Game Over 畫面
- [ ] 「再玩一次」按鈕功能正常
- [ ] 鍵盤控制在不同狀態下工作正常
- [ ] 移動端體驗良好
- [ ] 與現有功能完全兼容