var formValidator = angular.module("validatorDemo",[]);
formValidator.controller("RegisterFormController", function( $scope, $http ){
	
	$scope.formData = {
		firstName : "",
		lastName : "",
		email : "",
		phone : "",
		password : "",
		confirmPassword : ""
	};

	$scope.showInvalids = false;

	$scope.validatePassword = function() {
		var formData = $scope.formData;
		if( formData.password === formData.confirmPassword ) {
			return true;
		} else {
			return false;
		}
	};

	$scope.signupUser = function( isValid ) {
		$scope.incThrobberCount();
		$scope.showInvalids || ( $scope.showInvalids = true );
		
		if( isValid ) {

			var formData = {};
			angular.copy($scope.formData, formData);
			delete formData.confirmPassword;
			delete formData.terms;

			console.log(" Form Data are Valid :: What next ???? ");
			console.log( formData );
		} else {
			console.log( "   " );
		}
	};
});

formValidator.directive('inputchange',function($parse,$timeout) {
    return function(scope, elem, attrs) {

        var func =  $parse(attrs['inputchange']);
        var  timer = {};
        
        elem.bind('keyup',function(){            
            timer = $timeout(function(){
                func(scope, { });
            }, 400);                
        });

        elem.bind('keydown',function(){
            $timeout.cancel(timer);
        });
        
    };
});

formValidator.directive('pwdCheck', [function () {
	return {
		require: 'ngModel',
		link: function (scope, elem, attrs, ctrl) {
			var firstPassword = '#' + attrs.pwdCheck;
			elem.add(firstPassword).on('keyup', function () {
				scope.$apply(function () {
					var v = elem.val()===$(firstPassword).val();
					ctrl.$setValidity('pwdmatch', v);
				});
			});
		}
	}
}]);