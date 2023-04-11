import { useState } from "react";
function App() {

  type Flag = {
    nsfw: Boolean,
    religious: Boolean,
    political: Boolean,
    racist: Boolean,
    sexist: Boolean,
    explicit: Boolean
  }

  type Joke = {
      error: Boolean;
      category: String;
      type: String;
      setup: String;
      delivery: String;
      flags: Flag;
      id: Number;
      safe: Boolean;
      lang: String
  }
  
  const [jokeSetup,setJokeSetup] = useState<String>('')
  const [jokeDelivery, setJokeDelivery] = useState<String>('')
  const jokeFinder = async () => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any')
      const joke: Joke = await response.json()
      setJokeSetup('')
      setJokeDelivery('')
      jokeDeliver(joke)
    } catch(err) {
      console.log('Error fetching data', err)
      alert('failed to fetch joke data')
    } 
  }
  const jokeDeliver = (joke: Joke) => { 
    if(joke.setup.length !== 0) {
      setJokeSetup(joke.setup)
      setTimeout(() => {
        setJokeDelivery(joke.delivery)
      },1500)
    } else {
      console.log('search for another joke')
      alert('Search Again')
    }
    
  }
  return (
    <div className="App bg-gradient-to-b from-sky-200 to-blue-300 min-h-screen flex flex-col justify-center items-center">
      <div className='flex flex-col items-center'>
          <img src = '/Hi.gif' className='w-full'/>
          <button className='bg-blue-500 text-white p-2 rounded-md shadow-md shadow-indigo-400 hover:bg-blue-600 mt-[-26px] ml-10 px-4' onClick = {jokeFinder}>Tell Me A Joke</button>
      </div>
     <div className="mt-5 font-semibold bg-white  text-blue-600 rounded-md leading-8 mx-5">
        {jokeSetup === '' ?  <></> : 
        <>
            <p className="mt-5 mx-5">{jokeSetup}</p>
            <p className="mb-5 mx-5 text-center">{jokeDelivery}</p>
        </> 
          }
     </div>
    </div>
  )
}

export default App
