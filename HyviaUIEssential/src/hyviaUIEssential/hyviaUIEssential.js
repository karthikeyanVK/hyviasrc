// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('hyviaUIEssential.config', [])
    .value('hyviaUIEssential.config', {
        debug: true
    });

// Modules
angular.module('hyviaUIEssential.services', []);
angular.module('hyviaUIEssential',
    [
        'hyviaUIEssential.config',
        'hyviaUIEssential.services'
    ]);
