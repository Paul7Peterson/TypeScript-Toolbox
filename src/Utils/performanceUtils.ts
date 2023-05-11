import { cyan } from 'chalk';

import { Awaitable } from '../TypeUtils';

/** Used to measure the time that takes a block of code to be executed. In order to avoid the program
 * to continue without the block being fulfilled, the `timer()` function needs to be awaited.
 *
 * @param label - The name to be shown in the console for the timestamp.
 * @param predicate - The block as a function that we want to measure.
 */
export async function timer<T> (label: string, predicate: () => Awaitable<T>): Promise<T> {
  const parsedLabel = cyan(`⏱ ${label}`);
  console.time(parsedLabel);

  try {
    const result = await predicate();
    return result;
  } finally {
    console.timeEnd(parsedLabel);
  }
}

/** Used to measure the time that takes a block of code to be executed.
 *
 * @param label - The name to be shown in the console for the timestamp.
 * @param predicate - The block as a function that we want to measure.
 */
export function timerSync<T> (label: string, predicate: () => T): T {
  const parsedLabel = cyan(`⏱ ${label}`);
  console.time(parsedLabel);

  try {
    const result = predicate();
    return result;
  } finally {
    console.timeEnd(parsedLabel);
  }
}
