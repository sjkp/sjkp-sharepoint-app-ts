module SjkpSharepointAppTs {
    'use strict';

    export var app: angular.IModule =
        angular.module('sjkpSharepointAppTs', ['AdalAngular','sjkpSharepointAppTs.adal','sjkpSharepointAppTs.core', 'sjkpSharepointAppTs.home', 'blocks.log', 'blocks.exception', 'blocks.router']);
}
