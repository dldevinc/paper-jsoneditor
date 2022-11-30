import ace from "./ace.js";
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.js";

import "jsoneditor/dist/jsoneditor.css";
import "../css/widget.scss";

const Widget = window.paperAdmin.Widget;

class JsonWidget extends Widget {
    _init(element) {
        const textarea = this.getTextarea(element);
        if (!textarea) {
            throw new Error("textarea element not found");
        }

        const editor = this.createEditor(element);
        element._editor = editor;

        // Set editor value
        const contentString = textarea.textContent.trim();
        try {
            const content = JSON.parse(contentString);
            editor.set(content);
        } catch (e) {
            console.error(e);
            editor.setText(contentString);
        }
    }

    _destroy(element) {
        if (element._editor) {
            element._editor.destroy();
            element._editor = null;
        }

        const textarea = this.getTextarea(element);
        if (textarea) {
            textarea.hidden = false;
        }
    }

    getTextarea(element) {
        const textarea = element.nextElementSibling;
        return textarea.tagName === "TEXTAREA" ? textarea : null;
    }

    createEditor(element) {
        const textarea = element.nextElementSibling;
        const options = JSON.parse(textarea.dataset.options);

        const aceOptions = Object.assign({}, JSON.parse(textarea.dataset.aceOptions));

        const editorOptions = Object.assign(
            {
                ace: ace,
                onChangeText: jsonString => {
                    textarea.value = jsonString;
                }
            },
            options
        );
        const editor = new JSONEditor(element, editorOptions);

        editor.aceEditor.setOptions(aceOptions);

        return editor;
    }
}

const widget = new JsonWidget();
if (typeof widget.bind === "function") {
    // new-style widgets
    widget.bind(".json-field");
    widget.attach();
} else {
    // old-style widgets
    widget.initAll(".json-field");
    widget.observe(".json-field");
}
