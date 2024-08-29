<script lang="tsx">
import { defineComponent, onMounted, ref } from "vue";
import { showToast } from "vant";
import bg from './detail.jpg'
import "./index.less";

export default defineComponent({
  name: "simple",
  setup() {
    onMounted(() => {});
    return () => (
      <div class="join_container">
        <img src={bg} class="img_bg" alt="detail" />
        <div class="pay_btn" onClick={() => {
          showToast('购买成功，请添加微信领取资料')
          }}>支付9.9后领取全篇神贴</div>
      </div>
    );
  },
});
</script>