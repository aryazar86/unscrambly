import { createEnum } from './utils';

export const gameStatuses = createEnum(['New', 'Ongoing', 'End']);
export const errorMessages = {
  incorrectLetter: 'Wrong letter used',
  oneIncorrectWord: 'One of these is not a word',
  incorrectWord: 'This is not a word',
};
