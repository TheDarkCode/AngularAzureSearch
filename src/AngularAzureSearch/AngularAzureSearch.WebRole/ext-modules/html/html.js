angular.module('html', [])
          .directive('anchorBottom', function () {
              return {
                  // Restrict A causes display issue. However, without it divs are not automatically scaled properly.
                  restrict: 'AE',
                  priority: 999,
                  scope: {},
                  link: function (scope, element, attr) {
                      function resize() {
                          element.height($(window).height() - element.parent().position().top);
                          element.show();
                      }

                      element.css({
                          width: '100%',
                          position: 'fixed',
                          bottom: 0,
                          display: 'none'
                      });

                      $(window).on('resize', resize);
                      setTimeout(resize, 200);
                  }
              };
          });