// src/components/common/loadingBar/index.js

import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const propTypes = {
  loadTime: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  style: PropTypes.number.isRequired,
};

class LoadingBar extends Component {
  constructor() {
    super();

    this.mounted = false;
    this.state = {
      isMounted: true,
      innerWidth: 0,
      progress: 0,
      progressPct: 0,
    };
  }

  componentWillMount() {
    const { loadTime } = this.props;
    const interval = 100;

    const timerId = setInterval(() => {
      const progressVal = this.state.progress + interval;

      if (progressVal >= (loadTime - interval) || !this.mounted) {
        clearInterval(timerId);
        return;
      }

      this.setState({ progress: progressVal, progressPct: progressVal / loadTime });
    }, interval);

    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  measureOuterBar(event) {
    const { padding } = this.props;

    const width = event.nativeEvent.layout.width - padding;

    this.setState({ innerWidth: width });
  }

  render() {
    const { style } = this.props;
    const { containerStyle, outerBarStyle, innerBarStyle } = styles;
    const { innerWidth, progressPct } = this.state;

    return (
      <View style={[style, { alignSelf: 'stretch' }]}>
        <View style={containerStyle}>
          <View onLayout={event => this.measureOuterBar(event)} style={outerBarStyle}>
            <View style={[innerBarStyle, { width: innerWidth * progressPct }]} />
          </View>
        </View>
      </View>
    );
  }
}

LoadingBar.propTypes = propTypes;

export { LoadingBar };
