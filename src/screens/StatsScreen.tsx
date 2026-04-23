/**
 * StatsScreen — 数据仪表盘
 * 复刻 Web 版 stats.html：4 个 KPI 卡片 + 规则分布环形图
 */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {BellRing, Cog, UserX, CheckCircle} from 'lucide-react-native';
import {PieChart} from 'react-native-chart-kit';
import {useTheme} from '../theme/ThemeContext';
import GlassCard from '../components/GlassCard';

const SCREEN_WIDTH = Dimensions.get('window').width;

const RULE_DATA = [
  {name: 'Large Trade', population: 45, color: '#ef4444', legendFontColor: '#71717a', legendFontSize: 12},
  {name: 'Scalping',    population: 25, color: '#f59e0b', legendFontColor: '#71717a', legendFontSize: 12},
  {name: 'Exposure',    population: 20, color: '#8b5cf6', legendFontColor: '#71717a', legendFontSize: 12},
  {name: 'Fake IP',     population: 10, color: '#10b981', legendFontColor: '#71717a', legendFontSize: 12},
  {name: 'Others',      population: 24, color: '#cbd5e1', legendFontColor: '#71717a', legendFontSize: 12},
];

interface StatBoxProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  accentColor: string;
}

function StatBox({icon, value, label, accentColor}: StatBoxProps) {
  const {colors} = useTheme();
  return (
    <View
      style={[
        styles.statBox,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.borderColor,
          borderTopColor: accentColor,
        },
      ]}>
      {icon}
      <Text style={[styles.statValue, {color: colors.textMain}]}>{value}</Text>
      <Text style={[styles.statLabel, {color: colors.textMuted}]}>{label}</Text>
    </View>
  );
}

export default function StatsScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <View style={[styles.header, {backgroundColor: colors.glHeaderBg, borderBottomColor: colors.borderColor}]}>
        <Text style={[styles.headerTitle, {color: colors.textMain}]}>
          {t('title_dashboard')}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* KPI 网格 */}
        <View style={styles.statGrid}>
          <StatBox
            icon={<BellRing size={24} color={colors.dangerColor} />}
            value="124"
            label={t('stat_today')}
            accentColor={colors.dangerColor}
          />
          <StatBox
            icon={<Cog size={24} color={colors.successColor} />}
            value="42"
            label={t('stat_active')}
            accentColor={colors.successColor}
          />
          <StatBox
            icon={<UserX size={24} color={colors.dangerColor} />}
            value="18"
            label={t('stat_accs')}
            accentColor={colors.dangerColor}
          />
          <StatBox
            icon={<CheckCircle size={24} color={colors.warningColor} />}
            value="87%"
            label={t('stat_ratio')}
            accentColor={colors.warningColor}
          />
        </View>

        {/* 规则分布环形图 */}
        <GlassCard>
          <Text style={[styles.chartSectionLabel, {color: colors.textMuted}]}>
            {t('rule_dist')}
          </Text>
          <PieChart
            data={RULE_DATA}
            width={SCREEN_WIDTH - 80}
            height={200}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute={false}
          />
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {fontSize: 26, fontWeight: '700', letterSpacing: -0.5},
  scroll: {padding: 20},
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 20,
  },
  statBox: {
    width: '47%',
    borderWidth: 1,
    borderTopWidth: 2,
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  chartSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
});
