import React from 'react';
import Page from './components/Page';
import ScorePage from './pages/ScorePage';
import Footer from './components/Footer';

import './style/general.css';

function App() {
  return (
    <Page>
      <ScorePage />
      <Footer />
    </Page>
  );
}

export default App;
