# 貪食蛇遊戲增強計劃

## 目標
為現有的貪食蛇遊戲（snake.html）添加：
1. 開始畫面 - 顯示遊戲名稱「貪食蛇」，按任意鍵開始遊戲
2. 遊戲結束畫面 - 顯示 Game Over，顯示分數，有「再玩一次」按鈕
3. 計分系統 - 左上角顯示分數，每次食到嘢加 10 分

## 現有狀態分析
- 文件：`snake.html`
- 已有功能：基本貪食蛇遊戲、計分系統（每次加10分）、最高分記錄、重新開始按鈕
- 缺少功能：開始畫面、遊戲結束畫面

## 技術實現方案

### 1. 畫面狀態管理
將遊戲分為三個狀態：
- `START_SCREEN` - 開始畫面
- `PLAYING` - 遊戲進行中
- `GAME_OVER` - 遊戲結束畫面

### 2. 開始畫面設計
```html
<div id="start-screen" class="overlay">
  <div class="overlay-content">
    <h1>貪食蛇</h1>
    <p class="subtitle">經典貪食蛇遊戲</p>
    <div class="instructions">
      <p>使用方向鍵或 WASD 控制蛇的移動</p>
      <p>吃到紅色蘋果可以增加長度和分數</p>
    </div>
    <p class="press-key">按任意鍵開始遊戲</p>
    <div class="blink-animation">▼</div>
  </div>
</div>
```

**樣式特點：**
- 半透明黑色背景覆蓋整個遊戲區域
- 居中顯示遊戲名稱和說明
- 「按任意鍵開始」文字有閃爍動畫效果
- 響應任意按鍵開始遊戲

### 3. 遊戲結束畫面設計
```html
<div id="game-over-screen" class="overlay" style="display: none;">
  <div class="overlay-content">
    <h2>💀 Game Over</h2>
    <div class="score-display">
      <div class="score-item">
        <span>本次分數：</span>
        <span id="final-score">0</span>
      </div>
      <div class="score-item">
        <span>最高分數：</span>
        <span id="final-high-score">0</span>
      </div>
    </div>
    <div class="buttons">
      <button id="play-again-btn">再玩一次</button>
      <a href="index.html" class="home-btn">返回主頁</a>
    </div>
  </div>
</div>
```

**樣式特點：**
- 深色半透明背景
- 顯示 Game Over 標題
- 清晰顯示本次分數和最高分數
- 「再玩一次」按鈕和「返回主頁」連結

### 4. 計分系統增強
現有計分系統已實現：
- 左上角顯示當前分數（需調整位置更明顯）
- 每次吃到食物加10分
- 最高分記錄在 localStorage 中

**改進：**
- 將分數顯示移到 Canvas 左上角內部
- 添加分數增加時的動畫效果
- 改進分數顯示樣式

### 5. 畫面切換邏輯
```javascript
// 遊戲狀態
let gameState = 'START_SCREEN'; // START_SCREEN, PLAYING, GAME_OVER

// 開始遊戲函數
function startGame() {
  gameState = 'PLAYING';
  document.getElementById('start-screen').style.display = 'none';
  // 重置遊戲狀態
  reset();
  // 開始遊戲循環
  gameLoop = setInterval(update, 120);
}

// 遊戲結束函數
function gameOver() {
  gameState = 'GAME_OVER';
  clearInterval(gameLoop);
  // 更新遊戲結束畫面分數
  document.getElementById('final-score').textContent = score;
  document.getElementById('final-high-score').textContent = highScore;
  // 顯示遊戲結束畫面
  document.getElementById('game-over-screen').style.display = 'flex';
}

// 重新開始遊戲
function restartGame() {
  gameState = 'PLAYING';
  document.getElementById('game-over-screen').style.display = 'none';
  startGame();
}
```

### 6. 鍵盤事件處理
```javascript
// 全局鍵盤事件監聽
window.addEventListener('keydown', function(e) {
  if (gameState === 'START_SCREEN') {
    // 在開始畫面按任意鍵開始遊戲
    startGame();
    return;
  }
  
  if (gameState === 'GAME_OVER') {
    // 在遊戲結束畫面按空格鍵或Enter鍵重新開始
    if (e.key === ' ' || e.key === 'Enter') {
      restartGame();
      return;
    }
  }
  
  // 原有的方向鍵控制邏輯
  // ...
});
```

## 文件修改計劃

### 修改 `snake.html`：
1. 在 Canvas 後添加開始畫面 HTML 結構
2. 在 Canvas 後添加遊戲結束畫面 HTML 結構
3. 在現有樣式中添加覆蓋層樣式
4. 修改 JavaScript 邏輯：
   - 添加遊戲狀態變量
   - 修改遊戲初始化邏輯
   - 添加開始畫面顯示邏輯
   - 修改遊戲結束邏輯
   - 添加鍵盤事件處理

### 新增 CSS 樣式：
- 覆蓋層樣式（.overlay）
- 開始畫面樣式
- 遊戲結束畫面樣式
- 動畫效果（閃爍、淡入淡出）

## 測試計劃
1. 開始畫面顯示正確
2. 按任意鍵可以開始遊戲
3. 遊戲進行中計分系統正常工作
4. 遊戲結束時顯示 Game Over 畫面
5. 「再玩一次」按鈕功能正常
6. 鍵盤控制在不同狀態下工作正常
7. 移動端兼容性測試

## 時間安排
1. 實現開始畫面（1小時）
2. 實現遊戲結束畫面（1小時）
3. 整合畫面狀態管理（1小時）
4. 測試和調試（1小時）

## 預期效果
用戶體驗流程：
1. 打開遊戲 → 看到開始畫面（遊戲名稱、按任意鍵提示）
2. 按任意鍵 → 遊戲開始，開始畫面消失
3. 遊戲進行 → 左上角顯示實時分數
4. 遊戲結束 → 顯示 Game Over 畫面（分數統計、再玩一次按鈕）
5. 點擊「再玩一次」 → 重新開始遊戲

## 備註
- 保持與現有代碼的兼容性
- 確保移動端體驗良好
- 保持代碼簡潔易讀
- 添加適當的註釋說明