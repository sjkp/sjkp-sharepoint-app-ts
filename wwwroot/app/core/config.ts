module SjkpSharepointAppTs.Core {
    'use strict';

    var core = angular.module('sjkpSharepointAppTs.core');

    var config = {
        appErrorPrefix: '[sjkpSharepointAppTs Error] ',
        appTitle: 'sjkpSharepointAppTs'
    };

    core.value('config', config);
}
