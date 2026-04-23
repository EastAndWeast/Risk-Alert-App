/**
 * KVRow — Key-Value 行组件
 * 复刻 Web 版 .kv-row / .kv-label / .kv-val
 */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';

interface KVRowProps {
  label: string;
  value: string | React.ReactNode;
  style?: ViewStyle;
  noBorder?: boolean;
}

export default function KVRow({label, value, style, noBorder}: KVRowProps) {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomColor: colors.borderColor,
          borderBottomWidth: noBorder ? 0 : StyleSheet.hairlineWidth,
        },
        style,
      ]}>
      <Text style={[styles.label, {color: colors.textMuted}]}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={[styles.value, {color: colors.textMain}]}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
});
