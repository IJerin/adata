// src/components/guideDetailGridView/index.js

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
// import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import PropTypes from 'prop-types';

import * as actions from '../../actions';
import I18n from '../../util/i18n';
import UtilFunctions from '../../util/UtilFunctions';
import { ViewContainer, CardSection, Card, Tag } from '../common/';
import Header from '../header/';
import PhotoGrid from '../grids/photoGrid/';
import GuideCarousel from '../carousels/guideCarousel/';
import styles from './styles';

// const tracker = new GoogleAnalyticsTracker('UA-98721832-1');

const propTypes = {
  showProfile: PropTypes.func.isRequired,
  guide: PropTypes.object.isRequired,
  guidesByAuthor: PropTypes.arrayOf(PropTypes.object).isRequired,
  numPhotos: PropTypes.number.isRequired,
};

class GuideDetailGridView extends Component {
  constructor(props) {
    super(props);
    this._carousel = null;
    this.screenWidth = Dimensions.get('window').width;
    this.itemWidth = Math.round(this.screenWidth / 2) - 30;
  }

  handlePress() {
    Actions.guideDetailMap();
  }

  handlePressToProfile() {
    const { showProfile, guide } = this.props;

    // Set the profile view
    showProfile();

    // Pass in the author object to show the author's profile
    Actions.landingPage({ author: guide.author });
  }

  renderOtherGuides() {
    const { guidesByAuthor } = this.props;
    if (guidesByAuthor.length > 1) {
      return (
        <View>
          <Text style={styles.headerStyle}>
            {`${I18n.t('guideDetail.other')} ${guidesByAuthor[0].author.title} `}
          </Text>
          <GuideCarousel
            guides={guidesByAuthor}
          />
        </View>
      );
    }

    return <View />;
  }

  render() {
    const { image, title, description, location, author } = this.props.guide;
    const { numPhotos } = this.props;
    const {
      scrollContainerStyle,
      imageStyle,
      guideTitleStyle,
      guideDescriptionStyle,
      guideLocationContainerStyle,
      mapIconContainerStyle,
      mapIconStyle,
      guideLocationStyle,
      photoContainerStyle,
      headerStyle,
      tagStyle,
    } = styles;

    return (
      <ViewContainer>
        <ParallaxScrollView
          style={scrollContainerStyle}
          parallaxHeaderHeight={325}
          backgroundColor={'transparent'}
          renderFixedHeader={() => <Header allowBack />}
          renderForeground={() => (
            <View style={{ position: 'relative' }}>
              <View style={{ height: 325, width: null, opacity: 0 }} />
              <TouchableOpacity onPress={() => this.handlePressToProfile()}>
                <Tag
                  backgroundColor={'rgba(0, 0, 0, 0.5)'}
                  textColor={'#FFF'}
                  text={author.title}
                  image={author.image}
                  style={tagStyle}
                />
              </TouchableOpacity>
            </View>
          )}
          renderBackground={() => (
            <Image style={imageStyle} source={image} />
          )}
        >
          <ViewContainer>
            <Card>
              <CardSection>
                <Text style={guideTitleStyle}>{title}</Text>
                <View style={guideLocationContainerStyle}>
                  <Text style={guideLocationStyle}>{UtilFunctions.printLocation(location, false)}</Text>
                </View>
                <Text style={guideDescriptionStyle}>{description}</Text>
              </CardSection>
              <CardSection>
                <View style={photoContainerStyle}>
                  <Text style={headerStyle}>{`${numPhotos} ${I18n.t('guideDetail.locations')}`}</Text>
                  <TouchableOpacity style={mapIconContainerStyle} onPress={() => this.handlePress()}>
                    <Image style={mapIconStyle} source={require('./img/icon-map-teal.png')} />
                  </TouchableOpacity>
                </View>
                <PhotoGrid />
              </CardSection>
              <CardSection
                hideSeparator
              >
                {this.renderOtherGuides()}
              </CardSection>
            </Card>
          </ViewContainer>
        </ParallaxScrollView>
      </ViewContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { guides, selectedGuideId } = state;

  const currentGuide = guides.find(guide => guide.id === selectedGuideId);
  const numPhotos = currentGuide.markers.length;
  const guidesByAuthor = guides.filter(guide => guide.author.title === currentGuide.author.title);

  return {
    guide: currentGuide,
    numPhotos,
    guidesByAuthor,
  };
};

GuideDetailGridView.propTypes = propTypes;

export default connect(mapStateToProps, actions)(GuideDetailGridView);
