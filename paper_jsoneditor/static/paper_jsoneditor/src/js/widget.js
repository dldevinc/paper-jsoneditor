import JSONEditor from "jsoneditor";

import "jsoneditor/dist/jsoneditor.min.css";
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
        const aceOptions = JSON.parse(textarea.dataset.aceOptions);

        const editorOptions = Object.assign(
            {
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
widget.observe(".json-field");
widget.initAll(".json-field");
