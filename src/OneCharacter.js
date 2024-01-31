import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { API_URL } from "./constants";


function OneCharacter() {
    const navigate = useNavigate()

    const{name} = useParams()

    const[character,setCharacter] = useState({
        debutFilm: "",
        debutYear: 0
    })
// 1A. the true/false value that users can control - initially false, because reading info goes before editing

    const [isEditing,setIsEditing] = useState(false)

    useEffect(()=>{
        fetch(`${API_URL}/oneMcu/${name}`,{
            headers:{
                'Accept': "applicationjson",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(async res => {
            let result = await res.json()
            setCharacter(result.payload)
        })
    },[name,isEditing])

    // we can see info about one character
    // on the backend, we have a route that will accept an object that looks like:
    // {
    //     debutFilm: "Hawkeye",
    //     debutYear: 2021
    // }

    // I want to give the users the ability to do this on the front end. Here's what I imagine thay might need:
    // 1. There needs to be a clear difference between "User is reading the values" vs "User is editing the values"
    // A- some sort of true/false value
    // B-Conditionally render eiter <span> or <input /> based on the true/false
    // C-Give the users a button 
    // D-to change this value to true from being false, and vice vesera
    // E-Small detail; make the edit button say "discard" when exiting "edit mode"
    // 2. A form (some input fields) to specify the values (the film/year that we want to updeate)
    // A- let users actually type into the input field && KEEP TRACK OF IT(will need it when I send the values to my DB)
    // B-Use the same function to handle both
    // 3. When the user is ready to submit the form, they click a button, and can read the NEW VALUES
    // A-need a function to handle form submission - should send state variable `character` to the backend route
    // B-surround the input fields in a form, give it a button that runs on submit
    // C-Some sort of behavior to confirm to the user that changes have been made
    // Clean up a bug that keeps the old values, despite clicking "Discard Changes"


    // 1D
    function toggleIsEditing(){ // connected to button for editing
        isEditing ? setIsEditing(false) : setIsEditing(true)
    }

    // 2A
    function updateCharacter({target}){ //targeting input fill name and value using useState above. 
        // im goint to send in the event, which is an {}
        // one of the properties of the {} is target
        // target is the element - any attribute on this element is a property of target
        // onChange is an event
        setCharacter((prevState)=> {
            return{
                ...prevState,
                [target.name]: target.value
            }
        })
    }

    function handleOnSubmit(e){
        e.preventDefault()//prevent refreshing the page which would cancal all operations
        console.log('submitted')//to make sure its running
        fetch(`${API_URL}/updateOneMcu/${name}`,{ //connect api to the update the name is coming from Params above
            method:'put',//this is a put function in postman
            body: JSON.stringify(character),
            headers:{ //Cors allow two terminal to communcate with each other at the same time
                'Accept': "applicationjson",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(() => {
            // 3C
            setIsEditing(false)
        })    
      
    }

    function handleDelete(){
        fetch(`${API_URL}/deleteOneMcu/${name}`,{
            method:"delete",
            headers:{
                'Accept': "applicationjson",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(() =>{
            navigate('/mcu')
        })

    }

   

    return ( 
        <>
            <h1>{name}</h1>
            {/* 3B form */}
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <p>
                    Debut in the film&nbsp;
                    {/* 1B */}
                    {
                        isEditing ?
                        <input type="text" name="debutFilm" value={character.debutFilm} onChange={updateCharacter}/>  
                        : 
                        <span>{character.debutFilm}</span>
                    }
                    
                </p>
                <p>
                    {/* &nbsp; is short for space */}
                    Release in the year&nbsp;
                    {/* 1B */}
                    {
                        isEditing ?
                        <input type="text" name="debutYear" value={character.debutYear}onChange={updateCharacter}/>  
                        : 
                        <span>{character.debutYear}</span>
                    }
                </p>
                {/* if editing is true button appears */}
                {isEditing ? <button type="submit">Save Change</button> : <br />}
            </form>
            {/* 1C */}
            <button onClick={toggleIsEditing}>               
                   {
                    isEditing 
                    ?
                     <span>Discard Changes</span>
                    : 
                    <span>Edit Character Details</span> 
                }
            </button>
            <br />
            <button onClick={handleDelete}>
                One Click Delete this character
            </button>
        </>
     );
}

export default OneCharacter;