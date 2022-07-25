import { useState } from 'react';
import './App.css';
import wormLogo from './assets/images/worm-svgrepo-com.svg';
import { ErrorBoundary } from './components/ErrorBoundary';
import { BasicMap } from './components/BasicMap';

export default function App() {
  const [showMap, setShowMap] = useState(false);

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  return (
    <ErrorBoundary>
    <div className="App">
      <div>
        <button className='button' onClick={()=> toggleShowMap()}>{ showMap ? 'Hide Map' : 'Show Map'}</button>
      </div>

    {!showMap &&
    <header className="App-header">
      <img src={wormLogo} className="App-logo" alt="spinning worm logo" />
      <p>
        Click the button above to show a map.
      </p>
    </header>
    }
    <main>
       <BasicMap />
    </main>
    </div>
    </ErrorBoundary>
    )
}
