// src/components/menuContent/termsView/index.js

import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import I18n from '../../../util/i18n';
import baseStyles from '../styles';
import classStyles from './styles';

const styles = Object.assign(classStyles, baseStyles);

const TermsView = () => {
  const {
    contentContainerStyle,
    separatorContainerStyle,
    textStyle,
    titleTextStyle,
    largeTextStyle,
    boldTextStyle,
  } = styles;

  return (
    <ScrollView style={contentContainerStyle}>
      <Text style={largeTextStyle}>{I18n.t('content.terms.header')}</Text>
      <Text style={largeTextStyle}>{I18n.t('content.terms.lastUpdated')}: {I18n.t('content.terms.date')}</Text>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>{I18n.t('content.terms.introHeader')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>{I18n.t('content.terms.introParagraph')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>1. {I18n.t('content.terms.oneTitle')}</Text>
          {I18n.t('content.terms.oneDescription')}
        </Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>2. {I18n.t('content.terms.twoTitle')}</Text>
          {I18n.t('content.terms.twoPartOneDescription')}</Text>
        <View style={separatorContainerStyle}>
          <Text style={textStyle}>{I18n.t('content.terms.twoPartTwoDescription')}</Text>
          <View style={separatorContainerStyle}>
            <Text style={textStyle}>{I18n.t('content.terms.twoPartThreeDescription')}</Text>
          </View>
        </View>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>3. {I18n.t('content.terms.threeTitle')}</Text>
          {I18n.t('content.terms.threeDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>4. {I18n.t('content.terms.fourTitle')}</Text>
          {I18n.t('content.terms.fourDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>5. {I18n.t('content.terms.fiveTitle')}</Text>
          {I18n.t('content.terms.fivePartOneDescription')}</Text>
        <View style={separatorContainerStyle}>
          <Text style={textStyle}>{I18n.t('content.terms.fivePartTwoDescription')}</Text>
          <View style={separatorContainerStyle}>
            <Text style={textStyle}>{I18n.t('content.terms.fivePartThreeDescription')}</Text>
            <View style={separatorContainerStyle}>
              <Text style={textStyle}>{I18n.t('content.terms.fivePartFourDescription')}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>6. {I18n.t('content.terms.sixTitle')}</Text>
          {I18n.t('content.terms.sixDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>7. {I18n.t('content.terms.sevenTitle')}</Text>
          {I18n.t('content.terms.sevenDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>8. {I18n.t('content.terms.eightTitle')}</Text>
          {I18n.t('content.terms.eightPartOneDescription')}</Text>
        <View style={separatorContainerStyle}>
          <Text style={textStyle}>{I18n.t('content.terms.eightPartTwoDescription')}</Text>
        </View>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>9. {I18n.t('content.terms.nineTitle')}</Text>
          {I18n.t('content.terms.nineDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>10. {I18n.t('content.terms.tenTitle')}</Text>
          {I18n.t('content.terms.tenDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>11. {I18n.t('content.terms.elevenTitle')}</Text>
          {I18n.t('content.terms.elevenDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>12. {I18n.t('content.terms.twelveTitle')}</Text>
          {I18n.t('content.terms.twelveDescription')}</Text>
      </View>
      <View style={separatorContainerStyle}>
        <Text style={textStyle}>
          <Text style={titleTextStyle}>13. {I18n.t('content.terms.thirteenTitle')}</Text>
          {I18n.t('content.terms.thirteenDescription')}</Text>
      </View>
      <View style={[separatorContainerStyle, { marginBottom: 12 }]}>
        <Text style={boldTextStyle}>{I18n.t('content.terms.copyright')}</Text>
      </View>
    </ScrollView>
  );
};

export default TermsView;
