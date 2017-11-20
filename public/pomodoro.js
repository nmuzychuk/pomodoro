angular.module('pomodoro', [])

    .controller('PomodoroCtrl', ['$interval', '$timeout', '$window', function ($interval, $timeout, $window) {
        const ctrl = this;

        ctrl.date = new Date(1000 * 60 * 25);
        ctrl.intervalTypes = Object.freeze({
            pomodoro: 'pomodoro',
            shortBreak: 'shortBreak',
            longBreak: 'longBreak'
        });

        ctrl.currentInterval = ctrl.intervalTypes.pomodoro;

        var promise = undefined;

        ctrl.start = function () {
            if (angular.isDefined(promise)) return;

            var count = ctrl.date.getMinutes() * 60;

            promise = $interval(function (iteration) {
                ctrl.date.setSeconds(ctrl.date.getSeconds() - 1);

                if (iteration === count) {
                    $timeout(function() { notify() }, 1);

                }
            }, 1000, count);
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
            switch (interval) {
                case ctrl.intervalTypes.pomodoro:
                    return new Date(1000 * 60 * 25);
                case ctrl.intervalTypes.shortBreak:
                    return new Date(1000 * 60 * 5);
                case ctrl.intervalTypes.longBreak:
                    return new Date(1000 * 60 * 10);
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

        var notify = function () {
            $window.alert('Your time is up!');
        };

        ctrl.filterInterval = function (interval) {
            return interval
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, function(str){ return str.toUpperCase(); })
        }

    }]);
