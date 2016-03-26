import React from 'react';
import AudioPlayer from './audio';
import CreatePlaylist from './create-playlist';

import { SetDialog } from '../actions/flow';
import { Select } from '../actions/playlist';
import * as Actions from '../actions/controls';

export default ({ playlists, playlist, controls, song }) => {
    const listElements = playlists.map((list, i) => {
        return <option key={i} value={list.id}>{list.name}</option>;
    });

    const setVolume = e => Actions.SetVolume(e.target.value);
    const setPlaylist = e => Select(e.target.value);
    const showDialog = () => SetDialog(CreatePlaylist);


    const playIcon = controls.playing ? 'pause' : 'play';
    const muteIcon = controls.muted ? 'off' : 'up';

    return <div className="controls">
        <AudioPlayer
            song={song}
            controls={controls}
            onEnd={Actions.Next}
        />
        <div className="playlists">
            <label>Playlist</label>
            <select value={playlist.id} onChange={setPlaylist}>
                {listElements}
            </select>
            <i className="fa fa-plus-circle" onClick={showDialog} />
        </div>
        <div className="track">
            <i className="fa fa-chevron-circle-left" onClick={Actions.Prev} />
            <i className="fa fa-stop-circle" onClick={Actions.Stop}/>
            <i className={`fa fa-${playIcon}-circle`} onClick={Actions.Play} />
            <i className="fa fa-chevron-circle-right" onClick={Actions.Next} />
        </div>
        <div className="sound">
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={controls.volume}
                onChange={setVolume}
            />
            <i className={`fa fa-volume-${muteIcon}`} onClick={Actions.Mute} />
        </div>
    </div>;
}