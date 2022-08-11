import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export const fCurrency = (number: number): string => numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');

export const fPercent = (number: number): string => numeral(number / 100).format('0.0%');

export const fNumber = (number: number): string => numeral(number).format();

export const fShortenNumber = (number: number): string => replace(numeral(number).format('0.00a'), '.00', '');

export const fData = (number: number): string => numeral(number).format('0.0 b');
