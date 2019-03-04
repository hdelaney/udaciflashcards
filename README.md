<h2>React Native Project - UdaciFlashcards</h2

This is the final project for Udacity's React Native course and React ND program.

A simple flashcard mobile application, UdaciFlashcards works on iOS and Android. It has limited testing via Expo CLI v32.0.0 on Apple iPhone 5S with Expo and on Google Nexus 5X with Genymotion & Expo.

The application has a small set of dummy data with which to start. In the app one can add a new flashcard deck and also add new flashcard quiz questions. The app uses `react-native` AsyncStorage to store and use data locally.

<h3>Get Started</h3>

<h4>You'll need these first...</h4>

<h5>1) Expo</h5>

* Expo CLI is required to run this application.

* Expo's Mobile Client on your mobile device, if you're viewing the application from your mobile device. 

* See intstructions for Expo here: https://docs.expo.io/versions/latest/introduction/installation/ 

P.S. If you're a macOS user you may need to install Watchman - scroll to the bottom of the page linked above to read more.

<h5>2) A simulator, if you're not viewing the app from Expo on your mobile device</h5>

For viewing on iOS, you can only view via an iOS simulator on a Mac (unless you have a virtual machine going). Sadface. You can view the application via Xcode, which can be downloaded from the App Store.

If you already have Xcode, make sure it is up-to-date.

In Xcode, go to "Preferences", then the "Locations" panel. Then, select the most recent version in the "Command Line Tools" drop-down list.

For viewing on Android, setting up an Android simulator is a pain, but you can do it! Check out Expo's documentation on Genymotion to start unravelling the tangled ball of yarn that is installing and configuring an Android simulator. https://docs.expo.io/versions/v27.0.0/workflow/genymotion/



<h4>Let's do this</h4>

In terminal, from the main directory, run `npm start` or  `expo start`.

This will launch Expo DevTools. Once it's done doing its thing, you'll see a big QR code followed by some bullet points in the terminal. Expo may also launch a Metro Bundler window in your web browser. When the tunnel is ready you can either open Expo's Mobile Client app on your mobile device, or open your simulator.

If you're viewing on your mobile device via Expo's Mobile Client app, open the app, go to the "Projects" tab, and click on your project to open and view it.

If you're viewing on a simulator, wait for your simlutator to launch, then in the terminal press "a" for Android simulator and "i" for iOS simulator.



<h3>Some notes</h3>

This application was built with Expo v32.0.0 .

This app uses Expo's Notifications to access local notifications and set an automatically repeated daily local notifcation reminder to remind the user to take at least one quiz. This feature will be deprecated in the next Expo SDK release. So, there is a yellow, non-failing error thrown as a result of this. 

This application uses React Navigation v3.

This application uses thunk middleware to log actions and changes to Redux state. The middleware has been kept in place for reviewing purposes.