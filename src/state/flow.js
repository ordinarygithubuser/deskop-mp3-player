import * as Actions from '../actions/flow';

export default ({ init, on }) => {
    init('dialog', null);

    on(Actions.SetDialog, (dialog, state, update) => {
        update({ dialog });
    });
};