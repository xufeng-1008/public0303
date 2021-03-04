/* eslint-disable */
let loadedCount;
let loadIndex;

function init() {
  loadedCount = 0;
  loadIndex = 0;
}

function startLoad(count) {
  loadIndex += count;
}

function endLoad() {
  loadedCount++;
}

function isPartialLoaded() {
  return loadedCount === loadIndex;
}

export default {
  init,
  startLoad,
  endLoad,
  isPartialLoaded,
};
