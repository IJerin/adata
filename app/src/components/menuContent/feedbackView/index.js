// src/components/menuContent/feedbackView/index.js

import React, { Component } from 'react';
import { View, Text, ListView, ActivityIndicator, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import I18n from '../../../util/i18n';
import UtilFunctions from '../../../util/UtilFunctions';
import { Input, SelectInput, Button, ClickableIcon, Modal } from '../../common/';
import baseStyles from '../styles';
import classStyles from './styles';

const styles = Object.assign(classStyles, baseStyles);

const propTypes = {
  isDetail: PropTypes.bool,
  guideId: PropTypes.number,
  photoId: PropTypes.number,
};

const defaultProps = {
  isDetail: false,
  guideId: 0,
  photoId: 0,
};

class FeedbackView extends Component {
  constructor(props) {
    super(props);

    const windowWidth = Dimensions.get('window').width;

    this.ratingWidth = (windowWidth - 48 - 64) / 5;
    this.recommendWidth = (windowWidth - 48) / 10;

    // Set up ListView data
    const ratingDS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const recommendDS = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    // Create a DataSource for the Rating ListView to use
    const ratings = [
      {
        id: 1,
        src: require('./img/emoji-1-hate.png'),
        selectedSrc: require('./img/emoji-1-hate-selected.png'),
        text: I18n.t('content.feedback.smileys.hate'),
      }, {
        id: 2,
        src: require('./img/emoji-2-dislike.png'),
        selectedSrc: require('./img/emoji-2-dislike-selected.png'),
        text: I18n.t('content.feedback.smileys.dislike'),
      }, {
        id: 3,
        src: require('./img/emoji-3-neutral.png'),
        selectedSrc: require('./img/emoji-3-neutral-selected.png'),
        text: I18n.t('content.feedback.smileys.neutral'),
      }, {
        id: 4,
        src: require('./img/emoji-4-like.png'),
        selectedSrc: require('./img/emoji-4-like-selected.png'),
        text: I18n.t('content.feedback.smileys.like'),
      }, {
        id: 5,
        src: require('./img/emoji-5-love.png'),
        selectedSrc: require('./img/emoji-5-love-selected.png'),
        text: I18n.t('content.feedback.smileys.love'),
      },
    ];

    // Create a DataSource for the Recommend ListView to use
    const recommendations = [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 },
    ];

    this.ratingDataSource = ratingDS.cloneWithRows(ratings);
    this.recommendDataSource = recommendDS.cloneWithRows(recommendations);

    this.state = {
      view: 'initial',
      subView: 'none',
      dropdown: '',
      feedback: '',
      rating: 0,
      email: '',
      recommend: 0,
      error: '',
      buttonPressed: false,
      selectData: [
        {
          label: I18n.t('content.feedback.select.suggestion'),
          value: 'suggestion',
        },
        {
          label: I18n.t('content.feedback.select.compliment'),
          value: 'compliment',
        },
        {
          label: I18n.t('content.feedback.select.bug'),
          value: 'bug',
        },
        {
          label: I18n.t('content.feedback.select.question'),
          value: 'question',
        },
      ],
    };
  }

  componentWillMount() {
    const { isDetail } = this.props;

    if (isDetail) {
      this.setState({
        dropdown: 'suggestion',
        selectData: this.state.selectData.slice(0, 1),
      });
    }
  }

  handleButtonPress(disabled) {
    const { view, rating, email, dropdown, feedback, recommend } = this.state;
    const { guideId, photoId, isDetail } = this.props;

    if (disabled) {
      return;
    }

    if (view === 'initial') {
      if (rating !== 0 || isDetail) {
        const data = {
          email,
          rating,
          feedbackType: dropdown,
          feedbackText: feedback,
          recommend,
          guideId,
          photoId,
        };

        UtilFunctions.sendToApi('POST', 'feedback', data)
          .then(response => response.json())
          .then((responseJsonStr) => {
            const responseJson = JSON.parse(responseJsonStr);
            this.setState({ buttonPressed: false });
            if (responseJson.status === 0) {
              this.setState({ view: 'sent' });
            } else {
              this.setState({ error: responseJson.message });
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({ error: I18n.t('content.error.connectError') });
            this.setState({ buttonPressed: false });
          });

        this.setState({ buttonPressed: true });
      } else {
        this.setState({ error: I18n.t('content.feedback.error.rating') });
      }
    } else {
      Actions.pop();
    }
  }

  handleSelectValueChange(value) {
    this.setState({
      subView: 'selected',
      dropdown: value,
    });
  }

  handleRatingPress(id) {
    this.setState({
      rating: id,
      subView: this.state.subView === 'none' ? 'rated' : this.state.subView,
    });
  }

  handleRecommendationPress(id) {
    this.setState({
      recommend: id,
    });
  }


  renderRatingRow(rating) {
    const { ratingStyle } = styles;
    const selected = rating.id === this.state.rating;

    return (
      <ClickableIcon
        onPress={() => this.handleRatingPress(rating.id)}
        data={rating}
        selected={selected}
        style={rating.id === 5 ? [ratingStyle, { marginRight: 0 }] : ratingStyle}
        width={this.ratingWidth}
      />
    );
  }

  renderRecommendRow(recommendation) {
    const selected = recommendation.value === this.state.recommend;

    return (
      <ClickableIcon
        onPress={() => this.handleRecommendationPress(recommendation.value)}
        data={recommendation}
        selected={selected}
        width={this.recommendWidth}
      />
    );
  }

  renderScrollView() {
    const { isDetail } = this.props;
    const {
      textStyle,
      headingTextStyle,
      separatingContainerStyle,
    } = styles;

    if (this.state.view === 'initial') {
      const headingText = isDetail ? 'content.feedback.descriptionDetail' : 'content.feedback.description';
      return (
        <View>
          {this.renderError()}
          <Text style={textStyle}>{I18n.t(headingText)}</Text>
          <View style={separatingContainerStyle}>
            {this.renderRatings()}
            {this.renderFeedbackDropdown()}
            {this.renderRecommendation()}
          </View>
        </View>
      );
    }

    return (
      <View>
        <Text style={headingTextStyle}>{I18n.t('content.feedback.thanksHeading')}</Text>
        <View style={separatingContainerStyle}>
          <Text style={textStyle}>{I18n.t('content.feedback.improve')}</Text>
        </View>
      </View>
    );
  }

  renderError() {
    const { error } = this.state;

    if (error) {
      return <Text style={styles.errorTextStyle}>{error}</Text>;
    }

    return <View />;
  }

  renderRatings() {
    const { isDetail } = this.props;
    const { textStyle, ratingListViewStyle } = styles;

    if (!isDetail) {
      return (
        <View>
          <Text style={textStyle}>{I18n.t('content.feedback.think')}</Text>
          <ListView
            key={this.state.rating}
            style={ratingListViewStyle}
            horizontal
            showHorizontalScrollIndicator={false}
            dataSource={this.ratingDataSource}
            renderRow={rating => this.renderRatingRow(rating)}
          />
        </View>
      );
    }

    return <View />;
  }

  renderFeedbackDropdown() {
    const { isDetail } = this.props;
    const { selectContainerStyle } = styles;
    const { selectData } = this.state;

    if (this.state.subView === 'rated' || this.state.subView === 'selected' || isDetail) {
      if (!isDetail) {
        return (
          <View style={selectContainerStyle}>
            <SelectInput
              data={selectData}
              value={this.state.dropdown}
              onSelect={value => this.handleSelectValueChange(value)}
              placeholder={I18n.t('content.feedback.select.placeholder')}
            />
            {this.renderFeedback()}
          </View>
        );
      }

      return (
        <View style={selectContainerStyle}>
          {this.renderFeedback()}
        </View>
      );
    }

    return <View />;
  }

  renderFeedback() {
    const { isDetail } = this.props;
    const { feedbackSeparatorStyle } = styles;

    if (this.state.subView === 'selected' || isDetail) {
      let placeholder = '';

      switch (this.state.dropdown) {
        case 'suggestion':
          if (isDetail) {
            placeholder = I18n.t('content.feedback.select.suggestionPlaceholderDetail');
          } else {
            placeholder = I18n.t('content.feedback.select.suggestionPlaceholder');
          }
          break;
        case 'compliment':
          placeholder = I18n.t('content.feedback.select.complimentPlaceholder');
          break;
        case 'bug':
          placeholder = I18n.t('content.feedback.select.bugPlaceholder');
          break;
        case 'question':
          placeholder = I18n.t('content.feedback.select.questionPlaceholder');
          break;
        default:
          placeholder = '';
          break;
      }

      return (
        <View style={feedbackSeparatorStyle}>
          <Input
            placeholder={placeholder}
            value={this.state.feedback}
            onChangeText={text => this.setState({ feedback: text })}
            autoFocus={isDetail}
            large
          />
          <View style={feedbackSeparatorStyle}>
            <Input
              placeholder={I18n.t('content.feedback.select.email')}
              keyboardType={'email-address'}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>
        </View>
      );
    }

    return <View />;
  }

  renderRecommendation() {
    const { isDetail } = this.props;
    const {
      separatingContainerStyle,
      recommendListViewStyle,
      recommendationTextContainerStyle,
      recommendationTextLeftStyle,
      recommendationTextRightStyle,
    } = styles;

    if (this.state.subView === 'selected' && !isDetail) {
      return (
        <View style={separatingContainerStyle}>
          <Text>{I18n.t('content.feedback.recommend')}</Text>
          <ListView
            key={this.state.recommend}
            style={recommendListViewStyle}
            horizontal
            showHorizontalScrollIndicator={false}
            dataSource={this.recommendDataSource}
            renderRow={recommendation => this.renderRecommendRow(recommendation)}
          />
          <View style={recommendationTextContainerStyle}>
            <Text style={recommendationTextLeftStyle}>{I18n.t('content.feedback.not')}</Text>
            <Text style={recommendationTextRightStyle}>{I18n.t('content.feedback.very')}</Text>
          </View>
        </View>
      );
    }

    return <View />;
  }

  renderButton() {
    const { isDetail } = this.props;

    const disableButton = isDetail ? this.state.feedback.length === 0 : this.state.rating === 0;

    if (this.state.view === 'initial') {
      return (
        <Button
          disabled={disableButton}
          onPress={() => this.handleButtonPress(disableButton)}
        >
          {I18n.t('content.feedback.submitButton')}
        </Button>
      );
    }

    return <Button onPress={() => this.handleButtonPress()}>{I18n.t('content.feedback.returnButton')}</Button>;
  }

  render() {
    const {
      containerStyle,
      scrollContainerStyle,
      buttonContainerStyle,
    } = styles;

    const { buttonPressed } = this.state;

    return (
      <View style={containerStyle}>
        <Modal
          visible={buttonPressed}
        >
          <ActivityIndicator size={'large'} color={'#FFF'} />
        </Modal>
        <KeyboardAwareScrollView style={scrollContainerStyle} extraScrollHeight={20}>
          {this.renderScrollView()}
        </KeyboardAwareScrollView>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { menuContentView } = state;

  return {
    isDetail: menuContentView === 'feedback-detail',
  };
};

FeedbackView.propTypes = propTypes;
FeedbackView.defaultProps = defaultProps;

export default connect(mapStateToProps)(FeedbackView);
