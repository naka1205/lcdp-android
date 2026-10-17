import type { CapacitorConfig } from "@capacitor/cli";

/**
 * LCDP 运行态 Android 壳（M13 线 C，契约 m13-mobile-contract-2026-10-17 §5）。
 * 壳只做容器 + 设备桥：呈现永远走线上运行态（server.url），不打包 Web 资产，
 * 线上发版即壳内生效。设备桥的 Web 侧入口在运行态（window.lcdpBridge），
 * 本工程只提供原生插件通道（Camera / MLKit 扫码）。
 */
const config: CapacitorConfig = {
  appId: "cc.coode.lcdp",
  appName: "LCDP 运行态",
  webDir: "www",
  server: {
    url: "https://coode.cc.cd",
    cleartext: false,
  },
};

export default config;
