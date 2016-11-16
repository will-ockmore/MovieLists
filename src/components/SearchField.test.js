import React from 'react';
import { List, Range, fromJS } from 'immutable';
import { mount } from 'enzyme';

import { MOVIE } from '../../test/testFixtures';

import { SearchField } from './SearchField';


describe('SearchField', () => {

  it('renders', () => {
    const wrapper = mount(
      <SearchField updateQuery={jest.fn} query="bleh" />
    );

    expect(wrapper.find('.search-input').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('calls updateQuery on change', () => {
    const updateQuery = jest.fn();

    const wrapper = mount(
      <SearchField updateQuery={updateQuery} query="bleh" />
    );

    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 'blib'}})

    expect(updateQuery).toHaveBeenCalledWith('blib');
  });

  it('calls updateQuery with noDelay as true on keyDown enter', () => {
    const updateQuery = jest.fn();

    const wrapper = mount(
      <SearchField updateQuery={updateQuery} query="bleh" />
    );

    const input = wrapper.find('input');

    input.simulate('keyDown', {keyCode: 12, target: {value: 'blib'}});
    expect(updateQuery).not.toHaveBeenCalled();

    input.simulate('keyDown', {keyCode: 13, target: {value: 'flibble'}});
    expect(updateQuery).toHaveBeenCalledWith('flibble', true);
  });
});
