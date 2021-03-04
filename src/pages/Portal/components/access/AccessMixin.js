import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['securityToken']),
  },
  methods: {
    formatImgUrl(sub) {
      let img = sub.img || sub.lunboImg;
      if (!img) {
        return null;
      }
      const { host } = window.location;
      img = `/file?src=${encodeURIComponent(img)}&host=${host}&token=${this.securityToken}`;
      return img;
    },
  },
};
