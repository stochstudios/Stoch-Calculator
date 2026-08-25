let currentExpression = '';
const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const historyEl = document.getElementById('history');
const sciPanel = document.getElementById('sci-panel');

window.toggleSciPanel = function() {
  if (sciPanel) sciPanel.classList.toggle('hidden');
};

function updateDisplay() {
  let formatted = currentExpression
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/pi/g, 'π')
    .replace(/sqrt\(/g, '√(');
  
  if (expressionEl) expressionEl.textContent = formatted || '0';
}

function tryEvaluateLive() {
  if (!currentExpression) return;
  try {
    // @ts-ignore
    let res = math.evaluate(currentExpression);
    if (typeof res === 'number' && !isNaN(res)) {
      if (resultEl) resultEl.textContent = Number(res.toFixed(8)).toString();
    }
  } catch (e) {
    if (resultEl) resultEl.textContent = '';
  }
}

window.addInput = function(value) {
  if (currentExpression === '0' && value !== '.') {
    currentExpression = '';
  }
  currentExpression += value;
  updateDisplay();
  tryEvaluateLive();
};

window.clearAll = function() {
  currentExpression = '';
  if (expressionEl) expressionEl.textContent = '0';
  if (resultEl) resultEl.textContent = '';
  if (historyEl) historyEl.textContent = '';
};

window.deleteLast = function() {
  currentExpression = currentExpression.slice(0, -1);
  if (currentExpression === '') {
    if (expressionEl) expressionEl.textContent = '0';
    if (resultEl) resultEl.textContent = '';
  } else {
    updateDisplay();
    tryEvaluateLive();
  }
};

window.calculate = function() {
  if (!currentExpression) return;
  try {
    // @ts-ignore
    let res = math.evaluate(currentExpression);
    if (typeof res === 'number') {
      let finalRes = Number(res.toFixed(8)).toString();
      if (historyEl && expressionEl) historyEl.textContent = expressionEl.textContent;
      if (expressionEl) expressionEl.textContent = finalRes;
      if (resultEl) resultEl.textContent = '';
      currentExpression = finalRes;
    }
  } catch (e) {
    if (resultEl) resultEl.textContent = 'Error';
  }
};
