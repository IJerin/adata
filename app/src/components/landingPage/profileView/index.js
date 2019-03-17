// src/components/landingPage/profileView/index.js

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ViewContainer, Card, CardSection, Grid, Button, Heading, Paragraph } from '../../common/';
import GuideGridThumbnail from '../../grids/thumbnails/guideGridThumbnail';
import styles from './styles';

const propTypes = {
  author: PropTypes.object.isRequired,
  guidesByAuthor: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAuthorProfile: PropTypes.bool.isRequired,
};

const PRIMARY_GRADIENT = ['#238270', '#1BAC95', '#78CA9C'];
const GRADIENT_LOCATIONS = [0, 0.5, 1.0];

const ProfileView = (props) => {
  const {
    buttonStyle,
    buttonTextStyle,
    bannerContainerStyle,
    profileImageStyle,
    authorNameStyle,
    descriptionStyle,
    gridTitleContainerStyle,
    gridTitleStyle,
    mapIconContainerStyle,
    mapIconStyle,
  } = styles;

  const { author, guidesByAuthor, isAuthorProfile } = props;

  const handlePress = () => {
    console.info('hi');
  };

  const renderItem = (item, itemWidth, aspectRatio, style) => (
    <GuideGridThumbnail
      guide={item}
      width={itemWidth}
      height={itemWidth / aspectRatio}
      style={style}
      hideAuthor
    />
  );

  const renderButton = () => {
    if (isAuthorProfile) {
      return (
        <Button
          style={buttonStyle}
          textStyle={buttonTextStyle}
          onPress={() => handlePress()}
          inverted
          secondary
        >
          Contact
        </Button>
      );
    }

    return <View />;
  };

  return (
    <ViewContainer>
      <LinearGradient
        locations={GRADIENT_LOCATIONS}
        colors={PRIMARY_GRADIENT}
        style={bannerContainerStyle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Image style={profileImageStyle} source={author.image} />
        <Heading level={2} style={authorNameStyle} color={'#FFF'}>{author.subtitle}</Heading>
        <Paragraph style={descriptionStyle} color={'#FFF'}>
          Lorem ipsum dolor sit amet, consectetur adipising elit, sed do eiusmod tempor dolor sit amet.
        </Paragraph>
        {renderButton()}
      </LinearGradient>
      <Card>
        <CardSection hideSeparator>
          <View style={gridTitleContainerStyle}>
            <Heading level={4} style={gridTitleStyle}>Guides</Heading>
            <TouchableOpacity style={mapIconContainerStyle}>
              <Image style={mapIconStyle} source={require('./img/icon-map-teal.png')} />
            </TouchableOpacity>
          </View>
          <Grid
            data={guidesByAuthor}
            renderItem={renderItem}
            numItems={2}
            aspectRatio={1.6}
          />
        </CardSection>
      </Card>
    </ViewContainer>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { guides } = state;
  let { author } = ownProps;

  // If an author object is passed in, show the details of that author otherwise show the user profile
  const isAuthorProfile = !!author;

  if (!isAuthorProfile) {
    // TODO: Hook this up to the user profile
    author = {
      title: '@user',
      subtitle: 'First Last',
      image: require('./img/yellow.png'),
    };
  }

  // Get the guides that have been created by the user
  const guidesByAuthor = guides.filter(guide => guide.author.title === author.title);

  return { author, guidesByAuthor, isAuthorProfile };
};

ProfileView.propTypes = propTypes;

export default connect(mapStateToProps)(ProfileView);
