import { useEffect, useState } from 'react';
// import Dropdown from './Dropdown';
import Image from '../assets/background.webp';
import '../styles/HomePage.css';
import fireDb from "../firebase"; 
import routeImage from '../assets/routes.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, getDocs } from "firebase/firestore";
export default function HomePage() {
  const [bookedCab,setbookedCab]= useState({
    amount: "",
    label:"",
    bookingTime:"",
    freeTime:"",
    value:"",
  });
  const [cab,setCab]= useState({
    label:"",
    value:"",
  });
  const getInitialState = () => {
    const value = 1;
    return value;
  };
  const getInitialStatee = () => {
    const value = 'A';
    return value;
  };
  const [valuee, setValue] = useState(0);
  const [pickup, setPick] = useState(getInitialStatee);
  const [drop, setDrop] = useState(getInitialStatee);
  const handleChangee = (e) => {
    setValue(e.target.value);
  };
  const handleChange1 = (e) => {
    setPick(e.target.value);
  };
  const handleChange2 = (e) => {
    setDrop(e.target.value);
  };
  const places = [{value:'A',label: "1. Manali"},{value:'B',label: "2. Jalandhar"},{value:'C',label: "3. Dehradun"},{value:'D',label: "4. Jaipur"},{value:'E',label: "5. Agra"},{value:'F',label: "6. Kota"}];
  let [options, setOptions] = useState([{value:-1,label: "Select a cab"},{value:5,label: "Ultra-Luxury"},{value:4,label: "Luxury"},{value:3,label: "SUV"},{value:2,label: "Sedan"},{value:1,label: "Micro-Car"}]) ;

  // places.map((option)=>{
  //   cab.label=option.label;
  //   cab.value=option.value;
  //   fireDb.child("places").push(cab,(err)=>{
  //   if(err){
  //     toast.error("Not confirmed, try again");
  //   }else{
  //     // alert(" ");
  //   }
  // }); 
  // });
  const [email, setEmail] = useState('');
  const [flag, setUpdated] = useState(false);
  const [routee, setUpdatedd] = useState(false);
  const [both, setBoth] = useState(true);
  
  const handleChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRoute=()=>{
    setUpdatedd(!routee);
  };
  const handleClick = () => {
    setUpdated(!flag);
    bookedCab.amount=total+taxes;
    bookedCab.label= options[6-valuee].label;
  };
 //Send mail
  const handleClickk = () => {
    // event.preventDefault();
    const config = {
      Username: 'cabookcabservices@gmail.com',
      Password: '803B33D28D91A8CBCFE5E90A0D2AAB5063FE',
      Host: 'smtp.elasticemail.com',
      Port: 2525,
      To : `${email}`,
      From : "cabookcabservices@gmail.com",
      Subject : "Ride Confirmed ! We are very excited to ride with you !",
      Body : `Thankyou for using Cabook. Trip confirmed .\nEstimated time taken for the trip: ${distance}minutes.\nAmount to be paid: $ ${total+taxes}.\n Happy journey !`
    }
    if(window.Email){
      window.Email.send(config).then(()=> alert("Confirmation email sent (Check spam folder if not in inbox)"));
    }
    options[6-valuee].value=0;
    setOptions(options);
    setBoth(false);
  };
  const handleClickkk=() =>{
    setOptions(options);
    setBoth(true);
    setUpdated(!flag);
    setValue(-1);
  }
  const backgroun = {
    header: {
      backgroundImage: `url(${Image})`,
      height: '100vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      marginTop: 0,
    },
  
    content: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  }
  const backgrounRoute = {
    header: {
      backgroundImage: `url(${routeImage})`,
      height: '60%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      // marginTop: 0,
    },
  
    content: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  }
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
const pathh=findShortestPath(graph,pickup,drop).path;
const total=(distance*valuee);
const taxes=(total*18)/100;
const myTimer=(value,label)=>{
  options[6-value].value=6-options.findIndex(x => x.label === label);
}
//sending booking details to our firebase database
const submitBooking = async(event) =>{
  event.preventDefault();
  const config = {
    Username: 'cabookcabservices@gmail.com',
    Password: '803B33D28D91A8CBCFE5E90A0D2AAB5063FE',
    Host: 'smtp.elasticemail.com',
    Port: 2525,
    To : `${email}`,
    From : "cabookcabservices@gmail.com",
    Subject : "Ride Confirmed ! We are very excited to ride with you !",
    Body : `Thankyou for using Cabook. Trip confirmed .\nEstimated time taken for the trip: ${distance}minutes.\nAmount to be paid: $ ${total+taxes}.\n Happy journey !`
  }
  if(window.Email){
    window.Email.send(config).then(()=> toast.success("Confirmation and details sent on mail(check spam folder if not recieved) :)") );
  }
  options[6-valuee].value=0;
  setOptions(options);
  // setTimeout(myTimer(valuee,bookedCab.label), distance*60000);
  setBoth(false);
  const date = new Date();
    bookedCab.bookingTime=date.getHours() 
    + ':' + date.getMinutes() 
    + ":" + date.getSeconds();
    bookedCab.freeTime=distance;
  const {amount,label,bookingTime,freeTime,value} = bookedCab;
  bookedCab.value=valuee;
  //add to database
  fireDb.child("bookings").push(bookedCab,(err)=>{
    if(err){
      toast.error("Not confirmed, try again");
    }else{
      toast.success("Booking successful !")
      // alert(" ");
    }
  }); 
};

//getting booking details from our firebase database
let [data,setData] =useState([]);

useEffect(()=>{
  fireDb.child("bookings").on("value",(snapshot)=>{
    if(snapshot.val()!==null){
      setData({...snapshot.val()});
    }else{
      setData({});
    }
  });
  return ()=>{
    setData({});
  };
},[]);

//get cab details
let [cabs,setCabs] =useState([]);

useEffect(()=>{
  fireDb.child("cabs").on("value",(snapshot)=>{
    if(snapshot.val()!==null){
      setCabs({...snapshot.val()});
    }else{
      setCabs({});
    }
  });
  return ()=>{
    setCabs({});
  };
},[]);
//get places database
let [placess,setPlacess] =useState([]);

useEffect(()=>{
  fireDb.child("places").on("value",(snapshot)=>{
    if(snapshot.val()!==null){
      setPlacess({...snapshot.val()});
    }else{
      setPlacess({});
    }
  });
  return ()=>{
    setPlacess({});
  };
},[]);

const onDelete= (id)=>{
  if(window.confirm("Are you sure you want to delete the booking ? ")){
    fireDb.child(`bookings/${id}`).remove((err)=>{
      if(err){
        toast.error("Not deleted, try again");
      }else{
        toast.success("Booking deleted successfully !");
        options[6-data[id].value].value=data[id].value;
        // console.log(options[6-data[id].value]);
        // alert(" ");
      }
    });
  }
};
  return (
    <div style={backgroun.header} className='mainDiv'>
     {both && !flag && 
     <div className='inputDiv'>
     <h2 className='heading'>Book a cab right now !</h2>
    <div className='in1'>
    <p>Your Email :</p>
      <input
        type="email"
        id="email"
        name="email"
        placeholder='user@gmail.com'
        onChange={handleChange}
        value={email}
      />
      </div>
      <div className='in1'>
      <p>Select pick-up :</p>
      <select value={pickup} onChange={handleChange1}>
        {/* {places.map((option)=>(
          <option value= {option.value}>
            <p>{option.label}</p>
          </option>
        ))} */}
        {Object.keys(placess).map((place)=>(
         <option value= {placess[place].value}>
         <p>{placess[place].label}</p>
       </option>
        ))}
      </select>
      </div>
     <div className='in1'>
     <p>Select destination :</p>
      <select value={drop} onChange={handleChange2}>
        {/* {places.map((place)=>(
          <option value= {place.value}>
            <p>{place.label}</p>
          </option>
        ))} */}
        {Object.keys(placess).map((place)=>(
         <option value= {placess[place].value}>
         <p>{placess[place].label}</p>
       </option>
        ))}
      </select>
     </div>
      <div className='in1'>
        <p>Select cab type :</p>
      <select value={valuee} onChange={handleChangee}>
        {options.map((option)=>(
          <option value= {option.value}>
            {option.value>0 && <p>{option.label} - ${option.value} per min</p>}
            {option.value===0 && <p>{option.label} - Booked</p>}
            {option.value===-1 && <p>{option.label}</p>}
          </option>
        ))}
        {/* {Object.keys(cabs).map((cab)=>(
          <option value= {cabs[cab].value}>
          {cabs[cab].value>0 && <p>{cabs[cab].label} - ${cabs[cab].value} per min</p>}
          {cabs[cab].value===0 && <p>{cabs[cab].label} - Booked</p>}
          {cabs[cab].value===-1 && <p>{cabs[cab].label}</p>}
        </option>
        ))} */}
      </select>
      </div>
      <div className='buttons'>
    <button className="butt2" onClick={handleRoute}>See Routes</button>
    {valuee>0 && pickup!==drop && email && <button className="butt1" onClick={handleClick}>Continue</button>}
      {pickup===drop &&email&& <button className="butt1">Pickup & drop must be different</button>}
      {!email && <button className="butt1">Enter your email</button>}
      {pickup!==drop &&email && (valuee<=0) && <button className="butt1">Choose from available cabs</button>}
    </div>
     </div>
     }

    {both && flag &&  <div className='inputDiv'>
     <div className='details'>
    <h2 className='heading'>Checkout</h2>
     <div className='checkout'>
        <p className='p1'>Route : </p>
      {pathh.map((pth)=>(
        <p> ~~ {places[places.findIndex(x => x.value === pth)].label} </p>
      ))}
      </div>
     <div className='checkout'>
     <p className='p1'>User Email : </p>
     <p>{email}</p>
     </div>
     <div className='checkout'>
     <p className='p1'>Cab fare : </p><p>${valuee} /min</p>
     </div>
     </div>
     <div className='checkout'>
     <p className='p1'>Shortest Est. Time:</p>
     <p>{distance} min</p>
     </div>
     <div className='checkout'>
     <p className='p1'>Additional Taxes(18%) :</p>
     <p>${taxes}</p>
     </div>
     <div className='linee'/>
     <div className='checkout'>
     <p className='p1'>Total Cost for the trip :</p>
     <p>${bookedCab.amount}</p>
     </div>
    <div className='buttons'>
    <button className="butt2" onClick={handleClick}>Edit</button>
     <button className="butt3" onClick={submitBooking}>Confirm Booking</button>
    </div>
     </div>
     }
     {routee &&<div className='inputDiv' style={backgrounRoute.header} >
      <p className='rheading'>Available routes</p>
      {/* <img src={routeImage} className="rImage" alt="rImage" /> */}
      <button className="rbutt" onClick={handleRoute}>Back</button>
     </div> }

     {!both && <div className='booked'>
      <p className='bookHead'>Booked Cabs</p>
      {Object.keys(data).map((cab)=>(
  <div className='bookings'>
    <p className='booke'>Cab : {data[cab].label}</p><p>Booking Time : {data[cab].bookingTime}</p>
    <button onClick={()=>onDelete(cab)} className='deleteBooking'>Delete</button>
  </div>
     ))}
      <button className='book' onClick={handleClickkk}>Book another cab</button>
      </div>}
      <ToastContainer/>
    </div>
  );
}
