// @flow

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import Interweave from 'interweave';
import { getUserName } from 'helpers/methods';
import stores from 'core/stores';

type Props = {
  text: string,
  highlight?: any[],
  maxLength?: any
}

const TextFormatted = ({ text, highlight, maxLength, ...rest }: Props) => {
  const { connectionsStore: { usersMentions } } = stores;

  const [dictionaries, setDictionaries] = useState({});
  const [html, setHtml] = useState('');

  const formatValue = () => {
    let textToFormat = text;
    if (maxLength && textToFormat.length > maxLength) textToFormat = `${textToFormat.slice(0, maxLength)}...`;
    // const formatted = formatText(textToFormat, highlight, dictionaries);
    setHtml(textToFormat);
  };

  useEffect(() => {
    formatValue();
  }, [text, dictionaries]);

  useEffect(() => {
    setDictionaries({
      mentions: usersMentions.map(item => ({ id: item.id, display: getUserName(item) }))
    });
  }, [usersMentions.length]);

  return <Interweave {...rest} content={html} />;
};

TextFormatted.defaultProps = {
  highlight: [],
  maxLength: null
};

export default observer(TextFormatted);
