import React from 'react';

const getIcon = (type, history) => {
    if (history) return 'fa fa-caret-right';

    switch (type) {
        case 'dir': return 'fa fa-folder';
        default:    return 'fa fa-music';
    }
};

export default ({ file, index, action, history }) => {
    const onClick = () => action({ file, index });

    return <li className="file" onClick={onClick} title={file.name}>
        <i className={getIcon(file.type, history)} />
        <label>{file.name.replace('.mp3', '')}</label>
    </li>;
};