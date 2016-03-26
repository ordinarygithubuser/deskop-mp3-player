import fs from 'fs';

import * as Actions from '../actions/file';

const read = folderPath => {
    return fs.readdirSync(folderPath).map(name => {
        const path = folderPath + '\\' + name;
        const stat = fs.statSync(path);
        const type = stat.isFile() ? 'file' : 'dir';
        return { name, path, type };
    }).filter(file => {
        if (file.type == 'dir') return true;
        return /\.mp3$/g.test(file.name);
    });
};

export default ({ on, load, persist }) => {
    const base = {
        path: 'E:\\bib\\music',
        type: 'dir',
        name: 'Music'
    };

    const updateFiles = (file, oldHistory, update) => {
        if (file.type == 'dir') {
            const history = oldHistory.concat([file]);
            const files = read(file.path);

            update({ history, files, filter: '' });
            persist('history', 'files');
        }
    };

    on(Actions.Read, ({ file }, state, update) => {
        updateFiles(file, state.history, update);
    });

    on(Actions.Back, ({ file, index }, state, update) => {
        updateFiles(file, state.history.slice(0, index), update);
    });

    on(Actions.Filter, (filter, state, update) => {
        update({ filter });
        persist('filter');
    });

    load('files', []);
    load('filter', '');
    load('history', [], history => {
        if (history.length == 0) {
            Actions.Read({ file: base });
        }
    });
};