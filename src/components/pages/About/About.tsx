import React from 'react';

import Layout from "../../Layout";
import { Interweave } from 'interweave';
import { AppService } from '../../../services/app.service';
import ZoomImage from './ZoomImage';

export function About() {
    document.title = "Complete Compendium - About"
    return (
        // upper page with category links
        <>
            <Layout>
                
                <div className='background-catalog'>
                    Some text for the About page. 
                </div>

                <div className="testing-header">
                This page currently used for testing.
                

                </div>
                
                <div>
                    Testing Interweave

                    <Interweave content="This string contains <b>HTML</b> and will safely be rendered!" />;
                </div>
                <hr/>
                <h2>Function Testing</h2>

                <div>
                    <button onClick={() => AppService.getMonster("aarakath")}>
                      Get Monster  
                    </button>
                </div>

                <h1>About</h1>

                <div className="about-body"> 
                    <p>
                        This is a project to create a comprehensive compendium of all the monsters accross the 
                        entire Advanced Dungeons and Dragons 2nd Edition collection.
                    </p>
                    <p>
                        The original creator of this project was <a href="https://web.archive.org/web/20180818101608/http://lomion.de/cmm/_index.php">Lomion</a>, who
                        created a website with a similar goal. Unfortunately, the website is no longer online.
                    </p>
                </div>
                <input type="checkbox" id="ZoomImage" className="zoomcheck"/>
                <label htmlFor="ZoomImage">
                    <ZoomImage src="/images/full_architecture.png" alt="A flowchart of the entire website"/>
                </label>

<div className="about-body"> 
                    <p>
                        This is a project to create a comprehensive compendium of all the monsters accross the 
                        entire Advanced Dungeons and Dragons 2nd Edition collection.
                    </p>
                    <p>
                        The original creator of this project was <a href="https://web.archive.org/web/20180818101608/http://lomion.de/cmm/_index.php">Lomion</a>, who
                        created a website with a similar goal. Unfortunately, the website is no longer online.
                    </p>
                </div>




                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in enim blandit, hendrerit nunc ut, hendrerit nisl. Duis sapien ligula, iaculis ut orci at, viverra lobortis massa. Vivamus nibh nisl, venenatis a vulputate ut, mattis nec est. Sed a bibendum nisi, in sagittis tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed eu nibh vitae nulla tempus ultricies. Curabitur ac odio orci. Morbi tincidunt est ac mauris eleifend efficitur. Donec sit amet urna elit.

Donec ut interdum ante. Aenean volutpat vitae libero id commodo. Pellentesque blandit diam a dictum mattis. Sed rutrum, urna sed dapibus elementum, justo ante pretium erat, at cursus nunc arcu et nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras eget erat et lorem varius vulputate sed sed mauris. Donec sit amet metus ante. Vivamus feugiat lacinia nibh, in pellentesque nisi. Duis efficitur semper dui, id tempus tortor faucibus non. Phasellus et elit ultricies, dignissim eros non, euismod leo. Mauris semper eu nisl eget lacinia. Vivamus ut eros turpis. Sed mattis felis ac lacus egestas iaculis. In orci nisi, dignissim in dui non, feugiat tincidunt nisi.

Aenean id mi elit. Phasellus ac sollicitudin ante. In finibus ante ut velit sodales, at sagittis dui auctor. Donec convallis massa turpis, vitae aliquet libero tempus sed. Vivamus dignissim tellus sem, a rhoncus felis ultrices eu. Fusce consectetur tempus nibh a ullamcorper. In turpis erat, sodales eget nulla non, vulputate laoreet diam. In hac habitasse platea dictumst. Duis hendrerit, leo eu blandit mattis, ex ligula malesuada nunc, sed tincidunt tortor nunc feugiat risus. Aliquam mollis consequat orci. Praesent et neque ac justo bibendum placerat quis vel lacus. Nunc id elementum nunc. Donec faucibus lectus sed nisl commodo, sit amet pretium nisi consectetur.

Curabitur lectus dolor, auctor nec mi eget, cursus sollicitudin odio. Proin maximus, metus sed dictum varius, sem magna congue elit, eu consectetur lacus lorem id orci. In porttitor auctor felis, at blandit ex. Curabitur in tristique mauris. Vestibulum eget gravida ipsum. Nunc felis nibh, interdum eget libero sed, egestas tempor elit. Integer et dictum mi. Integer non gravida metus, sed faucibus nunc. Aliquam sit amet est ut turpis mattis tristique. Aenean at risus vitae sem luctus gravida. Nam rutrum leo eu dui porta mollis. Mauris ligula odio, posuere at consequat at, eleifend ac nisi. Vestibulum quam sem, egestas vitae tristique non, sodales vel sem.

Sed eleifend ultricies placerat. Aliquam eget erat lectus. Sed vel ligula accumsan, convallis libero interdum, tempus massa. In massa est, pharetra vel mauris et, hendrerit pretium quam. Cras mattis ex ut ipsum dictum, vitae vulputate magna ornare. Nullam sem lectus, mattis quis sodales sit amet, tincidunt mollis lectus. Nunc quis est non lorem volutpat semper sit amet nec lacus. Duis id tincidunt arcu. Suspendisse diam quam, luctus in ipsum pretium, volutpat facilisis lectus. Proin condimentum velit eu vulputate consectetur. Curabitur bibendum tempus enim id tristique. Sed vitae lacus a sapien congue dapibus. Etiam sem est, iaculis eu convallis in, imperdiet congue orci. Phasellus pretium felis luctus justo bibendum accumsan. Phasellus non quam sagittis, hendrerit lectus nec, faucibus augue. Vivamus a leo vitae diam porttitor consequat at et urna.
                    </p>







            </Layout>
        </>

        // lower page with all book list
    );
}