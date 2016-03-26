import React from 'react';

import { SelectSong } from '../actions/playlist';

export default class Playlists extends React.Component {
    componentWillUpdate () {
        const node = this.refs.scroll;
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    }

    componentDidUpdate () {
        if (this.shouldScrollBottom) {
            let node = this.refs.scroll;
            node.scrollTop = node.scrollHeight;
        }
    }

    render () {
        const { playlist, song } = this.props;

        const pad = num => {
            num = num + '';
            return num.length > 1 ? num : '0' + num;
        };

        const getDuration = ({ duration }) => {
            const min = Math.floor(duration / 60);
            const sec = Math.round(duration % 60);
            return pad(min) + ':' + pad(sec);
        };

        const elements = playlist.songs.map((current, i) => {
            const onClick = () => SelectSong(current);
            const className = song && song.id == current.id ? 'active' : '';

            return <tr key={i} className={className} onClick={onClick}>
                <td>{current.title}</td>
                <td>{current.artist[0]}</td>
                <td>{current.album}</td>
                <td>{current.genre[0]}</td>
                <td>{getDuration(current)}</td>
            </tr>
        });

        return <div className="playlist">
            <div className="header-container">
                <div className="table-container" ref="scroll">
                    <table>
                        <thead>
                        <tr>
                            <th><div>Titel</div></th>
                            <th><div>Interpret</div></th>
                            <th><div>Album</div></th>
                            <th><div>Genre</div></th>
                            <th><div>Dauer</div></th>
                        </tr>
                        </thead>
                        <tbody>
                            {elements}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>;
    }
}