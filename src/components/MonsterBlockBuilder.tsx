import React, {useEffect, useState} from 'react'

// This will take the bodyBlocks from the monster_json 
// For each of them, parse their contents to handle the html tags in the string
// Then return the bodyBlocks with the parsed contents

// Use regex to extract hyperlinks from the string
function extractHyperlinks(bodyBlocks: Array<string>) {
    let hyperlinks: Array<string> = [];
    for (let i = 0; i < bodyBlocks.length; i++) {
        let bodyBlock = bodyBlocks[i];
        let regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        let matches = bodyBlock.match(regex);
        if (matches) {
            for (let j = 0; j < matches.length; j++) {
                hyperlinks.push(matches[j]);
            }
        }
    }
    return hyperlinks;

}





function parseBodyBlock(bodyBlock: string) {
    // console.log("Parsing body block: " + bodyBlock);

    // will return an array of html elements

    // parse links by separating the string by splitting on the hyperlink regex
    // so there is a resulting array of <p>, <a>, <p>, ...

    const testString = "Some individual <a href=\\\"dwarf.html\\\">dwarves</a> and <a href=\\\"elf.html\\\">elves</a> - and sometims even groups of dwarves and elves - are considered friends by giant eagles. Members of the two races are considered less of a threat than humans. Giant eagles can be trained, and their eggs sell for 500 to 800 gp each on the open market."

    // alert(test + ""); // will display true

    // const lines = text.split(/\r\n|\r|\n/);
    const regLink= new RegExp('<a href=\\\"(.*?).html\\\">(.*?)<\/a>');
    const regLinkRaw = /<a href=\"(.*?).html\">(.*?)<\/a>/g;
    const regBoldraw = /<b>(.*?)<\/b>/g;
    const regItalicraw = /<i>(.*?)<\/i>/g;
    const regItalicString = "<i>(.*?)<\/i>";

    var str = bodyBlock;
    var myArray;
    // console.log("Parsing body block: " + bodyBlock);
    // console.log("Test string: " + testString);

    // while ((myArray = regLinkRaw.exec(bodyBlock)) !== null) {
    //     var msg = 'FOUND ' + myArray[1] + ', ' + myArray[2];
    //     msg += 'Next match starts at ' + regLinkRaw.lastIndex;
    //     console.log(msg);
    // }


    
    const regBold= new RegExp('<b>(.*?)<\/b>');
    // test = regLink.test(bodyBlock);
    let htmlElements: Array<JSX.Element> = [];
    const linkMatch = bodyBlock.match(regLink);
    // console.log("regex match", linkMatch);
    // if a link is found
    if(regLink.test(bodyBlock) && linkMatch !== null){
        // split the string on the link regex
        let split = bodyBlock.split(regLink);
        // console.log("split: " + split);
        
        const condition1 = (i: number) => (i % 3 == 0);
        const condition2 = (i: number) => (i % 3 != 0);
        // for each of the split elements
        for (let i = 0; i < split.length; i++) {
            // if the element is a link
            // console.log("for loop: " + i + " " + split[i], "match", condition1(i-1), condition2(i));
            // if first one
            if( i === 0){
                let htmlElement = <>{split[i]}</>;
                // add the html element to the array
                htmlElements.push(htmlElement);
            } 
            else if (condition1(i-1) && condition2(i)) {
                // console.log("\tFound link match: " + split[i]);
                // create an html element with the link
                let htmlElement = <a href={split[i]}>{split[i+1]}</a>;
                // add the html element to the array
                htmlElements.push(htmlElement);
            } else if (!condition2(i)) {
                // else, the element is a paragraph
                // console.log("Found paragraph: " + split[i]);
                // create an html element with the paragraph
                let htmlElement = <>{split[i]}</>;
                // add the html element to the array
                htmlElements.push(htmlElement);
            }
        }
    } 
    // else if <bold>
    else if(regBoldraw.test(bodyBlock)){
        const matches = bodyBlock.match("<b>(.*?)<\/b>");
        if(matches != null && matches[1] != null){
            let htmlElement = <b>{matches[1]}</b>
            htmlElements.push(htmlElement)
        }
    }
    else if(regItalicraw.test(bodyBlock)){
        const matches = bodyBlock.match(regItalicString);
        if(matches != null && matches[1] != null){
            let htmlElement = <i>{matches[1]}</i>
            htmlElements.push(htmlElement)
        }
    }
    else {
        // No element found, just paragraph
        let htmlElement = <p>{bodyBlock}</p>;
        htmlElements.push(htmlElement);
    }

    // Parse the block
    let parsedBodyBlock = bodyBlock;
    
    const returnElements = <>{htmlElements}</>
    // Replace the block with the parsed block
    return htmlElements;
}

interface IParseBodyBlocks {
    bodyBlocks: Array<string>;
}

function parseBodyBlocks(bodyBlocks: Array<string>) {
    let parsedBodyBlocks: Array<JSX.Element> = [];
        // For each block
    for (let i = 0; i < bodyBlocks.length; i++) {
        // let bodyBlock = bodyBlocks[i];
        // Parse the block
        let parsedBlocksArray = parseBodyBlock(bodyBlocks[i]);
        // for newly parsed blocks in parseBodyBlock(bodyBlocks[i])
        for (let j = 0; j < parsedBlocksArray.length; j++) {
            // add the block to the parsedBodyBlocks array
            // if the next parsed block begins with a space, combine it with this one.
            
            parsedBodyBlocks.push(parsedBlocksArray[j]);
            
            // parsedBodyBlocks.push(parsedBlocksArray[j]);
        }
        // Replace the block with the parsed block
        // parsedBodyBlocks[i] = parsedBodyBlock;

        // if the next parsed block begins with a space, combine it with this one.
        
    }

    // console.log("parsedBodyBlocks: ", parsedBodyBlocks);

    ///// POLISHING THE PARSED BLOCKS
    // go through parsedBodyBlocks and combine any that begin with a space
    for (let i = 0; i < parsedBodyBlocks.length; i++) {
        // if (parsedBodyBlocks[i].props.children[0] === " ") {
        //     // console.log("Combining blocks", parsedBodyBlocks[i], parsedBodyBlocks[i + 1]);
        //     // parsedBodyBlocks[i] = parsedBodyBlocks[i].props.children + parsedBodyBlocks[i + 1].props.children;
        //     // parsedBodyBlocks.splice(i + 1, 1);
        // } else

        // if (i < parsedBodyBlocks.length - 1 && parsedBodyBlocks[i].props.children[parsedBodyBlocks[i].props.children.length + 1] === " ") {
        //     console.log("Combining blocks", parsedBodyBlocks[i].props.children, parsedBodyBlocks[i + 1].props.children);
        //     parsedBodyBlocks[i] = parsedBodyBlocks[i].props.children + parsedBodyBlocks[i + 1].props.children;
        //     parsedBodyBlocks.splice(i + 1, 1);
        // } 
        // else 
        // if (i < parsedBodyBlocks.length - 1 && parsedBodyBlocks[i].props.children[parsedBodyBlocks[i].props.children.length + 1] === " ") {
        //     console.log("Combining blocks", parsedBodyBlocks[i].props.children, parsedBodyBlocks[i + 1].props.children);
        //     parsedBodyBlocks[i] = parsedBodyBlocks[i].props.children + parsedBodyBlocks[i + 1].props.children;
        //     parsedBodyBlocks.splice(i + 1, 1);
        // }

        // If this block is a paragraph and the previous block is bold, combine previous block to the front of this one
        if(i >0 ){
            // console.log("parsedBodyBlocks[i]: ", parsedBodyBlocks[i], parsedBodyBlocks[i-1].type=== 'b');
        }
        // Bold Back-Combine
        if (i > 0 && parsedBodyBlocks[i].type === 'p' && parsedBodyBlocks[i - 1].type === 'b') {
            // console.log("Combining blocks", parsedBodyBlocks[i - 1].props.children, parsedBodyBlocks[i].props.children);
            parsedBodyBlocks[i - 1] = <p><b>{parsedBodyBlocks[i - 1].props.children}</b>{parsedBodyBlocks[i].props.children}</p>;
            parsedBodyBlocks.splice(i, 1);
            i--;
        }
        // Italic Back-Combine
        if (i > 0 && parsedBodyBlocks[i].type === 'p' && parsedBodyBlocks[i - 1].type === 'i') {
            // console.log("Combining blocks", parsedBodyBlocks[i - 1].props.children, parsedBodyBlocks[i].props.children);
            parsedBodyBlocks[i - 1] = <p><i>{parsedBodyBlocks[i - 1].props.children}</i>{parsedBodyBlocks[i].props.children}</p>;
            parsedBodyBlocks.splice(i, 1);
            i--;
        }
        // Lowercase Paragraph Back-Combine
        
        if (i > 0 && parsedBodyBlocks[i].type === 'p' && parsedBodyBlocks[i - 1].type === 'i' && parsedBodyBlocks[i].props.children[0] === parsedBodyBlocks[i].props.children[0].toString().toLowerCase()) {
            // console.log("Combining LOWERCASE blocks 1", parsedBodyBlocks[i - 1].props.children, parsedBodyBlocks[i].props.children);
            parsedBodyBlocks[i - 1] = <p><i>{parsedBodyBlocks[i - 1].props.children}</i>{parsedBodyBlocks[i].props.children}</p>;
            parsedBodyBlocks.splice(i, 1);
            i--;
        }
        if (i > 0 && parsedBodyBlocks[i].type !== 'p' && parsedBodyBlocks[i - 1].type === 'p' && parsedBodyBlocks[i].props.children[0] === parsedBodyBlocks[i].props.children[0].toString().toLowerCase()) {
            // console.log("Combining LOWERCASE blocks 2", parsedBodyBlocks[i - 1].props.children, parsedBodyBlocks[i].props.children);
            parsedBodyBlocks[i - 1] = <p>{parsedBodyBlocks[i - 1].props.children}<i>{parsedBodyBlocks[i].props.children}</i></p>;
            parsedBodyBlocks.splice(i, 1);
            i--;
        }

        // Check if next is of type i 
        // if (i > 0 && parsedBodyBlocks[i].type === 'i' && parsedBodyBlocks[i - 1].type === 'p' && parsedBodyBlocks[i].props.children[0] === parsedBodyBlocks[i].props.children[0].toString().toLowerCase()) {
        //     console.log("Combining LOWERCASE blocks", parsedBodyBlocks[i - 1].props.children, parsedBodyBlocks[i].props.children);
        //     parsedBodyBlocks[i - 1] = <p>{parsedBodyBlocks[i - 1].props.children}<i>{parsedBodyBlocks[i].props.children}</p>;
        //     parsedBodyBlocks.splice(i, 1);
        //     i--;
        // }
    }

    // Same loop again?
    // if there are any remaining html elements that are not paragraphs, wrap them in a paragraph
    for (let i = 0; i < parsedBodyBlocks.length; i++) {
        if (parsedBodyBlocks[i].type !== 'p') {
            // create temporary paragraph body element
            let tempParagraph: Array<JSX.Element> = [];
            tempParagraph.push(parsedBodyBlocks[i]);

            // check the next elements until there is a paragraph
            for (let j = i + 1; j < parsedBodyBlocks.length; j++) {
                if (parsedBodyBlocks[j].type !== 'p') {
                    // add it to the paragraph and keep going
                    console.log( parsedBodyBlocks[j]);
                    tempParagraph.push(parsedBodyBlocks[j]);
                } else {
                    // stop
                    parsedBodyBlocks[i] = 
                    <p>
                        { /*all elements of tempParagraph*/} 
                        {tempParagraph.map((element: JSX.Element) => {
                            return element;
                        })}
                    </p>;
                    // leave this for loop
                    console.log(tempParagraph)
                    // Then reset the array by shifting everything over by j - i
                    // remove the pushed elements from the parsedBodyBlocks array
                    parsedBodyBlocks.splice(i + 1, j - i);

                    break;
                }

            }

            
        }

    }

    console.log("parsedBodyBlocks: ", parsedBodyBlocks);
        // console.log("next block first character: " + '\'' + bodyBlocks[i].children[0] + '\'', "space? ", parsedBlocksArray[i].props.children[0] === " ",  parsedBlocksArray.length - 1);
            // if (i < parsedBlocksArray.length - 1 && parsedBlocksArray[i].props.children[0] === " ") {
            //     console.error("inside")
            //     parsedBodyBlocks[i].props.children[0] += parsedBlocksArray[i+1].props.children[0];
            //     parsedBodyBlocks.push(parsedBlocksArray[i]);
            //     i++;
            // }
    return (
        <>
            {/* for item in parsedBodyBlocks */}
            {
                parsedBodyBlocks.map((item, index) => {
                    return (<>{item}</>);
                })
            }
        </>
    );
}

type MonsterBodyBlocksProps = {
    bodyBlocks: Array<string>;
}

export default function MonsterBodyBlocks(props: MonsterBodyBlocksProps) {
    const {bodyBlocks} = props;

    // Parse the body blocks
    const parsedBodyBlocks = parseBodyBlocks(bodyBlocks);
    return (
        <div className="body-blocks">
            {parsedBodyBlocks}
        </div> 
    );
} 















/*
"bodyBlocks" : 
         [
            "The aarakocra are a race of intelligent bird-men that live on the peaks of the highest mountains, spending their days soaring on the thermal winds in peace and solitude.",
            "Aarakocra are about 5 feet tall and have a wing span of 20 feet. About halfway along the edge of each wing is a hand with three human-sized fingers and an opposable thumb. An elongated fourth finger extends the length of the wing and locks in place for flying. Though the wing-hands cannot grasp during flight, they are nearly as useful as human hands when an aarakocra is on the ground and its wings are folded back. The wing muscles anchor in a bony chest plate that provides the aarakocra with extra protection. The powerful legs end in four sharp talons that can unlock and fold back to reveal another pair of functional hands, also with three human-sized fingers and an opposable thumb. The hand bones, like the rest of an aarakocra's skeleton, are hollow and fragile.",
            "Aarakocra faces resemble crosses between parrots and <a href=\"eagle.html\">eagles</a>. They have gray-black beaks, and black eyes set frontally in their heads that provide keen binocular vision. Plumage color varies from tribe to tribe, but generally males are red, orange, and yellow while females are brown and gray.",
            "Aarakocra speak their own language, the language of giant eagles, and, on occasion, the common tongue (10% chance).",
            "<b>Combat:</b>",
            " In aerial combat, an aarakocra fights with either talons or the heavy fletched javelins that he clutches in his lower hands. An aarakocra typically carries a half dozen javelins strapped to his chest in individual sheaths. The javelins, which can be used for throwing or stabbing, inflict 2d4 points of damage. Owing to the aarakocra's remarkable skill at throwing javelins in the air, it incurs none of the attack penalties for aerial missile fire. An aarakocra will always save its last javelin for stabbing purposes rather than throwing it. Its favorite attack is to dive at a victim while clutching a javelin in each hand, then pull out of the dive just as it reaches its target, and strike with a blood-curdling shriek. This attack gains a +4 bonus to the attack roll and causes double damage, but an aarakocra must dive at least 200 feet to execute it properly.",
            "An aarakocra is reluctant to engage in grappling or ground combat, since its fragile bones are easily broken. Though rarely used except when cornered, an aarakocra's sharp beak can bite for 1-3 points of damage.",
            "<b>Habitat/Society:</b>",
            " Aarakocra live in small tribes of about 11-30 (1d20+10) members. Each tribe has a hunting territory of about 10,000 square miles with colorful banners and pennants marking the boundaries.",
            "Each tribe lives in a communal nest made of woven vines with a soft lining of dried grass. The eldest male serves as the tribe's leader. In tribes of more than 20 members, the second oldest male serves as the shaman, leading simple religious ceremonies involving the whistling of melodic hymns at sunset on the first day of a new month. Males spend most of their waking hours hunting for food and occasionally for treasure, such as gems and other shiny objects. Females spend eight months of the year incubating their eggs, passing the time by fabricating javelins and other tools from wood and stone. While resting on their backs, aarakocra females can use all four hands at the same time to weave boundary pennants, javelins sheaths, and other useful objects from vines and feathers.",
            "Five aarakocra, including a shaman, can summon an <a href=\"element1.html\">air elemental</a> by chanting and performing an intricate aerial dance for three melee rounds. The summoned air elemental will comply with the aarakocras' request for a favor, though it will not endanger its life on their behalf.",
            "Aarakocra are extremely claustrophobic and will not willingly enter a cave, building, or other enclosed area.",
            "<b>Ecology:</b>",
            " Aarakocra have little to do with other species, including neighboring aarakocra tribes, and leave their home territory only in extreme circumstances. They rarely encounter humans except for an occasional foray into a rural community to snatch a stray farm animal; this is not an intentionally malicious act, as aarakocra are unable to distinguish between domestic and wild animals. A human venturing into aarakocra territory may be able to convince one to serve as a guide or a scout in exchange for a shiny jewel or coin.",
            "Last Modified: June 10, 2010, 11:51:30 GMT"
         ],
*/