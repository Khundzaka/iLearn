angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("/static/apanel/access/access-groups.html","<script type=\"text/ng-template\" id=\"custom/tpl/groupModalContent\">\r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">ჯგუფი: {{ group.name }}</h3>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">\r\n                <h3 class=\"panel-title\">უფლებები</h3>\r\n            </div>\r\n            <table class=\"table table-striped\">\r\n                <tr>\r\n                    <th>უფლება</th>\r\n                    <th>სტატუსი</th>\r\n                    <th>###</th>\r\n                </tr>\r\n                <tr ng-repeat=\"permission in permissions\">\r\n                    <td>{{ permission.name }}</td>\r\n                    <td>\r\n                        <span class=\"text-success\" ng-show=\"hasPermission(permission._id)\">ჩართული</span>\r\n                        <span class=\"text-danger\" ng-show=\"!hasPermission(permission._id)\">გამორთული</span>\r\n                    </td>\r\n                    <td>\r\n                        <button class=\"btn btn-success\" ng-click=\"addPermission(permission._id)\"\r\n                                ng-show=\"!hasPermission(permission._id)\">ჩართვა\r\n                        </button>\r\n                        <button class=\"btn btn-danger\" ng-click=\"removePermission(permission._id)\"\r\n                                ng-show=\"hasPermission(permission._id)\">გამორთვა\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n        </div>\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">\r\n                <h3 class=\"panel-title\">რედაქტირება</h3>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"groupname1\">სახელი :</label>\r\n                    <input type=\"text\" class=\"form-control\" id=\"groupname1\" ng-model=\"groupName\">\r\n                </div>\r\n                <div class=\"form-group\">\r\n                    <button class=\"btn btn-success\" type=\"button\" ng-click=\"save()\">შენახვა</button>\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">დახურვა</button>\r\n    </div>\r\n</script>\r\n\r\n<script type=\"text/ng-template\" id=\"custom/tpl/createGroupModalContent\">\r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">ახალი ჯგუფი</h3>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"form-group\">\r\n            <label for=\"groupname\">სახელი :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"groupname\" ng-model=\"groupName\">\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"create()\">შექმნა</button>\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">დახურვა</button>\r\n    </div>\r\n</script>\r\n\r\n<div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">ჯგუფები</h3>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"create()\">ახალი</button>\r\n        <div class=\"form-group\">\r\n            <label for=\"searchfield\">ჯგუფი :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"searchfield\" ng-model=\"search.name\">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"list-group\">\r\n        <a href=\"javascript:void(0)\" ng-click=\"view(group._id)\" class=\"list-group-item\"\r\n           ng-repeat=\"group in groups | filter : search\">{{ group.name }}</a>\r\n    </div>\r\n\r\n</div>");
$templateCache.put("/static/apanel/access/access-index.html","<div class=\"row\">\r\n    <div class=\"col-md-3\">\r\n        <div class=\"panel panel-default\">\r\n            <div class=\"panel-heading\">\r\n                <h3 class=\"panel-title\">წვდომა</h3>\r\n            </div>\r\n            <div class=\"list-group\">\r\n                <a class=\"list-group-item\" ui-sref=\"app.access.users\">მომხმარებლები</a>\r\n                <a class=\"list-group-item\" ui-sref=\"app.access.groups\">ჯგუფები</a>\r\n                <a class=\"list-group-item\" ui-sref=\"app.access.permissions\">უფლებები</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-9\">\r\n        <div ui-view=\"\"></div>\r\n    </div>\r\n</div>");
$templateCache.put("/static/apanel/access/access-permissions.html","<script type=\"text/ng-template\" id=\"custom/tpl/permissionModalContent\">\r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">უფლება: {{ permission.name }}</h3>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"form-group\">\r\n            <label for=\"permissionname1\">სახელი :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"permissionname1\" ng-model=\"permissionName\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"permissionkey1\">გასაღები :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"permissionkey1\" ng-model=\"permissionKey\" disabled>\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"save()\">შენახვა</button>\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">დახურვა</button>\r\n    </div>\r\n</script>\r\n\r\n<script type=\"text/ng-template\" id=\"custom/tpl/createPermissionModalContent\">\r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">ახალი უფლება</h3>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"form-group\">\r\n            <label for=\"permissionName\">სახელი :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"permissionName\" ng-model=\"permissionName\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"permissionKey\">გასაღები :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"permissionKey\" ng-model=\"permissionKey\">\r\n        </div>\r\n\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"create()\">შექმნა</button>\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">დახურვა</button>\r\n    </div>\r\n</script>\r\n\r\n<div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">უფლებები</h3>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n        <button class=\"btn btn-success\" type=\"button\" ng-click=\"create()\">ახალი</button>\r\n        <div class=\"form-group\">\r\n            <label for=\"searchfield\">უფლება :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"searchfield\" ng-model=\"search.name\">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"list-group\">\r\n        <a href=\"javascript:void(0)\" ng-click=\"view(permission._id)\" class=\"list-group-item\"\r\n           ng-repeat=\"permission in permissions | filter : search\">{{ permission.name }}</a>\r\n    </div>\r\n\r\n</div>");
$templateCache.put("/static/apanel/access/access-users.html","<script type=\"text/ng-template\" id=\"custom/tpl/userModalContent\">\r\n    <div class=\"modal-header\">\r\n        <h3 class=\"modal-title\">მომხმარებელი: {{ user.local.email }}</h3>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n        <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">\r\n                <h3 class=\"panel-title\">ჯგუფები</h3>\r\n            </div>\r\n            <table class=\"table table-striped\">\r\n                <tr>\r\n                    <th>ჯგუფი</th>\r\n                    <th>სტატუსი</th>\r\n                    <th>###</th>\r\n                </tr>\r\n                <tr ng-repeat=\"group in groups\">\r\n                    <td>{{ group.name }}</td>\r\n                    <td>\r\n                        <span class=\"text-success\" ng-show=\"hasGroup(group._id)\">ჩართული</span>\r\n                        <span class=\"text-danger\" ng-show=\"!hasGroup(group._id)\">გამორთული</span>\r\n                    </td>\r\n                    <td>\r\n                        <button class=\"btn btn-success\" ng-click=\"addToGroup(group._id)\"\r\n                                ng-show=\"!hasGroup(group._id)\">ჩართვა\r\n                        </button>\r\n                        <button class=\"btn btn-danger\" ng-click=\"removeFromGroup(group._id)\"\r\n                                ng-show=\"hasGroup(group._id)\">გამორთვა\r\n                        </button>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n        <button class=\"btn btn-primary\" type=\"button\" ng-click=\"close()\">დახურვა</button>\r\n    </div>\r\n</script>\r\n\r\n<div class=\"panel panel-default\">\r\n    <div class=\"panel-heading\">\r\n        <h3 class=\"panel-title\">მომხმარებლები</h3>\r\n    </div>\r\n    <div class=\"panel-body\">\r\n        <div class=\"form-group\">\r\n            <label for=\"searchField\">მომხმარებელი :</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"searchField\" ng-model=\"search.local.email\">\r\n        </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"list-group\">\r\n        <a href=\"javascript:void(0)\" ng-click=\"view(user._id)\" class=\"list-group-item\"\r\n           ng-repeat=\"user in users_list | filter : search\">{{ user.local.email }}</a>\r\n    </div>\r\n\r\n</div>");
$templateCache.put("/static/apanel/partial/footer.html","");
$templateCache.put("/static/apanel/partial/header.html","<div class=\"navbar navbar-default navbar-static-top\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <a class=\"navbar-brand\" href=\"#\">Main Panel</a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li class=\"active\"><a ui-sref=\"app.home\">Home</a></li>\r\n                <li><a href=\"#\">About</a></li>\r\n                <li><a href=\"#\">Reload</a></li>\r\n                <li uib-dropdown>\r\n                    <a href=\"#\" uib-dropdown-toggle>მოდულები<span class=\"caret\"></span></a>\r\n                    <ul class=\"dropdown-menu\" role=\"menu\">\r\n                        <li role=\"menuitem\"><a ui-sref=\"app.access\">წვდომა</a></li>\r\n                        <li role=\"menuitem\"><a href=\"#\">Another action</a></li>\r\n                        <li role=\"menuitem\"><a href=\"#\">Something else here</a></li>\r\n                        <li class=\"divider\"></li>\r\n                        <li role=\"menuitem\"><a href=\"#\">Separated link</a></li>\r\n                    </ul>\r\n                </li>\r\n            </ul>\r\n        </div><!--/.nav-collapse -->\r\n    </div><!--/.container-fluid -->\r\n</div>");
$templateCache.put("/static/apanel/partial/home.html","<a ui-sref=\"app.access\" class=\"btn btn-lg btn-primary\">წვდომა</a>");}]);