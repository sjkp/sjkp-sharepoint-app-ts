module SjkpSharepointAppTs.Core {
    'use strict';

    var home = angular.module('sjkpSharepointAppTs.core');

    export class NotFoundController {
        static $inject = ['$state', 'logger'];

        public origin: string;

        constructor($state: angular.ui.IState, logger: Blocks.Log.Logger) {
            this.origin = $state.params.origin;

            logger.warning('Unknown route', decodeURIComponent(this.origin), '404 - Not Found');
        }
    }

    home.controller('notFoundController', NotFoundController);
}
