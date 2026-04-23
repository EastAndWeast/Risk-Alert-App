/**
 * SecurityScreen — 安全与设备管理
 * 复刻 Web 版 security.html：密码修改、Face ID、在线设备踢出
 */
import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {KeyRound, ScanFace, Smartphone, Monitor, ChevronRight} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';

export default function SecurityScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [ghostRevoked, setGhostRevoked] = useState(false);

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* 认证设置 */}
        <Text style={[styles.sectionLabel, {color: colors.primaryColor}]}>{t('sec_auth')}</Text>
        <View style={[styles.list, {backgroundColor: colors.cardBg, borderColor: colors.borderColor}]}>
          <TouchableOpacity
            style={[styles.item, {borderBottomColor: colors.borderColor}]}
            onPress={() => Alert.alert('Password', 'Proceeding to Password Change Flow...')}>
            <View style={styles.left}>
              <KeyRound size={18} color={colors.textMuted} />
              <Text style={[styles.itemLabel, {color: colors.textMain}]}>{t('auth_pwd')}</Text>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
          <View style={[styles.item, {borderBottomWidth: 0}]}>
            <View style={styles.left}>
              <ScanFace size={18} color={colors.primaryColor} />
              <Text style={[styles.itemLabel, {color: colors.textMain}]}>{t('auth_bio')}</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={val => {
                setBiometricEnabled(val);
                Alert.alert('Biometric', 'Revoking or granting local Biometric hardware keys...');
              }}
              trackColor={{false: 'rgba(120,120,120,0.2)', true: colors.successColor}}
              thumbColor="white"
            />
          </View>
        </View>

        {/* 在线设备 */}
        <Text style={[styles.sectionLabel, {color: colors.primaryColor, marginTop: 28}]}>{t('sec_active')}</Text>
        <View style={[styles.list, {backgroundColor: colors.cardBg, borderColor: colors.borderColor}]}>
          {/* 当前设备 */}
          <View style={[styles.deviceRow, {borderBottomColor: colors.borderColor}]}>
            <View style={styles.deviceLeft}>
              <Smartphone size={28} color={colors.successColor} />
              <View>
                <Text style={[styles.deviceName, {color: colors.textMain}]}>Apple iPhone 15 Pro</Text>
                <Text style={[styles.deviceSub, {color: colors.textMuted}]}>
                  App Version · <Text style={{color: colors.textMuted}}>{t('dev_this')}</Text>
                </Text>
              </View>
            </View>
            <Text style={[styles.deviceActive, {color: colors.successColor}]}>{t('dev_active')}</Text>
          </View>

          {/* Ghost 设备 */}
          <View style={[styles.deviceRow, {borderBottomWidth: 0, opacity: ghostRevoked ? 0.35 : 1}]}>
            <View style={styles.deviceLeft}>
              <Monitor size={28} color={colors.textMuted} />
              <View>
                <Text style={[styles.deviceName, {color: colors.textMain}]}>Windows 11 Chrome</Text>
                <Text style={[styles.deviceSub, {color: colors.textMuted}]}>IP: 144.2.X.X · 2 Hours ago</Text>
              </View>
            </View>
            {!ghostRevoked ? (
              <TouchableOpacity
                style={[styles.kickBtn, {borderColor: colors.dangerColor}]}
                onPress={() => {
                  Alert.alert('Security Action', 'Terminating token for the Windows Chrome session remotely...');
                  setGhostRevoked(true);
                }}>
                <Text style={{color: colors.dangerColor, fontSize: 11, fontWeight: '700'}}>{t('btn_kill')}</Text>
              </TouchableOpacity>
            ) : (
              <Text style={{fontSize: 11, color: colors.textMuted, fontWeight: '600'}}>Revoked</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  scroll: {padding: 20, paddingBottom: 60},
  sectionLabel: {fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4},
  list: {borderWidth: 1, borderRadius: 16, overflow: 'hidden'},
  item: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1},
  left: {flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1},
  itemLabel: {fontSize: 15, fontWeight: '500'},
  deviceRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1},
  deviceLeft: {flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1},
  deviceName: {fontSize: 15, fontWeight: '600'},
  deviceSub: {fontSize: 12, marginTop: 2},
  deviceActive: {fontSize: 12, fontWeight: '700'},
  kickBtn: {borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6},
});
