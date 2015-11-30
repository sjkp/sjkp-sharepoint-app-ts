module SjkpSharepointAppTs.Home {
    'use strict';

    var home = angular.module('sjkpSharepointAppTs.home');

    export class HomeController {
        static $inject = ['$scope', '$http'];

        public msg: string;

        constructor(private $scope: any, private $http: ng.IHttpService) {
            this.msg = 'Welcome home to SjkpSharepointAppTs! It is: ' + moment().format('LLLL');
            
            $scope.selectDoclib = this.selectDoclib;
            $scope.doSearch = this.search;
            $scope.selectWeb = this.selectWeb;
        }
        ///lists?$filter=Hidden eq false web/folders?$expand=
        private getData = (webUrl : string) => {
            this.$http.get(webUrl+'/_api/lists?$filter=Hidden eq false').then((res: any) => {
                console.log(res);
                this.$scope.lists = res.data.value;
            })
        }
        
        private selectWeb = (searchResult : any) => {
            this.getData(searchResult.url);
        }
        
        // items?$select=FileLeafRef&$expand=Folder
        private selectDoclib = (obj: any) => {
            console.log(obj);
            this.$http.get(obj["odata.id"] + "/items?$filter=startswith(ContentTypeId, '0x0120')&$expand=Folder").then((res: any) => {
                console.log(res);

                this.$scope.docs = res.data.value;
            });
        }

        private search = () => {
            console.log('search');
            var searchQuery = "?querytext='" + this.$scope.query + " contentclass=STS_Web OR contentclass=STS_Site'&SelectProperties='HitHighlightedSummary,LastModifiedTime,Path,SPWebUrl,ServerRedirectedURL,SiteTitle,Title'&RowLimit=5&StartRow=0";

            this.$http({
                url: 'https://sjkpdevs.sharepoint.com/_api/search/query' + searchQuery,
                method: 'GET',
                headers: {
                    'Accept': 'application/json;odata=nometadata'
                }
            }).then((data: any) => {
                console.log(data);
                var documents : any[] = [];

                if (data.data.PrimaryQueryResult !== null) {
                data.data.PrimaryQueryResult.RelevantResults.Table.Rows.forEach((row : any) => {
                    var cells = row.Cells;
        
                    var url = this.getValueFromResults('ServerRedirectedURL', cells);
                    if (url === null) {
                    url = this.getValueFromResults('Path', cells);
                    }
        
                    documents.push({
                    url: url,
                    title: this.getValueFromResults('Title', cells),
                    summary: this.getValueFromResults('HitHighlightedSummary', cells).replace(/<(\/)?c\d>/g, '<$1mark>').replace(/<ddd\/>/g, ''),
                    siteUrl: this.getValueFromResults('SPWebUrl', cells),
                    siteTitle: this.getValueFromResults('SiteTitle', cells)
                    });
                });
                }
                
                this.$scope.searchResults = documents;
            });
        }
        
        private getValueFromResults = (key : string, results : any)  => {
      var value = '';

      if (results !== null &&
        results.length > 0 &&
        key !== null) {
        for (var i = 0; i < results.length; i++) {
          var resultItem = results[i];

          if (resultItem.Key === key) {
            value = resultItem.Value;
            break;
          }
        }
      }

      return value;
    }
    
    }

    home.controller('homeController', HomeController);
}
