import React from 'react';

import { Dialog } from 'mva';
import { SetDialog } from '../actions/flow';

import Files from './files';
import History from './history';
import Controls from './controls';
import Playlist from './playlist';

export default state => <div className="app">
    <History history={state.history} />
    <div className="main">
        <Files
            filter={state.filter}
            files={state.files}
        />
        <div className="content">
            <Controls
                playlists={state.playlists}
                playlist={state.playlist}
                controls={state.controls}
                song={state.song}
            />
            <Playlist
                playlist={state.playlist}
                song={state.song}
            />
        </div>
    </div>
    <Dialog
        dialog={state.dialog}
        close={() => SetDialog()}
    />
</div>;