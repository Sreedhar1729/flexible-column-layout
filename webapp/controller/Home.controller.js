sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageBox, MessageToast,JSONModel) => {
    "use strict";

    return Controller.extend("com.sap.fiz.controller.Home", {
        onInit() {
           // Define menu items
        //    this.getView().getModel("layoutMod").setProperty("/layout","TwoColumnsMidExpanded");
           
    },
        onDeleteEmployee: function () {
            const oModel = this.getView().getModel(),
                oSelectedItems = this.byId("idEmployeeTable").getSelectedItems();
            if (oSelectedItems.length < 1) {
                return MessageBox.warning("Please Select at least one item for Deletion");
            }

            for (let Item of oSelectedItems) {
                let oPath = Item.getBindingContext().getPath();
                oModel.remove(oPath, {
                    success: function (odata) {
                        MessageToast.show("Deleted Successfully");
                    },
                    error: function () {
                        MessageToast.show("Error Occurs");

                    }
                })

            }
        },
        onEditEmployee:function(oEvent){
            var oPath = this.byId("idEmployeeTable").getSelectedItem().getBindingContext();
            // var oModel = this.getOwnerComponent().getModel();
            // var oContext = new sap.ui.model.Context(oModel, oPath);
            this.oDialogCall().then(() => {
                // Set the binding context for the dialog
                if (this.oDialog) {
                    this.oDialog.setBindingContext(oPath);
                    console.log(oPath);
                    this.oDialog.open();
                } else {
                    console.error("Dialog is undefined.");
                }
            });

        },
        oDialogCall:async function(){
            this.oDialog ??=await this.loadFragment({
                name:"com.sap.fiz.fragments.edit"
            })
            this.oDialog.open();
        },
        onBeforeRendering:function(){
            // this.onSecond();
        },
        onSecond:function(){
            this.getView().getModel("layoutMod").setProperty("/layout","TwoColumnsMidExpanded");
            this.getOwnerComponent().getRouter().navTo("RouteSecondPage");
        },
        onSelect: function(oEvent) {
            let oSelectedItem = oEvent.getParameter("listItem"),
                sLayout = oEvent.getParameter("layout");
            console.log(sLayout);
        
            if (oSelectedItem) {
                let oBinding = oSelectedItem.getBindingContext(),
                    oPath = oBinding.getPath();
                
                // Set layout for FlexibleColumnLayout
                this.getView().getModel("layoutMod").setProperty("/layout", "TwoColumnsMidExpanded");
                
                // Get router instance and navigate to SecondPage
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteSecondPage", { employeePath: oPath.substring(1) });
            }
        

        }
    });
});