// src/components/photoDetailView/index.js

import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import PropTypes from 'prop-types';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import * as actions from '../../actions/';
import I18n from '../../util/i18n';
import UtilFunctions from '../../util/UtilFunctions';
import Constants from '../../util/Constants';
import { Button, Card, CardSection, DatePicker, List, ListItem, Map, ViewContainer, Tag } from '../common/';
import Header from '../header/';
import DirectionsPanel from '../directionsPanel/';
import Bookmark from '../bookmark/';
import LocationMarker from '../markers/locationMarker/';
import ParkingMarker from '../markers/parkingMarker/';
import globalStyles from '../../styles';
import styles from './styles';

const tracker = new GoogleAnalyticsTracker('UA-98721832-1');

const propTypes = {
  showProfile: PropTypes.func.isRequired,
  showFeedback: PropTypes.func.isRequired,
  guideId: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  guide: PropTypes.object.isRequired,
};

class PhotoDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
    };
  }

  componentWillMount() {
    const { location } = this.props;
    const imageDimensions = resolveAssetSource(location.image);
    this.setWidthAndHeight(imageDimensions.width, imageDimensions.height);
  }

  setWidthAndHeight(height, width) {
    if (height > width) {
      this.setState({
        height: 425,
        width: null,
      });
    } else if (height < width) {
      this.setState({
        height: 325,
        width: null,
      });
    } else {
      this.setState({
        height: 375,
        width: null,
      });
    }
  }

  handleDetailFeedbackPress() {
    const { location, guideId } = this.props;

    this.props.showFeedback('detail');
    Actions.menuContent({ guideId, photoId: location.id });
  }

  handleNavigationPress(parking) {
    const { disabled } = this.props.location;

    Actions.navigation({ parking, disabled });
  }

  handlePress() {
    const { height, width } = this.state;
    Actions.photoZoom({ height, width });
  }

  handlePressToProfile() {
    const { showProfile, guide } = this.props;

    // Set the profile view
    showProfile();

    // Pass in the author object to show the author's profile
    Actions.landingPage({ author: guide.author });
  }

  renderMap() {
    const { location } = this.props;
    const { mapContainerStyle } = styles;

    // TODO: Disable map altogether for disabled photos?

    const mapMarkers = [location];

    // If the location has parking, add it to the map
    if (location.parking) {
      mapMarkers.push(location.parking);
    }

    // Create the marker rendering function
    const renderMarkers = () => (
      mapMarkers.map((m) => {
        if (m.parking) {
          return <ParkingMarker key={m.id} marker={m} />;
        }

        return <LocationMarker key={m.id} marker={m} active disabled />;
      })
    );

    const centerCoordinates = UtilFunctions.getCenterCoordinates(mapMarkers);

    return (
      <TouchableWithoutFeedback onPress={() => this.handleNavigationPress()}>
        <View style={mapContainerStyle}>
          <Map
            height={204}
            renderMarkers={() => renderMarkers()}
            centerCoordinates={centerCoordinates}
            disabled
            zoomed
            rounded
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  // TODO: Do we still need me?
  renderEntranceInfo() {
    const { location } = this.props;
    const {
      entranceInfoContainerStyle,
      entranceInfoSubContainerStyle,
      entranceInfoIconStyle,
      entranceInfoTextStyle,
    } = styles;

    if (location.entranceFeeInDollars > 0 && location.closingTime) {
      const closingTimeStr = UtilFunctions.printTimeOfDay(location.closingTime.hours, location.closingTime.minutes);

      return (
        <View style={entranceInfoContainerStyle}>
          <View style={entranceInfoSubContainerStyle}>
            <Image
              style={[entranceInfoIconStyle, { height: 20, marginVertical: 2 }]}
              source={require('./img/icon-dollar.png')}
            />
            <Text style={entranceInfoTextStyle}>
              {`$${location.entranceFeeInDollars} ${I18n.t('detail.entranceFee')}`}
            </Text>
          </View>
          <View style={entranceInfoSubContainerStyle}>
            <Image style={entranceInfoIconStyle} source={require('./img/icon-clock.png')} />
            <Text
              style={entranceInfoTextStyle}
            >
              {`${I18n.t('detail.closes')} ${closingTimeStr} ${location.closingTime.notes}`}
            </Text>
          </View>
        </View>
      );
    } else if (location.entranceFeeInDollars > 0) {
      return (
        <View style={entranceInfoContainerStyle}>
          <View style={entranceInfoSubContainerStyle}>
            <Image
              style={[entranceInfoIconStyle, { height: 20, marginVertical: 2 }]}
              source={require('./img/icon-dollar.png')}
            />
            <Text style={entranceInfoTextStyle}>
              {`$${location.entranceFeeInDollars} ${I18n.t('detail.entranceFee')}`}
            </Text>
          </View>
        </View>
      );
    } else if (location.closingTime) {
      const closingTimeStr = UtilFunctions.printTimeOfDay(location.closingTime.hours, location.closingTime.minutes);

      return (
        <View style={entranceInfoContainerStyle}>
          <View style={entranceInfoSubContainerStyle}>
            <Image style={entranceInfoIconStyle} source={require('./img/icon-clock.png')} />
            <Text
              style={entranceInfoTextStyle}
            >
              {`${I18n.t('detail.closes')} ${closingTimeStr} ${location.closingTime.notes}`}
            </Text>
          </View>
        </View>
      );
    }

    return <View />;
  }

  renderParking() {
    const { location } = this.props;
    const {
      parkingStyle,
    } = styles;

    if (location.parking) {
      return (
        <View>
          {this.renderParkingInfo()}
          <Text style={parkingStyle}>{I18n.t('detail.parking.title')}</Text>
          {this.renderDetails(location.parking.details)}
        </View>
      );
    }

    return <View />;
  }

  renderParkingInfo() {
    const {
      distanceToLocationInFeet,
      elevationInFeet,
      averageWalkingDurationInSeconds,
    } = this.props.location.parking;

    if (distanceToLocationInFeet > 0 || elevationInFeet > 0 || averageWalkingDurationInSeconds > 0) {
      return (
        <List style={{ marginTop: 12 }}>
          {this.renderListItem(
            I18n.t('detail.parking.distance'),
            UtilFunctions.printDistance(distanceToLocationInFeet, 'ft'),
            null,
            true)
          }
          {this.renderListItem(
            I18n.t('detail.parking.elevation'),
            UtilFunctions.printDistance(elevationInFeet, 'ft'),
            null,
            true)
          }
          {this.renderListItem(
            I18n.t('detail.parking.walking'),
            UtilFunctions.printTime(averageWalkingDurationInSeconds, 'sec'),
            null,
            true)
          }
        </List>
      );
    }

    return <View />;
  }

  renderMonths() {
    const { months } = this.props.location;
    const { detailMainLabelStyle } = styles;

    if (months) {
      return (
        <CardSection>
          <Text style={detailMainLabelStyle}>{I18n.t('detail.months')}</Text>
          {this.renderDetails(months.details)}
          <DatePicker selectedMonths={months.recommended} style={{ marginTop: 20 }} />

        </CardSection>
      );
    }

    return <View />;
  }

  renderTimes() {
    const { times } = this.props.location;
    const { detailMainLabelStyle } = styles;

    if (times) {
      return (
        <CardSection>
          <Text style={detailMainLabelStyle}>{I18n.t('detail.times.title')}</Text>
          {this.renderDetails(times.details)}
          <List style={{ marginTop: 20 }}>
            <ListItem
              label={I18n.t('detail.times.amBlue')}
              value={'6:17am - 7:17am'}
              image={require('./img/icon-am-blue.png')}
              selected={(times.selected & Constants.TIMES.AM_BLUE_HOUR) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.sunrise')}
              value={'7:17am'}
              image={require('./img/icon-sunrise.png')}
              selected={(times.selected & Constants.TIMES.SUNRISE) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.amGolden')}
              value={'7:17am-8:17am'}
              image={require('./img/icon-sunrise.png')}
              selected={(times.selected & Constants.TIMES.AM_GOLDEN_HOUR) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.daytime')}
              value={'8:17am - 4:25pm'}
              image={require('./img/icon-daytime.png')}
              selected={(times.selected & Constants.TIMES.DAYTIME) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.pmGolden')}
              value={'4:25pm - 5:25pm'}
              image={require('./img/icon-sunset.png')}
              selected={(times.selected & Constants.TIMES.PM_GOLDEN_HOUR) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.sunset')}
              value={'5:25pm'}
              image={require('./img/icon-sunset.png')}
              selected={(times.selected & Constants.TIMES.SUNSET) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.pmBlue')}
              value={'5:25pm - 6:25pm'}
              image={require('./img/icon-pm-blue.png')}
              selected={(times.selected & Constants.TIMES.PM_BLUE_HOUR) !== 0}
            />
            <ListItem
              label={I18n.t('detail.times.night')}
              value={'6:25pm - 6:17am'}
              image={require('./img/icon-night.png')}
              selected={(times.selected & Constants.TIMES.NIGHT) !== 0}
            />
          </List>
        </CardSection>
      );
    }

    return <View />;
  }

  renderEquipment() {
    const { equipment } = this.props.location;
    const { detailMainLabelStyle } = styles;

    if (equipment) {
      return (
        <CardSection>
          <Text style={detailMainLabelStyle}>{I18n.t('detail.equipment.title')}</Text>
          {this.renderDetails(equipment.details)}
          <List style={{ marginTop: 20 }}>
            {this.renderListItem(
              I18n.t('detail.equipment.camera'),
              equipment.camera,
              require('./img/icon-camera.png'),
              false,
              true)
            }
            {this.renderListItem(
              I18n.t('detail.equipment.lens'),
              equipment.lens,
              require('./img/icon-lens.png'),
              false,
              true)
            }
            {this.renderListItem(
              I18n.t('detail.equipment.filter'),
              equipment.filter,
              require('./img/icon-filter.png'),
              false,
              true)
            }
            {this.renderListItem(
              I18n.t('detail.equipment.tripod'),
              equipment.tripod,
              require('./img/icon-tripod.png'),
              false,
              true)
            }
          </List>
        </CardSection>
      );
    }

    return <View />;
  }

  renderExposure() {
    const { exposure } = this.props.location;
    const { detailMainLabelStyle } = styles;

    if (exposure) {
      return (
        <CardSection>
          <Text style={detailMainLabelStyle}>{I18n.t('detail.exposure.title')}</Text>
          {this.renderDetails(exposure.details)}
          <List style={{ marginTop: 20 }}>
            {this.renderListItem(
              I18n.t('detail.exposure.shutterSpeed'),
              exposure.shutterSpeed,
              require('./img/icon-shutter-speed.png'))
            }
            {this.renderListItem(
              I18n.t('detail.exposure.aperture'),
              exposure.aperture,
              require('./img/icon-aperture.png'))
            }
            {this.renderListItem(
              I18n.t('detail.exposure.iso'),
              exposure.iso,
              require('./img/icon-iso.png'))
            }
            {this.renderListItem(
              I18n.t('detail.exposure.focalLength'),
              `${exposure.focalLengthInMm}mm`,
              require('./img/icon-focal-length.png'))
            }
          </List>
        </CardSection>
      );
    }

    return <View />;
  }

  renderDetails(detailStr) {
    const { detailSubLabelStyle } = styles;

    if (detailStr && detailStr.length > 0) {
      return <Text style={detailSubLabelStyle}>{detailStr}</Text>;
    }

    return <View />;
  }

  renderListItem(labelStr, value, image, longLabel, longValue) {
    if (value) {
      if (!image) {
        return (
          <ListItem
            label={labelStr}
            value={value}
            longLabel={longLabel}
            longValue={longValue}
          />
        );
      }

      return (
        <ListItem
          label={labelStr}
          value={value}
          image={image}
          longLabel={longLabel}
          longValue={longValue}
        />
      );
    }

    return <View />;
  }

  render() {
    const { location, guide } = this.props;
    const { height, width } = this.state;
    const { captionStyle } = globalStyles;

    const {
      scrollContainerStyle,
      titleLabelStyle,
      subTitleLabelStyle,
      detailMainLabelStyle,
      detailSubLabelStyle,
      detailButtonContainerStyle,
      tagStyle,
      bookmarkStyle,
    } = styles;

    tracker.trackEvent('view', `Viewed detail for: ${location.name} (id=${location.id})`);
    return (
      <ViewContainer>
        <ParallaxScrollView
          style={scrollContainerStyle}
          parallaxHeaderHeight={height}
          backgroundColor={'transparent'}
          renderFixedHeader={() => <Header allowBack />}
          renderForeground={() => (
            <View>
              <TouchableOpacity style={{ height, width }} onPress={() => this.handlePress()} />
              <TouchableOpacity onPress={() => this.handlePressToProfile()}>
                <Tag
                  backgroundColor={'rgba(0, 0, 0, 0.5)'}
                  textColor={'#FFF'}
                  text={guide.author.title}
                  image={guide.author.image}
                  style={tagStyle}
                />
              </TouchableOpacity>
              <Bookmark style={bookmarkStyle} id={location.id} />
            </View>
          )}
          renderBackground={() => (
            <Image style={{ height, width }} source={location.image} />
          )}
        >
          <ViewContainer>
            <Card>
              <CardSection>
                <Text style={titleLabelStyle}>{location.title}</Text>
                <Text style={[captionStyle, subTitleLabelStyle]}>
                  {UtilFunctions.printLocation(guide.location, true)}
                </Text>
                <Text style={detailSubLabelStyle}>{location.description}</Text>
                {this.renderEntranceInfo()}
                {this.renderMap()}
                {this.renderParking()}
              </CardSection>
              {this.renderMonths()}
              {this.renderTimes()}
              {this.renderEquipment()}
              {this.renderExposure()}
              <CardSection hideSeparator>
                <Text style={detailMainLabelStyle}>{I18n.t('detail.more')}</Text>
                <Text style={detailSubLabelStyle}>{I18n.t('detail.moreDesc')}</Text>
                <View style={detailButtonContainerStyle}>
                  <Button
                    secondary
                    onPress={() => this.handleDetailFeedbackPress()}
                  >
                    {I18n.t('detail.feedbackButton')}
                  </Button>
                </View>
              </CardSection>
            </Card>
          </ViewContainer>
        </ParallaxScrollView>
        <DirectionsPanel location={location} disabled={location.disabled} />
      </ViewContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { guides, selectedGuideId, selectedMarkerId } = state;

  const guide = guides.find(g => g.id === selectedGuideId);
  const location = guide.markers.find(m => m.id === selectedMarkerId);

  return { guideId: selectedGuideId, location, guide };
};

PhotoDetailView.propTypes = propTypes;

export default connect(mapStateToProps, actions)(PhotoDetailView);
