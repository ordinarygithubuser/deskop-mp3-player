import * as Actions from '../actions/controls';

const getIndex = (songs, song) => {
    for (let i = 0; i < songs.length; i++) {
        if (song.id == songs[i].id) return i;
    }
    return -1;
};

export default ({ on, persist, load }) => {
    const setSong = (playlist, song, offset, update, persist) => {
        const index = getIndex(playlist.songs, song) + offset;

        if (index > -1 && index < playlist.songs.length) {
            update({ song: playlist.songs[index] });
            persist('song');
        }
    };

    load('controls', {
        playing: false,
        muted: false,
        volume: 0.5
    });

    on(Actions.Play, (data, state, update) => {
        if (!state.song) return;

        let controls = Object.assign({}, state.controls);
        controls.playing = !controls.playing;
        update({ controls });
        persist('controls');
    });

    on(Actions.SetVolume, (volume, state, update) => {
        let controls = Object.assign({}, state.controls);
        controls.volume = volume;
        update({ controls });
        persist('controls');
    });

    on(Actions.Mute, (data, state, update) => {
        let controls = Object.assign({}, state.controls);
        controls.muted = !controls.muted;
        update({ controls });
        persist('controls');
    });

    on(Actions.Prev, (data, { song, playlist }, update) => {
        if (playlist && song) {
            setSong(playlist, song, -1, update, persist);
        }
    });


    on(Actions.Next, (data, { song, playlist }, update) => {
        if (playlist && song) {
            setSong(playlist, song, 1, update, persist);
        }
    });
};