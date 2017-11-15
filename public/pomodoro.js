angular.module('pomodoro', [])

    .controller('PomodoroCtrl', ['$interval', function ($interval) {
        const ctrl = this;

        ctrl.date = new Date(25 * 1000 * 60);
        ctrl.intervalTypes = Object.freeze({
            pomodoro: 'pomodoro',
            shortBreak: 'shortBreak',
            longBreak: 'longBreak'
        });

        ctrl.currentInterval = ctrl.intervalTypes.pomodoro;

        var promise = undefined;

        ctrl.start = function () {
            if ( angular.isDefined(promise) ) return;

            promise = $interval(function (iteration) {
                ctrl.date.setSeconds(ctrl.date.getSeconds() - 1);

                if (iteration === 5) {
                    console.log('Your time is up!');
                }
            }, 1000, 5);
        };

        ctrl.stop = function () {
            if (angular.isDefined(promise)) {
                $interval.cancel(promise);
                promise = undefined;
            }
        };

        ctrl.reset = function () {
            ctrl.stop();
            ctrl.date = getDateForInterval(ctrl.currentInterval);
        };

        var getDateForInterval = function (interval) {
            switch(interval) {
                case ctrl.intervalTypes.pomodoro:
                    return new Date(25 * 1000 * 60);
                case ctrl.intervalTypes.shortBreak:
                    return new Date(5 * 1000 * 60);
                case ctrl.intervalTypes.longBreak:
                    return new Date(10 * 1000 * 60);
                default:
                    throw "Invalid interval";

            }
        };

        ctrl.setCurrentInterval = function (interval) {
            ctrl.stop();
            ctrl.currentInterval = interval;
            ctrl.date = getDateForInterval(ctrl.currentInterval);
            ctrl.start();
        };

}]);
