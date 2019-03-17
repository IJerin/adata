// src/components/common/modalMenu/index.js

import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Modal } from '../common/';
import styles from './styles';

const propTypes = {
  children: PropTypes.object.isRequired,
  animationType: PropTypes.string,
  height: PropTypes.number,
  visible: PropTypes.bool,
};

const defaultProps = {
  animationType: 'none',
  height: 184,
  visible: false,
};

const ModalMenu = (props) => {
  const { children, visible, height, animationType } = props;
  const { containerStyle } = styles;

  return (
    <Modal
      animationType={animationType}
      visible={visible}
      verticalLocation={'bottom'}
    >
      <View style={[containerStyle, { height }]}>
        { children }
      </View>
    </Modal>
  );
};

ModalMenu.propTypes = propTypes;
ModalMenu.defaultProps = defaultProps;

export default ModalMenu;
