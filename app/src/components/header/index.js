// src/components/header/index.js

import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import HeaderText from '../headerText/';
import HeaderAction from '../headerAction/';
import styles from './styles';

const propTypes = {
  title: PropTypes.string,
  allowBack: PropTypes.bool,
  showImage: PropTypes.bool,
  color: PropTypes.bool,
  absolute: PropTypes.bool,
  right: PropTypes.bool,
};

const defaultProps = {
  title: undefined,
  allowBack: false,
  showImage: false,
  color: false,
  absolute: false,
  right: false,
};

const Header = (props) => {
  const {
    normalContainerStyle,
    backgroundContainerStyle,
    backgroundImageContainerStyle,
    backdropIconStyle,
    frontContainerStyle,
  } = styles;

  const { title, allowBack, showImage, color, absolute, right } = props;

  const renderBackdrop = () => {
    if (!color) {
      return (
        <View style={backgroundImageContainerStyle}>
          <View style={backgroundContainerStyle}>
            <Image style={backdropIconStyle} source={require('./img/backdrop.png')} />
          </View>
        </View>
      );
    }

    return <View style={backgroundContainerStyle} />;
  };

  return (
    <View style={absolute ? [normalContainerStyle, { position: 'absolute', zIndex: 10 }] : normalContainerStyle}>
      {renderBackdrop()}
      <View style={frontContainerStyle}>
        <HeaderText title={title} showImage={showImage} />
        <HeaderAction allowBack={allowBack} color={color} right={right} />
      </View>
    </View>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
