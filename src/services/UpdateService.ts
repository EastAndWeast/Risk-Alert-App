/**
 * UpdateService — 自动更新服务
 * 
 * 逻辑：
 * 1. 从 GitHub API 获取最新的 Release 信息
 * 2. 对比本地版本号与远程版本号
 * 3. 如果有更新，引导用户去下载页
 */
import {Alert, Linking} from 'react-native';
import packageJson from '../../package.json';

const GITHUB_OWNER = 'EastAndWeast';
const GITHUB_REPO = 'Risk-Alert-App';
const CURRENT_VERSION = `v${packageJson.version}`; // 例如 v1.0.0

export class UpdateService {
  /**
   * 检查更新
   * @param silent 是否静默检查（如果为 false，则没有更新时也会弹窗告知）
   */
  static async checkForUpdates(silent = true) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
      );
      const data = await response.json();

      if (!data || !data.tag_name) {
        if (!silent) {
          Alert.alert('Notice', 'No update information found.');
        }
        return;
      }

      const latestVersion = data.tag_name;
      const downloadUrl = data.html_url;

      // 简单的版本比对：如果标签不一致，则认为有更新（因为我们目前是按构建编号递增的）
      if (latestVersion !== CURRENT_VERSION) {
        Alert.alert(
          'New Update Available',
          `A new version (${latestVersion}) is available. Would you like to download it now?\n\nCurrent: ${CURRENT_VERSION}`,
          [
            {text: 'Later', style: 'cancel'},
            {
              text: 'Download Now',
              onPress: () => Linking.openURL(downloadUrl),
            },
          ],
        );
      } else {
        if (!silent) {
          Alert.alert('Up to Date', `You are running the latest version (${CURRENT_VERSION}).`);
        }
      }
    } catch (error) {
      console.error('[UpdateService] Check failed:', error);
      if (!silent) {
        Alert.alert('Error', 'Failed to check for updates. Please check your internet connection.');
      }
    }
  }
}
