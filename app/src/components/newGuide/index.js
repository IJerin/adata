// src/components/newGuide/index.js

import React, { Component } from 'react';
import { View, Text, Image, Dimensions, CameraRoll } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';

import {
  Input,
  Button,
  TabBar,
  Tab,
  Heading,
  Paragraph,
  Card,
  CardSection,
  Anchor,
} from '../../components/common/';

import Header from '../header/';

import styles from './styles';

const options = {
  title: 'Select Image',
  quality: 0.5,
  maxHeight: 720,
  maxWidth: 1280,
};
class newGuide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: '',
      guideTitle: '',
      guideDescription: '',
      showPhotoGallery: false,
      photoArray: [],
      coverPhoto: null,
      galleryPhoto: null,
      characterLeftDescription: 1200,
      characterLeftTitle: 25,
    };
  }
  handleCoverButtonPress() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response.uri);
        let source = { uri: response.uri };
        this.setState({
          coverPhoto: source
        });
      }
    });
  }
  handlePhotoButtonPress() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log(response.uri);
        let source = { uri: response.uri };
        this.setState({
          galleryPhoto: source
        });
      }
    });
  }

  handlePressCancel() {
    console.log("hello")
  }
  renderDetails() {
    const {
      infoContainerStyle,
      paragraphStyle,
      buttonContainerStyle,
      inputContainerStyle,
      updateTextStyle,
    } = styles;
    const {
      coverPhoto,
      guideTitle,
      guideDescription,
      characterLeftTitle,
      characterLeftDescription,
    } = this.state;
    return (
      <Card>
        <CardSection>
          <View style={infoContainerStyle}>
            <Heading level={4}>
              Guide cover photo
            </Heading>
          </View>
          <Paragraph style={paragraphStyle}>
            Choose a photo to be used as this guide&apos;s thumbnail in the search page
          </Paragraph>
          <View style={buttonContainerStyle}>
            {(coverPhoto)
              ? <View>
                <Image source={coverPhoto} style={{ height: 204, width: null }} />
                <View style={updateTextStyle}>
                  <Anchor onPress={() => this.handleCoverButtonPress()}>
                    Update cover photo
                  </Anchor>
                </View>
              </View>
              : <Button
                secondary
                onPress={() => this.handleCoverButtonPress()}
              >
                  Add a cover photo
              </Button>
            }
          </View>

        </CardSection>
        <CardSection>
          <Heading level={4}>Guide title</Heading>
          <Paragraph style={paragraphStyle}>
            Write a brief title that describes the subject of this guide
          </Paragraph>
          <View style={inputContainerStyle}>
            <Input
              value={guideTitle}
              placeholder={'Text'}
              onChangeText={(text, character) => this.setState({ guideTitle: text, characterLeftTitle: character })}
              max={25}
              info={`${characterLeftTitle} character left`}
            />
          </View>
        </CardSection>
        <CardSection>
          <Heading level={4}>Guide Description</Heading>
          <Paragraph style={paragraphStyle}>
            Describe in detail what photographers should expect to see while exploring this collection.
          </Paragraph>
          <View style={inputContainerStyle}>
            <Input
              value={guideDescription}
              placeholder={'Text'}
              onChangeText={(text, character) => this.setState({
                guideDescription: text,
                characterLeftDescription: character,
              })}
              max={1200}
              min={1000}
              info={`${characterLeftDescription} character left (1000 min) `}
              large
            />
          </View>
        </CardSection>
        <CardSection>
          <Heading level={4}>Guide location</Heading>
          <Paragraph style={paragraphStyle}>
            Enter a general location for this collection. This is where your guide marker will appear in the world map view.
          </Paragraph>
          <View style={inputContainerStyle}>
            <Image source={require('../landingPage/homeView/img/biggerGray.png')} style={{ height: 100, width: null }} />
          </View>
        </CardSection>
        <Button
          secondary
          onPress={this.handlePressCancel}
          style={{ marginBottom: 12 }}
        >
            Cancel
        </Button>
      </Card>
    );
  }
  renderPhoto() {
    const {
      infoContainerStyle,
      paragraphStyle,
      buttonContainerStyle,
      inputContainerStyle,
      cancelButtonStyle,
    } = styles;
    const { galleryPhoto } = this.state;
    return (
      <Card>
        <CardSection>
          <View style={infoContainerStyle}>
            <Heading level={4}>
              Guide cover photo
            </Heading>
          </View>
          <Paragraph style={paragraphStyle}>
            Choose a photo to be used as this guide&apos;s thumbnail in the search page
          </Paragraph>
          <View style={buttonContainerStyle}>
            <Button
              secondary
              onPress={() => this.handlePhotoButtonPress()}
            >
                Add a new photo
            </Button>
            <View style={inputContainerStyle}>
              <Image source={galleryPhoto} style={{ height: 204, width: null }} />
            </View>
          </View>
        </CardSection>
        <Button
          secondary
          onPress={this.handlePressCancel}
          style={cancelButtonStyle}
        >
            Cancel
        </Button>
      </Card>
    );
  }
  render() {
    const { keyboardScrollContainerStyle } = styles;
    const { selectedTab } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header allowBack color title={'New Guide'} />
        <KeyboardAwareScrollView style={keyboardScrollContainerStyle}>
          <TabBar
            onTabChanged={key => this.setState({ selectedTab: key })}
            selectedColor={'#1BAC95'}
            tabColor={'#333'}
          >
            <Tab
              id={'Details'}
              title={'Details'}
              selectedTab={selectedTab}
            >
              {this.renderDetails()}
            </Tab>
            <Tab
              id={'Photos'}
              title={'Photos'}
              selectedTab={selectedTab}
            >
              {this.renderPhoto()}
            </Tab>
          </TabBar>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default newGuide;
