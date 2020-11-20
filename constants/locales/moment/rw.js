;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
 }(this, (function (moment) { 'use strict';
     var rw = moment.defineLocale('rw', {
         months : 'Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza'.split('_'),
         monthsShort : 'Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza'.split('_'),
         weekdays : 'Kucyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu'.split('_'),
         weekdaysShort : 'Kucyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu'.split('_'),
         weekdaysMin : 'Kucyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu'.split('_'),
         longDateFormat : {
             LT : 'HH:mm',
             LTS : 'HH:mm:ss',
             L : 'DD/MM/YYYY',
             LL : 'D MMMM YYYY',
             LLL : 'D MMMM YYYY HH:mm',
             LLLL : 'dddd, D MMMM YYYY HH:mm'
         },
         calendar : {
             sameDay : '[Uyu munsi saa] LT',
             nextDay : '[Ejo hazaza saa] LT',
             nextWeek : 'dddd [saa] LT',
             lastDay : '[Ejo hashize saa] LT',
             lastWeek : 'dddd [hashize] [saa] LT',
             sameElse : 'L'
         },
         relativeTime : {
             future : 'mu %s',
             past : 'hashize %s',
             s : 'igihe gito',
             ss : 'amasegonda %d',
             m : 'umunota',
             mm : 'iminota %d',
             h : 'isaha',
             hh : 'amasaha %d',
             d : 'umunsi',
             dd : 'iminsi %d',
             M : 'ukwezi',
             MM : 'amezi %d',
             y : 'umwaka',
             yy : 'imyaka %d'
         },
         dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
         ordinal : function (number) {
             var b = number % 10,
                 output = (~~(number % 100 / 10) === 1) ? '' :
                 (b === 1) ? '' :
                 (b === 2) ? '' :
                 (b === 3) ? '' : '';
             return number + output;
         },
         week : {
             dow : 1, // Monday is the first day of the week.
             doy : 4  // The week that contains Jan 4th is the first week of the year.
         }
     });
     return rw;
 })));