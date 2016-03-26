import fs from 'fs';
import mm from 'musicmetadata';
import { IdProvider } from 'mva';

import * as Actions from '../actions/playlist';

const PID = IdProvider();
const SID = IdProvider();

const makeList = name => {
    return { id: PID.next(), name, songs: [] };
};

const makeSong = (data, file) => {
    if (!data.title) data.title = file.name;
    data.id = SID.next();
    data.path = file.path;
    return data;
};

const flatten = playlists => {
    return playlists.reduce((songs, list) => {
        return songs.concat(list.songs);
    }, []);
};

const find = (playlists, id) => {
   for (let i = 0; i < playlists.length; i++) {
       if (playlists[i].id == id) return playlists[i];
   }
};

module.exports = ({ on, persist, load }) => {
    const def = makeList('Default');

    load('song', null);
    load('playlist', def);
    load('playlists', [ def ], playlists => {
        PID.init(playlists);
        SID.init(flatten(playlists));
    });

    on(Actions.Create, (name, state, update) => {
        state.playlist = makeList(name);
        state.playlists.push(state.playlist);
        update(state);
    });

    on(Actions.Select, (id, state, update) => {
        update({ playlist: find(state.playlists, id) });
        persist('playlist', 'song');
    });

    on(Actions.AddSong, ({ file }, { playlists, playlist }, update) => {
        if (!playlist) return;

        mm(fs.createReadStream(file.path), { duration: true }, (err, data) => {
            playlist.songs.push(makeSong(data, file));
            playlists = playlists.map(list => {
                return list.id == playlist.id ? playlist : list;
            });

            update({ playlists, playlist });
            persist('playlists', 'playlist');
        });
    });

    on(Actions.SelectSong, (song, state, update) => {
        update({ song });
        persist('song');
    });
};