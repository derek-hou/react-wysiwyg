import './App.css';

import { Wysiwyg } from './components/wysiwyg/Wysiwyg';

import { GlobalProvider } from './context/GlobalState';

function App() {
  return (
    <GlobalProvider>
      <Wysiwyg />
    </GlobalProvider>
  );
}

export default App;
