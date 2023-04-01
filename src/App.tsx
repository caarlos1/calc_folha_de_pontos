import React from 'react';
import Page from './components/Page';
import ScorePage from './pages/ScorePage';
import Footer from './components/Footer';

import './style/general.css';
import SwitchTheme from './components/SwitchTheme';

function App() {
  return (
    <Page>
      <SwitchTheme />
      <ScorePage />
      <Footer />
    </Page>
  );
}

export default App;
