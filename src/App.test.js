import React from 'react';
import ReactDOM from 'react-dom';
import LayoutApp from './LayoutApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LayoutApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
