sap.ui.define(
    [
      // prettier 방지용 주석
      'sap/ui/time/mvc/model/SessionModel',
    ],
    (
      // prettier 방지용 주석
      SessionModel
    ) => {
      'use strict';
  
      return SessionModel.extend('sap.ui.time.mvc.model.AppointeeModel', {
        constructor: function (oUIComponent) {
          SessionModel.call(this, oUIComponent);
  
          this.setProperty('/showChangeButton', false);
          this.setProperty('/showBarChangeButton', false);
        },
  
        async retrieve() {
          return this.cloneSessionData();
        },
  
        async cloneSessionData() {
          const oSessionModel = this.getUIComponent().getSessionModel();
  
          await oSessionModel.getPromise();
  
          const oSessionData = oSessionModel.getData();
          this.setData({ ...oSessionData }, true);
        },
      });
    }
  );