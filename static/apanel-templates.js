angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/static/apanel/access/access-groups.html','<script type="text/ng-template" id="custom/tpl/groupModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10EF\u10D2\u10E3\u10E4\u10D8: {{ group.name }}</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="panel panel-primary">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <table class="table table-striped">\r\n                <tr>\r\n                    <th>\u10E3\u10E4\u10DA\u10D4\u10D1\u10D0</th>\r\n                    <th>\u10E1\u10E2\u10D0\u10E2\u10E3\u10E1\u10D8</th>\r\n                    <th>###</th>\r\n                </tr>\r\n                <tr ng-repeat="permission in permissions">\r\n                    <td>{{ permission.name }}</td>\r\n                    <td>\r\n                        <span class="text-success" ng-show="hasPermission(permission._id)">\u10E9\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                        <span class="text-danger" ng-show="!hasPermission(permission._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                    </td>\r\n                    <td>\r\n                        <button class="btn btn-success" ng-click="addPermission(permission._id)"\r\n                                ng-show="!hasPermission(permission._id)">\u10E9\u10D0\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                        <button class="btn btn-danger" ng-click="removePermission(permission._id)"\r\n                                ng-show="hasPermission(permission._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n        <div class="panel panel-primary">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0</h3>\r\n            </div>\r\n            <div class="panel-body">\r\n                <div class="form-group">\r\n                    <label for="groupname1">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n                    <input type="text" class="form-control" id="groupname1" ng-model="groupName">\r\n                </div>\r\n                <div class="form-group">\r\n                    <button class="btn btn-success" type="button" ng-click="save()">\u10E8\u10D4\u10DC\u10D0\u10EE\u10D5\u10D0</button>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<script type="text/ng-template" id="custom/tpl/createGroupModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10D0\u10EE\u10D0\u10DA\u10D8 \u10EF\u10D2\u10E3\u10E4\u10D8</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="groupname">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="groupname" ng-model="groupName">\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10E8\u10D4\u10E5\u10DB\u10DC\u10D0</button>\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10EF\u10D2\u10E3\u10E4\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10D0\u10EE\u10D0\u10DA\u10D8</button>\r\n        <div class="form-group">\r\n            <label for="searchfield">\u10EF\u10D2\u10E3\u10E4\u10D8 :</label>\r\n            <input type="text" class="form-control" id="searchfield" ng-model="search.name">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <a href="javascript:void(0)" ng-click="view(group._id)" class="list-group-item"\r\n           ng-repeat="group in groups | filter : search">{{ group.name }}</a>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('/static/apanel/access/access-index.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item" ui-sref="app.access.users">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10DA\u10D4\u10D1\u10D8</a>\r\n                <a class="list-group-item" ui-sref="app.access.groups">\u10EF\u10D2\u10E3\u10E4\u10D4\u10D1\u10D8</a>\r\n                <a class="list-group-item" ui-sref="app.access.permissions">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D4\u10D1\u10D8</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/access/access-permissions.html','<script type="text/ng-template" id="custom/tpl/permissionModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D0: {{ permission.name }}</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="permissionname1">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionname1" ng-model="permissionName">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="permissionkey1">\u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionkey1" ng-model="permissionKey" disabled>\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-click="save()">\u10E8\u10D4\u10DC\u10D0\u10EE\u10D5\u10D0</button>\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<script type="text/ng-template" id="custom/tpl/createPermissionModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10D0\u10EE\u10D0\u10DA\u10D8 \u10E3\u10E4\u10DA\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="permissionName">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionName" ng-model="permissionName">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="permissionKey">\u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionKey" ng-model="permissionKey">\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10E8\u10D4\u10E5\u10DB\u10DC\u10D0</button>\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10D0\u10EE\u10D0\u10DA\u10D8</button>\r\n        <div class="form-group">\r\n            <label for="searchfield">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D0 :</label>\r\n            <input type="text" class="form-control" id="searchfield" ng-model="search.name">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <a href="javascript:void(0)" ng-click="view(permission._id)" class="list-group-item"\r\n           ng-repeat="permission in permissions | filter : search">{{ permission.name }}</a>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('/static/apanel/access/access-users.html','<script type="text/ng-template" id="custom/tpl/userModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10D4\u10DA\u10D8: {{ user.local.email }}</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="panel panel-primary">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10EF\u10D2\u10E3\u10E4\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <table class="table table-striped">\r\n                <tr>\r\n                    <th>\u10EF\u10D2\u10E3\u10E4\u10D8</th>\r\n                    <th>\u10E1\u10E2\u10D0\u10E2\u10E3\u10E1\u10D8</th>\r\n                    <th>###</th>\r\n                </tr>\r\n                <tr ng-repeat="group in groups">\r\n                    <td>{{ group.name }}</td>\r\n                    <td>\r\n                        <span class="text-success" ng-show="hasGroup(group._id)">\u10E9\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                        <span class="text-danger" ng-show="!hasGroup(group._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                    </td>\r\n                    <td>\r\n                        <button class="btn btn-success" ng-click="addToGroup(group._id)"\r\n                                ng-show="!hasGroup(group._id)">\u10E9\u10D0\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                        <button class="btn btn-danger" ng-click="removeFromGroup(group._id)"\r\n                                ng-show="hasGroup(group._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n        </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10DA\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <div class="form-group">\r\n            <label for="searchField">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="searchField" ng-model="search.local.email">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <a href="javascript:void(0)" ng-click="view(user._id)" class="list-group-item"\r\n           ng-repeat="user in users_list | filter : search">{{ user.local.email }}</a>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('/static/apanel/forum/delete-post.html','<div class="modal-header">\r\n    <h3 class="modal-title">\u10DE\u10DD\u10E1\u10E2\u10D8\u10E1 \u10EC\u10D0\u10E8\u10DA\u10D0</h3>\r\n</div>\r\n\r\n<div class="modal-body">\r\n    <div class="well">\u10DC\u10D0\u10DB\u10D3\u10D5\u10D8\u10DA\u10D0\u10D3 \u10D2\u10D8\u10DC\u10D3\u10D0\u10D7 \u10DE\u10DD\u10E1\u10E2\u10D8\u10E1 \u10EC\u10D0\u10E8\u10DA\u10D0?</div>\r\n</div>\r\n\r\n<div class="modal-footer">\r\n    <button class="btn btn-success" ng-click="deletePost()">\u10D3\u10D0\u10D3\u10D0\u10E1\u10E2\u10E3\u10E0\u10D4\u10D1\u10D0</button>\r\n    <button class="btn btn-primary" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n</div>\r\n');
$templateCache.put('/static/apanel/forum/edit-topic.html','<form ng-submit="editTopic()">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8\u10E1 \u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="topicTitle">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8 :</label>\r\n            <input type="text" class="form-control" id="topicTitle" ng-model="topicTitle" placeholder="">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="topicDescription">\u10D0\u10E6\u10EC\u10D4\u10E0\u10D0 :</label>\r\n            <input type="text" class="form-control" id="topicDescription" ng-model="topicDescription"\r\n                   placeholder="">\r\n        </div>\r\n        <div class="form-group">\r\n            <label  class="col-lg-2 control-label">\u10D0\u10E5\u10E2\u10D8\u10E3\u10E0\u10D8</label>\r\n            <div class="switch" for="active">\r\n                \xA0 <label>\r\n                    <input type="checkbox" value="" ng-model="active">\r\n                  </label>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="submit">\u10D3\u10D0\u10D3\u10D0\u10E1\u10E2\u10E3\u10E0\u10D4\u10D1\u10D0</button>\r\n        <button class="btn btn-primary" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</form>');
$templateCache.put('/static/apanel/forum/forum.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item" ui-sref="app.forum.list">\u10D7\u10D4\u10DB\u10D4\u10D1\u10D8\u10E1 \u10E1\u10D8\u10D0</a>\r\n                <a class="list-group-item" ui-sref="app.forum.new-topic">\u10D0\u10EE\u10D0\u10DA\u10D8 \u10D7\u10D4\u10DB\u10D0</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/forum/list.html','<div class="panel panel-primary">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8\u10E1 \u10D7\u10D4\u10DB\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n\r\n\r\n    <table class="table">\r\n        <tr ng-repeat="topic in topics">\r\n            <td ><span ng-class="{\'glyphicon\':true, \'glyphicon-eye-open\':topic.active,\r\n             \'glyphicon-lock\':!topic.active}"></span>\r\n            </td>\r\n\r\n            <td>\r\n                <a ui-sref="app.forum.topic({topicId:topic._id})">{{topic.title}}</a>\r\n            </td>\r\n            <td>\r\n                <button  class="btn btn-xs btn-primary" ng-click="modify(topic._id)">\r\n                    <span class="glyphicon glyphicon-pencil"></span></button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n</div>\r\n\r\n');
$templateCache.put('/static/apanel/forum/new-topic.html','<div class="panel panel-primary">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10D7\u10D4\u10DB\u10D8\u10E1 \u10D3\u10D0\u10DB\u10D0\u10E2\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <form class="form-horizontal" ng-submit="submit()" autocomplete="off">\r\n            <fieldset>\r\n                <div class="form-group">\r\n                    <label for="inputName" class="col-lg-2 control-label">\u10D7\u10D4\u10DB\u10D0</label>\r\n                    <div class="col-lg-10">\r\n                        <input type="text" ng-model="topicTitle" class="form-control" id="inputName"\r\n                               placeholder="\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8">\r\n                    </div>\r\n                </div>\r\n                <div class="form-group">\r\n                    <label for="inputDescription" class="col-lg-2 control-label">\u10D0\u10E6\u10EC\u10D4\u10E0\u10D0</label>\r\n                    <div class="col-lg-10">\r\n                        <textarea class="form-control" id="inputDescription" ng-model="topicDescription"\r\n                                  rows="2"></textarea>\r\n                    </div>\r\n\r\n                </div>\r\n                <div class="form-group">\r\n                    <label  class="col-lg-2 control-label">\u10D0\u10E5\u10E2\u10D8\u10E3\u10E0\u10D8</label>\r\n                    <div class="checkbox">\r\n                        \xA0 <label><input type="checkbox" value="" ng-model="active"></label>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n\r\n                <div class="form-group">\r\n                    <div class="col-lg-10 col-lg-offset-2">\r\n                        <button type="submit" class="btn btn-primary">\u10D3\u10D0\u10D3\u10D0\u10E1\u10E2\u10E3\u10E0\u10D4\u10D1\u10D0</button>\r\n                    </div>\r\n                </div>\r\n\r\n            </fieldset>\r\n        </form>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/forum/topic.html','<div class="panel panel-primary">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">{{topic.title}}</h3>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <div class="list-group-item" ng-repeat="post in posts">\r\n            <div class="row">\r\n                <div class="col-md-12">\r\n                    <span style="font-weight: bold;" class="list-group-item-heading">{{post.user.local.username}}</span>&nbsp;&nbsp;<span>{{post.created_at | date:\'yyyy-MM-dd HH:mm:ss\'}}</span>\r\n                    <span class="pull-right">\r\n                    <button class="btn btn-danger btn-sm" ng-click="deletePost(post._id)">\r\n                        <span class="glyphicon glyphicon-remove"></span>\r\n                    </button>\r\n                </span>\r\n                </div>\r\n            </div>\r\n            <div class="well"><p class="list-group-item-text" style="color:black; font-size:14px;">{{post.text}}</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n');
$templateCache.put('/static/apanel/partial/footer.html','');
$templateCache.put('/static/apanel/partial/header.html','<div class="navbar navbar-default navbar-static-top">\r\n    <div class="container-fluid">\r\n        <div class="navbar-header">\r\n            <a class="navbar-brand" href="#">aPanel</a>\r\n        </div>\r\n        <div id="navbar" class="navbar-collapse collapse">\r\n            <ul class="nav navbar-nav">\r\n                <li class="active"><a ui-sref="app.home">Home</a></li>\r\n                <li><a ui-sref="app.forum.list">Forum</a></li>\r\n                <li><a href="#">Reload</a></li>\r\n                <li uib-dropdown>\r\n                    <a href="#" uib-dropdown-toggle>\u10DB\u10DD\u10D3\u10E3\u10DA\u10D4\u10D1\u10D8<span class="caret"></span></a>\r\n                    <ul class="dropdown-menu" role="menu">\r\n                        <li role="menuitem"><a ui-sref="app.access.users">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</a></li>\r\n                        <li role="menuitem"><a ui-sref="app.word.pending">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</a></li>\r\n                        <li role="menuitem"><a ui-sref="app.forum.list">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8</a></li>\r\n                        <li role="menuitem"><a ui-sref="app.collection.collection-list">\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D4\u10D1\u10D8</a></li>\r\n                        <li class="divider"></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div><!--/.nav-collapse -->\r\n    </div><!--/.container-fluid -->\r\n</div>');
$templateCache.put('/static/apanel/partial/home.html','<a ui-sref="app.access" class="btn btn-lg btn-primary">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</a>\r\n<a ui-sref="app.word.pending" class="btn btn-lg btn-primary">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</a>');
$templateCache.put('/static/apanel/word/modify-word.html','<form ng-submit="addNewWord()">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D8\u10E1 \u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="wordName">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D0 :</label>\r\n            <input type="text" class="form-control" id="wordName" ng-model="wordName" placeholder="\u10DB\u10D0\u10D2.: language">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="wordDescription">\u10D2\u10D0\u10DC\u10DB\u10D0\u10E0\u10E2\u10D4\u10D1\u10D0 (\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8/\u10D8\u10DC\u10D2\u10DA\u10D8\u10E1\u10E3\u10E0\u10D8):</label>\r\n            <input type="text" class="form-control" id="wordDescription" ng-model="wordDescription"\r\n                   placeholder="\u10DB\u10D0\u10D2.: \u10D4\u10DC\u10D0">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="submit">\u10D3\u10D0\u10D3\u10D0\u10E1\u10E2\u10E3\u10E0\u10D4\u10D1\u10D0</button>\r\n        <button class="btn btn-primary" ng-click="close">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</form>\r\n\r\n');
$templateCache.put('/static/apanel/word/pending-word.html','<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <table class="table">\r\n        <tr>\r\n            <th>\u10E1\u10D8\u10E2\u10E7\u10D5\u10D0</th>\r\n            <th>\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0</th>\r\n            <th>###</th>\r\n        </tr>\r\n        <tr ng-repeat="word in words">\r\n            <td>{{word.value}}</td>\r\n            <td>{{word.description}}</td>\r\n            <td>\r\n                <button ng-click="approve(word._id)" class="btn btn-xs btn-success"><span\r\n                        class="glyphicon glyphicon-ok"></span></button>\r\n                <button ng-click="reject(word._id)" class="btn btn-xs btn-warning"><span\r\n                        class="glyphicon glyphicon-ban-circle"></span></button>\r\n                <button ng-click="modify(word._id)" class="btn btn-xs btn-primary">\u10E9\u10D0\u10E1\u10EC\u10DD\u10E0\u10D4\u10D1\u10D0</button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</div>');
$templateCache.put('/static/apanel/word/word.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item disabled">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8\u10E1 \u10E1\u10D8\u10D0</a>\r\n                <a class="list-group-item" ui-sref="app.word.pending">\u10E8\u10D4\u10E1\u10D0\u10DB\u10DD\u10EC\u10DB\u10D4\u10D1\u10D4\u10DA\u10D8 \u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/collection/all-collection-list.html','<div class="panel panel-primary">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n\r\n    <table class="table">\r\n        <tr>\r\n            <th><span class="glyphicon glyphicon-lock"></span></th>\r\n            <th>accepted</th>\r\n            <th>checked</th>\r\n            <th>\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D0</th>\r\n            <th><span class="glyphicon glyphicon-pencil"></span></th>\r\n        </tr>\r\n        <tr ng-repeat="collection in collections">\r\n            <td><span title="{{collection.is_public?\'\u10E6\u10D8\u10D0\':\'\u10DE\u10D8\u10E0\u10D0\u10D3\u10D8\'}}"\r\n                      ng-class="{\'glyphicon\':true, \'glyphicon-eye-open\':collection.is_public, \'glyphicon-eye-close\':!collection.is_public}">\r\n            </span></td>\r\n            <td>\r\n                <span>{{collection.accepted}}</span>\r\n            </td>\r\n            <td>\r\n                <span>{{collection.checked}}</span>\r\n            </td>\r\n            <td><a ng-click="modify(collection._id)" >{{collection.name}}</a>\r\n            </td>\r\n            <td>\r\n                <a class="btn btn-xs btn-warning" ><span\r\n                        class="glyphicon glyphicon-pencil" ng-click="modify(collection._id)"></span></a>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n</div>');
$templateCache.put('/static/apanel/collection/collection-list.html','<div class="panel panel-primary">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n\r\n    <table class="table">\r\n        <tr ng-repeat="collection in collections">\r\n            <td ><span ng-class="{\'glyphicon\':true, \'glyphicon-eye-open\':collection.is_public,\r\n             \'glyphicon-lock\':!collection.is_public}"></span>\r\n            </td>\r\n\r\n            <td class="col-md-8">\r\n                <a ng-click="modify(collection._id)">{{collection.name}}</a>\r\n            </td>\r\n            <td>\r\n                <button  class="btn btn-xs btn-primary" ng-click="modify(collection._id)">\r\n                    <span class="glyphicon glyphicon-pencil"></span></button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n</div>');
$templateCache.put('/static/apanel/collection/collection.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item" ui-sref="app.collection.collection-list">\u10E8\u10D4\u10E1\u10D0\u10DB\u10DD\u10EC\u10DB\u10D4\u10D1\u10D4\u10DA\u10D8 \u10D9\u10DD\u10DA\u10D4\u10EA\u10D8\u10D4\u10D1\u10D8\u10E1 \u10E1\u10D8\u10D0</a>\r\n                <a class="list-group-item" ui-sref="app.collection.all-collection-list">\u10E7\u10D5\u10D4\u10DA\u10D0 \u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D8\u10E1 \u10E1\u10D8\u10D0</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/collection/modify-collection.html','<form ng-submit="editCollection()">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D8\u10E1 \u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="collectionName" >\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8</label>\r\n            <input type="text" class="form-control" id="collectionName" ng-model="collectionName" placeholder="\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="collectionDescription">\u10D0\u10E6\u10EC\u10D4\u10E0\u10D0</label>\r\n            <input type="text" class="form-control" id="collectionDescription" ng-model="collectionDescription"\r\n                   placeholder="\u10D0\u10E6\u10EC\u10D4\u10E0\u10D0">\r\n        </div>\r\n        <div class="form-group">\r\n            <label >\u10E2\u10D8\u10DE\u10D8</label>\r\n            <p class="form-control-static"><strong>{{collectionTypeText}}</strong></p>\r\n        </div>\r\n        <div class="form-group">\r\n            <label  class="control-label">\u10D5\u10D0\u10DA\u10D8\u10D3\u10E3\u10E0\u10D8</label>\r\n            <div class="switch" for="accepted">\r\n                \xA0 <label>\r\n                <input type="checkbox"  id="accepted" value="" ng-model="accepted" >\r\n            </label>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    <div class="panel panel-default">\r\n        <div class="panel-heading">\r\n            <h3 class="panel-title">\u10D9\u10DD\u10DA\u10D4\u10E5\u10EA\u10D8\u10D8\u10E1 \u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</h3>\r\n        </div>\r\n        <ul class="list-group">\r\n            <li class="list-group-item" ng-repeat="word in collection.words">{{word.value}} - {{word.description}}\r\n            </li>\r\n        </ul>\r\n    </div>\r\n\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="submit">\u10D3\u10D0\u10D3\u10D0\u10E1\u10E2\u10E3\u10E0\u10D4\u10D1\u10D0</button>\r\n        <button class="btn btn-primary" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</form>');}]);