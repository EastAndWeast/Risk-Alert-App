/**
 * AccountsScreen — 账户列表
 * 复刻 Web 版 accounts.html
 */
import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Search} from 'lucide-react-native';
import {useTheme} from '../theme/ThemeContext';
import GlassCard from '../components/GlassCard';
import KVRow from '../components/KVRow';

const MOCK_ACCOUNTS = [
  {id: '10102', company: 'Demo Company A', platform: 'MT4', pStyle: 'primary', balance: '$24,500.00', equity: '$24,000.00', margin: '850%', marginClass: 'success', alerts: 3},
  {id: '20888', company: 'Global Trading Inc', platform: 'MT5', pStyle: 'success', balance: '$150,000.00', equity: '$90,000.00', margin: '120%', marginClass: 'danger', alerts: 12},
  {id: '55500', company: 'Demo Company A', platform: 'MT4', pStyle: 'primary', balance: '$5,000.00', equity: '$5,200.00', margin: '450%', marginClass: 'warning', alerts: 0},
  {id: '77701', company: 'Asia Market Corp', platform: 'API', pStyle: 'success', balance: '$880,000.00', equity: '$880,000.00', margin: '999%', marginClass: 'success', alerts: 1},
];

export default function AccountsScreen() {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');

  const marginColors: Record<string, string> = {
    success: colors.successColor,
    warning: colors.warningColor,
    danger: colors.dangerColor,
  };

  const filtered = MOCK_ACCOUNTS.filter(a =>
    a.id.includes(search) || a.company.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={[styles.safe, {backgroundColor: colors.bgColor}]}>
      <View style={[styles.header, {backgroundColor: colors.glHeaderBg, borderBottomColor: colors.borderColor}]}>
        <Text style={[styles.headerTitle, {color: colors.textMain}]}>
          {t('title_clients')}
        </Text>
        <View style={[styles.searchBar, {borderColor: colors.borderColor, backgroundColor: colors.glInputBg}]}>
          <Search size={18} color={colors.textMuted} style={{marginRight: 10}} />
          <TextInput
            style={[styles.searchInput, {color: colors.textMain}]}
            placeholder={t('search_acc')}
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={a => a.id}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <GlassCard>
            <View style={styles.cardTop}>
              <Text style={[styles.accId, {color: colors.textMain}]}>{item.id}</Text>
              <View style={{flexDirection: 'row', gap: 6}}>
                <View style={[styles.badge, {backgroundColor: item.pStyle === 'primary' ? 'rgba(37,99,235,0.1)' : 'rgba(16,185,129,0.1)'}]}>
                  <Text style={{fontSize: 10, fontWeight: '700', color: item.pStyle === 'primary' ? '#2563eb' : '#10b981'}}>
                    {item.platform}
                  </Text>
                </View>
                {item.alerts > 0 && (
                  <View style={[styles.badge, {backgroundColor: colors.dangerColor}]}>
                    <Text style={{fontSize: 10, fontWeight: '700', color: 'white'}}>
                      {item.alerts} Alerts
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <KVRow label={t('lbl_company')} value={item.company} />
            <KVRow label={t('lbl_balance')} value={item.balance} />
            <KVRow label={t('lbl_equity')} value={item.equity} />
            <KVRow
              label={t('lbl_margin')}
              value={
                <Text style={{color: marginColors[item.marginClass], fontWeight: '700', textAlign: 'right'}}>
                  {item.margin}
                </Text>
              }
              noBorder
            />
            <TouchableOpacity
              style={[styles.profileBtn, {borderColor: colors.borderColor}]}
              onPress={() => navigation.navigate('AccountProfile', {accountId: item.id})}>
              <Text style={[styles.profileBtnText, {color: colors.primaryColor}]}>
                {t('btn_profile')}
              </Text>
            </TouchableOpacity>
          </GlassCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  header: {paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, borderBottomWidth: 1},
  headerTitle: {fontSize: 26, fontWeight: '700', letterSpacing: -0.5, marginBottom: 12},
  searchBar: {flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10},
  searchInput: {flex: 1, fontSize: 15},
  list: {padding: 20},
  cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: StyleSheet.hairlineWidth},
  accId: {fontSize: 20, fontWeight: '700', letterSpacing: -0.3},
  badge: {paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8},
  profileBtn: {marginTop: 16, borderWidth: 1, borderRadius: 10, paddingVertical: 12, alignItems: 'center'},
  profileBtnText: {fontSize: 14, fontWeight: '600'},
});
