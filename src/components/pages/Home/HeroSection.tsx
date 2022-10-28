import '../../../App.css';
import './HeroSection.css';

import RandomMonsterButton from '../../RandomMonsterButton';

function HeroSection() {
  return (
    <div className='hero-container'>
      
      <h1 className="adnd" >Advanced Dungeons & Dragons 2nd Edition</h1>
      <h2>Complete Monstrous <br/>Compendium</h2>

      {/* Random Monster Button */}
      <div className="random_monster_button">
        <RandomMonsterButton />
      </div>
      

    {/* <div className="hero_tsr">
      <img src="images/tsr.png" height="150px" alt="TSR logo"></img>
    </div> */}
    </div>
  );
}

export default HeroSection;