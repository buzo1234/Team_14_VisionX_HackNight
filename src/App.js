import { Navbar, Welcome, Footer, Transactions } from './components';
import MoralisIn from './components/MoralisIn';

const App = () => (
  <div className='min-h-screen'>
    <div className='bg-black'>
      <Navbar />
      <Welcome />
    </div>
    <MoralisIn />
    <Transactions />
    <Footer />
  </div>
);

export default App;
