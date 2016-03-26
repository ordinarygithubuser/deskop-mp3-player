import React from 'react';

export default class AudioPlayer extends React.Component {
    constructor (props) {
        super(props);

        const path = props.song ? props.song.path : '';
        this.state = { audio: new Audio(path) };
    }

    componentDidMount () {
        const { controls, song } = this.props;

        this.state.audio.volume = controls.volume;
        this.state.audio.muted = controls.muted;
        this.state.audio.onended = this.props.onEnd;
        if (controls.playing && song) {
            this.state.audio.play();
        }
    }

    componentDidUpdate (prev) {
        let { audio } = this.state;
        const { controls, song } = this.props;

        if (song != prev.song) {
            const path = song ? song.path : null;
            audio.pause();
            audio = new Audio(path);
            audio.volume = controls.volume;
            audio.muted = controls.muted;
            audio.onended = this.props.onEnd;
            if (controls.playing) audio.play();
            this.setState({ audio })
        } else if (controls.playing && !prev.controls.playing) {
            audio.play();
        } else if (!controls.playing && prev.controls.playing) {
            audio.pause();
        } else if (controls.volume != prev.controls.volume) {
            audio.volume = controls.volume;
        } else if (controls.muted != prev.controls.muted) {
            audio.muted = controls.muted;
        }
    }

    render () {
        return <noscript />;
    }
}