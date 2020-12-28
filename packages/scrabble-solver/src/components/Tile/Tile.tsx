import { Config, Tile as TileModel } from '@scrabble-solver/models';
import classNames from 'classnames';
import React, { FocusEventHandler, forwardRef, KeyboardEventHandler, useImperativeHandle, useRef } from 'react';

import styles from './Tile.module.scss';

interface Props {
  className?: string;
  config: Config;
  highlighted?: boolean;
  placeholder?: string;
  raised?: boolean;
  small?: boolean;
  size: number;
  tile: TileModel;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

interface TileRef {
  focus: () => void;
}

const Tile = forwardRef<TileRef, Props>(
  ({ className, config, highlighted, placeholder, raised, small, size, tile, onFocus, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const points = config.getCharacterPoints(tile.character);
    const tileSize = small ? 0.75 * size : size;
    const fontSize = tileSize * 0.6;

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    return (
      <div
        className={classNames(styles.tile, className, {
          [styles.small]: small,
          [styles.highlighted]: highlighted,
          [styles.blank]: tile.isBlank,
          [styles.raised]: raised,
          [styles.points1]: points === 1,
          [styles.points2]: points === 2,
          [styles.points3]: points === 3,
          [styles.points4]: points === 4,
          [styles.points5]: points >= 5,
        })}
        style={{
          fontSize,
          height: tileSize,
          width: tileSize,
        }}
      >
        <input
          className={styles.character}
          maxLength={1}
          placeholder={placeholder}
          ref={inputRef}
          value={tile.character || ''}
          onChange={(event) => event.preventDefault()}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
        />

        {!tile.isBlank && <span className={styles.points}>{points}</span>}
      </div>
    );
  },
);

export default Tile;