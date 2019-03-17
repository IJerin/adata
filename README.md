# Viewfinder #

Viewfinder is an app for photographers. Whether you're a seasoned pro or a novice hobbiest, we will show you how to get the best pictures so you get the most out of whatever location you're in.

[Marketing Site](https://getviewfinder.com)

## Version ##
1.0 (MVP)

## Contributing/Deploying ##
### App ###
Install platform dependencies
```sh
$ brew install yarn                 // Yarn
$ brew install node                 // NodeJS
$ brew install watchman             // Watchman
$ sudo gem install cocoapods        // CocoaPods            
$ npm install -g react-native-cli   // React Native CLI
```

Install app dependencies
```sh
$ cd path/to/repo/app
$ yarn install   // Can also use `npm install`

// iOS only
$ cd ios/
$ pod install
```

Deploy app locally
```sh
$ cd path/to/repo/app
$ react-native run-ios | run-android
```

Install app dependencies (Android)
```sh
$ cd path/to/repo/app
$ npm install
$ cd ios/
$ pod install
```

Deploy app locally (iOS)
```sh
$ cd path/to/repo/app
$ react-native run-ios
```

### Client (Marketing/User Portal) ###
TDB

### Server ###
TDB

## Contribution guidelines ##

* Coding standards (TBD)
* Writing tests (TBD)

## Who do I talk to? ##

### Product/Content ###
**Michael Friedman** (michael@getviewfinder.com)

**Marco Olson** (marco@getviewfinder.com)

### Development ###
**Rich Gomez** (rich@getviewfinder.com)

**Cory McHugh** (cory@getviewfinder.com)

### Design ###
**Marco Olson** (marco@getviewfinder.com)