<script>
export default {
  name: 'v-item',
  computed: {
    isMedia() {
      return this.$parent.media;
    },
    isLink() {
      return this.$parent.link;
    },
  },
  render() {
    const title = this.$slots.default;
    const { after, media, input } = this.$slots;

    const ItemContent = (
      <div class="v-item__content">
      { this.isMedia ?
        <div class="v-item__media">
          {media}
        </div> : ''
      }
        <div class="v-item__inner">
          <div class="v-item__title">
            {title}
          </div>
          { after ?
            <div class="v-item__after">
              {after}
            </div> : ''
          }
          { input ?
            <div class="v-item__input">
              {input}
            </div> : ''
          }
        </div>
      </div>
    );
    if (this.isLink) {
      return <li><a class="v-item__link">{ItemContent}</a></li>;
    }
    return <li>{ItemContent}</li>;
  },
};
</script>
