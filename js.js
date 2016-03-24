var qFormValidator = (function() {
    var patterns = {},
    elements = {};

    patterns.isNonEmpty = {
        validate: function(value) {
            return value != "";
        }
    }

    function validate(data, config, events) {
        var type,
            checker,
            result,
            i = 0
            callback = arguments[arguments.length-1];

        for (i; i < data.length; i++) {

            type = config[data[i].name];
            checker = patterns[type];

            if (!type) continue;
            if (!checker) {
                throw 'validate type is undefined';
            }

            result = checker.validate(data[i].value);
            elements[data[i].name] = data[i].value;

            if (result) {
                events.success(data[i]);
            } else {
                events.error(data[i]);
            }
        }
        callback(elements);

    }

    return validate;
})();

var form = document.forms[0];
var data = document.forms[0].elements;

var config = {
    name: 'isNonEmpty',
    email: 'isNonEmpty'
};

var events = {
    success: function(el) {
        el.className = 'success';
    },
    error: function(el) {
        el.className = 'error';
    }
}

form.onsubmit = function(e) {
    e.preventDefault();

    qFormValidator(data, config, events, function(result) {
        console.log(result);
    });
}