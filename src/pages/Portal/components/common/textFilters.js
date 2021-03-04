/* eslint-disable */
const textSubstr = (value) => {
  const maxLength = 12; // 英文下的字符数，中文*2
  if (value.replace(/[\u4e00-\u9fa5]/g, 'aa').length <= maxLength) {
    return value;
  }
  let _length = 0;
  let outputText = '';
  for (let i = 0; i < value.length; i++) {
    if (/[\u4e00-\u9fa5]/.test(value[i])) {
      _length += 2;
    } else {
      _length += 1;
    }
    if (_length > maxLength) {
      break;
    } else {
      outputText += value[i];
    }
  }
  return outputText;
};
export { textSubstr };
