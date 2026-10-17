# lcdp-android

LCDP（AI + 低代码平台）运行态的 Android 壳工程（M13 移动端适配 · 线 C）。

## 定位

壳只做**容器 + 设备桥**，不承载业务呈现：

- 以 Capacitor 内嵌线上运行态（`capacitor.config.ts` 的 `server.url = https://coode.cc.cd`），不打包 Web 资产——线上发版即壳内生效，壳本身极少更新。
- 设备能力经原生插件通道提供给 Web 层：相机（@capacitor/camera，拍照/选图走平台资产链落库）、扫码（@capacitor-mlkit/barcode-scanning，结果以 `lcdp:scan` 事件回传运行态填充字段）。
- 推送、生物识别本期只留桥接口占位（Web 侧 `window.lcdpBridge` 返回 unsupported），不接服务端通道。
- iOS 工程在 Mac + Xcode + 开发者账号条件具备时以同一工程补出（本期只做 Android）。

关联仓库：`lcdp-platform`（平台本体与 Schema 契约）、`lcdp-worker`（三前端 + renderer，壳内呈现来自其中的 runtime）。

## 构建（debug APK）

前置：JDK 17、Android SDK（platform 36、build-tools、platform-tools）。

```bash
npm install
npx cap sync android
cd android && ./gradlew assembleDebug
# 产物：android/app/build/outputs/apk/debug/app-debug.apk
```

发布签名与应用商店分发不在本期范围。

## 应用标识

- appId：`cc.coode.lcdp`
- appName：LCDP 运行态
- minSdk 24 / targetSdk 36（Capacitor 8 默认，随框架升级）
