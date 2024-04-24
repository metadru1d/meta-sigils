import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [buttonText, setButtonText] = useState('Connect Wallet');

  const isPhantomInstalled = window.phantom?.solana?.isPhantom

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app', '_blank');
  }

  const connect = async () => {
    const provider = getProvider();
    try {
      const resp = await provider.connect({ onlyIfTrusted: true });
      console.log(resp.publicKey.toString());
      setButtonText('Connected');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="card">
        <button onClick={connect}>         
          {buttonText}
        </button>
      </div>
    </>
  )
}

export default App
