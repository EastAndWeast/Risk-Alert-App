/**
 * PushService — 原生推送服务
 *
 * Android: 使用 Notifee 创建 High Priority 通知渠道，绑定告警音
 * iOS:     请求 APNs 权限（需要开发者账号才能在真机上生效）
 * 共用:    获取 FCM Token 并上报后端
 */
import {Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export const CHANNEL_ID = 'high_risk_channel';

export class PushService {
  /**
   * 在 App 启动时调用，初始化推送通道
   */
  static async init() {
    if (Platform.OS === 'android') {
      await PushService.createAndroidChannel();
    } else if (Platform.OS === 'ios') {
      await PushService.requestIOSPermission();
    }

    // 处理后台消息（App 在后台被推送唤醒时触发）
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('[PushService] Background message:', remoteMessage);
      await PushService.displayForegroundNotification(remoteMessage);
    });

    // 处理前台消息（App 在前台时系统不自动展示，需要手动展示）
    messaging().onMessage(async remoteMessage => {
      console.log('[PushService] Foreground message:', remoteMessage);
      await PushService.displayForegroundNotification(remoteMessage);
    });
  }

  /**
   * Android: 创建高优先级通知渠道（绑定自定义告警音）
   * 对应架构文档中的 High_Risk_Channel
   */
  static async createAndroidChannel() {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Risk Alert — High Priority',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
      vibration: true,
      vibrationPattern: [300, 500, 300, 500],
      // sound: 'critical_alarm', // 启用后需在 android/app/src/main/res/raw/ 放置 critical_alarm.wav
    });
    console.log('[PushService] Android channel created:', CHANNEL_ID);
  }

  /**
   * iOS: 请求推送权限（需要开发者账号在真机上生效）
   */
  static async requestIOSPermission() {
    const authStatus = await messaging().requestPermission();
    console.log('[PushService] iOS permission status:', authStatus);
  }

  /**
   * 获取设备的 FCM Token 并返回（调用者负责上报后端）
   */
  static async getFCMToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      console.log('[PushService] FCM Token:', token);
      return token;
    } catch (e) {
      console.error('[PushService] Failed to get FCM token:', e);
      return null;
    }
  }

  /**
   * 上报 Token 到后端（登录成功后调用）
   */
  static async registerToken(userId: string) {
    const token = await PushService.getFCMToken();
    if (!token) return;

    // TODO: 替换为真实的后端 API
    console.log(`[PushService] Register token for user ${userId}:`, token);
    // await ApiService.post('/api/v1/device-tokens', {
    //   userId,
    //   token,
    //   osType: Platform.OS,
    // });
  }

  /**
   * 前台展示通知（当 App 在前台时手动调用 Notifee 展示）
   */
  static async displayForegroundNotification(remoteMessage: any) {
    const title = remoteMessage?.notification?.title ?? 'Risk Alert';
    const body =
      remoteMessage?.notification?.body ?? 'New alert triggered.';

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: CHANNEL_ID,
        pressAction: {id: 'default'},
        // sound: 'critical_alarm',  // 启用自定义声音时取消注释
      },
      ios: {
        // sound: 'critical_alarm.caf',  // iOS 自定义声音，需要开发者账号
        critical: true,
        criticalVolume: 1.0,
      },
    });
  }
}
