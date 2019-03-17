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
  Tag,
  Checkbox,
} from '../../components/common/';

import Header from '../header/';

import styles from './styles';

const options = {
  title: 'Select Image',
  quality: 0.5,
  maxHeight: 720,
  maxWidth: 1280,
};
class newPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: '',
      guideTitle: '',
      photoTitle: '',
      characterLeftPhotoTitle: 45,
      showPhotoGallery: false,
      photoArray: [],
      coverPhoto: null,
      galleryPhoto: null,
      photoDescription: '',
      characterLeftDescription: 1200,
      characterLeftTitle: 25,
      parkingChecked: false,
      parkingAddition: false,
      transportationAddition: false,
      transportationChecked: false,
      hoursOfOperationAddition: false,
      hoursOfOportationChecked: false,
      requiresFeeAddition: false,
      requiresFeeChecked: false,
      monthAddition: false,
      monthChecked: false,
      timeAddition: false,
      timeChecked: false,
      exposureAddition: false,
      exposureChecked: false,
      equipmentAddition: false,
      equipmentChecked: false,
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

  handleDeleteButton() {
    alert('delete Button');
  }

  cancelButton() {
    alert('cancel button')
  }

  saveButton() {
    alert('save button')
  }

  handlePressCancel() {
    console.log("hello")
  }
  parkingAdditionalDetails() {
    this.setState({
      parkingAddition: true,
    });
  }
  parkingHidinglDetails() {
    this.setState({
      parkingAddition: false,
    });
  }
  transportationAdditionalDetails() {
    this.setState({
      transportationAddition: true,
    });
  }
  transportationHidinglDetails() {
    this.setState({
      transportationAddition: false,
    });
  }
  hoursOfOperationAdditionalDetails() {
    this.setState({
      hoursOfOperationAddition: true,
    });
  }
  hoursOfOperationHidingDetails() {
    this.setState({
      hoursOfOperationAddition: false,
    });
  }
  requiresFeeAdditionalDetails() {
    this.setState({
      requiresFeeAddition: true,
    });
  }
  requiresFeeHidingDetails() {
    this.setState({
      requiresFeeAddition: false,
    });
  }
  monthAdditionalDetails() {
    this.setState({
      monthAddition: true,
    });
  }
  monthHidingDetails() {
    this.setState({
      monthAddition: false,
    });
  }
  timeAdditionalDetails() {
    this.setState({
      timeAddition: true,
    });
  }
  timeHidingDetails() {
    this.setState({
      timeAddition: false,
    });
  }
  exposureAdditionalDetails() {
    this.setState({
      exposureAddition: true,
    });
  }
  exposureHidingDetails() {
    this.setState({
      exposureAddition: false,
    });
  }
  equipmentAdditionalDetails() {
    this.setState({
      equipmentAddition: true,
    });
  }
  equipmentHidingDetails() {
    this.setState({
      equipmentAddition: false,
    });
  }

  onChangeStateParking(check) {
    this.setState({
      parkingChecked: check,
    });
  }
  onChangeStateTransportation(check) {
    this.setState({
      transportationChecked: check,
    });
  }
  onChangeStateHoursOperation(check) {
    this.setState({
      hoursOfOportationChecked: check,
    });
  }
  onChangeStateRequiresFee(check) {
    this.setState({
      requiresFeeChecked: check,
    });
  }
  onChangeStateMonth(check) {
    this.setState({
      monthChecked: check,
    });
  }
  onChangeStateTime(check) {
    this.setState({
      timeChecked: check,
    });
  }
  onChangeStateExposure(check) {
    this.setState({
      exposureChecked: check,
    });
  }
  onChangeStateEquipment(check) {
    this.setState({
      equipmentChecked: check,
    });
  }

  renderOptional() {
    const {
      infoContainerStyle,
      paragraphStyle,
      inputContainerStyle,
      tagView,
      tagRow,
    } = styles;
    const {
      photoTitle,
      parkingChecked,
      parkingAddition,
      characterLeftDescription,
      transportationChecked,
      transportationAddition,
      hoursOfOportationChecked,
      hoursOfOperationAddition,
      requiresFeeAddition,
      requiresFeeChecked,
      monthChecked,
      monthAddition,
      timeAddition,
      timeChecked,
      exposureAddition,
      exposureChecked,
      equipmentAddition,
      equipmentChecked,
    } = this.state;
    return (
      <Card>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateParking}
            >
              <Heading level={4}>Parking location</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            Some photos require you to park far from the shooting location. If so,
            please indicate where to park to get this shot.
          </Paragraph>
          {(parkingChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              {(parkingAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.parkingHidinglDetails()}>
                      - Hide additional details
                  </Anchor>
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.parkingAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateTransportation}
            >
              <Heading level={4}>Public transportation</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            Tips on how to get to this location using public transportation.
          </Paragraph>
          {(transportationChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              {(transportationAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.transportationHidinglDetails()}>
                      - Hide additional details
                  </Anchor>
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.transportationAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateHoursOperation}
            >
              <Heading level={4}>Hours of operation</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            Please indicate if this location is only accessible during specific hours.
          </Paragraph>
          {(hoursOfOportationChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              {(hoursOfOperationAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.hoursOfOperationHidingDetails()}>
                      - Hide additional details
                  </Anchor>
                  {/* TODO */}
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.hoursOfOperationAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateRequiresFee}
            >
              <Heading level={4}>Requires a fee</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            Does this location require an enterance fee of any kind?
          </Paragraph>
          {(requiresFeeChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              {(requiresFeeAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.requiresFeeHidingDetails()}>
                      - Hide additional details
                  </Anchor>
                  {/* TODO */}
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.requiresFeeAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateMonth}
            >
              <Heading level={4}>Recommended months</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            Is there a certain month that is best for specific shooting conditions? If so, when do you recommend going?
          </Paragraph>
          {(monthChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              <View style={tagView}>
                <View style={tagRow}>
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Jan'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Feb'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Mar'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    style={{ marginRight: 4 }}
                    text={'Apr'}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'May'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Jun'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                </View>
                <View style={tagRow}>

                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Jul'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Aug'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    style={{ marginRight: 4 }}
                    text={'Sep'}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Oct'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Nov'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Dec'}
                    canActivate
                  />
                </View>
              </View>
              {(monthAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.monthHidingDetails()}>
                      - Hide additional details
                  </Anchor>
                  {/* TODO */}
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.monthAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateTime}
            >
              <Heading level={4}>Recommended times</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            What time of day/night do you recommend shooting at this location?
          </Paragraph>
          {(timeChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              <View style={tagView}>
                <View style={tagRow}>
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'AM Blue Hour'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Sunrise'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'AM Golden Hour'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Apr'}
                    canActivate
                  />
                </View>

                <View style={tagRow}>
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Daytime'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                </View>

                <View style={tagRow}>
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'PM Golden Hour'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Sunset'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'PM Blue Hour'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                </View>

                <View style={tagRow}>
                  <Tag
                    backgroundColor={'#FFF'}
                    textColor={'rgba(27, 172, 149, 1)'}
                    text={'Night'}
                    style={{ marginRight: 4 }}
                    canActivate
                  />
                </View>

              </View>
              {(timeAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.timeHidingDetails()}>
                      - Hide additional details
                  </Anchor>
                  {/* TODO */}
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.timeAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateExposure}
            >
              <Heading level={4}>Exposure settings</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            Share your camera setting information so users can learn from your technique.
          </Paragraph>
          {(exposureChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              {(exposureAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.exposureHidingDetails()}>
                      - Hide additional details
                  </Anchor>
                  {/* TODO */}
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.exposureAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
        </CardSection>
        <CardSection>
          <View style={infoContainerStyle}>
            <Checkbox
              value={false}
              onChangeState={this.onChangeStateEquipment}
            >
              <Heading level={4}>Equipment used</Heading>
              <Text> (optional)</Text>
            </Checkbox>
          </View>
          <Paragraph style={paragraphStyle}>
            What equipment did you use to take this photo?
          </Paragraph>
          {(equipmentChecked)
            ? <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
            : <View style={paragraphStyle}>
              <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null }} />
              {(equipmentAddition)
                ? <View>
                  <Anchor style={infoContainerStyle} onPress={() => this.equipmentHidingDetails()}>
                      - Hide additional details
                  </Anchor>
                  {/* TODO */}
                  <View style={inputContainerStyle}>
                    <Input
                      value={photoTitle}
                      placeholder={'Text'}
                      onChangeText={(text, character) => this.setState({
                        photoTitle: text,
                        characterLeftDescription: character,
                      })}
                      max={1200}
                      min={1000}
                      info={`${characterLeftDescription} character left (1000 min) `}
                      large
                    />
                  </View>
                </View>
                : <Anchor style={infoContainerStyle} onPress={() => this.equipmentAdditionalDetails()}>
                      + Add additional details
                </Anchor>
              }

            </View>
          }
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
  renderDetails() {
    const {
      infoContainerStyle,
      paragraphStyle,
      inputContainerStyle,
      tagView,
      tagRow,
      updateTextStyle,
    } = styles;
    const {
      photoTitle,
      coverPhoto,
      characterLeftPhotoTitle,
      characterLeftDescription,
      photoDescription,
    } = this.state;
    return (
      <Card>
        <CardSection separatorMargin={40}>
          <View style={infoContainerStyle}>
            <Heading level={4}>
              Photo
            </Heading>
          </View>
          <Paragraph style={paragraphStyle}>
            Choose a photo to upload to the Viewfinder map
          </Paragraph>
          <View style={inputContainerStyle}>
            {(coverPhoto)
              ? <Image source={coverPhoto} style={{ height: 204, width: null }} />
              : <Image source={require('./img/biggerGray.png')} style={{ height: 327, width: null }} />
            }
            <View style={updateTextStyle}>
              <Anchor onPress={() => this.handleCoverButtonPress()}>
                Replace photo
              </Anchor>
            </View>
          </View>
        </CardSection>
        <CardSection separatorMargin={40}>
          <Heading level={4}>Photo Title</Heading>
          <Paragraph style={paragraphStyle}>
            Write a brief title that describes the subject of this photo.
          </Paragraph>
          <View style={inputContainerStyle}>
            <Input
              value={photoDescription}
              placeholder={'Enter photo title'}
              onChangeText={(text, character) => this.setState({
                photoDescription: text,
                characterLeftPhotoTitle: character,
              })}
              max={45}
              info={`${characterLeftPhotoTitle} character left `}
            />
          </View>
        </CardSection>
        <CardSection separatorMargin={40}>
          <Heading level={4}>Photo description</Heading>
          <Paragraph style={paragraphStyle}>
            Describe in detail what photographers should expect while exploring this location.
          </Paragraph>
          <View style={inputContainerStyle}>
            <Input
              value={photoTitle}
              placeholder={'Enter photo description'}
              onChangeText={(text, character) => this.setState({
                photoTitle: text,
                characterLeftDescription: character,
              })}
              max={1200}
              info={`${characterLeftDescription} character left `}
              large
            />
          </View>
        </CardSection>
        <CardSection separatorMargin={40}>
          <Heading level={4}>Photo tags</Heading>
          <Paragraph style={paragraphStyle}>
            Select up to 5 categories that apply to this photo.
          </Paragraph>
          <View style={tagView}>
            <View style={tagRow}>
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Architecture'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Beach'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'City'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Coast'}
                canActivate
              />
            </View>
            <View style={tagRow}>
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Dron'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Foodie'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Nature'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Landscape'}
                canActivate
              />
            </View>
            <View style={tagRow}>
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Lifestyle'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'Long exposure'}
                style={{ marginRight: 4 }}
                canActivate
              />
              <Tag
                backgroundColor={'#FFF'}
                textColor={'rgba(27, 172, 149, 1)'}
                text={'underwater'}
                canActivate
              />
            </View>
          </View>
        </CardSection>

        <CardSection separatorMargin={40}>
          <Heading level={4}>Exact shooting location</Heading>
          <Paragraph style={paragraphStyle}>
            Would you like to delete your photo? This action is not reversable.
          </Paragraph>
          <View style={inputContainerStyle}>
            <Image source={require('./img/biggerGray.png')} style={{ height: 96, width: null, borderRadius: 4 }} />
          </View>
        </CardSection>
        <CardSection separatorMargin={40}>
          <Heading level={4}>Delete photo</Heading>
          <Paragraph style={paragraphStyle}>
            Would you like to delete your photo? This action is not reversable.
          </Paragraph>
          <Button
            secondary
            destructive
            style={{ borderRadius: 4, marginTop: 24 }}
            onPress={() => this.handleDeleteButton()}
          >
              Delete photo
          </Button>
        </CardSection>

      </Card>
    );
  }
  render() {
    const { keyboardScrollContainerStyle } = styles;
    const { selectedTab } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header allowBack color title={'New Photo'} />
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
              id={'Optional info'}
              title={'Optional info'}
              selectedTab={selectedTab}
            >
              {this.renderOptional()}
            </Tab>
          </TabBar>
        </KeyboardAwareScrollView>
        <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
          <View style={{ width: '49%', marginRight: 12 }}>
            <Button
              secondary
              onPress={() => this.cancelButton()}
              style={{ marginBottom: 12, borderRadius: 4 }}
            >
                Cancel
            </Button>
          </View>
          <View style={{ width: '49%' }}>
            <Button
              onPress={() => this.saveButton()}
              style={{ marginBottom: 12, borderRadius: 4 }}
            >
                save
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default newPhoto;
