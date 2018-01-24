import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Header from './Header';

let handleOnMinimise;
let handleOnMaxmise;
let handleOnBack;
let handleOnStretch;
let handleOnRestore;
const title = 'Chat Bot';
const isDocked = true;
const showBackIcon = false;

const create = (
  docked,
  showBackIcon,
  isZoomSupported = false,
  windowState = 0
) =>
  shallow(
    <Header
      title={title}
      onMinimise={handleOnMinimise}
      onMaximise={handleOnMaxmise}
      onStretch={handleOnStretch}
      onRestore={handleOnRestore}
      isDocked={docked}
      isZoomSupported={isZoomSupported}
      onBack={handleOnBack}
      showBackIcon={showBackIcon}
      windowState={windowState}
    />
  );

describe('Header', () => {
  beforeEach(() => {
    handleOnMinimise = jest.fn();
    handleOnMaxmise = jest.fn();
    handleOnBack = jest.fn();
    handleOnStretch = jest.fn();
    handleOnRestore = jest.fn();
  });

  it('Should have displayName set on the component', () => {
    expect(Header.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer
      .create(
        <Header
          title={title}
          onMinimise={handleOnMinimise}
          onMaximise={handleOnMaxmise}
          isDocked={isDocked}
          onBack={handleOnBack}
          showBackIcon={showBackIcon}
          windowState={0}
        />
      )
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('Should not display minimise icon when state is docked', () => {
    const wrapper = create(isDocked);
    expect(wrapper.find('.minimiseIcon').hasClass('hideIcon')).toBeTruthy();
    expect(wrapper.hasClass('defaultCursor')).toBeFalsy();
  });

  it('Should display minimise icon when state is not docked', () => {
    const wrapper = create(!isDocked, undefined, undefined, 1);
    expect(wrapper.find('.minimiseIcon').hasClass('hideIcon')).toBeFalsy();
    expect(wrapper.hasClass('defaultCursor')).toBeTruthy();
  });

  it('Should not display back icon when showBackIcon is unset', () => {
    const wrapper = create(isDocked, false);
    expect(wrapper.find('.backIcon').hasClass('hideIcon')).toBeTruthy();
  });

  it('Should not display back icon when state is not docked', () => {
    const wrapper = create(isDocked, true);
    expect(wrapper.find('.backIcon').hasClass('hideIcon')).toBeTruthy();
  });

  it('Should display back icon when showBackIcon is set', () => {
    const wrapper = create(!isDocked, true);
    expect(wrapper.find('.backIcon').hasClass('hideIcon')).toBeFalsy();
  });

  it('Should display zoom/strech icon when chat window is not minimised or zoomed', () => {
    const wrapper = create(false, true, true, 1);
    expect(wrapper.find('.strechIcon').hasClass('hideIcon')).toBeFalsy();
    expect(wrapper.find('.restoreIcon').hasClass('hideIcon')).toBeTruthy();    
  });

  it('Should not display zoom/strech icon when zoom is not supported', () => {
    const wrapper = create(false, true, false, 1);
    expect(wrapper.find('.strechIcon').hasClass('hideIcon')).toBeTruthy();
  });

  it('Should display restore icon when chat window is zoomed', () => {
    const wrapper = create(false, true, true, 2);
    expect(wrapper.find('.restoreIcon').hasClass('hideIcon')).toBeFalsy();
    expect(wrapper.find('.strechIcon').hasClass('hideIcon')).toBeTruthy();    
  });

  it('Should not display restore icon when zoom is not supported', () => {
    const wrapper = create(false, true, false, 1);
    expect(wrapper.find('.restoreIcon').hasClass('hideIcon')).toBeTruthy();
  });

  it('Should display given titel', () => {
    const wrapper = create(isDocked);
    expect(
      wrapper
        .find('.header')
        .text()
        .includes(title)
    ).toBeTruthy();
  });

  it('Should call hadleOnMinimise', () => {
    const event = {
      stopPropagation: jest.fn()
    };
    const wrapper = create(false);
    wrapper.find('.minimiseIcon').simulate('click', event);
    expect(handleOnMinimise).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
  });

  it('Should call handleOnMaxmise', () => {
    const event = { stopPropagation: jest.fn() };
    const wrapper = create(isDocked);
    wrapper.find('.header').simulate('click', event);
    expect(handleOnMaxmise).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('Should call handleOnBack', () => {
    const event = { stopPropagation: jest.fn() };
    const wrapper = create(isDocked, true);
    wrapper.find('.backIcon').simulate('click', event);
    expect(handleOnBack).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('Should call handleOnRestore', () => {
    const event = { stopPropagation: jest.fn() };
    const wrapper = create(isDocked, true, true, 2);
    wrapper.find('.restoreIcon').simulate('click', event);
    expect(handleOnRestore).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('Should call handleOnStretch', () => {
    const event = { stopPropagation: jest.fn() };
    const wrapper = create(isDocked, true, true, 1);
    wrapper.find('.strechIcon').simulate('click', event);
    expect(handleOnStretch).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('Should not call handleOnMaxmise when window is docked', () => {
    const event = { stopPropagation: jest.fn() };
    const wrapper = create(!isDocked);
    wrapper.find('.header').simulate('click', event);
    expect(handleOnMaxmise).not.toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
