sap.ui.define([
  "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (BaseController,JSONModel) => {
  "use strict";

  return BaseController.extend("com.sap.fiz.controller.App", {
      onInit() {
      //   var oLayoutModel = new JSONModel({
      //     layout: "OneColumn" // Initial layout
      // });
      // this.getView().setModel(oLayoutModel, "layoutMod");
  },

  // // Example method to change layout
  // setLayout: function(sLayout) {
  //     this.getView().getModel("layoutMod").setProperty("/layout", sLayout);
  // }
});
});