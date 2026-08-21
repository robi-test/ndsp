module.exports = function (env) { /* eslint-disable-line func-names,no-unused-vars */
  const filters = {};

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  // Converts 24h time string (HH:MM) to 12h am/pm format
  filters.timeFormat = function (time) {
    if (!time) return '';
    var parts = time.split(':');
    if (parts.length !== 2) return time;
    var h = parseInt(parts[0], 10);
    var m = parts[1];
    var suffix = h < 12 ? 'am' : 'pm';
    var h12 = h % 12 || 12;
    return (h12 < 10 ? '0' + h12 : '' + h12) + ':' + m + suffix;
  };

  // Converts yyyy-mm-dd date string to dd-mm-yyyy
  filters.dateFormat = function (date) {
    if (!date) return '';
    var parts = date.split('-');
    if (parts.length !== 3) return date;
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  };

  /* keep the following line to return your filters to the app  */
  return filters;
};
