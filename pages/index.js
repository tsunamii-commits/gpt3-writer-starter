import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import wendyLogo from '../assets/wendy-logo.png';
import { useState } from 'react';

const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const inputFinal = userInput;
  const response = await fetch('api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

const onUserChangedText = (event) => {
  setUserInput(event.target.value);
};

  return (
    <div className="root">
      <Head>
        <title>Tsunami's GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
          <div className="logo">
            <Image src={wendyLogo} alt="Logo" width={150} height={150} />
          </div>
            <h1>wendy's birthday message generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>it's wendy's 29th birthday and she doesn't have enough friends to greet her on her special day! Type in any person - or animal - and see what message they have for Wendy!</h2>
          </div>
        </div>
          
    <div className="prompt-container">
      <textarea
        className="prompt-box"
        placeholder="start typing here"
        value={userInput}
        onChange={onUserChangedText}
      />

      <div className="prompt-buttons">
            <a
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
     </div>

     {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Wendy's birthday message from {userInput}: </h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}

    </div>

    

      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
