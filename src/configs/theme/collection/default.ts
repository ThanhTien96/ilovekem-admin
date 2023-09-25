import { theme, ThemeConfig } from "antd";

const { defaultAlgorithm } = theme;

const instance: ThemeConfig = {
  algorithm: [defaultAlgorithm],
  token: {},
  components: {
    Layout: {
      headerBg: "#ffffff",
      triggerBg: "#cdcdcd",
    },
    Button: {
      colorPrimaryText: "#000000"
    }
  },
};

export default instance;
