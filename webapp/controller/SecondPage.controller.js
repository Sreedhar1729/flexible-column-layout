sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (BaseController) => {
    "use strict";

    return BaseController.extend("com.sap.fiz.controller.SecondPage", {
        onInit() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Attach the pattern matched event to the route
            oRouter.getRoute("RouteSecondPage").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function(oEvent) {
            var sPath = oEvent.getParameter("arguments").employeePath;

            if (sPath) {
                // Load data based on the sPath
                this._loadEmployeeData(sPath);
            } else {
                console.error("No employee path provided in route arguments.");
            }
        },

        _loadEmployeeData: function(sPath) {
            if (sPath.charAt(0) !== '/') {
                sPath = '/' + sPath;
            }
            var oModel = this.getView().getModel();
            oModel.read(sPath, {
                success: (oData) => {
                    // Handle successful data retrieval
                    this._updateView(oData);
                },
                error: (oError) => {
                    // Handle error in data retrieval
                    console.error("Error loading employee data:", oError);
                }
            });
        },

        _updateView: function(oData) {
            this.getView().getModel().setProperty("/Employee", oData);
            this.getView().byId("idEmployeeID").setText(oData.EmployeeID);
            this.getView().byId("idLastName").setText(oData.LastName);
            this.getView().byId("idFirstName").setText(oData.FirstName);
            this.getView().byId("idTitleOfCourtesy").setText(oData.TitleOfCourtesy);
            this.getView().byId("idAddress").setText(oData.Address);
            this.getView().byId("idCity").setText(oData.City);
            this.getView().byId("idRegion").setText(oData.Region);
            this.getView().byId("idPostalCode").setText(oData.PostalCode);
            this.getView().byId("idCountry").setText(oData.Country);
        }
    });
});
