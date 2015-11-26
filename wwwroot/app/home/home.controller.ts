module SjkpSharepointAppTs.Home {
    'use strict';

    var home = angular.module('sjkpSharepointAppTs.home');

    export class HomeController {
        static $inject = ['$scope','$http'];

        public msg : string;

        constructor(private $scope : any, private $http : ng.IHttpService) {
           this.msg = 'Welcome home to SjkpSharepointAppTs! It is: ' + moment().format('LLLL');
           this.getData();
        }
        
        private getData = () => {
            this.$http.get('https://sjkpdevs.sharepoint.com/_api/lists').then((res: any) => {
                console.log(res);
                this.$scope.lists = res.data.value;
            })
        }
    }

    home.controller('homeController', HomeController);
}
