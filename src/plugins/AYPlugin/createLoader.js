const $loaderCopy = document.createElement('div');
$loaderCopy.innerHTML = `<div class="el-loading-spinner">
  <svg viewBox="25 25 50 50" class="circular">
    <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
  </svg>
  <p class="el-loading-text"></p>
</div>`;

export default (content) => {
  const $loader = $loaderCopy.cloneNode(true);
  if (content) {
    const $text = $loader.querySelector('.el-loading-text');
    if ($text) {
      $text.textContent = content;
    }
  }
  return $loader;
};
