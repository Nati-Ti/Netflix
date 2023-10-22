import './App.css';
import Row from './Components/Row/Row';
import Requests from './Components/Request';
import Banner from './Components/Banner/Banner';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner fetchUrl={Requests.fetchTrending} />
      <Row title="Netflix Originals" fetchUrl={Requests.fetchTrending} isLargeRow/>
      <Row title="Top Rated" fetchUrl={Requests.fetchTopRatedMovies} />
      <Row title="Trending Now" fetchUrl={Requests.fetchTrending} />
      <Row title="Action Movies" fetchUrl={Requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={Requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={Requests.fetchHorrorMovies} />
      <Footer />
    </div>
  );
}

export default App;
