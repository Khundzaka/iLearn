angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/static/apanel/access/access-groups.html','<script type="text/ng-template" id="custom/tpl/groupModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10EF\u10D2\u10E3\u10E4\u10D8: {{ group.name }}</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="panel panel-primary">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <table class="table table-striped">\r\n                <tr>\r\n                    <th>\u10E3\u10E4\u10DA\u10D4\u10D1\u10D0</th>\r\n                    <th>\u10E1\u10E2\u10D0\u10E2\u10E3\u10E1\u10D8</th>\r\n                    <th>###</th>\r\n                </tr>\r\n                <tr ng-repeat="permission in permissions">\r\n                    <td>{{ permission.name }}</td>\r\n                    <td>\r\n                        <span class="text-success" ng-show="hasPermission(permission._id)">\u10E9\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                        <span class="text-danger" ng-show="!hasPermission(permission._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                    </td>\r\n                    <td>\r\n                        <button class="btn btn-success" ng-click="addPermission(permission._id)"\r\n                                ng-show="!hasPermission(permission._id)">\u10E9\u10D0\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                        <button class="btn btn-danger" ng-click="removePermission(permission._id)"\r\n                                ng-show="hasPermission(permission._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n        <div class="panel panel-primary">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0</h3>\r\n            </div>\r\n            <div class="panel-body">\r\n                <div class="form-group">\r\n                    <label for="groupname1">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n                    <input type="text" class="form-control" id="groupname1" ng-model="groupName">\r\n                </div>\r\n                <div class="form-group">\r\n                    <button class="btn btn-success" type="button" ng-click="save()">\u10E8\u10D4\u10DC\u10D0\u10EE\u10D5\u10D0</button>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<script type="text/ng-template" id="custom/tpl/createGroupModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10D0\u10EE\u10D0\u10DA\u10D8 \u10EF\u10D2\u10E3\u10E4\u10D8</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="groupname">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="groupname" ng-model="groupName">\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10E8\u10D4\u10E5\u10DB\u10DC\u10D0</button>\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10EF\u10D2\u10E3\u10E4\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10D0\u10EE\u10D0\u10DA\u10D8</button>\r\n        <div class="form-group">\r\n            <label for="searchfield">\u10EF\u10D2\u10E3\u10E4\u10D8 :</label>\r\n            <input type="text" class="form-control" id="searchfield" ng-model="search.name">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <a href="javascript:void(0)" ng-click="view(group._id)" class="list-group-item"\r\n           ng-repeat="group in groups | filter : search">{{ group.name }}</a>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('/static/apanel/access/access-index.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item" ui-sref="app.access.users">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10DA\u10D4\u10D1\u10D8</a>\r\n                <a class="list-group-item" ui-sref="app.access.groups">\u10EF\u10D2\u10E3\u10E4\u10D4\u10D1\u10D8</a>\r\n                <a class="list-group-item" ui-sref="app.access.permissions">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D4\u10D1\u10D8</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/access/access-permissions.html','<script type="text/ng-template" id="custom/tpl/permissionModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D0: {{ permission.name }}</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="permissionname1">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionname1" ng-model="permissionName">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="permissionkey1">\u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionkey1" ng-model="permissionKey" disabled>\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-click="save()">\u10E8\u10D4\u10DC\u10D0\u10EE\u10D5\u10D0</button>\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<script type="text/ng-template" id="custom/tpl/createPermissionModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10D0\u10EE\u10D0\u10DA\u10D8 \u10E3\u10E4\u10DA\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="permissionName">\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionName" ng-model="permissionName">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="permissionKey">\u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 :</label>\r\n            <input type="text" class="form-control" id="permissionKey" ng-model="permissionKey">\r\n        </div>\r\n\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10E8\u10D4\u10E5\u10DB\u10DC\u10D0</button>\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <button class="btn btn-success" type="button" ng-click="create()">\u10D0\u10EE\u10D0\u10DA\u10D8</button>\r\n        <div class="form-group">\r\n            <label for="searchfield">\u10E3\u10E4\u10DA\u10D4\u10D1\u10D0 :</label>\r\n            <input type="text" class="form-control" id="searchfield" ng-model="search.name">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <a href="javascript:void(0)" ng-click="view(permission._id)" class="list-group-item"\r\n           ng-repeat="permission in permissions | filter : search">{{ permission.name }}</a>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('/static/apanel/access/access-users.html','<script type="text/ng-template" id="custom/tpl/userModalContent">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10D4\u10DA\u10D8: {{ user.local.email }}</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <div class="panel panel-primary">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10EF\u10D2\u10E3\u10E4\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <table class="table table-striped">\r\n                <tr>\r\n                    <th>\u10EF\u10D2\u10E3\u10E4\u10D8</th>\r\n                    <th>\u10E1\u10E2\u10D0\u10E2\u10E3\u10E1\u10D8</th>\r\n                    <th>###</th>\r\n                </tr>\r\n                <tr ng-repeat="group in groups">\r\n                    <td>{{ group.name }}</td>\r\n                    <td>\r\n                        <span class="text-success" ng-show="hasGroup(group._id)">\u10E9\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                        <span class="text-danger" ng-show="!hasGroup(group._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10E3\u10DA\u10D8</span>\r\n                    </td>\r\n                    <td>\r\n                        <button class="btn btn-success" ng-click="addToGroup(group._id)"\r\n                                ng-show="!hasGroup(group._id)">\u10E9\u10D0\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                        <button class="btn btn-danger" ng-click="removeFromGroup(group._id)"\r\n                                ng-show="hasGroup(group._id)">\u10D2\u10D0\u10DB\u10DD\u10E0\u10D7\u10D5\u10D0\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n        </div>\r\n    </div>\r\n    <div class="modal-footer">\r\n        <button class="btn btn-primary" type="button" ng-click="close()">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</script>\r\n\r\n<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10DA\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <div class="panel-body">\r\n        <div class="form-group">\r\n            <label for="searchField">\u10DB\u10DD\u10DB\u10EE\u10DB\u10D0\u10E0\u10D4\u10D1\u10D4\u10DA\u10D8 :</label>\r\n            <input type="text" class="form-control" id="searchField" ng-model="search.local.email">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class="list-group">\r\n        <a href="javascript:void(0)" ng-click="view(user._id)" class="list-group-item"\r\n           ng-repeat="user in users_list | filter : search">{{ user.local.email }}</a>\r\n    </div>\r\n\r\n</div>');
$templateCache.put('/static/apanel/collection/collection.html','');
$templateCache.put('/static/apanel/collection/modify-collection.html','');
$templateCache.put('/static/apanel/forum/forum.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item" ui-sref="app.forum.list">\u10D7\u10D4\u10DB\u10D4\u10D1\u10D8\u10E1 \u10E1\u10D8\u10D0</a>\r\n                <a class="list-group-item disabled">\u10D0\u10EE\u10D0\u10DA\u10D8 \u10D7\u10D4\u10DB\u10D0</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');
$templateCache.put('/static/apanel/forum/list.html','<div class="panel panel-primary">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8\u10E1 \u10D7\u10D4\u10DB\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n\r\n\r\n    <table class="table">\r\n        <tr>\r\n            <th><span class="glyphicon glyphicon-globe"></span></th>\r\n            <th>\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8\u10E1 \u10D0\u10E6\u10EC\u10D4\u10E0\u10D0</th>\r\n            <th><span class="glyphicon glyphicon-pencil"></span></th>\r\n        </tr>\r\n        <tr ng-repeat="topic in topics">\r\n            <td><a ui-sref="">{{topic.title}}</a>\r\n            </td>\r\n            <td><a ui-sref="">{{topic.description}}</a>\r\n            <td>\r\n                <a ui-sref="" class="btn btn-xs btn-warning"><span\r\n                        class="glyphicon glyphicon-pencil"></span></a>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n\r\n</div>');
$templateCache.put('/static/apanel/partial/footer.html','');
$templateCache.put('/static/apanel/partial/header.html','<div class="navbar navbar-default navbar-static-top">\r\n    <div class="container-fluid">\r\n        <div class="navbar-header">\r\n            <a class="navbar-brand" href="#">aPanel</a>\r\n        </div>\r\n        <div id="navbar" class="navbar-collapse collapse">\r\n            <ul class="nav navbar-nav">\r\n                <li class="active"><a ui-sref="app.home">Home</a></li>\r\n                <li><a href="#" ui-sref="app.forum.list">Forum</a></li>\r\n                <li><a href="#">Reload</a></li>\r\n                <li uib-dropdown>\r\n                    <a href="#" uib-dropdown-toggle>\u10DB\u10DD\u10D3\u10E3\u10DA\u10D4\u10D1\u10D8<span class="caret"></span></a>\r\n                    <ul class="dropdown-menu" role="menu">\r\n                        <li role="menuitem"><a ui-sref="app.access.users">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</a></li>\r\n                        <li role="menuitem"><a ui-sref="app.word.pending">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</a></li>\r\n                        <li role="menuitem"><a ui-sref="app.forum.list">\u10E4\u10DD\u10E0\u10E3\u10DB\u10D8</a></li>\r\n                        <li class="divider"></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div><!--/.nav-collapse -->\r\n    </div><!--/.container-fluid -->\r\n</div>');
$templateCache.put('/static/apanel/partial/home.html','<a ui-sref="app.access" class="btn btn-lg btn-primary">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</a>\r\n<a ui-sref="app.word.pending" class="btn btn-lg btn-primary">\u10EC\u10D5\u10D3\u10DD\u10DB\u10D0</a>');
$templateCache.put('/static/apanel/word/modify-word.html','<form ng-submit="addNewWord()">\r\n    <div class="modal-header">\r\n        <h3 class="modal-title">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D8\u10E1 \u10E0\u10D4\u10D3\u10D0\u10E5\u10E2\u10D8\u10E0\u10D4\u10D1\u10D0</h3>\r\n    </div>\r\n\r\n    <div class="modal-body">\r\n        <div class="form-group">\r\n            <label for="wordName">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D0 :</label>\r\n            <input type="text" class="form-control" id="wordName" ng-model="wordName" placeholder="\u10DB\u10D0\u10D2.: language">\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="wordDescription">\u10D2\u10D0\u10DC\u10DB\u10D0\u10E0\u10E2\u10D4\u10D1\u10D0 (\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8/\u10D8\u10DC\u10D2\u10DA\u10D8\u10E1\u10E3\u10E0\u10D8):</label>\r\n            <input type="text" class="form-control" id="wordDescription" ng-model="wordDescription"\r\n                   placeholder="\u10DB\u10D0\u10D2.: \u10D4\u10DC\u10D0">\r\n        </div>\r\n    </div>\r\n\r\n    <div class="modal-footer">\r\n        <button class="btn btn-success" type="submit">\u10D3\u10D0\u10D3\u10D0\u10E1\u10E2\u10E3\u10E0\u10D4\u10D1\u10D0</button>\r\n        <button class="btn btn-primary" ng-click="close">\u10D3\u10D0\u10EE\u10E3\u10E0\u10D5\u10D0</button>\r\n    </div>\r\n</form>');
$templateCache.put('/static/apanel/word/pending-word.html','<div class="panel panel-default">\r\n    <div class="panel-heading">\r\n        <h3 class="panel-title">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</h3>\r\n    </div>\r\n    <table class="table">\r\n        <tr>\r\n            <th>\u10E1\u10D8\u10E2\u10E7\u10D5\u10D0</th>\r\n            <th>\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0</th>\r\n            <th>###</th>\r\n        </tr>\r\n        <tr ng-repeat="word in words">\r\n            <td>{{word.value}}</td>\r\n            <td>{{word.description}}</td>\r\n            <td>\r\n                <button ng-click="approve(word._id)" class="btn btn-xs btn-success"><span\r\n                        class="glyphicon glyphicon-ok"></span></button>\r\n                <button ng-click="reject(word._id)" class="btn btn-xs btn-warning"><span\r\n                        class="glyphicon glyphicon-ban-circle"></span></button>\r\n                <button ng-click="modify(word._id)" class="btn btn-xs btn-primary">\u10E9\u10D0\u10E1\u10EC\u10DD\u10E0\u10D4\u10D1\u10D0</button>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n</div>');
$templateCache.put('/static/apanel/word/word.html','<div class="row">\r\n    <div class="col-md-3">\r\n        <div class="panel panel-default">\r\n            <div class="panel-heading">\r\n                <h3 class="panel-title">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</h3>\r\n            </div>\r\n            <div class="list-group">\r\n                <a class="list-group-item disabled">\u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8\u10E1 \u10E1\u10D8\u10D0</a>\r\n                <a class="list-group-item" ui-sref="app.word.pending">\u10E8\u10D4\u10E1\u10D0\u10DB\u10DD\u10EC\u10DB\u10D4\u10D1\u10D4\u10DA\u10D8 \u10E1\u10D8\u10E2\u10E7\u10D5\u10D4\u10D1\u10D8</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class="col-md-9">\r\n        <div ui-view=""></div>\r\n    </div>\r\n</div>');}]);