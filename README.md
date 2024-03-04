INSTALL AND RUN INSTRUCTIONS, 

firstly run npm install to ensure all dependencies are installed,

now to run the app locally run npm run dev

to build the app run npm run build 

and to run the tests run npm run test


DISCUSSION

if given more time i would like to:

- enhance the visuals in order to improve the user experience as currently its very basic.

- add a section that states the location thats data is currently being displayed including country, which involves expanding from two leter isocode that is provided 

- add  sunrise and sunset itmes, its a nice simple feature that may not be of much use to some but is a nice to have 

- position and label the metric to imperial switch appropriately, possibly rethink the layout in general 

- convert to local timezone for each city, eg showing the time slots for new york in new york time

- add collapse functionality for each day to show only the the day data rather when collapsed rather than all timeslots, this would help improve the readability on smaller devices such as mobile phones as currently you have to scroll a long way to get to later days in the week.

- add options to search by postcode or longitude and latitude, when showing this to my wife and friends their main request was an ability to search by postcode and since the api supports this its a very worthwhile change 

- add suggested cities using the geolocator api to suggest completions for the location search bar

- increase test coverage to cover all edge cases and add end to end tests
  
