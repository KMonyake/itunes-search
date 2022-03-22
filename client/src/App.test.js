import React from 'react';
import renderer from 'react-test-renderer';

//components
// import App from './App';
import Card from "./components/Card";

// snapshot test
it('renders correctly', () => {
  const tree = renderer
    .create(<Card/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


// async fetch test
import testObject from "./testObject";

test('the data is an object containing search results', async () => {
  const query = 'the weeknd';
  const entity = "album";
  const url = `https://itunes.apple.com/search?term=${query}&entity=${entity}&limit=10`;
  const data = await (await fetch(url)).json();
  expect(data).toStrictEqual(testObject);
});