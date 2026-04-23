/**
 * LoginScreen — 登录页
 * 复刻 Web 版 login.html，支持账密登录 + Face ID 按钮（预留）
 */
import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ShieldAlert, ScanFace} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import {PushService} from '../services/PushService';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  navigation?: any;
}

export default function LoginScreen({onLoginSuccess}: LoginScreenProps) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [username, setUsername] = useState('admin_101');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter your username and password.');
      return;
    }
    setLoading(true);
    // 模拟登录延迟（替换为真实 API 调用）
    setTimeout(async () => {
      setLoading(false);
      try {
        // 尝试注册推送 Token（不应阻塞登录）
        await PushService.registerToken(username);
      } catch (e) {
        console.log('[Login] Push registration error:', e);
      }
      onLoginSuccess();
    }, 800);
  };

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <View
            style={[
              styles.logoBox,
              {
                backgroundColor: colors.primaryColor,
                shadowColor: colors.primaryColor,
              },
            ]}>
            <ShieldAlert color="white" size={32} strokeWidth={2} />
          </View>
          <Text style={[styles.title, {color: colors.textMain}]}>
            {t('title_login')}
          </Text>
          <Text style={[styles.subtitle, {color: colors.textMuted}]}>
            {t('login_sub')}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.inputLabel, {color: colors.textMuted}]}>
            Admin ID
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.borderColor,
                color: colors.textMain,
              },
            ]}
            placeholder={t('ph_email')}
            placeholderTextColor={colors.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.inputLabel, {color: colors.textMuted}]}>
            {t('ph_pwd')}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.borderColor,
                color: colors.textMain,
              },
            ]}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.btnPrimary, {backgroundColor: colors.ctaColor}]}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.btnPrimaryText}>
              {loading ? 'Logging in...' : t('btn_login')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.btnBiometric,
              {borderColor: colors.borderColor},
            ]}
            onPress={() =>
              Alert.alert(
                'Face ID',
                'Biometric authentication will be available after signing in.',
              )
            }>
            <ScanFace
              size={18}
              color={colors.primaryColor}
              style={{marginRight: 8}}
            />
            <Text style={[styles.btnBiometricText, {color: colors.primaryColor}]}>
              {t('btn_faceid')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  container: {flex: 1, justifyContent: 'center', padding: 32},
  logoSection: {alignItems: 'center', marginBottom: 40},
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {fontSize: 24, fontWeight: '700', marginBottom: 4},
  subtitle: {fontSize: 14},
  form: {gap: 0},
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    fontWeight: '400',
  },
  btnPrimary: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  btnPrimaryText: {color: 'white', fontWeight: '700', fontSize: 16},
  btnBiometric: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 12,
  },
  btnBiometricText: {fontWeight: '600', fontSize: 15},
});
