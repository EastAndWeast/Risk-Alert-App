# Risk Alert RN — 开发者启动指南

## 📦 环境要求

| 工具 | 版本要求 |
|------|--------|
| Node.js | ≥ 18 |
| React Native | 0.75.4 |
| Java (JDK) | 17 |
| Android Studio | 最新稳定版 |
| Xcode | ≥ 15（仅 Mac） |

## 🚀 快速启动（Mac）

```bash
# 1. 克隆代码
git clone <your-github-repo-url>
cd "Risk Alert RN"

# 2. 安装依赖
npm install

# 3. iOS 需要额外安装 Pods
cd ios && pod install && cd ..

# 4. 运行（选择其一）
npm run android     # 启动 Android 模拟器
npm run ios         # 启动 iOS 模拟器（需要 Mac + Xcode）
```

## 🔑 GitHub Secrets 配置（用于自动打包）

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中添加：

| Secret 名称 | 说明 |
|------------|------|
| `ANDROID_KEYSTORE_BASE64` | 签名 keystore 的 base64 编码（`base64 -i release.keystore` 生成）|
| `ANDROID_KEY_ALIAS` | keyAlias |
| `ANDROID_KEY_PASSWORD` | keyPassword |
| `ANDROID_STORE_PASSWORD` | storePassword |
| `GOOGLE_SERVICES_JSON` | Firebase 的 google-services.json 内容（字符串）|

## 🔥 Firebase 配置步骤

1. 前往 [Firebase Console](https://console.firebase.google.com) 创建项目
2. 添加 Android 应用（包名：`com.riskalertrn`）
3. 下载 `google-services.json` 放到 `android/app/` 目录
4. 添加 iOS 应用，下载 `GoogleService-Info.plist` 放到 `ios/RiskAlertRN/`
5. 在 Firebase Console 的 Cloud Messaging 中上传 APNs 证书（需要苹果开发者账号）

## 📲 推送通道说明

### Android
- 通知渠道 ID：`high_risk_channel`
- 优先级：HIGH（无视静音模式）
- 自定义声音：将 `critical_alarm.wav` 放入 `android/app/src/main/res/raw/`

### iOS（需要开发者账号）
- 在 Xcode 开启 Push Notifications Capability
- 将 `critical_alarm.caf` 添加到 Xcode 项目的 Bundle Resources
- 推送 Payload 中 `sound: "critical_alarm.caf"`

## 📁 关键文件说明

```
src/
├── theme/colors.ts           # 🎨 修改主题色彩
├── i18n/en.json, zh.json     # 🌐 修改文案/翻译
├── services/PushService.ts   # 📲 推送通道配置
└── screens/                  # 📱 各页面业务逻辑
```
