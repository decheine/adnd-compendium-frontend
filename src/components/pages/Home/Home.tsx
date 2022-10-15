import '../../../App.css';
import { Cards } from './Cards';
// import Layout from '../../Layout';
// import Cards from '../Cards';
import HeroSection from './HeroSection';
import Footer from '../../Footer';
import {StatisticBlock} from './Statistics';
import "./Home.css";
// import Footer from '../Footer';


function Home() {
  document.title = "AD&D Complete Compendium"

  return (
    <>
    {/* <Layout> */}
    <div className="home">

    <HeroSection /> 

    <Cards />
    {/* <Footer /> */}

    <StatisticBlock />

    {/* Intro section, image left, text right */}
    <div className="summary">
      <div className="summary_banner_container">
        <div className="summary_text">
          <p className="summary_par">
  
          Welcome to the Complete Compendium! A work in progress, this compendium seeks to archive and catalogue every monster from Advanced Dungeons & Dragons, 2nd Edition. Not just monsters from the core books, not just from monstrous compendiums.  Every. Monster. Across all sources, magazines, and settings. Go to the Index for a full (and redundant) list of monster names and links to their pages, or check out the Catalogue for a more browsable experience. 
          </p>
          <p className="summary_par">
          This website has resurrected the efforts of an another, the creator of lomion.de, archived by the wayback machine. I coded an extractor for harvesting monster data from all these files and putting it into a database. Read more about my process on the About page.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
    </>
  );
}

export default Home;