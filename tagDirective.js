angularApp.directive('tagManager',['DMService','appUtils',function(DMService,appUtils){
    return {
        restrict: 'E',
        scope: { datasetid: '=',tags: '=',coltags: '=',isShowingTagManager: '=',addClient: '='},
        template:
            '<div class="row">' +
                '<div class="col-md-1" ng-click="enableTag($event)" style="padding-right:0px;">' +
                    '<i style="cursor:pointer;color: lightgrey;font-size: 10px;"class="glyphicon glyphicon-tag"></i>' +
                '</div>'+
                '<div class="tags col-md-11" style="padding-left:0px;" ng-show="!addClient">' +
                    '<ul class="tagsListNew">' +
                        '<li ng-repeat="tag in coltags track by $index">' +
                        '<span class="tagNameDM">#{{ tag.tagName }}</span>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<div class="inputtags col-md-10" ng-show="addClient" ng-dblclick="addClient = false">'+
                    '<div class="row" style="margin-left:0px;margin-right:0px;">' +
                        '<div class="tagsdiv">' +
                            '<ul class="tagsListNewShow">' +
                                '<li class="taglistclickshow" ng-repeat="tagval in coltags track by $index">' +
                                '<span class="pull-left">{{ tagval.tagName }}</span>' +
                                '<a class="pull-right" ng-click="remove($index,tagval)">&nbsp;x</a>' +
                                '</li>' +
                                '<li class="taglistclickshowinput">'+
                                    '<input ng-click="activate()" placeholder="+ Add Tag" class="taginput" autofocus="autofocus" type="text" ng-model="new_value.tagName" ng-keyup="$event.keyCode == 13 ? add(new_value) : null"/>'+
                                '</li>'+
                            '</ul>' +
                        '</div>'+
                    '</div>' +
                    '<ul class="row tagDroplistNew" ng-show="isShowingTagManager">'+
                            '<li ng-repeat="tag in tags | filter:new_value.tagName track by $index" ng-click="placeholderAdd(tag)">{{tag.tagName}}</li>'+
                    '</ul> ' +
                    '<a class="btnTagMg" ng-click="add(new_value)"><i class="glyphicon glyphicon-plus"></i></a>' +
                '</div>' +
            '</div>',
        link: function ( $scope, $element) {

            var input = angular.element( $element.children()[1] );
            var parent = angular.element( $element.parent()[0]);
            var superparent = angular.element( parent.parent()[0]);
            var superduperparent = angular.element (superparent.parent()[0]);

            $scope.enableTag = function($event){
                $('.taginput').focus();
                var elementvar = angular.element($event.target);
                var levelone = angular.element( elementvar.parent()[0]);
                var leveltwo = angular.element( levelone.parent()[0]);
                var levelthree = angular.element (leveltwo.parent()[0]);
                var levelfour = angular.element( levelthree.parent()[0]);
                var levelfive = angular.element( levelfour.parent()[0]);
                var levelsix = angular.element (levelfive.parent()[0]);
                console.log("parentfinder",levelsix[0],superduperparent[0]);
                if(levelsix[0] === superduperparent[0]) {
                    $scope.addClient = true;
                    $scope.new_value = "";
                    $('.taginput').focus();

                }else{
                    $scope.addClient = false;
                }
            };

            $scope.deactivate = function() {
                $scope.isShowingTagManager = false;
            };

            $scope.activate = function() {
                $scope.isShowingTagManager = true;
            };

            // This adds the new tag to the tags array
            $scope.add = function(new_value) {
                $scope.addClient = false;
                console.log("new_value",new_value.tagName);
                if (($.trim(new_value.tagName) != "") && ($scope.coltags.exists(new_value.tagName) == false)){
                        if (($scope.coltags.exists(new_value.tagName) == false) && ($scope.tags.exists(new_value.tagName) == false)) {
                            console.log("Flag1.1");
                            var obj = {
                                'tagId': null,
                                'tagName': new_value.tagName
                            };
                            console.log("new Tag inserted in tags", $scope.tags);
							$scope.coltags.push(obj);
                            $scope.tags.push(obj);
                            $('.taginput').focus();
                            
                        } else if(($scope.coltags.exists(new_value.tagName) == false) && ($scope.tags.exists(new_value.tagName) == true)) {
                            console.log("Flag1.2");
                            new_value['datasetId'] = $scope.datasetid;
                            if(new_value['tagId'] == null) {
                                new_value['tagId'] = $scope.tags.containsId(new_value.tagName);
                            }
                            var resObj = [new_value];
                            $scope.coltags.push(new_value);
                            $('.taginput').focus();
                        }else{
                            $scope.addClient = true;
                        }
                }else{
                    $scope.addClient = true;
                }
                $scope.new_value = "";
                $('.taginput').focus();
            };
            Array.prototype.containsId = function(k) { //Finds ID of Array of objests value:tagName
                for(var i=0; i < this.length; i++){
                    if(this[i].tagName === k){
                        console.log(this[i].tagId);
                        return this[i].tagId;
                    }
                }
            };

            Array.prototype.exists = function(k) { //Uniqueness of Array of objects
                for(var i=0; i < this.length; i++){
                    if(this[i].tagName === k){
                        console.log("True");
                        return true;
                    }
                }
                console.log("False");
                return false;
            };

            $scope.placeholderAdd = function(tag){
                tag['datasetId'] = $scope.datasetid;
                $scope.new_value = tag;
                $(".taginput").focus();
            };

            // This is the ng-click handler to remove an item
            $scope.remove = function ( index,tagval) {
                tagval['datasetId']= $scope.datasetid;
                var resObj = [tagval];
                console.log("Remove Obj",resObj);
                $scope.coltags.splice( index, 1 );
                if($scope.coltags.length < 1){
                    $scope.addClient = false;
                    }
                $('.taginput').focus();
            };
        }
    };
}]);
