angular.module('myApp').directive('contentSlider', function() {

        return function(scope, element) {
            if (scope.$last) {
                element.addClass('active');
            }
        };

    });
