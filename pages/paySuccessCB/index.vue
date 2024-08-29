<script lang="tsx">
import { defineComponent, onMounted, ref } from "vue";
import { showToast, Icon } from "vant";
import bg from './Android_apk.png'
import "./index.less";

export default defineComponent({
  name: "simple",
  setup() {
    onMounted(() => {});
    return () => (
      <div class="pay_container">
        <Icon class="succ" color="#FFF" size="5rem" name="certificate" />
        <div class="text">支付成功，请添加微信领取资料</div>
        <img class="qrcode" src={bg}  alt="code" />
      </div>
    );
  },
});
</script>