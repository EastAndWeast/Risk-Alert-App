/**
 * AlertDetailScreen — 告警详情
 * 复刻 Web 版 detail.html：触发值快照 + 客户信息 + 规则详情 + 底部解决按钮
 */
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Zap, User, Settings} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import GlassCard from '../components/GlassCard';
import KVRow from '../components/KVRow';

export default function AlertDetailScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleResolve = () => {
    Alert.alert('Resolved', t('resolve_success'), [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>

        {/* 核心触发值快照（高亮红色边框） */}
        <View
          style={[
            styles.triggerCard,
            {
              borderColor: colors.dangerColor,
              backgroundColor: colors.cardBg,
              shadowColor: colors.dangerColor,
            },
          ]}>
          <View
            style={[
              styles.triggerTitle,
              {backgroundColor: colors.dangerLight, borderBottomColor: colors.dangerColor},
            ]}>
            <Zap size={16} color={colors.dangerColor} />
            <Text style={[styles.triggerTitleText, {color: colors.dangerColor}]}>
              Trigger Value
            </Text>
          </View>
          <View style={styles.triggerBody}>
            <Text style={[styles.triggerLabel, {color: colors.textMuted}]}>
              Large Trade Size (Lots)
            </Text>
            <Text style={[styles.triggerValue, {color: colors.dangerColor}]}>
              50.0 Lots
            </Text>
            <View style={[styles.directionChip, {backgroundColor: 'rgba(0,0,0,0.05)'}]}>
              <Text style={{fontSize: 12, fontWeight: '600', color: colors.textMain}}>
                Direction: BUY
              </Text>
            </View>
          </View>
        </View>

        {/* 客户信息 */}
        <GlassCard style={{marginBottom: 16}}>
          <View style={styles.sectionHeader}>
            <User size={16} color={colors.infoColor} />
            <Text style={[styles.sectionTitle, {color: colors.textMuted}]}>
              Client Info
            </Text>
          </View>
          <KVRow
            label="Account ID"
            value={
              <Text style={{color: colors.primaryColor, fontWeight: '600'}}>
                10102
              </Text>
            }
          />
          <KVRow label="Company" value="Demo Company A" />
          <KVRow
            label="Platform"
            value={
              <View style={[styles.platformBadge, {backgroundColor: colors.primaryColor}]}>
                <Text style={styles.platformBadgeText}>MT4</Text>
              </View>
            }
          />
          <KVRow label="Product" value="EURUSD" />
          <KVRow label="Data Source" value="8.219.250.171:443 (Demo1)" />
          <KVRow label="Trigger Time" value="2026-04-11 14:04:43" noBorder />
        </GlassCard>

        {/* 规则详情 */}
        <GlassCard style={{marginBottom: 100}}>
          <View style={styles.sectionHeader}>
            <Settings size={16} color={colors.warningColor} />
            <Text style={[styles.sectionTitle, {color: colors.textMuted}]}>
              Rule Settings
            </Text>
          </View>
          <Text style={[styles.ruleName, {color: colors.textMain}]}>
            System LTL Check (Large Trade Lots)
          </Text>
          <Text style={[styles.ruleDesc, {color: colors.textMuted}]}>
            Monitors if a single trade exceeds the configured lot threshold.
          </Text>
          <KVRow label="Target Groups" value="All" />
          <KVRow label="Threshold Lots" value="> 0.05" />
          <KVRow label="Direction" value="ALL" noBorder />
        </GlassCard>
      </ScrollView>

      {/* 底部固定解决按钮 */}
      <View
        style={[
          styles.bottomBar,
          {backgroundColor: colors.glNavBg, borderTopColor: colors.borderColor},
        ]}>
        <TouchableOpacity
          style={[styles.resolveBtn, {backgroundColor: colors.successColor}]}
          onPress={handleResolve}>
          <Text style={styles.resolveBtnText}>{t('btn_resolve')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  scroll: {padding: 20},
  triggerCard: {
    borderWidth: 2,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  triggerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderBottomWidth: 1,
  },
  triggerTitleText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  triggerBody: {alignItems: 'center', padding: 24},
  triggerLabel: {fontSize: 13, marginBottom: 8},
  triggerValue: {fontSize: 36, fontWeight: '800', marginBottom: 12, letterSpacing: -1},
  directionChip: {paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20},
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  platformBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  platformBadgeText: {fontSize: 11, color: 'white', fontWeight: '700'},
  ruleName: {fontSize: 15, fontWeight: '700', marginBottom: 6},
  ruleDesc: {fontSize: 12, marginBottom: 16, lineHeight: 18},
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopWidth: 1,
  },
  resolveBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resolveBtnText: {color: 'white', fontWeight: '700', fontSize: 16},
});
