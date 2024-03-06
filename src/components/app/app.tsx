import { Route, Routes } from 'react-router-dom';

import Home from '../../pages/home/home';
import AppVirtuoso from '../../pages/appVirtuoso/appVirtuoso';
import AppSlidingWindow from '../../pages/appSlidingWindow/appSlidingWindow';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/virtuoso" element={<AppVirtuoso />} />
      <Route path="/sw" element={<AppSlidingWindow />} />
    </Routes>
  );
}

export default App;
