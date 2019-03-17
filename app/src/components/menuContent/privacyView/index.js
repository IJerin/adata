// src/components/menuContent/privacyView/index.js

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import I18n from '../../../util/i18n';
import baseStyles from '../styles';
import classStyles from './styles';

const styles = Object.assign(classStyles, baseStyles);

const PrivacyView = () => {
  const {
    contentContainerStyle,
    textStyle,
  } = styles;

  return (
    <ScrollView style={[contentContainerStyle, { flex: 1 }]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={textStyle}>{I18n.t('content.privacy')}</Text>
      </View>
    </ScrollView>
  );
};

export default PrivacyView;
