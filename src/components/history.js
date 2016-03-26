import React from 'react';
import File from './file';
import { Back } from '../actions/file';

export default ({ history }) => {
    const toFiles = (file, i) => {
        return <File
            key={i}
            index={i}
            file={file}
            action={Back}
            history={true}
        />;
    };

    return <ul className="history">
        {history.map(toFiles)}
    </ul>;
}