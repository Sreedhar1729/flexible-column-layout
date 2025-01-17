sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/sap/fiz/model/models",
    "sap/ui/model/json/JSONModel"
], (UIComponent, models,JSONModel) => {
    "use strict";

    return UIComponent.extend("com.sap.fiz.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            //model for handling layout
            this.setModel(new JSONModel({ layout:"OneColumn"}),"layoutMod")
        }
    });
});