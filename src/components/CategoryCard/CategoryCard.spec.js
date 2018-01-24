import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import CategoryCard from './CategoryCard';

let handleOnCardClick;

describe('CategoryCard', () => {
  beforeEach(() => {
    handleOnCardClick = jest.fn();
  });

  it('Should have displayName set on the component', () => {
    expect(CategoryCard.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer
      .create(
        <CategoryCard
          name="WISMO"
          value="gist_wismo"
          onClick={handleOnCardClick}
          iconClass="wismo_icon"
          iconColor="orange"
          bgColor="white"
          textColor="black"
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('On card click, should call handleOnCardClick with name as shortName when shortName is not defined', () => {
    const appName = { name: 'WISMO', key: 'gist_wismo' };
    const wrapper = shallow(
      <CategoryCard
        name={appName.name}
        value={appName.key}
        onClick={handleOnCardClick}
        iconClass="wismo_icon"
        iconColor="orange"
        bgColor="white"
        textColor="black"
      />
    );
    wrapper.simulate('click');
    expect(handleOnCardClick).toHaveBeenCalled();
    expect(handleOnCardClick).toHaveBeenCalledWith({
      ...appName,
      shortName: appName.name
    });
  });

  it('On card click, should call handleOnCardClick', () => {
    const appName = { name: 'WISMO', key: 'gist_wismo', shortName: 'WISMO' };
    const wrapper = shallow(
      <CategoryCard
        name={appName.name}
        value={appName.key}
        onClick={handleOnCardClick}
        iconClass="wismo_icon"
        iconColor="orange"
        bgColor="white"
        textColor="black"
      />
    );
    wrapper.simulate('click');
    expect(handleOnCardClick).toHaveBeenCalled();
    expect(handleOnCardClick).toHaveBeenCalledWith({
      ...appName
    });
  });
});
