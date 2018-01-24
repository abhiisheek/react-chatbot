import PlainText from '../PlainText';
import TextWithLink from '../TextWithLink';
import Types from '../types';

const chatMsgTypesMap = {
  [Types.TEXT]: PlainText,
  [Types.TEXTWITHLINK]: TextWithLink
};

export const chatMsgConditionFunc = ({ type = Types.TEXT }) => {
  let TypeComp = chatMsgTypesMap[type];
  if (!TypeComp) {
    TypeComp = PlainText;
  }
  return TypeComp;
};
