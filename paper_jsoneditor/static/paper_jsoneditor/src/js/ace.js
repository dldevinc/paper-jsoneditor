import * as ace from "ace-builds/src-noconflict/ace.js";
import "ace-builds/src-min-noconflict/mode-json.js";
import "ace-builds/src-min-noconflict/ext-searchbox.js";
import "ace-builds/src-min-noconflict/ext-language_tools.js";
import workerScript from "!!raw-loader!ace-builds/src-min-noconflict/worker-json.js";

const workerDataUrl = "data:application/javascript;base64," + btoa(workerScript);
ace.config.setModuleUrl("ace/mode/json_worker", workerDataUrl);

export default ace;
