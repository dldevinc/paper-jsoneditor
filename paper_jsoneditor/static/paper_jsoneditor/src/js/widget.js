/* global XClass */
import ace from "./ace.js";
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.js";

import "jsoneditor/dist/jsoneditor.css";
import "../css/widget.scss";

XClass.register("paper-jsonfield", {
    init: function (element) {
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
    },
    destroy: function (element) {
        if (element._editor) {
            element._editor.destroy();
            element._editor = null;
        }

        const textarea = this.getTextarea(element);
        if (textarea) {
            textarea.hidden = false;
        }
    },

    getTextarea: function (element) {
        const textarea = element.nextElementSibling;
        return textarea.tagName === "TEXTAREA" ? textarea : null;
    },

    createEditor: function (element) {
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
});
