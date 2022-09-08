import '../../../App.css';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <div>
        <img className="add" src="images/ADD.svg" alt="Advanced dungeons and dragons 2nd edtion"></img>
      </div>
      
      <h1>Monstrous Compendium</h1>
      <h2>Complete*</h2>
      <h3>Appendix</h3>
    <div className="hero_tsr">
      <img src="images/tsr.png" height="150px" alt="TSR logo"></img>
    </div>
    </div>
  );
}

export default HeroSection;