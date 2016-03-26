import { Store } from 'mva';

import Flow from './flow';
import File from './file';
import Playlist from './playlist';
import Controls from './controls';

module.exports = Store([
    Flow, File, Playlist, Controls
]);