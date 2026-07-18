import './style.css';

const tabs = [...document.querySelectorAll('.tab')];
const pages = [...document.querySelectorAll('.lesson-page')];
const progressLabel = document.querySelector('#progress-label');
const progressFill = document.querySelector('#progress-fill');

function showPage(pageNumber, focusTab = false) {
  tabs.forEach((tab) => {
    const active = Number(tab.dataset.page) === pageNumber;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    if (active && focusTab) tab.focus();
  });
  pages.forEach((page) => {
    const active = Number(page.dataset.page) === pageNumber;
    page.classList.toggle('is-active', active);
    page.hidden = !active;
  });
  progressLabel.textContent = `第 ${pageNumber} 站，共 7 站`;
  progressFill.style.width = `${(pageNumber / 7) * 100}%`;
  document.querySelector('.lesson-nav').scrollIntoView({ block: 'start', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showPage(Number(tab.dataset.page)));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    showPage(Number(tabs[next].dataset.page), true);
  });
});

document.querySelector('[data-jump="observation"]').addEventListener('click', () => {
  document.querySelector('#observation').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
});

const observationFeedback = document.querySelector('#observation-feedback');
document.querySelectorAll('[data-observation]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-observation]').forEach((item) => item.classList.remove('is-selected'));
  button.classList.add('is-selected');
  const answer = button.dataset.observation;
  observationFeedback.className = `feedback ${answer === 'light' ? 'is-correct' : 'is-hint'}`;
  observationFeedback.textContent = answer === 'light'
    ? '好推論！它能同時解釋：不透光處較白、半透明處較淺、照光處較藍。下一站要用流程模型檢查原因。'
    : '這個想法可以再測試，但目前不能解釋全部深淺層次。找找看：幾何遮罩和半透明素材提供了什麼共同線索？';
}));

const processSteps = [
  ['準備：遮蔽物貼近感光紙', '遮蔽物和紙越貼近，影像邊緣通常越清楚。玻璃板或透明壓板可以減少風吹與移動。'],
  ['曝光：紫外線啟動光化學反應', '沒有被遮住的區域接收到較多紫外線；被遮住的區域反應較少。這是接觸影像，不需要相機鏡頭。'],
  ['水洗：帶走未形成穩定影像的材料', '依紙張說明充分用水清洗。這一步不是把藍色顏料洗上去，而是移除不需要留下的材料。'],
  ['氧化與乾燥：普魯士藍逐漸加深', '作品接觸空氣並乾燥後，藍色常會比剛洗完時更深。遮光較多的位置留下白色或淺藍影像。']
];
let processIndex = 0;
let processTimer = null;
const processStage = document.querySelector('#process-stage');
const processTitle = document.querySelector('#process-title');
const processDescription = document.querySelector('#process-description');
const processCount = document.querySelector('#process-count');
const processPlay = document.querySelector('#process-play');

function renderProcess() {
  processStage.dataset.step = processIndex;
  processStage.setAttribute('aria-label', `藍曬形成的四階段適齡示意圖，目前是第 ${processIndex + 1} 階段：${processSteps[processIndex][0]}`);
  processTitle.textContent = processSteps[processIndex][0];
  processDescription.textContent = processSteps[processIndex][1];
  processCount.textContent = `階段 ${processIndex + 1}／4`;
}
function stopProcess() {
  clearInterval(processTimer);
  processTimer = null;
  processPlay.textContent = '播放';
  processPlay.setAttribute('aria-pressed', 'false');
}
function changeProcess(delta) {
  stopProcess();
  processIndex = (processIndex + delta + processSteps.length) % processSteps.length;
  renderProcess();
}
document.querySelector('#process-prev').addEventListener('click', () => changeProcess(-1));
document.querySelector('#process-next').addEventListener('click', () => changeProcess(1));
document.querySelector('#process-reset').addEventListener('click', () => { stopProcess(); processIndex = 0; renderProcess(); });
processPlay.addEventListener('click', () => {
  if (processTimer) return stopProcess();
  processPlay.textContent = '暫停';
  processPlay.setAttribute('aria-pressed', 'true');
  processTimer = setInterval(() => {
    if (processIndex === processSteps.length - 1) return stopProcess();
    processIndex += 1;
    renderProcess();
  }, 2600);
});

document.querySelector('#prediction-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = new FormData(event.currentTarget).get('prediction');
  const reason = document.querySelector('#prediction-reason').value.trim();
  const feedback = document.querySelector('#prediction-feedback');
  if (!selected || !reason) {
    feedback.className = 'feedback is-hint';
    feedback.textContent = '請先選一種素材，並用「因為」寫下你的理由。';
    return;
  }
  const correct = selected === 'opaque';
  feedback.className = `feedback ${correct ? 'is-correct' : 'is-hint'}`;
  feedback.textContent = correct
    ? '預測合理：厚紙遮住最多光，所以下方通常最淺。真正的科學證據要等三種材料同時測試後才能確認。'
    : '再比較「有多少光能穿過」。網紗有孔洞、描圖紙能透過一部分光；哪一種最能遮光？';
});

document.querySelectorAll('[data-fair]').forEach((button) => button.addEventListener('click', () => {
  const correct = button.dataset.fair === 'no';
  const output = document.querySelector('#fair-feedback');
  output.textContent = correct ? '正確：同時改變兩個條件後，即使結果不同，也無法只歸因於透光程度。' : '再想一次：素材和曝光量都改變時，結果差異可能來自哪一個？';
  output.className = correct ? 'is-correct-text' : 'is-hint-text';
}));

const paper = document.querySelector('#cyanotype-paper');
const exposure = document.querySelector('#exposure');
const exposureOutput = document.querySelector('#exposure-output');
const simResult = document.querySelector('#sim-result');
const objectCount = document.querySelector('#object-count');
let selectedTransmission = 'opaque';
let objectId = 0;
let activeObject = null;

function transmissionLabel(value) {
  return { opaque: '不透光', translucent: '半透明', open: '較透光' }[value];
}
function updateObjectCount() {
  const count = paper.querySelectorAll('.placed-object').length;
  objectCount.textContent = `畫面上有 ${count} 個素材`;
  paper.querySelector('.paper-hint').hidden = count > 0;
  paper.setAttribute('aria-label', `藍曬模擬紙，目前有 ${count} 個素材。可拖曳素材，或選取後用方向鍵移動。`);
}
document.querySelectorAll('[data-transmission]').forEach((button) => button.addEventListener('click', () => {
  selectedTransmission = button.dataset.transmission;
  document.querySelectorAll('[data-transmission]').forEach((item) => {
    const selected = item === button;
    item.classList.toggle('is-selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
}));
exposure.addEventListener('input', () => exposureOutput.textContent = `${exposure.value}%`);

function selectPlacedObject(element) {
  paper.querySelectorAll('.placed-object').forEach((item) => item.classList.toggle('is-active', item === element));
  activeObject = element;
}
function moveObject(element, clientX, clientY) {
  const rect = paper.getBoundingClientRect();
  const size = element.getBoundingClientRect();
  const x = Math.max(0, Math.min(clientX - rect.left - size.width / 2, rect.width - size.width));
  const y = Math.max(0, Math.min(clientY - rect.top - size.height / 2, rect.height - size.height));
  element.style.left = `${(x / rect.width) * 100}%`;
  element.style.top = `${(y / rect.height) * 100}%`;
}
function addObject(type) {
  const item = document.createElement('button');
  objectId += 1;
  item.type = 'button';
  item.className = `placed-object ${selectedTransmission}`;
  item.dataset.type = type;
  item.style.left = `${16 + ((objectId * 13) % 54)}%`;
  item.style.top = `${14 + ((objectId * 17) % 48)}%`;
  item.setAttribute('aria-label', `${transmissionLabel(selectedTransmission)}${{ fern: '蕨葉', feather: '羽毛', lace: '蕾絲' }[type]}；可拖曳，方向鍵移動，Delete 刪除`);
  const image = document.createElement('img');
  image.src = new URL('../assets/cyanotype-cutouts.webp', import.meta.url).href;
  image.alt = '';
  image.draggable = false;
  image.className = `placed-sprite ${type}`;
  item.append(image);
  item.addEventListener('pointerdown', (event) => {
    selectPlacedObject(item);
    item.setPointerCapture(event.pointerId);
    moveObject(item, event.clientX, event.clientY);
  });
  item.addEventListener('pointermove', (event) => {
    if (item.hasPointerCapture(event.pointerId)) moveObject(item, event.clientX, event.clientY);
  });
  item.addEventListener('focus', () => selectPlacedObject(item));
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') { event.preventDefault(); item.remove(); activeObject = null; updateObjectCount(); return; }
    const amount = event.shiftKey ? 4 : 1;
    const pos = { left: parseFloat(item.style.left), top: parseFloat(item.style.top) };
    if (event.key === 'ArrowLeft') pos.left -= amount;
    else if (event.key === 'ArrowRight') pos.left += amount;
    else if (event.key === 'ArrowUp') pos.top -= amount;
    else if (event.key === 'ArrowDown') pos.top += amount;
    else return;
    event.preventDefault();
    item.style.left = `${Math.max(0, Math.min(86, pos.left))}%`;
    item.style.top = `${Math.max(0, Math.min(78, pos.top))}%`;
  });
  paper.append(item);
  selectPlacedObject(item);
  updateObjectCount();
  item.focus();
}
document.querySelectorAll('[data-add-object]').forEach((button) => button.addEventListener('click', () => addObject(button.dataset.addObject)));
document.querySelector('#simulate').addEventListener('click', () => {
  const count = paper.querySelectorAll('.placed-object').length;
  if (!count) {
    simResult.innerHTML = '<strong>還少一項條件</strong><span>至少加入一個素材，才能比較遮光後的影像。</span>';
    return;
  }
  const value = Number(exposure.value);
  paper.style.setProperty('--exposure', value / 100);
  paper.classList.remove('is-exposed');
  requestAnimationFrame(() => paper.classList.add('is-exposed'));
  simResult.innerHTML = `<strong>模擬完成：相對曝光量 ${value}%</strong><span>比較素材下方的淺色層次。相同曝光下，不透光素材遮住較多光；提高曝光量則未遮蔽背景通常更深。</span>`;
});
document.querySelector('#sim-reset').addEventListener('click', () => {
  paper.querySelectorAll('.placed-object').forEach((item) => item.remove());
  paper.classList.remove('is-exposed');
  paper.style.removeProperty('--exposure');
  exposure.value = 50;
  exposureOutput.textContent = '50%';
  activeObject = null;
  simResult.innerHTML = '<strong>等待實驗</strong><span>先安排素材，再按「開始模擬」。</span>';
  updateObjectCount();
});

document.querySelector('#ready-check').addEventListener('submit', (event) => {
  event.preventDefault();
  const checks = [...event.currentTarget.querySelectorAll('input[type="checkbox"]')];
  const complete = checks.every((item) => item.checked);
  const output = document.querySelector('#ready-feedback');
  output.textContent = complete ? '四項都完成。請由教師再次確認天氣、場地與材料說明後再出發。' : `還有 ${checks.filter((item) => !item.checked).length} 項沒有確認，先補齊再出發。`;
  output.className = complete ? 'is-correct-text' : 'is-hint-text';
});

const prompts = [
  ['一座會呼吸的森林', '用三種不同大小的葉片形成由密到疏的節奏，保留一條光能穿過的藍色路徑。'],
  ['風把種子吹去哪裡？', '選一種小素材重複排列，逐漸改變方向與距離，讓視線像風一樣移動。'],
  ['藏在負形裡的動物', '先用大片素材圍出藍色輪廓，再用少量細節提示一種動物，不直接畫出牠。'],
  ['透明城市', '混合不透光與半透明幾何片，使用重疊創造三種以上的藍色層次。']
];
let promptIndex = 0;
document.querySelector('#new-prompt').addEventListener('click', () => {
  promptIndex = (promptIndex + 1) % prompts.length;
  document.querySelector('#prompt-title').textContent = prompts[promptIndex][0];
  document.querySelector('#prompt-text').textContent = prompts[promptIndex][1];
});
const artPlan = document.querySelector('#art-plan');
artPlan.value = localStorage.getItem('cyanotype-art-plan') || '';
artPlan.addEventListener('input', () => {
  localStorage.setItem('cyanotype-art-plan', artPlan.value);
  document.querySelector('#save-status').textContent = '已自動保存在這台裝置。';
});

const upload = document.querySelector('#art-upload');
const uploadPreview = document.querySelector('#upload-preview');
upload.addEventListener('change', () => {
  const file = upload.files?.[0];
  if (!file) return;
  const image = document.createElement('img');
  image.alt = '學生選擇的藍曬作品照片預覽';
  image.src = URL.createObjectURL(file);
  image.onload = () => URL.revokeObjectURL(image.src);
  uploadPreview.replaceChildren(image);
});

document.querySelector('#quiz-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const answers = ['b', 'b', 'a', 'b'];
  const score = answers.reduce((total, answer, index) => total + (data.get(`q${index + 1}`) === answer ? 1 : 0), 0);
  const missing = answers.filter((_, index) => !data.get(`q${index + 1}`)).length;
  const output = document.querySelector('#quiz-result');
  if (missing) {
    output.className = 'quiz-result is-hint';
    output.textContent = `還有 ${missing} 題未完成。請全部作答後再查看結果。`;
    return;
  }
  output.className = `quiz-result ${score === 4 ? 'is-correct' : 'is-hint'}`;
  output.textContent = score === 4 ? '4／4！你能連結光、變因、安全與證據。下一步：用自己的作品向同學解釋一個深淺差異。' : `${score}／4。回到「光如何留下影像」與「真實藍曬實作」，找出還需要補強的證據。`;
});

const sourceDialog = document.querySelector('#source-dialog');
document.querySelector('#source-button').addEventListener('click', () => sourceDialog.showModal());
document.querySelector('#close-source').addEventListener('click', () => sourceDialog.close());
sourceDialog.addEventListener('click', (event) => { if (event.target === sourceDialog) sourceDialog.close(); });

document.addEventListener('visibilitychange', () => { if (document.hidden) stopProcess(); });
renderProcess();
updateObjectCount();
