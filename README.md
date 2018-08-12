# React Native - Vehicle Browser

> Forked from: https://github.com/flexdrive/react-native-exercise

## Given: Problem

Create a React Native frontend with a Node (micro) backend that allows a customer to browse a list of vehicle, see vehicle details, and submit an order.


### Given: Required Views

1. Vehicle List
2. Vehicle Details
3. Success Page

### Given: Guidelines

1. Check into Git periodically
2. Use whichever libraries you like
3. Take 1-2 hours on it
4. Document your assumptions, describe what else would need to be done to make it "production-ready."
5. Send us a link to your git repo.

### Given: What We Are Looking For

1. Coding style
2. Knowledge of React Native, JS or aptitude to quickly pick it up and contribute on a React Native project.


### First Impression

This is my first React Native project so I anticipate a learning curve for:

1. Styles

2. Navigation

3. Animation (back button, left to right page flow, etc...)

4. OS Fragmentation - I doubt an hour or two would be enough to familiarize myself with the components well enough to know which OS equivelents serve the best needs so this will be as generic as possible first pass.

### First Checkin

Expo has been an excellent way to update and test on the device. 

First of many snafus was an abrupt error stating > "Module `path` does not exist in the Haste module map"
I was able to find an similar issue [here](https://github.com/zetachang/react-native-dotenv/issues/39), but later discovered my IDE has snuck in an auto-import that was not needed.

I hit a point where I was unable to get a response back from the server and then hit snags trying to "Debug JS Remotely". Getting to this point involved me trying to get better debugging which led to redownloading the Android Studio and SDK's. Still after no luck, I went about ensuring that I wasn't hitting a snag on CORS issues. I ultimately was able to get a response but the response was status 204. This led me to an error that [exists currently for many Android users using version 0.54+](https://github.com/facebook/react-native/issues/18190)

From here, I suspected that downgrading React Native would let me get back to development, but then came across errors stating that my version Javascript and Native versions were different which was a result of downgrading to a more stable version of React Native (0.53 according to the commenters), but getting errors about mismatched versions between Javascript and Native meant that I had to downgrade further to React Native version 0.52 to use the 1:1 equivelent of Expo version 25.0.0. Cacheing was an issue, so I had to uninstall/reinstall my node_modules directory and then discovered that React Navigator was no longer working with the downgrades. I commented it out and continued until I could fetch a JSON response. 

I added micro-dev to the server project to get better logging where I finally discovered that the fetch issues were ultimately in my url interpolation because of a stray slash character. I cleaned it up, restored all versions back to current working order and am now back to rendering components and at this point have the basic vehicle information displaying.

Now to play more with flexPositioning, images, and navigation.  


### Takeaways
TBD: still in development...
