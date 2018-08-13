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

## First Checkin

Expo has been an excellent way to update and test on the device. 

First of many snafus was an abrupt error stating > "Module `path` does not exist in the Haste module map"
I was able to find an similar issue [here](https://github.com/zetachang/react-native-dotenv/issues/39), but later discovered my IDE has snuck in an auto-import that was not needed.

I hit a point where I was unable to get a response back from the server and then hit snags trying to "Debug JS Remotely". Getting to this point involved me trying to get better debugging which led to redownloading the Android Studio and SDK's. Still after no luck, I went about ensuring that I wasn't hitting a snag on CORS issues. I ultimately was able to get a response but the response was status 204. This led me to an error that [exists currently for many Android users using version 0.54+](https://github.com/facebook/react-native/issues/18190)

From here, I suspected that downgrading React Native would let me get back to development, but then came across errors stating that my version Javascript and Native versions were different which was a result of downgrading to a more stable version of React Native (0.53 according to the commenters), but getting errors about mismatched versions between Javascript and Native meant that I had to downgrade further to React Native version 0.52 to use the 1:1 equivelent of Expo version 25.0.0. Cacheing was an issue, so I had to uninstall/reinstall my node_modules directory and then discovered that React Navigator was no longer working with the downgrades. I commented it out and continued until I could fetch a JSON response. 

I added micro-dev to the server project to get better logging where I finally discovered that the fetch issues were ultimately in my url interpolation because of a stray slash character. I cleaned it up, restored all versions back to current working order and am now back to rendering components and at this point have the basic vehicle information displaying.

Now to play more with flexPositioning, images, and navigation.  

## Second Checkin

It's hard to say how much a CSS background translates into styling React Native. While many style properties are supported, it's also not clear which ones are missing, don't work, or only work for one OS (text-transform & border-style come to mind). Getting images to display took a bit as static numbers are encouraged, but found out how to make them scale as needed.

Adding styles aren't difficult, but it definately encourages the developer to look into new ways to organize collections of styles.

Getting two columns to display in React Native took a bit, but discovered a prop on FlatList which took care of that.

Thankfully, I was able to get a grid search screen without too much difficulty using some brand colors.

## Third checkin

For Vehicle Details, I went in three different directions trying to get an image carousel slider. After tying my hand at a few plugins without a lot of success, found that ScrollView did exactly what I needed it to do. Since the random images from the test server are all from the same source url, I added a cache busting function to add a bit more variety to the screen.

It seems default Buttons don't offer much in the way of styles.

Looking at differences between this app and another, I found that there was an opportunity to cache the list view image as the background image while the carousel loads.

## Fourth checkin

The reservation complete screen was indeed the easiest so it provided some time to do some other cleanup. While svg's don't appear to be supported by default, there was a plugin to resolve that. While I was hoping to add animation to the checkmark's stroke-dash-offset, that will be left to do for another time.

I also was able to easily update the header and navigation options to provide the correct flow as one would not expect a back arrow in the header after booking a reservation. However, there is value in being able to view the vehicle details without being able to rebook, so logic was added to be able to go back to the details page with a button but to hide the reserve button to keep them from rebooking the same vehicle.

While my idea of adding a background image seemed like a good idea, unfortunately, the carousel images are all random so fading in a completely new image did not make for a good UX. Perhaps there would be a way to have a better pattern matching to ensure the gallery photos match the original listing image in a different environment, but for this project with these requirements, I hardcoded it out for later. 

My testing was done with limiting the results to 10. After resetting the value to 100, I discovered that the FlatList control is rerendering the list items which is causing the items to re-render. This means that the random image generator is now refiring after every scroll. The data source will need to be moved out of the renderItem prop of the FlatList.

My last to do's will be cleanup for deployment including:
1. Deploy server to Zeit Now Hosting
2. Change api url
3. Make the course code accessible to the Expo api for demo


## Fifth checkin

I created a node js server instance remotely to make the project accessible for demo. I updated the appi url in the service and everything worked.

After that I went digging into Expo's website and found that I could easily upload my project from git to run a simulator from the web using Snack. I'm a bit excited to dig into other projects to see what other people have been able to create.

Now that the project was demo-able remotely, I fixed the render method of the VehicleListItems so they were not recalculating the uri image on every render. I thought making this a functional component would be fine, but it might be worth investigating if a PureComponent would ease some performance issues as I do not have much experience of best practices for FlatList items and when they are re-rendered.

Additionally, since the carousel images were taking a bit to load, I decided to add in a generic background image while the carousel images were loading.

After some other small tweaks and cleanup, I feel this is a MVP based on the requirements.


## To the future

If I were to create this for an enterprise application, there are a few things left to take on:

- Cleanup/organize styles... create some global standards perhaps, but interested in starategies others have used in complex applications
- Check optimization rendering performance of list items
- Do full testing on iOS
- Add accessibility labels to make application a11y friendly.
- Implement better handling of cars no longer being available so they are not redirected to the details screen if it is not available. Perhaps even add in a polling service to update periodically.
- Add a confirmation modal to make sure the user does not accidentally reserve a vehicle. 
- Match first image of carousel with list image of carousel (althought probably less jarring if it is the same vehicle and not random ipsum vehicle images)
- There is a small flash of content between reserving a car and going to the reservation screen. I would suggest adding a delay either to when the state is updated or even waiting a second or two before transitioning to the reservation confirmed screen.
- The order number is simply the time stamp of when the vehicle was ordered, so yeah, maybe give them a real order number. 
- Remove the cacheBust function from the images since this wouldn't be preferable with actual production images.
- Add an app icon
- Invest some time into font treatment
- Add a splash screen
- Remove reserved car from search list or leave for that user with a design treatment to know they already have it booked.
- Animate the SVG checkmark as originally intended
- Offline capabilities and cacheing

### Takeaways

Well, I spent more than 1-2 hours, and if it were a timed test, I failed. My experience unit testing IE had me remembering instances of a trailing slash being added automatically. With a combination of other errors and outstanding issues others had experienced, I kept looking in other places, but in the process learned a lot. 

What I can say is that I truly enjoy mobile development and this was truly an opportunity to see how mature hybrid(?ish) apps have come since Phonegap and Cordova. It seems that OS fragmentation is still alive and well (as it probably should be) but I was not expecting so many small differences like border-style not working in Android.

I did have a style in mind for this app but changed it since the contrast of the highlight color was not a11y friendly against a white background. Still, I think it came out fairly well.

All in all, I had fun and feel comfortable developing a full mobile application from this small exercise. 
