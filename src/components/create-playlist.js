import React from 'react';
import { Create } from '../actions/playlist';

class CreatePlaylist extends React.Component {
    constructor (props) {
        super(props);
        this.state = { name: '' };
    }

    render () {
        const { name } = this.state;

        const getClass = () => {
            return name.length < 2 ? 'disabled' : 'primary';
        };

        const setName = e => {
            this.setState({ name: e.target.value });
        };

        const create = () => {
            if (name.length > 2) {
                Create(name);
                this.props.close();
            }
        };

        return <div>
            <div className="row">
                <label>Name</label>
                <input value={name} onChange={setName} />
            </div>
            <div className="buttons">
                <button className={getClass()} onClick={create}>
                    Create
                </button>
            </div>
        </div>;
    }
}

export default {
    Component: CreatePlaylist,
    title: 'Create a new Playlist'
}