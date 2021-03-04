import createLoader from './createLoader';

export default (content) => {
  const $loader = createLoader(content);
  return $loader.outerHTML;
};
