import React from 'react';
import renderer from 'react-test-renderer';

import { shallow } from 'enzyme';

import TextInputForm from './TextInputForm';

const handleUserInput = jest.fn();

const createElement = () =>
  shallow(<TextInputForm onUserInput={handleUserInput} />);

describe('TextInputForm', () => {
  it('Should have displayName set on the component', () => {
    expect(TextInputForm.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const snapshot = renderer
      .create(<TextInputForm onUserInput={handleUserInput} />)
      .toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('onChangeHandler should be called whenever user gives inputs', () => {
    const wrapper = createElement();
    const component = wrapper.instance();
    const spy = jest.spyOn(component, 'handleOnChange');
    const event = { target: { value: 'user input here' } };
    // Note: Needed both, for spying
    // Refer : https://github.com/airbnb/enzyme/issues/586
    component.forceUpdate();
    wrapper.update();
    wrapper.find('input').simulate('change', event);
    expect(spy).toHaveBeenCalled();
    expect(spy).toBeCalledWith(event);
  });

  it('User input should be considered and updated in the state', () => {
    const wrapper = createElement();
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'user input here' } });
    expect(wrapper.state('value')).toBe('user input here');
  });

  it('onKeyPressHandler should be called whenever user gives inputs', () => {
    const wrapper = createElement();
    const component = wrapper.instance();
    const spy = jest.spyOn(component, 'handleOnKeyPress');
    const event = { key: 'A' };
    component.forceUpdate();
    wrapper.update();
    wrapper.find('input').simulate('keypress', event);
    expect(spy).toHaveBeenCalled();
    expect(spy).toBeCalledWith(event);
  });

  it('handleOnClick should be called whenever user presses ENTER key', () => {
    const wrapper = createElement();
    const component = wrapper.instance();
    const spy = jest.spyOn(component, 'handleOnClick');
    const event = { key: 'Enter' };
    component.forceUpdate();
    wrapper.update();
    wrapper.find('input').simulate('keypress', event);
    expect(spy).toHaveBeenCalled();
  });

  it('Should call handleUserInput with user input when onClickHandler is clicked/called', () => {
    const wrapper = createElement();
    wrapper.setState({
      value: 'User input'
    });
    wrapper.instance().handleOnClick();
    expect(handleUserInput).toHaveBeenCalled();
    expect(handleUserInput).toBeCalledWith('User input');
  });

  it('Should clear input field value once user input is submitted', () => {
    const wrapper = createElement();
    wrapper.setState({
      value: 'User input'
    });
    wrapper.instance().handleOnClick();
    expect(wrapper.find('input').text()).toBe('');
    expect(wrapper.state('value')).toBe('');
  });

  it('Send button should be disabled when the user input is empty', () => {
    const wrapper = createElement();
    expect(wrapper.find('.sendBtn').hasClass('disabled')).toBeTruthy();
    expect(wrapper.find('.sendBtn').prop('disabled')).toBeTruthy();
  });

  it('handleOnClick should be called whenever user presses send button', () => {
    const wrapper = createElement();
    const component = wrapper.instance();
    const spy = jest.spyOn(component, 'handleOnClick');
    component.forceUpdate();
    wrapper.update();
    wrapper.find('.sendBtn').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
