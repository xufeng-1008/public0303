export default class AYPlugin {
  static install() {
    window.AY = {
      buildSpaceUri: (url, spaceId) => (spaceId ? `/space-${spaceId}${url || ''}` : url),
      getSpaceId() {
        return window.globalConfig.user.entId;
      },
    };
  }
}
