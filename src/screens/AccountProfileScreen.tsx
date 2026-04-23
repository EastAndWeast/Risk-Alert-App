/**
 * AccountProfileScreen — 账户画像详情
 * 复刻 Web 版 account-profile.html
 */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {CreditCard, Activity, BellRing, UserCheck} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import GlassCard from '../components/GlassCard';
import KVRow from '../components/KVRow';

const PROFILE_DATA: Record<string, any> = {
  '10102': {platform: 'MT4', company: 'Demo Company A', datasource: 'Alpha MT4', currency: 'USD', balance: '$24,500.00', equity: '$24,000.00', margin_level: 850, margin_class: 'success', free_margin: '$22,100.00', open_lots: '2.40', open_positions: 3, leverage: '1:200', group: 'Alpha_Standard', created_at: '2023-08-15', email: 'client10102@demo.com', country: 'Hong Kong', kyc_status: 'Verified', risk_level: 'Low', alerts: [{rule: 'Large Trade (Lots)', time: '2025-04-11 14:22', severity: 'warning'}, {rule: 'Scalping', time: '2025-04-09 09:45', severity: 'danger'}]},
  '20888': {platform: 'MT5', company: 'Global Trading Inc', datasource: 'Beta MT5', currency: 'USD', balance: '$150,000.00', equity: '$90,000.00', margin_level: 120, margin_class: 'danger', free_margin: '$12,300.00', open_lots: '28.50', open_positions: 11, leverage: '1:100', group: 'Beta_VIP', created_at: '2022-03-01', email: 'trader20888@gtinc.com', country: 'Singapore', kyc_status: 'Verified', risk_level: 'High', alerts: [{rule: 'Exposure Alert', time: '2025-04-11 16:50', severity: 'danger'}, {rule: 'Large Trade (USD)', time: '2025-04-11 10:12', severity: 'danger'}]},
};

export default function AccountProfileScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const route = useRoute<any>();
  const accountId = route.params?.accountId ?? '20888';
  const p = PROFILE_DATA[accountId];

  const marginColors: Record<string, string> = {success: colors.successColor, warning: colors.warningColor, danger: colors.dangerColor};
  const riskColors: Record<string, string> = {Low: '#10b981', Medium: '#f59e0b', High: '#ef4444'};
  const severityColors: Record<string, string> = {danger: colors.dangerColor, warning: colors.warningColor, info: colors.infoColor};

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Summary Chips */}
        <View style={styles.chips}>
          {[
            {icon: '💱', label: p.currency},
            {icon: '📊', label: `${p.open_positions} Open`},
            {icon: '⚡', label: p.leverage},
            {icon: '🛡', label: `Risk: ${p.risk_level}`, color: riskColors[p.risk_level]},
          ].map((chip, i) => (
            <View key={i} style={[styles.chip, {backgroundColor: colors.cardBg, borderColor: colors.borderColor}]}>
              <Text>{chip.icon}</Text>
              <Text style={{fontSize: 12, fontWeight: '600', color: chip.color ?? colors.textMain}}>{chip.label}</Text>
            </View>
          ))}
        </View>

        {/* Account Info */}
        <GlassCard style={{marginBottom: 16}}>
          <View style={styles.sectionHeader}>
            <CreditCard size={14} color={colors.textMuted} />
            <Text style={[styles.sectionTitle, {color: colors.textMuted}]}>{t('lbl_acct_info')}</Text>
          </View>
          <KVRow label={t('lbl_company')} value={p.company} />
          <KVRow label={t('lbl_datasource')} value={p.datasource} />
          <KVRow label={t('lbl_platform')} value={p.platform} />
          <KVRow label={t('lbl_group')} value={p.group} />
          <KVRow label={t('lbl_balance')} value={p.balance} />
          <KVRow label={t('lbl_equity')} value={p.equity} noBorder />
        </GlassCard>

        {/* Risk Metrics */}
        <GlassCard style={{marginBottom: 16}}>
          <View style={styles.sectionHeader}>
            <Activity size={14} color={colors.textMuted} />
            <Text style={[styles.sectionTitle, {color: colors.textMuted}]}>{t('lbl_risk')}</Text>
          </View>
          <KVRow
            label={t('lbl_margin')}
            value={<Text style={{color: marginColors[p.margin_class], fontWeight: '700', textAlign: 'right'}}>{p.margin_level}%</Text>}
          />
          <KVRow label={t('lbl_free_margin')} value={p.free_margin} />
          <KVRow label={t('lbl_open_lots')} value={`${p.open_lots} lots`} />
          <KVRow label={t('lbl_leverage')} value={p.leverage} noBorder />
        </GlassCard>

        {/* Recent Alerts */}
        <GlassCard style={{marginBottom: 16, paddingHorizontal: 0, paddingVertical: 0}}>
          <View style={[styles.sectionHeader, {paddingHorizontal: 20, paddingTop: 16}]}>
            <BellRing size={14} color={colors.textMuted} />
            <Text style={[styles.sectionTitle, {color: colors.textMuted}]}>
              {t('lbl_alert_hist')} ({p.alerts.length})
            </Text>
          </View>
          {p.alerts.length === 0 ? (
            <Text style={{color: colors.textMuted, textAlign: 'center', padding: 24}}>{t('no_recent_alerts')}</Text>
          ) : (
            p.alerts.map((a: any, i: number) => (
              <View key={i} style={[styles.alertRow, {borderBottomColor: colors.borderColor, borderBottomWidth: i < p.alerts.length - 1 ? 1 : 0}]}>
                <View>
                  <Text style={[styles.alertRule, {color: colors.textMain}]}>{a.rule}</Text>
                  <Text style={[styles.alertTime, {color: colors.textMuted}]}>{a.time}</Text>
                </View>
                <View style={[styles.severityBadge, {backgroundColor: `${severityColors[a.severity]}20`}]}>
                  <Text style={{fontSize: 10, fontWeight: '700', color: severityColors[a.severity], textTransform: 'uppercase'}}>{a.severity}</Text>
                </View>
              </View>
            ))
          )}
        </GlassCard>

        {/* Compliance */}
        <GlassCard style={{marginBottom: 40}}>
          <View style={styles.sectionHeader}>
            <UserCheck size={14} color={colors.textMuted} />
            <Text style={[styles.sectionTitle, {color: colors.textMuted}]}>{t('lbl_compliance')}</Text>
          </View>
          <KVRow label={t('lbl_email')} value={p.email} />
          <KVRow label={t('lbl_country')} value={p.country} />
          <KVRow
            label={t('lbl_kyc')}
            value={
              <Text style={{color: p.kyc_status === 'Verified' ? colors.successColor : colors.warningColor, fontWeight: '700', textAlign: 'right'}}>
                {p.kyc_status === 'Verified' ? `✓ ${t('kyc_verified')}` : `⏳ ${t('kyc_pending')}`}
              </Text>
            }
          />
          <KVRow
            label={t('lbl_risk_level')}
            value={<Text style={{color: riskColors[p.risk_level], fontWeight: '700', textAlign: 'right'}}>{p.risk_level}</Text>}
            noBorder
          />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  scroll: {padding: 20},
  chips: {flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20},
  chip: {flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6},
  sectionHeader: {flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16},
  sectionTitle: {fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1},
  alertRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14},
  alertRule: {fontSize: 14, fontWeight: '600', marginBottom: 2},
  alertTime: {fontSize: 12},
  severityBadge: {paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8},
});
