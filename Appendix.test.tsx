import React from 'react';
import { fireEvent, getByRole, getByText, queryByLabelText, queryByRole, render, screen, waitFor } from '@testing-library/react';
import {BrowserRouter, MemoryRouter, Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import ReactTestUtils from 'react-dom/test-utils';
import {configure} from '@testing-library/dom'
// import serialize from 'my-custom-dom-serializer'

import App from './App';
import Counter from './Counter';
// import MockMonsterPage from './components/MockMonsterPage';
import MockSlimMonsterPage from './components/MockMonsterPage';


// Load ALL monster data
const ALL_MONSTER_DATA = require('./data/AA_ALL_MONSTERS.json');





test('test the home page', () => {
    render(<App />);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
});

// Function that I will test
// returns display of the 2 times a number
function NumberElement({props}: any) {
    return ( 
    <>
        {2*props.num}
    </>
    );
}

type MyState = {
    num: number; // like this
  };
type NumberProps = {
    num: number;
}
class NumberComponent extends React.Component<any, MyState> {
    state: MyState = {
        num: 0
    };
    constructor(props: NumberProps) {
      super(props);
      this.state = {num: props.num};
    }
    render() {
      return (
        <div role="number-container">
            {2*this.state.num}
        </div>
      );
    }
}

// for loop tests over numbers 0 to 3
for (let i = 0; i < 3; i++) {
    test(`test the counter ${i}`, () => {
        render(<NumberComponent num={i}/>);
        const numberContainer = screen.getByRole("number-container");
        // expect(numberElement).toHaveC(2*i);
        const numberElement = screen.getByText(2*i);
        expect(numberElement).toBeInTheDocument();
    });
}



// Get Keys to All Monsters
const ALL_MONSTER_KEYS = Object.keys(ALL_MONSTER_DATA);

// console.log(ALL_MONSTER_DATA);
// Test first monster
test('test aarakocr monster page', () => {
    const monster_key = "aarakocr";

    const monster_data = ALL_MONSTER_DATA.find( (monster: any) => monster.monster_key === monster_key);
    // console.log("title: ", monster_data.monster_data.title);
    // render(<App />);
    const {/* selectors */getByText} = render(<MockSlimMonsterPage data={
        Array.isArray(monster_data) ? monster_data : [monster_data]
    }/>, {wrapper: MemoryRouter});
    const titleElement = getByText(monster_data.monster_data.title);
    expect(titleElement).toBeInTheDocument();
    const SorryElement =  screen.queryByText("Sorry, this monster's body is not ready.");
    expect(SorryElement).not.toBeInTheDocument();
});

test('test animator monster page', () => {
    const monster_key = "animator";

    const monster_data = ALL_MONSTER_DATA.find( (monster: any) => monster.monster_key === monster_key);
    // console.log(monster_data);
    // render(<App />);
    const {/* selectors */getByRole, getByText} = render(<MockSlimMonsterPage data={
        Array.isArray(monster_data) ? monster_data : [monster_data]
    }/>, {wrapper: MemoryRouter});
    // const SorryElement =  getByText("Sorry, this monster's body is not ready.");
    const SorryElement =  screen.queryByText("Sorry, this monster's body is not ready.");
    expect(SorryElement).not.toBeInTheDocument();
});



let failed_monsters: Array<String> = [];

// Testing ALL
// for each key monster_key in ALL_MONSTER_KEYS
for (let monster_key_id of ALL_MONSTER_KEYS) {
    // Hide errors?
    beforeEach(() => {
        jest.spyOn(console, 'error')
        // @ts-ignore jest.spyOn adds this functionallity
        console.error.mockImplementation(() => null);
      });
      
    afterEach(() => {
        failed_monsters.push(monster_key_id);
        // other part to the hidding of errors
        // console.error.mockRestore()
    } );


    test('Testing Body validity of monster_key: ' +  ALL_MONSTER_DATA[monster_key_id].monster_key, () => {
        // console.log(monster_key_id)
        const monster_data = ALL_MONSTER_DATA[monster_key_id];
        // console.log(monster_data);
        // render(<App />);
        const {/* selectors */getByRole, getByText} = render(<MockSlimMonsterPage data={
            Array.isArray(monster_data) ? monster_data : [monster_data]
        }/>, {wrapper: MemoryRouter});

        const SorryElement =  screen.queryByText("Sorry, this monster's body is not ready.");
        expect(SorryElement).not.toBeInTheDocument();
    });
}

// for each monster_key in failed_monsters print it
for (let monster_key of failed_monsters) {
    console.log(monster_key);
}