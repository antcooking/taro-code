import { createContext } from 'react';
import { Icontext } from './types';

const context = createContext<Icontext>({} as Icontext);

export default context;
