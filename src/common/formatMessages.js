import React, { Fragment } from 'react';
import { Emoji } from 'emoji-mart';
import sheet from 'assets/sheet.jpg';

function formatMessages(text) {
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
        >
          {piece}
        </Emoji>
      );
    });
}

export default formatMessages;
