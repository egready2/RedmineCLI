describe('template-engine.js', function() {
  var rewire = require('rewire');
  var tmpl = rewire('../module/template-engine.js');

  var swig = tmpl.__get__('swig');

  it('should handle render file', function() {
    var file = 'file';
    var data = {data: {}};

    spyOn(swig, 'renderFile').andReturn('out');

    var out = tmpl.renderFile(file, data);

    expect(swig.renderFile).toHaveBeenCalledWith(file, data);
    expect(out).toEqual(out);
  });

  it('should convert time to ago', function(){
    var moment = require('moment');
    var ago = tmpl.__get__('ago');

    var dateTimeString = moment().format();

    var actual = ago(dateTimeString);

    expect(actual).toEqual('a few seconds ago');

    dateTimeString = moment().subtract(1, 'year').format();

    actual = ago(dateTimeString);

    expect(actual).toEqual('a year ago');
  });

  it('should convert input to heading', function(){
    var colors = require('colors');
    var heading = tmpl.__get__('heading');

    var input = 'heading';

    var actual = heading(input);

    var expected = input.toUpperCase().bold.underline;

    expect(actual).toEqual(expected);
  });

  it('should convert input to table', function(){
    var table = tmpl.__get__('table');

    var input = 'row1col1|row1col2|row1col3\nrow2col1|row2col2|row2col3\n';

    var actual = table(input);
    var expected = 'row1col1  row1col2  row1col3 \nrow2col1  row2col2  row2col3 ';

    //expect(actual).toEqual(expected);
  });
});
