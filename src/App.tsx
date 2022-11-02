import React from 'react';
import Page from './components/Page';
import ScoreCard from './components/ScoreCard';
import Footer from './components/Footer';

import './style/general.css';

function App() {
  return (
    <Page>
      <ScoreCard />
      <Footer />
    </Page>
  );
}

export default App;
