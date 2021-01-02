import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import Tile from '../Tile';

import styles from './Logo.module.scss';

const SIZE = 80;

interface Props {
  className?: string;
}

const Logo: FunctionComponent<Props> = ({ className }) => (
  <div className={classNames(styles.logo, className)}>
    <div className={styles.row}>
      {'scrabble'.split('').map((character, index) => (
        <Tile
          character={character}
          className={classNames(styles.tile, styles[`horizontalTile${index}`])}
          key={index}
          size={SIZE}
        />
      ))}
    </div>

    <div className={styles.row}>
      {'solver'.split('').map((character, index) => (
        <Tile
          character={character}
          className={classNames(styles.tile, styles[`verticalTile${index}`])}
          key={index}
          size={SIZE}
        />
      ))}
    </div>

    <Tile character="2" className={styles.version} size={SIZE * 2} />
  </div>
);

export default Logo;
