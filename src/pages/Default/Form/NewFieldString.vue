<script>
import { FieldBox } from '@qycloud/lego-mobile';

export default {
  extends: FieldBox,
  methods: {
    renderRightSlot() {
      const { editable } = this.props;
      if (editable) {
        return (
          <van-button type="default" on-click={this.handleClick}>
            打点
          </van-button>
        );
      }
      return null;
    },
    handleClick() {
      this.show = true;
      this.$emit('show-map', true);
    },
  },
};
</script>
