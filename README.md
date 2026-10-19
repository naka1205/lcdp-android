# lcdp-android

LCDP（AI + 低代码平台）运行态的 Android 壳工程（M13 移动端适配 · 线 C）。

## 定位

壳只做**容器 + 设备桥**，不承载业务呈现：

- 以 Capacitor 内嵌线上运行态（`capacitor.config.ts` 的 `server.url = https://coode.cc.cd`），不打包 Web 资产——线上发版即壳内生效，壳本身极少更新。
- 设备能力经原生插件通道提供给 Web 层：相机（@capacitor/camera，拍照/选图走平台资产链落库）、扫码（@capacitor-mlkit/barcode-scanning，结果以 `lcdp:scan` 事件回传运行态填充字段）。
- 推送、生物识别本期只留桥接口占位（Web 侧 `window.lcdpBridge` 返回 unsupported），不接服务端通道。
- iOS 工程与 Android 同源同配置（2026-10-19 补出）：`ios/` 平台已加入，CI 出未签名模拟器包，用户拖入 iOS 模拟器验收；真机签名与商店分发不在本期范围。

关联仓库：`lcdp-platform`（平台本体与 Schema 契约）、`lcdp-worker`（三前端 + renderer，壳内呈现来自其中的 runtime）。

## 构建（debug APK）

**CI 构建（当前口径）**：push 到 main 或手动触发 `Android APK` workflow，产物 `app-debug.apk` 在 Actions 运行的 Artifacts 里下载。

本地构建前置：JDK 21（Capacitor 8 的 android 库以 Java 21 源码级别编译）、Android SDK（platform 36、build-tools、platform-tools）。

```bash
npm install
npx cap sync android
cd android && ./gradlew assembleDebug
# 产物：android/app/build/outputs/apk/debug/app-debug.apk
```

备注：开发用云端 VM 内 Gradle 客户端与守护进程的连接/注册表机制持续异常（守护进程起来后客户端始终连不上，与网络、GRADLE_USER_HOME 位置无关），本地构建在该环境暂走不通，故以 CI 为准；常规开发机本地构建不受影响。

发布签名与应用商店分发不在本期范围。

## 构建（iOS 模拟器包）

**CI 构建**：push 到 main（或特性分支）或手动触发 `iOS Simulator App` workflow（macOS runner），产物 `lcdp-runtime-ios-simulator.zip` 在 Actions 运行的 Artifacts 里下载；解压得到 `App.app`，拖入 iOS 模拟器窗口即安装。工程为 Capacitor 8 的 SPM 形态，无需 CocoaPods；`Info.plist` 已声明相机/相册用途说明（扫码与附件）。

## 应用标识

- appId：`cc.coode.lcdp`
- appName：LCDP 运行态
- minSdk 24 / targetSdk 36（Capacitor 8 默认，随框架升级）
