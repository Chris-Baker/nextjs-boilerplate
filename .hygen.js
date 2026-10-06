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

module.exports = {
    helpers: {
        getComponentDirectory: getComponentDirectory
    }
};
