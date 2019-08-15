import React, { Fragment } from 'react';
import { Emoji } from 'emoji-mart';
import sheet from 'assets/sheet.jpg';

export function convertMessageFromEmojiesToKeys(message) {
  return message
    .split(/(<img.*?>)/g)
    .filter(x => !!x)
    .map(m => {
      if (/(<img.*?>)/.test(m)) {
        const result = m.match(/(?<=data-emoji="):.*?:/);

        if (result) {
          return result[0];
        }
      }

      return m;
    })
    .join('');
}

export function convertMessageFromKeysToEmojies(text) {
  return text
    .split(/(:.*?:)/g)
    .filter(x => !!x)
    .map((piece, idx) => {
      if (!/(:.*?:)/.test(piece)) {
        return <Fragment key={idx}>{piece}</Fragment>;
      }

      return (
        <Emoji
          key={idx}
          emoji={piece}
          size={20}
          backgroundImageFn={() => sheet}
          render={props => {
            return <img {...props} src="" alt="" data-emoji={piece} />;
          }}
        />
      );
    });
}
