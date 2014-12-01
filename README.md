tagManager
==========

Angular Directive for Tag Management. Can be used in Application directly following Readme.

/********* Features *********/
This Directive gives Full Control Over adding and deleting the tags in a small Tag Manager module. This lets you create new,add from existing and delete 
tags from a map of tags.

Necessary Things to be installed with this:
1. Angular.js
2. Bootstrap 3

/********* How to Include **********/

1. In Html file add the following lines:
   <div class="col-md-12">
        <tag-manager coltags="dataset.tags" datasetid="dataset.id" tags="tags" add-client="addClient" is-showing-tag-manager="isShowingTagManager">
		</tag-manager>
        <span class="tagsbadge email" data-text="Email" ng-repeat="tag in column.tags"> {{ tag.tagName }}</span>
    </div>

// Tags as in full array of object of tags.
// coltags as in tags assigned to a particular dataset.

2. In the Main Controller add the following lines For controlling Opening and Closing of tag Manager:
    $scope.isShowingTagManager = false;
    $scope.addClient = false;
	
    $scope.deactivate = function() {
        $scope.isShowingTagManager = false;
    };
3. Include "tagManager" in your app.js to use the directive.

4. Add the proper name in the directive in place of angularApp in tagDirective.js to run and see the magic.

