export type FillFields = string | number | boolean | string[] | OpenHours

export interface CafeStepsFields {
        step1: { isShow: boolean };
        step2: {
          category: string,
          otherDescription?: string,
          isShow: boolean,
        };
        step3: {
          isMember: string,
          position: string,
          isOpen:string,
          isShow: boolean,
        };
        step4: {
          email: string,
          password: string,
          isNotifyByEmail: boolean,
          isCertify: boolean,
          isShow: boolean,
        };
        step5: {
          establishmentName: string,
          legalEstablishmentName: string,
          website: string,
          shortDescription: string,
          phone: number,
          dialCode: number,
          countryCode: string,
          contactEmail: string,
          facebookLink: string,
          instagramLink: string,
          twitterLink: string,
          linkedinLink: string,
          isShow: boolean,
        };
        step6: {
          openHours: OpenHours | {},
          isShow: boolean,
        };
        step7: { isShow: boolean }
        step8: { isShow: boolean, isUpload: boolean, pictures: string[] };
        step9: { isShow: boolean };
        step10: {
          state: string,
          city: string,
          streetAddress: string,
          postalCode: string,
          isShow: boolean,
        };
        step11: {
          name: string,
          userPosition: string,
          userPhone: number,
          userDialCode: number,
          userCountryCode: string,
          isAgreeUser: boolean,
          isShow: boolean,
        };
        step12: { isShow: boolean };
        currentStep: number;
}

export interface OpenHours {
    Mon?: Time;
    Tue?: Time;
    Wed?: Time;
    Thu?: Time;
    Fri?: Time;
    Sat?: Time;
    Sun?: Time;

}

export interface Time {
    startTime?:string;
    endTime?:string;
}
export type OpenHoursIndexer = OpenHours & { [key: string]: Time }
