<template>
  <Container>
    <div style="height: 100vh; width: 100vw">
      <client-only>
        <div :id="amapId" style="height: 100vh; width: 100vw" />
        <div class="copy_img" @click="copy">{{ $t('profile_page.txt') }}</div>
      </client-only>
    </div>
  </Container>
</template>

<script lang="ts" setup>
import "@amap/amap-jsapi-types";
import {copyDivToImage, domToImg} from '@/utils/units';
import { shallowRef } from "vue";

defineOptions({
  name: "ChainMap",
});

definePageMeta({
  name: "ChainMap",
  keepalive: true,
  title: "🧡 china",
  i18n: "menu.map",
  level: 2,
});
// 底图实例
const map = shallowRef();
const amapId = computed(() => {
  return `amapId_${Date.now()}`;
});
const copy = () => {
  domToImg('')
  // copyDivToImage('')
}
// 初始化
const initMap = async () => {
  await nextTick();
  map.value = new AMap.Map(amapId.value, {
    zoom: 14,
    viewMode: "3D",
    center: [108.378, 22.8092],
    mapStyle: "amap://styles/macaron",
  });
};
/** 浏览器精准定位 **/
const loadGeolocation = () => {
  AMap.plugin("AMap.Geolocation", () => {
    const geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000, //超过10秒后停止定位，默认：5s
      position: "RB", //定位按钮的停靠位置
      offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
      zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
    });
    map.value?.addControl(geolocation);
    geolocation.getCurrentPosition((status: string, result: any) => {
      console.log("geolocation.getCurrentPosition", status, result);
    });
  });
};
const ElaMarker = async () => {
  await nextTick();
  const stylesArr = [
    {
      icon: {
        img: "https://a.amap.com/jsapi_demos/static/resource/img/men3.png",
        size: [16, 16], //可见区域的大小
        anchor: "bottom-center", //锚点
        fitZoom: 14, //最合适的级别
        scaleFactor: 2, //地图放大一级的缩放比例系数
        maxScale: 2, //最大放大比例
        minScale: 1, //最小放大比例
      },
      label: {
        content: "百花殿",
        position: "BM",
        minZoom: 15,
      },
    },
    {
      icon: {
        img: "https://a.amap.com/jsapi_demos/static/resource/img/tingzi.png",
        size: [48, 63],
        anchor: "bottom-center",
        fitZoom: 17.5,
        scaleFactor: 2,
        maxScale: 2,
        minScale: 0.125,
      },
      label: {
        content: "万寿亭",
        position: "BM",
        minZoom: 15,
      },
    },
  ];
  // zoom 与样式的映射
  const zoomStyleMapping = {
    14: 0, // 14级使用样式 0
    15: 0,
    16: 0,
    17: 0,
    18: 1,
    19: 1,
    20: 1,
  };
  // 加载灵活点标记的插件
  AMap.plugin(["AMap.ElasticMarker"], function () {
    const elasticMarker = new AMap.ElasticMarker({
      position: [116.405562, 39.881166],
      // 指定样式列表
      styles: stylesArr,
      // 指定 zoom 与样式的映射
      zoomStyleMapping: zoomStyleMapping,
    });
    map.value.add(elasticMarker);
  });
};
const aroundPlace = async () => {
  await nextTick();
  AMap.plugin("AMap.PlaceSearch", () => {
    //构造地点查询类
    const placeSearch = new AMap.PlaceSearch({
      //设置PlaceSearch属性
      city: "北京", //城市
      type: "", //数据类别
      pageSize: 10, //每页结果数,默认10
      pageIndex: 1, //请求页码，默认1
      extensions: "base", //返回信息详略，默认为base（基本信息）
    });
    placeSearch.search("方恒国际中心"); //关键字查询
  });
};
const addToolBar = async () => {
  await nextTick();
  AMap.plugin("AMap.ToolBar", () => {
    const tool = new AMap.ToolBar({ offset: [50, 50] });
    map.value?.addControl(tool);
  });
};

onMounted(async () => {
  if (import.meta.client) {
    await initMap();
    loadGeolocation();
    aroundPlace();
    ElaMarker();
    addToolBar();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    map.value?.destroy();
  }
});
</script>
<style lang="less">
body {
  margin: 0;
}
.copy_img {
  position: absolute;
  top: 50px;
  left: 50px;
  text-align: center;
  border-radius: 51.2px;
  font-size: 16px;
  color: #fff;
  border: 2px solid #f3d8ff;
  background: #ff5def;
  width: 100px;
  height: 38px;
  line-height: 38px;
}
</style>
