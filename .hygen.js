function getComponentDirectory(componentType) {
    switch (componentType) {
        case 'molecule':
        case 'm':
            return 'molecules';

        case 'organism':
        case 'o':
            return 'organisms';

        case 'views':
        case 'view':
        case 'v':
            return 'views';

        case 'atom':
        case 'a':
            return 'atoms';
        default:
            throw new Error(`Unknown component type: ${componentType}`);
    }
}

function getActionNames(actions) {
    const names = typeof actions === 'string' ? actions.split(',').map((action) => action.trim()) : [];
    if (names.filter(Boolean).length === 0)
        throw new Error('Name at least one action, for example: --actions add-item,remove-item');
    return names.filter(Boolean);
}

module.exports = {
    helpers: {
        getComponentDirectory: getComponentDirectory,
        getActionNames: getActionNames
    }
};
