import IOfficeType from '@/types/officeType';

import fonLogo from '@/assets/images/offices/fon.jpg';
import oneWinLogo from '@/assets/images/offices/1win.jpg';
import pariLogo from '@/assets/images/offices/pari.jpg';
import betBoomLogo from '@/assets/images/offices/betboom.jpg';

const plusMinus = (num: number) => {
  if (num === 0) return '';

  return num ? '+' : '-';
}

export const fonName = (
  FT: string,
  ST: string,
  A: number
) => {
  const a = A !== undefined ? `(${plusMinus(A)}${A})` : '';

  return `${FT} – ${ST} ${a}`;
}

export const betBoomName = (
  FT: string,
  ST: string
) => {
  return `${FT} vs ${ST}`;
}

export const bOffices: IOfficeType[]  = [
  {
    id: 1,
    title: 'Фонбет',
    logo: fonLogo,
    nameFunc: fonName,
  },
  {
    id: 2,
    title: '1win',
    logo: oneWinLogo,
  },
  {
    id: 3,
    title: 'Pari',
    logo: pariLogo,
    nameFunc: fonName,
  },
  {
    id: 4,
    title: 'BetBoom',
    logo: betBoomLogo,
    nameFunc: betBoomName,
  },
]