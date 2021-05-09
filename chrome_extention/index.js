"use strict";
var main = function () {
    var examples = getExamples();
    var text = createText(examples);
    createElement(text);
};
var getExamples = function () {
    var examples = [];
    var doc = document.getElementsByClassName('lang-ja')[0];
    var i = 0;
    while (true) {
        var example = doc.querySelector("#pre-sample" + i);
        var exampleText = example === null || example === void 0 ? void 0 : example.textContent;
        if (!exampleText)
            break;
        examples.push(exampleText);
        i++;
    }
    return examples;
};
var createText = function (examples) {
    var text = "";
    for (var i = 0; i < examples.length; i += 2) {
        text += "'" + examples[i] + "': '" + examples[i + 1] + "',\n";
    }
    return text.slice(0, -2) + '\n\n';
};
var createElement = function (text) {
    var part = "<div class=\"part\">\n    <section>\n      <h3>\n        \u30C6\u30B9\u30C8\u7528\u30B3\u30FC\u30C9\n        <span \n          class=\"btn btn-default btn-sm btn-copy\"\n          tabindex=\"0\"\n          id=\"sample-test-copy\"\n        >Copy</span>\n      </h3>\n      <pre>" + text.slice(0, -2) + "</pre>\n    </section>\n  </div>";
    var span = document.getElementsByClassName('lang-ja')[0];
    span.insertAdjacentHTML('beforeend', part);
    var copyButton = document.getElementById('sample-test-copy');
    copyButton.addEventListener('click', function () {
        copyText(text);
    });
};
var copyText = function (text) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    var copyButton = document.getElementById('sample-test-copy');
    copyButton.textContent = 'Copied!';
};
main();
