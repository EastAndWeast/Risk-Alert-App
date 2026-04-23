/**
 * SettingsScreen — 设置页
 * 复刻 Web 版 settings.html：个人信息、通知偏好、主题/语言切换、安全设置
 */
import React, {useState} from 'react';
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Languages, BellRing, Volume2, Moon, ShieldCheck, LogOut, ChevronRight, RefreshCcw} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import {switchLanguage} from '../i18n';
import GlassCard from '../components/GlassCard';
import {UpdateService} from '../services/UpdateService';
import packageJson from '../../package.json';

export default function SettingsScreen() {
  const {colors, theme, toggleTheme} = useTheme();
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<any>();
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleLangSwitch = async (lang: 'en' | 'zh') => {
    await switchLanguage(lang);
    setLangSheetOpen(false);
  };

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <View style={[styles.header, {backgroundColor: colors.glHeaderBg, borderBottomColor: colors.borderColor}]}>
        <Text style={[styles.headerTitle, {color: colors.textMain}]}>{t('title_settings')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* 个人信息 */}
        <Text style={[styles.sectionLabel, {color: colors.primaryColor}]}>{t('sec_personal')}</Text>
        <GlassCard style={{marginBottom: 28}}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, {backgroundColor: colors.primaryColor}]}>
              <Text style={styles.avatarText}>AD</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.profileName, {color: colors.textMain}]}>admin_101</Text>
              <Text style={[styles.profileCompany, {color: colors.textMuted}]}>Demo Company A</Text>
            </View>
            <ChevronRight size={20} color={colors.textMuted} />
          </View>
        </GlassCard>

        {/* 通知与偏好 */}
        <Text style={[styles.sectionLabel, {color: colors.primaryColor}]}>{t('sec_notif')}</Text>
        <View style={[styles.settingsList, {backgroundColor: colors.cardBg, borderColor: colors.borderColor}]}>
          {/* 语言 */}
          <TouchableOpacity
            style={[styles.settingItem, {borderBottomColor: colors.borderColor}]}
            onPress={() => setLangSheetOpen(true)}>
            <View style={styles.settingLeft}>
              <Languages size={18} color={colors.textMuted} />
              <Text style={[styles.settingLabel, {color: colors.textMain}]}>{t('set_lang')}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
              <Text style={{color: colors.textMuted, fontSize: 14}}>
                {i18n.language === 'zh' ? '简体中文' : 'English'}
              </Text>
              <ChevronRight size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>

          {/* 推送 */}
          <View style={[styles.settingItem, {borderBottomColor: colors.borderColor}]}>
            <View style={styles.settingLeft}>
              <BellRing size={18} color={colors.primaryColor} />
              <Text style={[styles.settingLabel, {color: colors.textMain}]}>{t('set_push')}</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{false: 'rgba(120,120,120,0.2)', true: colors.successColor}}
              thumbColor="white"
            />
          </View>

          {/* 声音 */}
          <View style={[styles.settingItem, {borderBottomColor: colors.borderColor}]}>
            <View style={styles.settingLeft}>
              <Volume2 size={18} color={colors.dangerColor} />
              <Text style={[styles.settingLabel, {color: colors.textMain}]}>{t('set_sound')}</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={val => {
                setSoundEnabled(val);
                if (val) Alert.alert('Warning', 'Critical Alarm Sound will be appended to push payload.');
              }}
              trackColor={{false: 'rgba(120,120,120,0.2)', true: colors.successColor}}
              thumbColor="white"
            />
          </View>

          {/* 深色模式 */}
          <View style={[styles.settingItem, {borderBottomWidth: 0}]}>
            <View style={styles.settingLeft}>
              <Moon size={18} color={colors.textMuted} />
              <Text style={[styles.settingLabel, {color: colors.textMain}]}>{t('set_theme')}</Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{false: 'rgba(120,120,120,0.2)', true: colors.primaryColor}}
              thumbColor="white"
            />
          </View>
        </View>

        {/* 安全 */}
        <Text style={[styles.sectionLabel, {color: colors.primaryColor, marginTop: 28}]}>{t('sec_sec')}</Text>
        <View style={[styles.settingsList, {backgroundColor: colors.cardBg, borderColor: colors.borderColor}]}>
          <TouchableOpacity
            style={[styles.settingItem, {borderBottomColor: colors.borderColor}]}
            onPress={() => navigation.navigate('Security')}>
            <View style={styles.settingLeft}>
              <ShieldCheck size={18} color={colors.textMuted} />
              <Text style={[styles.settingLabel, {color: colors.textMain}]}>{t('set_security_detail')}</Text>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.settingItem, {borderBottomColor: colors.borderColor}]}
            onPress={() => UpdateService.checkForUpdates(false)}>
            <View style={styles.settingLeft}>
              <RefreshCcw size={18} color={colors.primaryColor} />
              <Text style={[styles.settingLabel, {color: colors.textMain}]}>Check for Updates</Text>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, {borderBottomWidth: 0}]}>
            <View style={styles.settingLeft}>
              <LogOut size={18} color={colors.dangerColor} />
              <Text style={[styles.settingLabel, {color: colors.dangerColor}]}>{t('set_logout')}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.version, {color: colors.textMuted}]}>
          Risk Alert Pro Terminal{'\n'}Version {packageJson.version}
        </Text>
      </ScrollView>

      {/* 语言选择底部抽屉 */}
      <Modal visible={langSheetOpen} transparent animationType="slide" onRequestClose={() => setLangSheetOpen(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setLangSheetOpen(false)} />
        <View style={[styles.sheet, {backgroundColor: colors.glSheetBg, borderColor: colors.borderColor}]}>
          <Text style={[styles.sheetTitle, {color: colors.textMain}]}>Select Language</Text>
          {[{code: 'en', label: 'English'}, {code: 'zh', label: '简体中文'}].map(lang => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.langOption, {borderBottomColor: colors.borderColor}]}
              onPress={() => handleLangSwitch(lang.code as 'en' | 'zh')}>
              <Text style={[styles.langOptionText, {color: i18n.language === lang.code ? colors.primaryColor : colors.textMain}]}>
                {lang.label}
              </Text>
              {i18n.language === lang.code && <Text style={{color: colors.primaryColor}}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  header: {paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1},
  headerTitle: {fontSize: 26, fontWeight: '700', letterSpacing: -0.5},
  scroll: {padding: 20, paddingBottom: 60},
  sectionLabel: {fontSize: 11, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 4},
  profileRow: {flexDirection: 'row', alignItems: 'center', gap: 14},
  avatar: {width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center'},
  avatarText: {color: 'white', fontSize: 18, fontWeight: '700'},
  profileName: {fontSize: 17, fontWeight: '600'},
  profileCompany: {fontSize: 13, marginTop: 2},
  settingsList: {borderWidth: 1, borderRadius: 16, overflow: 'hidden'},
  settingItem: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1},
  settingLeft: {flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1},
  settingLabel: {fontSize: 15, fontWeight: '500'},
  version: {textAlign: 'center', fontSize: 12, marginTop: 36, lineHeight: 20},
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'},
  sheet: {borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, padding: 28, paddingBottom: 48},
  sheetTitle: {fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center'},
  langOption: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 1},
  langOptionText: {fontSize: 16, fontWeight: '500'},
});
