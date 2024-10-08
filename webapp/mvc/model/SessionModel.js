sap.ui.define(
  [
    // prettier 방지용 주석
    'sap/ui/time/common/AppUtils',
    'sap/ui/time/common/odata/Client',
    'sap/ui/time/common/odata/ServiceNames',
    'sap/ui/time/mvc/model/base/UIComponentBaseModel',
  ],
  (
    // prettier 방지용 주석
    AppUtils,
    Client,
    ServiceNames,
    UIComponentBaseModel
  ) => {
    'use strict';

    const DATE_FORMAT = 'yyyy.MM.dd';

    return UIComponentBaseModel.extend('sap.ui.time.mvc.model.SessionModel', {
      getInitialData() {
        return {
          Dtfmt: DATE_FORMAT,
          DtfmtYYYYMM: 'yyyy.MM',
          DtfmtYYYY: 'yyyy',
          DTFMT: DATE_FORMAT.toUpperCase(),
          DTFMTYYYYMM: 'YYYY.MM',
          DTFMTYYYY: 'YYYY',
          Werks: 'init',
          Photo: AppUtils.getUnknownAvatarImageURL(),
        };
      },

      async retrieve() {
        return this.read();
      },

      async read(sPernr) {
        try {
          const oModel = this.getUIComponent().getModel(ServiceNames.TMCOMMON);
          const mFilters = sPernr ? { Pernr: sPernr } : {}; // AppointeeModel용

          const aResults = Client.getEntitySet(oModel, 'TMEmpLoginInfo', mFilters);

          this.setData(this.curryData(await aResults), true);

          return Promise.resolve();
        } catch (oError) {
          return Promise.reject(oError);
        }
      },

      curryData([mSessionData = {}]) {
        delete mSessionData.__metadata;

        const Dtfmt = mSessionData.Dtfmt;
        if (Dtfmt && Dtfmt.length >= 8) {
          mSessionData.Dtfmt = Dtfmt.replace(/y/gi, 'y').replace(/m/gi, 'M').replace(/d/gi, 'd');
          mSessionData.DTFMT = Dtfmt.toUpperCase();
        } else {
          mSessionData.Dtfmt = DATE_FORMAT;
          mSessionData.DTFMT = DATE_FORMAT.toUpperCase();
        }
        mSessionData.DtfmtYYYYMM = mSessionData.Dtfmt.replace(/([a-zA-Z]{4})([^a-zA-Z]?)([a-zA-Z]{2}).*/, '$1$2$3');
        mSessionData.DtfmtYYYY = mSessionData.Dtfmt.replace(/([a-zA-Z]{4}).*/, '$1');
        mSessionData.DTFMTYYYYMM = mSessionData.DTFMT.replace(/([a-zA-Z]{4})([^a-zA-Z]?)([a-zA-Z]{2}).*/, '$1$2$3');
        mSessionData.DTFMTYYYY = mSessionData.DTFMT.replace(/([a-zA-Z]{4}).*/, '$1');
        mSessionData.Photo = mSessionData.Photo || AppUtils.getUnknownAvatarImageURL();
        mSessionData.Persa = 'II00';
        mSessionData.Pbtxt = '두산테스나';
        mSessionData.Werks = 'II00';

        return mSessionData;
      },
    });
  }
);
