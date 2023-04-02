# Deployed Site- https://cabookcabservicess.netlify.app/

Assignment Submission for Scaler SDE Intern Full-Stack Assignment - Cab System
Frontend is build in React JS with backend using Firebase
The website is deployed using netlify.

Project Description- 
The site lets you book cabs form one location to another and calculates the shortest distance between two places using the best route possible and sends confirmation email on successful booking. 
You can choose the pick-up and drop from the locations available with no predefined routes. 

<img width="1440" alt="Screenshot 2023-04-02 at 6 18 54 PM" src="https://user-images.githubusercontent.com/79107244/229354872-a87d775d-751e-4ba2-8bf5-829407e4cc2e.png">

<img width="1440" alt="Screenshot 2023-04-02 at 7 54 30 PM" src="https://user-images.githubusercontent.com/79107244/229358995-949f7553-000b-4be5-b72b-ef28a2016e3f.png">

The site gives you the sumary of the trip with estimated cost for the trip inclusive of taxes. 
To calculate the cost for the trip, the fare of the cab per minute is multiplied with the shortest time it will take to reach from pickup to destination.
This is calculated using the following algorithm - 
REFER to lines no. 130-221 in HomePage.js file for code

On confirmation, a confirmation mail is sent to the user email by using the SMTP protocol with elastic mail as host.
REFER to lines no. 232-244 of HomePage.js file for code

<img width="1113" alt="Screenshot 2023-04-02 at 6 20 31 PM" src="https://user-images.githubusercontent.com/79107244/229355691-9bbef6da-94ce-4641-b546-b18c8a2f515f.png">

<img width="1075" alt="Screenshot 2023-04-02 at 8 02 01 PM" src="https://user-images.githubusercontent.com/79107244/229359386-0a318989-f2b4-430c-a16c-4214cc4cfe3b.png">


Then the booking details are also sent to the firebase realtime database which are to be printed in the bookings screen. 
REFER to line no. 257 in HomePage.js

<img width="1440" alt="Screenshot 2023-04-02 at 6 50 15 PM" src="https://user-images.githubusercontent.com/79107244/229355562-0e53627a-6c35-45bd-af48-76014f27dc8d.png">

Also I've set the value of the cab in the options array to be 0 to filter it out while booking another cab and show it as booked.

<img width="737" alt="Screenshot 2023-04-02 at 8 00 26 PM" src="https://user-images.githubusercontent.com/79107244/229359302-137595be-b39b-4629-b1b6-bc5eb4ad6b37.png">

The user can also delete their booking by clicking on the delete button with the bookings.Then the cab will be again available to be booked.

<img width="1440" alt="Screenshot 2023-04-02 at 6 19 43 PM" src="https://user-images.githubusercontent.com/79107244/229355665-157c0632-acaa-47bf-a1eb-42924263fffb.png">

The cabs will automatically be available after their trips which is implemented by timeout function as distances were given in minutes.
The user can also book another cab from the other four options if one is already booked by them.

The website is also made responsive using basic media queries.
## Available Scripts

In the project directory, you can run:

### `npm start`

# Cab-Booking-System-Full-Stack
