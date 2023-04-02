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
```
//Cities and their routes are represented as a graph of key value pair 
//here graph represents the example given in the assignment
let graph = {
	A: { B: 5, C: 7 },
	B: { A: 5, E: 20, D:15 },
	C: { A:7, D: 5, E: 35 },
	D: { B: 15,C:5,F:20 },
  E: {C:35, B:20, F:10 },
	F: {E:10,D:20},
};
let shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
	let shortest = null;
	
  // for each node in the distances object
	for (let node in distances) {
    	// if no node has been assigned to shortest yet
  		// or if the current node's distance is smaller than the current shortest
		let currentIsShortest =
			shortest === null || distances[node] < distances[shortest];
        	
	  	// and if the current node is in the unvisited set
		if (currentIsShortest && !visited.includes(node)) {
            // update shortest to be the current node
			shortest = node;
		}
	}
	return shortest;
};
let findShortestPath = (graph, startNode, endNode) => {
  // track distances from the start node using a hash object
    let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);
 // track paths using a hash object
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
   parents[child] = startNode;
  }
    let visited = [];
 // find the nearest node
    let node = shortestDistanceNode(distances, visited);
  
  // for that node:
  while (node) {
  // find its distance from the start node & its child nodes
   let distance = distances[node];
   let children = graph[node]; 
       
  // for each of those child nodes:
       for (let child in children) {
   
   // make sure each child node is not the start node
         if (String(child) === String(startNode)) {
           continue;
        } else {
           // save the distance from the start node to the child node
           let newdistance = distance + children[child];
 // if there's no recorded distance from the start node to the child node in the distances object
 // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
           if (!distances[child] || distances[child] > newdistance) {
 // save the distance to the object
      distances[child] = newdistance;
 // record the path
      parents[child] = node;
     } 
          }
        }  
       // move the current node to the visited set
       visited.push(node);
 // move to the nearest neighbor node
       node = shortestDistanceNode(distances, visited);
     }
   
  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
   shortestPath.push(parent);
   parent = parents[parent];
  }
  shortestPath.reverse();
   
  //this is the shortest path
  let results = {
   distance: distances[endNode],
   path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
    return results;
 };
// console.log(findShortestPath(graph,pickup,drop).distance);
const distance=findShortestPath(graph,pickup,drop).distance;
const total=(distance*valuee);
const taxes=(total*18)/100;
```
On confirmation, a confirmation mail is sent to the user email by using the SMTP protocol with elastic mail as host.
<img width="1113" alt="Screenshot 2023-04-02 at 6 20 31 PM" src="https://user-images.githubusercontent.com/79107244/229355691-9bbef6da-94ce-4641-b546-b18c8a2f515f.png">

<img width="1075" alt="Screenshot 2023-04-02 at 8 02 01 PM" src="https://user-images.githubusercontent.com/79107244/229359386-0a318989-f2b4-430c-a16c-4214cc4cfe3b.png">


Then the booking details are also sent to the firebase realtime database which are to be printed in the bookings screen. 
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
