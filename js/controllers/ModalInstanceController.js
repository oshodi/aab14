controllers.ModalInstanceCtrl = function ($scope, Service,$modalInstance, items,speaker) {

    $scope.items = items;
    $scope.speaker = speaker;

    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};