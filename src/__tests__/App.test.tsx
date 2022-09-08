import React from 'react';
import { fireEvent, getByRole, getByText, queryByLabelText, queryByRole, render, screen, waitFor } from '@testing-library/react';
import {BrowserRouter, MemoryRouter, Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import ReactTestUtils from 'react-dom/test-utils';

import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';

// APP
import App from '../App';

// Components to test
import MonsterLink from '../components/MonsterLink';
import {MonsterPageLoader, MockMonsterPageLoader} from '../components/MonsterPage';

// Data
import KEYS_TITLES from '../data/AA_KEYS_TITLES.json'
import { wait } from '@testing-library/user-event/dist/types/utils/misc/wait';
// import { wait } from '@testing-library/user-event/dist/types/utils';



test('test the home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});



// test to make sure monster link renders and shows the correct title
test('test aarakocr monster page link', () => {
  const monster_key = "aarakocr";
  // render(<App />);
  render(<MonsterLink monster_key={monster_key} monster_title={KEYS_TITLES[monster_key]}/>, {wrapper: MemoryRouter});
  const linkElement = screen.getByText(KEYS_TITLES[monster_key]);
  expect(linkElement).toBeInTheDocument();

});

// test('test aarakocr (good) monster page link click', () => {
//   const monster_key = "aarakocr";
//   // render(<App />);
//   render(<MonsterLink monster_key={monster_key} monster_title={KEYS_TITLES[monster_key]}/>, {wrapper: MemoryRouter});
//   const linkElement = screen.getByText(KEYS_TITLES[monster_key]);
//   // Fire the Click
//   fireEvent(
//     getByText(linkElement, KEYS_TITLES[monster_key]),
//     new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//     }),
//   )

//   // Try and find the title in the page
//   const titleElement = screen.getByText(KEYS_TITLES[monster_key]);

//   expect(titleElement).toBeInTheDocument();
  

// });

// Bad Monster (animator)
test('test animator (bad) monster page link', () => {
  const monster_key = "animator";
  // render(<App />);
  render(<MonsterLink monster_key={monster_key} monster_title={KEYS_TITLES[monster_key]}/>, {wrapper: MemoryRouter});
  const linkElement = screen.getByText(KEYS_TITLES[monster_key]);
  expect(linkElement).toBeInTheDocument();
});

// test('test animator (bad) monster page link click', async () => {
//   const monster_key = "animator";
//   const badRoute = '/appendix/' + monster_key;
//   // render(<App />);
//   render(
//     <MemoryRouter initialEntries={[badRoute]}>
//       <MonsterLink monster_key={monster_key} monster_title={KEYS_TITLES[monster_key]}/>
//     </MemoryRouter>
//   );
//   const user = userEvent.setup();

//   const linkElement = screen.getByText(KEYS_TITLES[monster_key]);

//   // Verify link Element
//   // verify page content for default route
//   expect(linkElement).toBeInTheDocument()

//   await user.click(screen.getByText(KEYS_TITLES[monster_key]))
//   expect(screen.getByText(KEYS_TITLES[monster_key])).toBeInTheDocument()

//   // Fire the Click

//   // fireEvent(
//   //   getByText(linkElement, KEYS_TITLES[monster_key]),
//   //   new MouseEvent('click', {
//   //     bubbles: true,
//   //     cancelable: true,
//   //   }),
//   // )

//   // // Try and find the title in the page
//   // const titleElement = screen.getByText(KEYS_TITLES[monster_key]);

//   // expect(titleElement).toBeInTheDocument();

//   /** test and catch error
//    * let actualErrorMsg;
//   try {
//     render(<TestComponent />);
//   } catch(e) {
//     actualErrorMsg = e.message;
//   }
//    */
  

// });

test('test MonsterPageLoader - animator', async () => {
  const monster_key = "animator";
  const badRoute = '/appendix/' + monster_key;
  // render(<App />);
  const {getByRole} =render(
    // <MemoryRouter initialEntries={[badRoute]}>
      <MockMonsterPageLoader monster_key={monster_key}/>
    // </MemoryRouter>
  );
  const user = userEvent.setup();


  // const linkElement = screen.getByText(KEYS_TITLES[monster_key]);

  // await waitFor(() => {
  //   expect(screen.getByRole("monster-page")).toBeInTheDocument();
  // });

  // await waitFor(() => expect(MockMonsterPageLoader).());

  // Verify link Element
  // verify page content for default route
  // expect(linkElement).toBeInTheDocument()

  // await user.click(screen.getByText(KEYS_TITLES[monster_key]))
  // expect(screen.getByText(KEYS_TITLES[monster_key])).toBeInTheDocument()

  // Fire the Click
  
  // fireEvent(
  //   getByText(linkElement, KEYS_TITLES[monster_key]),
  //   new MouseEvent('click', {
  //     bubbles: true,
  //     cancelable: true,
  //   }),
  // )

  // // Try and find the title in the page
  // const titleElement = screen.getByText(KEYS_TITLES[monster_key]);

  // expect(titleElement).toBeInTheDocument();

  /** test and catch error
   * let actualErrorMsg;
  try {
    render(<TestComponent />);
  } catch(e) {
    actualErrorMsg = e.message;
  }
   */
  

});

// Render given monster page without crashing 
// it("Render monster page without crashing ", () => {
//   const monster_key = "aarakocr";
//   const div = document.createElement("div");
//   const {/* selectors */} = render(<MockMonsterPageLoader monster_key={monster_key}  />, {wrapper: MemoryRouter});
//   ReactDOM.unmountComponentAtNode(div);
// } );

/////////

/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://localhost:3000/"}
 */
// function addAsync(a: number, b: number, callback: (result: number) => void) {
//   setTimeout(() => {
//     const result = a + b;
//     callback(result);
//   }, 500)
// }

// it('add numbers async', done => {
//   addAsync(10, 5, result => {
//     expect(result).toBe(15);
//     done();
//   })
// });


// Render given monster page without crashing 
// it("Render monster page without crashing ", async () => {
//   const monster_key = "animator";

//   const successResult = "Some data";
//   const getSuccess = jest.fn(() => Promise.resolve(successResult));
//   const getFail = jest.fn(() => Promise.reject(new Error()));

//   // const  { queryByLabelText, queryByRole, queryAllByRole } = render(<MockMonsterPageLoader monster_key={monster_key} get={getSuccess}/>, {wrapper: MemoryRouter});
  
//   let component: any
//   act( () => {
//     component = render(<MockMonsterPageLoader monster_key={monster_key} get={getSuccess}/>, {wrapper: MemoryRouter});
//     // wait(() => getByRole(component.container, "loaded"));
//   } );

//   screen.debug();
//   await waitFor(() => expect(screen.getByText("Animator")).toBeInTheDocument(), {timeout: 4000});

//   screen.debug();

// } );




// DEMO TESTS

// it("title test", () => {
//   const {/* selectors */} = render(<Counter onClick={() => {}} id={1} />);
//   expect(document.title).toBe('You clicked 0 times');
//   // rest of the test
// });

// it("Counter load test", () => {
//   let container: any;
//   const {/* selectors */} = render(<Counter onClick={() => {}} id={1} />);
//   const label = document.querySelector('p');
//   expect(label).toHaveTextContent('You clicked 0 times');
//   // rest of the test
// });

// it("Counter click test", () => {
//   const {/* selectors */} = render(<Counter onClick={() => {}} id={1} />);
//   const button = document.querySelector('button');
//   const label = document.querySelector('p');
//   expect(label).toHaveTextContent('You clicked 0 times');

//   act(() => {
//     button?.dispatchEvent(new MouseEvent('click', {bubbles: true}));
//   });
//   expect(label).toHaveTextContent('You clicked 1 times');
//   expect(document.title).toBe('You clicked 1 times');
//   // rest of the test
// });


