import '@angular/localize/init';
import { TextEncoder, TextDecoder } from 'util';

Object.assign(globalThis, { TextDecoder, TextEncoder });
