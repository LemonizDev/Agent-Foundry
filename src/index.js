export { scanProject, classifyCapabilities } from "./project-scanner.js";
export { buildPlan, resourcesForPreset, applyPlan, validateInstallation, updateInstallation, uninstall } from "./installer.js";
export { loadRegistry, resolveResources } from "./registry.js";
export { classifyTask, selectModel, validateModelRoster } from "./model-router.js";

export { renderHostArtifacts, describeHostSupport } from "./host-adapters.js";
export { assertNoSymlinkPath } from "./utils.js";
