import React, { useState } from 'react';
import { API_URL } from './constants';
import { useNavigate } from 'react-router-dom';


function CreateCharacter() {
    // redirect after create new MCU
    const navigate = useNavigate()
    
    //const[name,setName]= useState("")
    //const[debut,setDebut]= useState("")
    //const[debutYear,setDebutYear]= useState(0)
    // instead of this we shorten it to below
    const[character,setCharacter] = useState({
        name: "",
        debutFlim: "",
        debutYear: 0
    })

    async function postCharacter(){
        fetch(`${API_URL}/createOneMcu`,{
            method: 'post',
            body: JSON.stringify(character),
            headers:{
                'Accept': "applicationjson",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(async res => {
            let serverResponse = await res.json()
            console.log(serverResponse)
            navigate(`/mcu/${serverResponse.payload.name}`)            
        }).catch((e)=> console.log(e))

        setCharacter({
            name:"",
            debutFlim:"",
            debutYear: 0
        })
    }

    function handleOnSubmit(event){
        event.preventDefault()

        postCharacter()
    }

    return ( 
        <form onSubmit={(e) => handleOnSubmit(e)}>
            <label>Name</label>
            <input value={character.name} onChange={(e) => setCharacter({...character, name: e.target.value})} />
            <br /><br />

            <label>DebutFlim</label>
            <input value={character.debutFlim} onChange={(e) => setCharacter({...character, debutFlim: e.target.value})} />
            <br /><br />

            <label>DebutYear</label>
            <input value={character.debutYear} onChange={(e) => setCharacter({...character, debutYear: e.target.value})} />
            <br /><br />

            <button type='submit'>Submit new character</button>
        </form>
     );
}

export default CreateCharacter;