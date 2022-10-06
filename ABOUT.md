# About

This is for the About Page. Typing the content I want.

## Summary

    What is Advanced Dungeons & Dragons:  Advanced Dungeons & Dragons (AD&D) 2nd Edition is a table top roleplaying game published by TSR inc. Over the decades of its life, hundreds of products were published for AD&D 2nd Edition, and with them, thousands of monsters. This website is a compendium of all of the monsters across all of the books published for AD&D 2nd Edition. 

### Motivation

My friends and I played 2nd edition religiously in high school. I stumbled across a site called lomion.de where someone had created a complete appendix of all ad&d 2nd edition monsters. *All* of them. We love to use it and explore the vast collection, but the site was quite archaic and barebones in terms of functionality. Unfortunately, the site went down around 2014. However, it was indexed many times by the Wayback machine. So I sought to resurrect the site and bring the complete monstrous compendium of 2nd Edition D&D to life with lots of navigational and explorational features. 

The scope of AD&D content dwarfs all other editions of Dungeons & Dragons. All these monsters serve well as inspriation and starting points, valuable to Game Masters of all fantasy table top roleplaying games. 


### Purpose

This is a project to create a comprehensive compendium of all the monsters accross the entire Advanced Dungeons and Dragons 2nd Edition collection.

The original creator of this project was a man known only by the name [Lomion](https://web.archive.org/web/20180818101) , who created a website with a similar goal. Unfortunately, the website went down around 2018. It's departure, however, motivated me to build this.


## Architecture

Describe how the data has been collected, and how it makes it's way to the screen.

Started with downloading the entire directory of lomion.de from the Wayback Machine through some command line operations.

Then with all the mosnter file html documents, I build a harvester program in C++ to collect all the data so that it may be uploaded to a database. The harvester also collected the publicaiton ID numbers of its sourcebook(s), so I can organize the monsters by book. Then the theming of the pages indicates the campaign setting the monster is most prominent, so I can organize the monsters by setting/world. 

I wanted to turn this project into a fully deployed application available for the public. So the next steps were to set up a database to store the monster data; naturally an API is required to publish to and retrieve data form the database. 

I chose PostgreSQL over other database platforms due to its rich toolset, but mainly support for Arrays and built in indexing and lookup system so searches can be done natively by the database.

For the API I wanted something simple but scalable if I wanted. So I chose NodeJS with Express as the web framework and Sequelize to communicate with the Database. I figured these two services could be hosted on AWS EC2 instances, I do not anticipate sustained high traffic but the workload isn't heavy so even the smallest EC2 could support a few users making requests at once.

Now for the Continuous Deployment and Integration. I wanted the cheapest, most streamlined way to harvest monster data when more data is collected. I chose to use GitHub Actions to run a Docker container running the harvester. GitHub Actions then publishes the latest data via the API. Authentication is done by requesting AWS permissions for the IP of the GitHub Actions runner and then requesting to remove them after publication is finished. 

For the frontend application I chose React for its statefulness, hooks, and option for whatever complexity I would want in the future. This React application is hosted on GitHub pages, which is a low price if the repo is private and free if it is public. I want to keep this public, in order to do so I'll need to find a way of obfuscating the API endpoint IP.

For CI/CD for the API, the EC2 instance running it is set at a remote for the repository, so when new tags are published, the changes get pushed to the remote server and the server is updated automatically. 

Thus the entire pipeline should be online continuously and I am free to upgrade each of the pieces, 


## Features

### Appendix

A comprehensive list of all the monsters on a single page. This page simply lists all monster titles and links them with their corresponding monster key. 

### Catalog

Here you can browse through all of the books and sources that contain monsters. You can also browse by campaign settting/world. 

### Search

Implemented a simple lookup of the database for monsters based on lexemes in each of the monsters multiple titles. Of course, CTRL + F  on the Appendix page works just fine as well. 

## Future

### Planned Features

#### Priority

List of features that I intend to implement and add to the site.

- Format this About page better
- Add the "How to Use this Book" / "The Monsters" page. Have each `MonsterPage` link to this page too.
- Appendix Title Redudancy mode. Switch that toggles on/off Redudancy mode, which displays all aliases of all monsters. Take caution when doing this since there are over 7000 titles and this page will not perform well on lower-spec devices. Warning will be placed next to it. Maybe React detects if device can support it and will hide the option entirely if it detects a lower spec device. 
- Add a table of contents to the Appendix


#### Stretch Goals

- Lore:
    - Baatezu Promotion and Demotion
    - The Comlete Golem Table
    - The Planes of Existence
- Pages:
    - Similar Monster page like a Monstrous Classification Page
- Glossary for terms
- Complete Spell Description list so you can hover over spells and see what they do.

### Changelog

- Start with Version v1.0. Look into changelog format


## Monster Data To-Do

Running list of bugs, errors, missing data, and other tasks that need to be done to complete the Compendium.

### Need to be added

| Monster               | Filename     | Source #            |
| --------------------- | ------------ | ------------------- |
| The Queen of Chaos    | queofcha.php | 1145 pg 204         |
| Triphegs              | triphegs.php |                     |
| Wild Hunt             | wildhunt.php | birthrite 3140?     |
| Miska the Wolf-spider | wospmisk.php | planescape          |
| Elven horse           | yyllethy.php | dragon magazine 269 |
|                       |              |                     |
|                       |              |                     |
|                       |              |                     |
|                       |              |                     |

### Missing Information

| Monster     | Filename     | Missing         | Source    |
| ----------- | ------------ | --------------- | --------- |
| Aboleth     | aboleth.html | Ecology Section | 2140 pg 6 |
| Angler Fish |              |                 |           |
|             |              |                 |           |
|             |              |                 |           |

### Broken Pages

| Monster         | Filename | Missing | Source |
| --------------- | -------- | ------- | ------ |
| Mammal, Minimal | mammmini |         | 2103   |
|  Chaos elemental fire/water               |          |   needs better image      |        |
|                 |          |         |        |

### Strange Monsters

| Monster  | Filename | Note                                                                                              |
| -------- | -------- | ------------------------------------------------------------------------------------------------- |
| Moldling | moldling | Source listed as "The Lonesome Road, Shawn Mulder". Must find true origin. Could be Die Vecna Die |
|          |          |                                                                                                   |
|          |          |                                                                                                   |

### Missing Books

- I, Tyrant
- Alternity?


---


Need to have:
- Description of the Project
    - Describe AD&D to someone who doesn't know what it is.
    - What it contains: X settings, Y books, Z monster pages, 
- Purpose
    - No proper public service like this exists. I've found a few, but they were very incomplete with terrible UI. 
    - Historical importance. AD&D was a beloved (and/or frustrating) experience for thousands, with cherished times of the past. 
    - The scope of AD&D content dwarfs all other editions of Dungeons & Dragons. All these monsters serve well as inspriation and starting points, valuable to Game Masters of all fantasy table top roleplaying games. 
- Motivation
    - The original site went offline years ago, and I was capable of resurrecting the platform myself.
    - Another key personal motivation is the technology aspect - I've expanded my knowledge so much building this full stack application, and I've been itching to deploy applications and learn some DevOps. This is the perfect opportunity. 

- Changelog
    - Expanding list of versions, features for each.
- Planned Features


Maybe
- Current status
- Planned Features


Later
- "How to Use This Book" page like in all the other monster compendiums

...

