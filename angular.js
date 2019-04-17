(function () {
    'use strict';

    angular
        .module('app')
        .controller('controller', controller)
        .factory('dataservice', dataservice);

    controller.$inject = ['$scope', 'dataservice'];
    dataservice.$inject = ['$q', '$http'];

    function controller($scope, dataservice) {
        var vm = this;
        vm.answer = {};
        vm.error = null;     

		dataservice.get()
            .then(function(result){
                vm.answers = result;
            });		        
    }

    function dataservice($q, $http) {
        return {
			get: _.once(get)
        }
		function get() {
            return $q(function (resolve, reject) {
                $http.get('https://got-quiz-api.azurewebsites.net/api/answers')
                    .then(function (response) {
                        resolve(response.data);
                    });
            });
        }       
    }    
})();