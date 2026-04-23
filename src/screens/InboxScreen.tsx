/**
 * InboxScreen — 告警收件箱
 * 复刻 Web 版 index.html：列表展示、搜索、过滤底部抽屉
 */
import React, {useState, useMemo, useCallback} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Search, SlidersHorizontal, Check} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import GlassCard from '../components/GlassCard';

// Mock 数据（与 Web 版 mockAlerts 完全一致）
const MOCK_ALERTS = [
  {
    id: 'Al_8xP2N',
    type: 'Large Trade (Lots)',
    rule: 'System LTL Check',
    src: 'Source-API-01',
    tTime: '2026-04-11 14:04:43',
    acc: '10102',
    prod: 'EURUSD',
    val: '50.0 手 | BUY',
    sum: '单笔超大手量报警',
    severity: 'danger',
    read: false,
    timeCat: 'today',
  },
  {
    id: 'Al_2mK9X',
    type: 'Large Trade (USD)',
    rule: 'USD Giant Alert',
    src: 'Source-API-02',
    tTime: '2026-04-11 14:05:00',
    acc: '20888',
    prod: 'XAUUSD',
    val: '$150,000 | 100Lot',
    sum: '折算美金大额报警',
    severity: 'danger',
    read: false,
    timeCat: 'today',
  },
  {
    id: 'Al_5fT2Y',
    type: '监控异常对冲',
    rule: 'Hedge Arbitrage',
    src: 'MT4-Cluster-01',
    tTime: '2026-04-09 15:00:01',
    acc: '101 & 102',
    prod: 'EURUSD',
    val: '15手相撞',
    sum: '疑似同设备双向套利',
    severity: 'danger',
    read: true,
    timeCat: '7days',
  },
  {
    id: 'Al_1cZ9B',
    type: '伪装 IP',
    rule: 'Geo Roaming Check',
    src: 'Server-Proxy',
    tTime: '2026-04-01 14:55:10',
    acc: '10283',
    prod: '-',
    val: '登录迪拜',
    sum: '异常网络请求',
    severity: 'info',
    read: true,
    timeCat: 'all',
  },
];

type TimeCat = 'all' | 'today' | '7days';

export default function InboxScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<any>();

  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeCat>('all');

  // 过滤逻辑（完全对应 Web 版 applyFilter）
  const filtered = useMemo(() => {
    return MOCK_ALERTS.filter(a => {
      if (unreadOnly && a.read) return false;
      if (timeRange === 'today' && a.timeCat !== 'today') return false;
      if (
        timeRange === '7days' &&
        a.timeCat !== 'today' &&
        a.timeCat !== '7days'
      )
        return false;
      if (
        search &&
        !a.acc.includes(search) &&
        !a.id.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [unreadOnly, timeRange, search]);

  const severityColors: Record<string, string> = {
    danger: colors.dangerColor,
    warning: colors.warningColor,
    info: colors.infoColor,
  };

  const renderItem = useCallback(
    ({item}: {item: (typeof MOCK_ALERTS)[0]}) => (
      <GlassCard
        leftAccentColor={item.read ? undefined : colors.primaryColor}
        dimmed={item.read}>
        {/* 标题行 */}
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.statusDot,
              {backgroundColor: severityColors[item.severity]},
            ]}
          />
          <Text style={[styles.cardType, {color: colors.textMain}]}>
            {item.type}
          </Text>
          {!item.read && (
            <View
              style={[
                styles.newBadge,
                {
                  backgroundColor: colors.dangerLight,
                  borderColor: colors.borderColor,
                },
              ]}>
              <Text style={[styles.newBadgeText, {color: colors.primaryColor}]}>
                NEW
              </Text>
            </View>
          )}
        </View>

        {/* 内容 */}
        <View style={styles.cardRow}>
          <Text style={[styles.rowLabel, {color: colors.textMuted}]}>
            Account ID:
          </Text>
          <Text style={[styles.rowValue, {color: colors.textMain, fontWeight: '700'}]}>
            {item.acc}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.rowLabel, {color: colors.textMuted}]}>
            Product:
          </Text>
          <Text style={[styles.rowValue, {color: colors.textMain}]}>
            {item.prod}
          </Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={[styles.rowLabel, {color: colors.textMuted}]}>
            Value:
          </Text>
          <Text style={[styles.rowValue, {color: colors.textMain, fontWeight: '700'}]}>
            {item.val}
          </Text>
        </View>
        <View style={[styles.cardRow, {marginBottom: 12}]}>
          <Text style={[styles.rowLabel, {color: colors.textMuted}]}>
            Summary:
          </Text>
          <Text style={[styles.rowValue, {color: colors.textMain}]}>
            {item.sum}
          </Text>
        </View>

        {/* 按钮 */}
        <TouchableOpacity
          style={[styles.detailBtn, {borderColor: colors.borderColor}]}
          onPress={() =>
            navigation.navigate('AlertDetail', {alertId: item.id})
          }>
          <Text style={[styles.detailBtnText, {color: colors.primaryColor}]}>
            {t('btn_view_detail')}
          </Text>
        </TouchableOpacity>
      </GlassCard>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors, navigation, t],
  );

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      {/* Header */}
      <View style={[styles.header, {backgroundColor: colors.glHeaderBg, borderBottomColor: colors.borderColor}]}>
        <View style={styles.headerTop}>
          <Text style={[styles.headerTitle, {color: colors.textMain}]}>
            {t('title_inbox')}
          </Text>
          <TouchableOpacity onPress={() => setFilterOpen(true)}>
            <SlidersHorizontal
              size={22}
              color={
                unreadOnly || timeRange !== 'all'
                  ? colors.primaryColor
                  : colors.textMuted
              }
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBar, {backgroundColor: colors.glInputBg, borderColor: colors.borderColor}]}>
          <Search size={18} color={colors.textMuted} style={{marginRight: 10}} />
          <TextInput
            style={[styles.searchInput, {color: colors.textMain}]}
            placeholder={t('search_alert')}
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* 列表 */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, {color: colors.textMuted}]}>
            {t('no_alert')}
          </Text>
        }
      />

      {/* 过滤底部抽屉 */}
      <Modal
        visible={filterOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterOpen(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setFilterOpen(false)}
        />
        <View style={[styles.sheet, {backgroundColor: colors.glSheetBg, borderColor: colors.borderColor}]}>
          <Text style={[styles.sheetTitle, {color: colors.textMain}]}>
            {t('title_filter')}
          </Text>

          {/* Status */}
          <Text style={[styles.sheetSectionLabel, {color: colors.textMuted}]}>
            Status
          </Text>
          <TouchableOpacity
            style={[styles.sheetOption, {borderBottomColor: colors.borderColor}]}
            onPress={() => setUnreadOnly(!unreadOnly)}>
            <Text style={[styles.sheetOptionText, {color: colors.textMain}]}>
              {t('filter_unread_only')}
            </Text>
            {unreadOnly && <Check size={18} color={colors.primaryColor} />}
          </TouchableOpacity>

          {/* Time Range */}
          <Text style={[styles.sheetSectionLabel, {color: colors.textMuted}]}>
            {t('filter_time_range')}
          </Text>
          {(['all', 'today', '7days'] as TimeCat[]).map(range => (
            <TouchableOpacity
              key={range}
              style={[styles.sheetOption, {borderBottomColor: colors.borderColor}]}
              onPress={() => setTimeRange(range)}>
              <Text style={[styles.sheetOptionText, {color: colors.textMain}]}>
                {t(`time_${range}`)}
              </Text>
              {timeRange === range && (
                <Check size={18} color={colors.primaryColor} />
              )}
            </TouchableOpacity>
          ))}

          {/* Buttons */}
          <View style={styles.sheetBtns}>
            <TouchableOpacity
              style={[styles.sheetBtnOutline, {borderColor: colors.borderColor}]}
              onPress={() => setFilterOpen(false)}>
              <Text style={{color: colors.textMain, fontWeight: '600'}}>
                {t('btn_cancel')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sheetBtnPrimary, {backgroundColor: colors.ctaColor}]}
              onPress={() => setFilterOpen(false)}>
              <Text style={{color: 'white', fontWeight: '700'}}>
                {t('btn_apply')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {fontSize: 26, fontWeight: '700', letterSpacing: -0.5},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {flex: 1, fontSize: 15},
  list: {padding: 20, paddingBottom: 40},
  empty: {textAlign: 'center', padding: 40, fontSize: 14},
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  cardType: {fontSize: 16, fontWeight: '700', flex: 1},
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
  },
  newBadgeText: {fontSize: 10, fontWeight: '700'},
  cardRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  rowLabel: {fontSize: 13, fontWeight: '500', minWidth: 90},
  rowValue: {fontSize: 13, flex: 1},
  detailBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  detailBtnText: {fontSize: 14, fontWeight: '600'},
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'},
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    padding: 28,
    paddingBottom: 48,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  sheetSectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
  },
  sheetOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sheetOptionText: {fontSize: 16, fontWeight: '500'},
  sheetBtns: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  sheetBtnOutline: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sheetBtnPrimary: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
});
