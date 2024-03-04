import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react'

function App() {

  const [textInto, SettextIntoSet] = useState('');
  const [textTransleted, SettextTransleted] = useState('');
  const [select1, SetSelect1] = useState('pt');  
  const [select2, SetSelect2] = useState('en-GB');

  useEffect(()=>{
    axios.get(`https://api.mymemory.translated.net/get?q=${textInto.trim()}&langpair=${select1}|${select2}`)
    .then(r=>{
      console.log(r.data.responseData.translatedText)
      if(r.data.responseData.translatedText != 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT'){
        SettextTransleted(r.data.responseData.translatedText)
      }else if(r.data.responseData.translatedText == 'NO QUERY SPECIFIED. EXAMPLE REQUEST: GET?Q=HELLO&LANGPAIR=EN|IT'){
        SettextTransleted('')
      }
      else if(select1 == select2){
        SettextTransleted('Selecione idiomas diferentes!')
      }
    })
    .catch(()=>{
      console.log('Ocorreu um erro!')      
    })
  }, [textInto || select2]);

  return (
    <>
    <h1>Tradutor</h1>
      <div>
        <select
          className='text'
          onChange={(e)=>SetSelect1(e.target.value)}
        >
          <option value="pt">português</option>
          <option value="en-GB">inglês</option>
          <option value="fr">francês</option>
          <option value="af">Afrikaans </option>
          <option value="it">italiano</option>
          <option value="es">espanhol</option>
        </select>
        <textarea
          cols={45}
          rows={15}
          placeholder='Escrever Texto'
          onChange={(e)=>SettextIntoSet(e.target.value)}
        ></textarea>
      </div>
      <div>
      <select
          onChange={(e)=>SetSelect2(e.target.value)}
        >
          <option value="pt">português</option>
          <option selected value="en-GB">inglês</option>
          <option value="fr">francês</option>
          <option value="af">Afrikaans</option>
          <option value="it">italiano</option>
          <option value="es">espanhol</option>
        </select>
        <textarea
          cols={45}
          rows={15}
          placeholder='Texto traduzido aqui'
          value={textTransleted}
          disabled
        ></textarea>
      </div>
    </>
  )
}

export default App
