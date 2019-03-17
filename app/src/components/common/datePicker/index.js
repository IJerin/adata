// src/components/common/datePicker/index.js

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import I18n from '../../../util/i18n';
import Constants from '../../../util/Constants';
import styles from './styles';

const datePropTypes = {
  children: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  start: PropTypes.bool,
  end: PropTypes.bool,
  first: PropTypes.bool,
  last: PropTypes.bool,
};

const dateDefaultProps = {
  selected: false,
  start: false,
  end: false,
  first: false,
  last: false,
};

const DateOption = (props) => {
  const { children, selected, start, end, first, last } = props;
  const { dateContainerStyle, dateTextStyle, selectedDateTextStyle } = styles;

  let combinedStyle = dateContainerStyle;
  const BORDER_RADIUS = 24;

  if (selected) {
    const editedStyle = { backgroundColor: '#F5C323' };
    if (start && end) {
      editedStyle.borderRadius = BORDER_RADIUS;
    } else if (start) {
      editedStyle.borderTopLeftRadius = BORDER_RADIUS;
      editedStyle.borderBottomLeftRadius = BORDER_RADIUS;
    } else if (end) {
      editedStyle.borderTopRightRadius = BORDER_RADIUS;
      editedStyle.borderBottomRightRadius = BORDER_RADIUS;
    }

    if (first) {
      editedStyle.borderTopLeftRadius = BORDER_RADIUS;
      editedStyle.borderBottomLeftRadius = BORDER_RADIUS;
    }

    if (last) {
      editedStyle.borderTopRightRadius = BORDER_RADIUS;
      editedStyle.borderBottomRightRadius = BORDER_RADIUS;
    }
    combinedStyle = [dateContainerStyle, editedStyle];
  }

  return (
    <View style={combinedStyle}>
      <Text style={selected ? [dateTextStyle, selectedDateTextStyle] : dateTextStyle}>
        {children}
      </Text>
    </View>
  );
};

DateOption.propTypes = datePropTypes;
DateOption.defaultProps = dateDefaultProps;

const monthsArr = [
  { id: Constants.MONTHS.JANUARY, val: I18n.t('misc.months.january.short'), first: true },
  { id: Constants.MONTHS.FEBRUARY, val: I18n.t('misc.months.february.short') },
  { id: Constants.MONTHS.MARCH, val: I18n.t('misc.months.march.short') },
  { id: Constants.MONTHS.APRIL, val: I18n.t('misc.months.april.short') },
  { id: Constants.MONTHS.MAY, val: I18n.t('misc.months.may.short') },
  { id: Constants.MONTHS.JUNE, val: I18n.t('misc.months.june.short') },
  { id: Constants.MONTHS.JULY, val: I18n.t('misc.months.july.short') },
  { id: Constants.MONTHS.AUGUST, val: I18n.t('misc.months.august.short') },
  { id: Constants.MONTHS.SEPTEMBER, val: I18n.t('misc.months.september.short') },
  { id: Constants.MONTHS.OCTOBER, val: I18n.t('misc.months.october.short') },
  { id: Constants.MONTHS.NOVEMBER, val: I18n.t('misc.months.november.short') },
  { id: Constants.MONTHS.DECEMBER, val: I18n.t('misc.months.december.short'), last: true },
];

const datePickerPropTypes = {
  selectedMonths: PropTypes.arrayOf(PropTypes.number).isRequired,
  style: PropTypes.object,
};

const datePickerDefaultProps = {
  style: undefined,
};

const DatePicker = (props) => {
  const { selectedMonths, style } = props;
  const { containerStyle, containerRowStyle } = styles;

  // Add initial start and end months
  const startMonths = [selectedMonths[0]];
  const endMonths = [selectedMonths[selectedMonths.length - 1]];

  // Loop through array from the starting month to find if another starting month exists
  let lastMonth = 0;

  for (let i = 0; i < selectedMonths.length; ++i) {
    const currentMonth = selectedMonths[i];
    if (lastMonth !== currentMonth - 1 && lastMonth !== 12) {
      endMonths.push(lastMonth);
      startMonths.push(currentMonth);
    }

    lastMonth = currentMonth;
  }

  const renderDates = (start, end) => {
    const monthsToRender = monthsArr.slice(start, end);
    return monthsToRender.map(monthObj => (
      <DateOption
        key={monthObj.id}
        selected={selectedMonths.includes(monthObj.id)}
        start={startMonths.includes(monthObj.id)}
        end={endMonths.includes(monthObj.id)}
        first={monthObj.first}
        last={monthObj.last}
      >
        { monthObj.val }
      </DateOption>
    ));
  };

  return (
    <View style={style ? [containerStyle, style] : containerStyle}>
      <View style={[containerRowStyle, { marginBottom: 8 }]}>
        {renderDates(0, 6)}
      </View>
      <View style={containerRowStyle}>
        {renderDates(6, 12)}
      </View>
    </View>
  );
};

DatePicker.propTypes = datePickerPropTypes;
DatePicker.defaultProps = datePickerDefaultProps;

export { DatePicker };
