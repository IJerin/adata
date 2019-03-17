// src/components/menuContent/feedbackView/styles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  ratingListViewStyle: {
    marginTop: 16,
    flexDirection: 'row',
  },
  ratingStyle: {
    flex: 1,
    marginRight: 16,
  },
  selectContainerStyle: {
    marginTop: 16,
    position: 'relative',
  },
  feedbackSeparatorStyle: {
    marginTop: 16,
  },
  recommendListViewStyle: {
    marginTop: 16,
    position: 'relative',
  },
  recommendationTextContainerStyle: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 48,
    width: null,
  },
  recommendationTextLeftStyle: {
    justifyContent: 'flex-start',
    flex: 1,
    textAlign: 'left',
  },
  recommendationTextRightStyle: {
    justifyContent: 'flex-end',
    flex: 1,
    textAlign: 'right',
  },
});

export default styles;
