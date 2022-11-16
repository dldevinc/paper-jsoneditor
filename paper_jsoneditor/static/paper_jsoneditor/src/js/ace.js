import * as ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-min-noconflict/mode-json";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import workerScript from "!!raw-loader!ace-builds/src-min-noconflict/worker-json";

const workerDataUrl = "data:application/javascript;base64," + btoa(workerScript);
ace.config.setModuleUrl("ace/mode/json_worker", workerDataUrl);

export default ace;
