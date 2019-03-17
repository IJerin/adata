// src/components/common/modal/index.js

import React from 'react';
import { View, Modal as RNModal } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  children: PropTypes.object.isRequired,
  verticalLocation: PropTypes.string,
  horizontalLocation: PropTypes.string,
  animationType: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.any,
};

const defaultProps = {
  verticalLocation: 'middle',
  horizontalLocation: 'center',
  animationType: 'none',
  visible: false,
  style: {},
};

const Modal = (props) => {
  const { children, visible, verticalLocation, horizontalLocation, animationType, style } = props;
  const { backgroundStyle, topStyle, middleStyle, bottomStyle, leftStyle, centerStyle, rightStyle } = styles;

  const handleRequestClose = () => {
    console.info('Modal has been closed');
  };

  let verticalStyle = middleStyle;
  let horizontalStyle = centerStyle;

  if (verticalLocation === 'top') {
    verticalStyle = topStyle;
  } else if (verticalLocation === 'bottom') {
    verticalStyle = bottomStyle;
  }

  if (horizontalLocation === 'left') {
    horizontalStyle = leftStyle;
  } else if (horizontalLocation === 'right') {
    horizontalStyle = rightStyle;
  }

  const combinedStyle = [backgroundStyle, verticalStyle, horizontalStyle];

  return (
    <RNModal
      style={style}
      animationType={animationType}
      transparent
      visible={visible}
      onRequestClose={() => handleRequestClose()}
    >
      <View style={combinedStyle}>
        { children }
      </View>
    </RNModal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export { Modal };
