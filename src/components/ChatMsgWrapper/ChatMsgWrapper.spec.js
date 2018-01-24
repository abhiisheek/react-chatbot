import React from 'react';
import renderer from 'react-test-renderer';

import ChatMsgWrapper from './ChatMsgWrapper';

describe('ChatMsgWrapper', () => {
  it('Should have displayName set on the component', () => {
    expect(ChatMsgWrapper.displayName).toBeDefined();
  });

  it('Snapshot test', () => {
    const wrapper = renderer.create(
      <ChatMsgWrapper>
        <div>{'hi'}</div>
      </ChatMsgWrapper>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
