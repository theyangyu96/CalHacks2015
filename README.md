#Inspiration
We are all avid skater and cyclist. We all notice that the path route provided by either Here or Google isn't best choice for riders and especially for skaters, it's easy to fall at certain bumpy place. So, we developed RiderWay to help avid riders like us to share and find best rider way.


#What it does
RiderWay is a web based app that create a dynamic platform for skaters and cyclist to exchange best rider path info and feedbacks towards road conditions.


#How I built it
We used Here Map Javascript API and Routing API as base to compute the route and Azure and Django as backend server to support the network and database.

After user submit, feedbacks will be stored in database so that anytime when other user's search have overlap, the road's condition report from previous user will be indicated. Red means danger, yellow means medium and green means comfort


#What I learned
We learned how to user Here API to abstract map information, Django as backend server to support backend access. Exchange info between FrontEnd and backend and update info in database and render latest info to the FrontEnd.


#What's next for RiderWay
Currently it only has rating system. We expect in the upcoming future to make it more complete by allow user to provide various kind of feedbacks like GoPro video and image of their ride. It will also exclude points that have been marked as danger out of the way when you plan your bike or skateboard path


#Built With
django
here-geocoder
here-routing
javascript
css
html5

