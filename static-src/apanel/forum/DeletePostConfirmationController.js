apanelApp.controller("DeletePostConfirmationController",
    ["$scope", "ForumService", "post_id", "$uibModalInstance", "$log",
        function ($scope, ForumService, post_id, $uibModalInstance, $log) {

            $scope.deletePost = function () {
                ForumService.deletePost({
                    postId: post_id
                }).then(function () {
                    $uibModalInstance.close();
                });
            };

            $scope.close = function () {
                $uibModalInstance.dismiss();
            }
        }
    ]);