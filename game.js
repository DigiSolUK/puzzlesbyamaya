import { games, boardPrompts, answerIcons, memoryPictures } from "./puzzles.js";

const slug = document.body.dataset.game;
const play = document.querySelector("#play");
const area = document.querySelector("#game-area");
const prompt = document.querySelector("#prompt");
const progress = document.querySelector("#progress");
const feedback = document.querySelector("#feedback");
const reader = document.querySelector("#read-aloud");
const readLabel = reader.querySelector("span");
const levels = [...document.querySelectorAll("[data-level]")];

let level = "easy";
let clip = "";
let audio;

function icon(id) {
  return '<svg aria-hidden="true" focusable="false"><use href="assets/icons.svg#' + id + '"></use></svg>';
}

function button(label, className) {
  const element = document.createElement("button");
  element.type = "button";
  element.className = className;
  element.textContent = label;
  return element;
}

function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function shuffledTiles(size) {
  const positions = Array.from({ length: size }, (_, index) => index);
  const order = shuffle(positions);
  if (order.every((position, index) => position === index)) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}

function stopReading() {
  audio?.pause();
  audio = undefined;
  readLabel.textContent = "Read aloud";
}

function preparePrompt(text, audioId, label) {
  stopReading();
  clip = audioId;
  reader.hidden = !audioId;
  prompt.textContent = text;
  progress.textContent = label;
  feedback.textContent = "";
  area.replaceChildren();
}

reader.addEventListener("click", async () => {
  if (audio) {
    stopReading();
    return;
  }
  const current = new Audio("assets/audio/" + clip + ".mp3");
  audio = current;
  const stopIfCurrent = () => {
    if (audio === current) stopReading();
  };
  current.addEventListener("ended", stopIfCurrent, { once: true });
  readLabel.textContent = "Stop reading";
  try {
    await current.play();
  } catch {
    if (audio !== current) return;
    stopReading();
    feedback.textContent = "The sound could not play. You can try the read-aloud button again.";
  }
});

function finish(message) {
  preparePrompt("You did it!", "", "Round complete");
  area.innerHTML = '<div class="finished">' + icon("star") +
    '<p></p><div class="finished-actions"><button type="button" class="button button-primary">Play again</button>' +
    '<a class="button button-secondary" href="./#games">All games</a></div></div>';
  area.querySelector("p").textContent = message;
  area.querySelector("button").addEventListener("click", () => start(true));
  prompt.focus();
}

function countPicture(counts) {
  return '<div class="count-clue" role="img" aria-label="' + counts.join(" flowers plus ") +
    ' flowers">' + counts.map(count =>
      '<div class="flowers">' + icon("flower").repeat(count) + '</div>'
    ).join('<span class="count-plus" aria-hidden="true">+</span>') + '</div>';
}

function forcePicture([action, direction]) {
  const pulling = action === "pull";
  const flipped = pulling ? direction === "right" : direction === "left";
  const side = flipped ? "right" : "left";
  const arm = pulling
    ? '<path d="M91 64l24 7m0 0 41 4" stroke="#44265f" fill="none"/><circle cx="114" cy="70" r="5" fill="#e2a276"/>'
    : '<path d="M92 63l28 9 32-8" stroke="#e2a276" stroke-width="8" fill="none"/><path d="M146 57l9 6-4 10" stroke="#a96243" fill="none"/>';
  return '<svg viewBox="0 0 250 110" role="img" aria-label="Child on the ' + side +
    (pulling ? ' holding a tight string tied to a toy car' : ' with a hand pressing on a toy car') + '">' +
    '<path d="M18 98h214" stroke="#bd9de6" stroke-width="3" stroke-linecap="round"/>' +
    '<g transform="' + (flipped ? 'translate(250 0) scale(-1 1)' : 'translate(0 0)') +
    '" stroke="#44265f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M78 78l-10 17m19-17 13 17" stroke-width="6"/>' +
    '<path d="M72 54q10-8 22 1l4 24H69Z" fill="#8a5ad8"/>' +
    '<circle cx="84" cy="35" r="15" fill="#e2a276"/><path d="M70 32q-2-18 16-17 12 0 14 12-14-4-17 2Z" fill="#56324c"/>' +
    '<circle cx="90" cy="35" r="1.7" fill="#44265f" stroke="none"/>' + arm +
    '<path d="M155 68h12l10-13h25l12 13h10v17h-69Z" fill="#ff96b6"/>' +
    '<path d="m175 68 6-8h18l7 8Z" fill="#b5edfa"/><circle cx="173" cy="85" r="8" fill="#594175"/>' +
    '<circle cx="209" cy="85" r="8" fill="#594175"/></g></svg>';
}

function showQuestion(index = 0, focusPrompt = false) {
  const questions = games[slug][level];
  const current = questions[index];
  const number = index + 1;
  preparePrompt(current.prompt, slug + "-" + level + "-" + number, "Puzzle " + number + " of " + questions.length);

  const clue = document.createElement("div");
  clue.className = "clue-panel";
  if (current.count) clue.innerHTML = countPicture(current.count);
  else if (current.scene) clue.innerHTML = forcePicture(current.scene);
  else clue.innerHTML = '<div class="clue-pair">' + current.icons.map(icon).join("") + '</div>';
  area.append(clue);

  const answers = document.createElement("div");
  answers.className = "answers";
  const actions = document.createElement("div");
  actions.className = "round-actions";
  actions.hidden = true;
  const isLast = number === questions.length;
  const next = button(isLast ? "Finish round" : "Next puzzle →", "button button-primary");
  next.addEventListener("click", () => {
    if (isLast) finish("You solved " + questions.length + " puzzles.");
    else showQuestion(index + 1, true);
  });
  actions.append(next);

  let solved = false;
  for (const option of current.options) {
    const choice = button(String(option), "answer");
    if (answerIcons[option]) choice.insertAdjacentHTML("afterbegin", icon(answerIcons[option]));
    choice.addEventListener("click", () => {
      if (solved) return;
      for (const previous of answers.children) previous.classList.remove("is-wrong");
      if (option !== current.answer) {
        choice.classList.add("is-wrong");
        feedback.textContent = "Try again. " + (current.hint || "Point to each flower as you count.");
        return;
      }
      solved = true;
      for (const answer of answers.children) {
        answer.setAttribute("aria-disabled", "true");
        answer.tabIndex = -1;
      }
      choice.classList.add("is-correct");
      choice.insertAdjacentHTML("beforeend", '<span class="answer-marker" aria-hidden="true">✓</span>');
      feedback.textContent = "That’s right! " + (current.fact || "You counted " + option + " flowers.");
      actions.hidden = false;
    });
    answers.append(choice);
  }
  area.append(answers, actions);
  if (focusPrompt) prompt.focus();
}

function showMemory() {
  const pairs = memoryPictures.slice(0, level === "easy" ? 3 : 6);
  const deck = shuffle([...pairs, ...pairs]);
  preparePrompt(boardPrompts[slug], slug, "0 of " + pairs.length + " pairs");
  const grid = document.createElement("div");
  grid.className = "memory-grid" + (pairs.length > 3 ? " is-large" : "");
  const actions = document.createElement("div");
  actions.className = "round-actions";
  actions.hidden = true;
  const flipBack = button("Try another pair", "button button-secondary");
  actions.append(flipBack);

  let flipped = [];
  let matches = 0;
  const cards = deck.map((picture, index) => {
    const card = button("?", "memory-card");
    const number = "Card " + (index + 1);
    const hide = () => {
      card.textContent = "?";
      card.classList.remove("is-up");
      card.setAttribute("aria-label", number + ", face down");
    };
    hide();
    card.addEventListener("click", () => {
      if (flipped.length === 2 || card.hasAttribute("aria-disabled") || card.classList.contains("is-up")) return;
      card.innerHTML = icon(picture);
      card.classList.add("is-up");
      card.setAttribute("aria-label", number + ", " + picture);
      flipped.push({ card, picture, hide, number });
      if (flipped.length === 1) {
        feedback.textContent = "You found a " + picture + ". Flip one more card.";
        return;
      }
      if (flipped[0].picture !== picture) {
        feedback.textContent = "Two different pictures. Remember where they are, then try another pair.";
        actions.hidden = false;
        return;
      }
      for (const match of flipped) {
        match.card.classList.add("is-matched");
        match.card.setAttribute("aria-label", match.number + ", " + picture + ", matched");
        match.card.setAttribute("aria-disabled", "true");
      }
      flipped = [];
      matches++;
      progress.textContent = matches + " of " + pairs.length + " pairs";
      feedback.textContent = "A match! You found two cards showing the same picture.";
      if (matches === pairs.length) finish("You found all " + pairs.length + " pairs.");
    });
    return card;
  });
  flipBack.addEventListener("click", () => {
    for (const item of flipped) item.hide();
    flipped[1].card.focus();
    flipped = [];
    actions.hidden = true;
    feedback.textContent = "Pick two cards to try again.";
  });
  grid.append(...cards);
  area.append(grid, actions);
}

const tileClues = {
  2: ["stars and rocket nose", "ringed planet and rocket window", "stars and moon hills", "rocket flames and moon hills"],
  3: ["small stars", "rocket nose", "ringed planet", "blue window and rocket fin", "rocket body and pink fin", "bright star", "left moon hills", "rocket flames and moon hills", "right moon hills"]
};

function showJigsaw() {
  const size = level === "easy" ? 2 : 3;
  const total = size * size;
  preparePrompt(boardPrompts[slug], slug, "0 of " + total + " pieces");
  area.innerHTML = '<div class="jigsaw-reference"><img src="assets/jigsaw.svg" alt="A pink and white rocket flies above the moon." width="62" height="62"><span>Make this picture</span></div>' +
    '<div class="jigsaw-layout"><section><h3>Pick a piece</h3><div class="tile-tray"></div></section>' +
    '<section><h3>Find its space</h3><div class="jigsaw-board"></div></section></div>';

  const tray = area.querySelector(".tile-tray");
  const board = area.querySelector(".jigsaw-board");
  tray.style.setProperty("--size", size);
  board.style.setProperty("--size", size);

  let selected;
  let placed = 0;
  const slots = [];
  const clearHint = () => board.querySelector(".is-hint")?.classList.remove("is-hint");

  for (const [index, tileIndex] of shuffledTiles(total).entries()) {
    const tile = button("", "tile");
    const name = "Piece " + (index + 1) + ", " + tileClues[size][tileIndex];
    tile.setAttribute("aria-label", name);
    tile.setAttribute("aria-pressed", "false");

    const picture = document.createElement("span");
    picture.className = "piece";
    picture.style.setProperty("--piece-x", (tileIndex % size) * 100 / (size - 1) + "%");
    picture.style.setProperty("--piece-y", Math.floor(tileIndex / size) * 100 / (size - 1) + "%");
    tile.append(picture);
    tray.append(tile);

    tile.addEventListener("click", () => {
      selected?.tile.setAttribute("aria-pressed", "false");
      clearHint();
      selected = { tile, tileIndex, name, picture };
      tile.setAttribute("aria-pressed", "true");
      feedback.textContent = "Piece " + (index + 1) + " picked. Now choose a space.";
    });
  }

  for (let index = 0; index < total; index++) {
    const slot = button("", "slot");
    const name = "Space " + (index + 1) + ", row " + (Math.floor(index / size) + 1) + ", column " + ((index % size) + 1);
    slot.setAttribute("aria-label", name + ", empty");
    slots.push(slot);
    board.append(slot);
    slot.addEventListener("click", () => {
      if (slot.hasAttribute("aria-disabled")) return;
      if (!selected) {
        feedback.textContent = "Pick a piece first.";
        return;
      }
      if (selected.tileIndex !== index) {
        slots[selected.tileIndex].classList.add("is-hint");
        feedback.textContent = "Try the outlined space, space " + (selected.tileIndex + 1) + ".";
        return;
      }
      clearHint();
      slot.append(selected.picture);
      slot.classList.add("is-filled");
      slot.setAttribute("aria-label", name + ", filled with " + selected.name);
      slot.setAttribute("aria-disabled", "true");
      selected.tile.classList.add("is-placed");
      selected = undefined;
      placed++;
      progress.textContent = placed + " of " + total + " pieces";
      feedback.textContent = "It fits! Pick another piece.";
      if (placed === total) finish("You put all " + total + " rocket pieces together.");
    });
  }
}

function start(focusPrompt = false) {
  if (games[slug]) showQuestion();
  else if (slug === "memory-match") showMemory();
  else showJigsaw();
  if (focusPrompt) prompt.focus();
}

for (const control of levels) {
  control.addEventListener("click", () => {
    if (level === control.dataset.level) return;
    level = control.dataset.level;
    for (const option of levels) option.setAttribute("aria-pressed", String(option === control));
    start(true);
  });
}

play.hidden = false;
start();
window.addEventListener("pagehide", stopReading);
