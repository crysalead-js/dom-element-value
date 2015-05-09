var jsdom = require("jsdom");
var domify = require("component-domify");

global.document = jsdom.jsdom();
global.window = global.document.parentWindow;

var domValue = require("..");

describe(".type()", function() {

  it('returns the DOM element type', function() {

    expect(domValue.type(document.createElement("div"))).toBe("div");
    expect(domValue.type(domify('<input type="checkbox">'))).toBe("checkbox");
    expect(domValue.type(domify('<input type="radio">'))).toBe("radio");
    expect(domValue.type(domify('<input type="text">'))).toBe("text");
    expect(domValue.type(domify('<input>'))).toBe("text");
    expect(domValue.type(domify('<select></select>'))).toBe("select");
    expect(domValue.type(domify('<select multiple="multiple"></select>'))).toBe("select-multiple");
    expect(domValue.type(domify('<textarea>'))).toBe("textarea");

  });

});

describe(".value()", function() {

  describe("using text inputs", function() {

    it("gets/sets a value", function() {

      var input = domify('<input type="text">');

      expect(domValue(input)).toBeFalsy();
      expect(domValue(input, "Hello World")).toBe("Hello World");
      expect(domValue(input)).toBe("Hello World");

    });

  });

  describe("using textareas", function() {

    it("gets/sets a value", function() {

      var input = domify("<textarea></textarea>");

      expect(domValue(input)).toBeFalsy();
      expect(domValue(input, "Hello World")).toBe("Hello World");
      expect(domValue(input)).toBe("Hello World");

    });

  });

  describe("checkboxes", function() {

    it("gets/sets a boolean value", function() {

      var input = domify('<input type="checkbox">');

      expect(domValue(input)).toBe(false);
      expect(domValue(input, true)).toBe(true);
      expect(domValue(input)).toBe(true);
      expect(input.checked).toBe(true);

    });

    it("gets/sets a value", function() {

      var input = domify('<input type="checkbox" value="hello">');

      expect(domValue(input)).toBe(false);
      expect(domValue(input, true)).toBe(true);
      expect(domValue(input)).toBe("hello");
      expect(input.checked).toBe(true);

    });

    it("unsets checkboxes", function() {

      var input = domify('<input type="checkbox" checked="checked">');

      expect(domValue(input)).toBe(true);
      expect(domValue(input, false)).toBe(false);
      expect(domValue(input)).toBe(false);
      expect(input.checked).toBe(false);

    });

  });

  describe("radios", function() {

    it("gets/sets a boolean value", function() {

      var input = domify('<input type="radio">');

      expect(domValue(input)).toBe(false);
      expect(domValue(input, true)).toBe(true);
      expect(domValue(input)).toBe(true);
      expect(input.checked).toBe(true);

    });

    it("gets/sets a value", function() {

      var input = domify('<input type="radio" value="hello">');

      expect(domValue(input)).toBe(false);
      expect(domValue(input, true)).toBe(true);
      expect(domValue(input)).toBe("hello");
      expect(input.checked).toBe(true);

    });

    it("unsets radios", function() {

      var input = domify('<input type="radio" checked="checked">');

      expect(domValue(input)).toBe(true);
      expect(domValue(input, false)).toBe(false);
      expect(domValue(input)).toBe(false);
      expect(input.checked).toBe(false);

    });

  });

  describe("selects", function() {

    describe("with a simple select", function() {

      it("returns the first option value by default", function() {

        var select = domify('<select><option value="a"></option><option value="b"></option></select>');
        expect(domValue(select)).toBe("a");

      });

      it("returns the first the selected value", function() {

        var select = domify('<select><option value="a"></option><option value="b" selected="selected"></option></select>');
        expect(domValue(select)).toBe("b");

      });

      it('gets/sets an option', function() {

        var select = domify('<select><option value="a"></option><option value="b"></option></select>');

        expect(domValue(select)).toBe("a");
        expect(domValue(select, "a")).toBe("a");
        expect(domValue(select)).toBe("a");
        expect(select.options[0].selected).toBe(true);

      });

    });

    describe("with multiple select", function() {

      it("returns the first option value by default", function() {

        var select = domify('<select multiple="multiple"><option value="a"></option><option value="b"></option></select>');
        expect(domValue(select)).toEqual([]);

      });

      it("returns the first the selected value", function() {

        var select = domify('<select multiple="multiple"><option value="a"></option><option value="b" selected="selected"></option></select>');
        expect(domValue(select)).toEqual(["b"]);

      });

      it('gets/sets some options', function() {

        var select = domify('<select multiple="multiple"><option value="a"></option><option value="b"></option></select>');

        expect(domValue(select)).toEqual([]);
        expect(domValue(select, "a")).toEqual(["a"]);
        expect(domValue(select)).toEqual(["a"]);

        expect(domValue(select, "b")).toEqual(["b"]);
        expect(domValue(select)).toEqual(["b"]);

        expect(domValue(select, ["a", "b"])).toEqual(["a", "b"]);
        expect(domValue(select)).toEqual(["a", "b"]);

      });

    });

  });

});
