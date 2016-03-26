import { Run } from 'mva';
import App from './components/app';
import Store from './state/store';

import './styles/app.scss';

Run(Store, App);