import React from 'react';
import File from './file';
import * as Actions from '../actions/file';
import { AddSong } from '../actions/playlist';

export default ({ files, filter }) => {
    const toFiles = (file, i) => {
        const action = file.type == 'dir' ? Actions.Read : AddSong;
        return <File key={i} index={i} file={file} action={action} />
    };

    const userFilter = file => {
        const fileLower = file.name.toLowerCase();
        const filterLower = filter.toLowerCase();
        return fileLower.indexOf(filterLower) > -1;
    };

    const setFilter = e => {
        Actions.Filter(e.target.value);
    };

    return <div className="browser">
        <div className="search">
            <label>Search</label>
            <input value={filter} onChange={setFilter} />
        </div>
        <ul className="files">
            {files.filter(userFilter).map(toFiles)}
        </ul>
    </div>;
}