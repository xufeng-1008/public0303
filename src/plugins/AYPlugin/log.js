export default function log(...args) {
  if (window.console) {
    window.console.log.apply(this, args);
  }
}
