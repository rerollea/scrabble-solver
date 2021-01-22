import { Trie } from '@kamilmielnik/trie';
import { Locale } from '@scrabble-solver/types';

import Cache from './Cache';
import { CACHE_STALE_THRESHOLD } from './constants';

class MemoryCache implements Cache {
  private readonly cache: Partial<Record<Locale, Trie>> = {};
  private readonly cacheTimestamps: Partial<Record<Locale, number>> = {};

  public get(locale: Locale): Promise<Trie | undefined> {
    return Promise.resolve(this.cache[locale]);
  }

  public has(locale: Locale): boolean {
    const cached = this.cache[locale];
    return typeof cached !== 'undefined';
  }

  public isStale(locale: Locale): boolean {
    const timestamp = this.cacheTimestamps[locale];

    if (!this.has(locale) || typeof timestamp === 'undefined') {
      return true;
    }

    const timeSinceModification = Math.abs(timestamp - Date.now());
    return timeSinceModification > CACHE_STALE_THRESHOLD;
  }

  public set(locale: Locale, trie: Trie): Promise<void> {
    this.cacheTimestamps[locale] = Date.now();
    this.cache[locale] = trie;
    return Promise.resolve();
  }
}

export default MemoryCache;
