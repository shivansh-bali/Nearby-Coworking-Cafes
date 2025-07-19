import React, { useEffect } from "react";
import cx from "./PrivacyPolicy.module.scss";
import { Container, Col, Row } from "react-bootstrap";
import { aboutBlue, aboutorange } from "../../../assets/images";

const TermsandCondition = (props: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className={`${cx.bannerSection} ${cx.section_padding}`}>
        <Container>
          <Row>
            <Col
              md={10}
              lg={9}
              xl={9}
              xxl={9}
              className={`m-auto ${cx.contentBox}`}
            >
              <div className={`${cx.contentHeading}`}>
                <h1>Terms & Conditions</h1>
                <p>Effective: June 1, 2023</p>
              </div>
              <div className={`${cx.blogText}`}>
                <div className="col-md-12 position-relative">
                  <img
                    src={aboutBlue}
                    className={`${cx.shape1}`}
                    alt="aboutBlue"
                  />
                  <h5>Introduction</h5>
                  <p>
                    Sync Remote LLC, hereinafter referred to as "Sync" or "we,"
                    is the lawful proprietor and operator of a software platform
                    specifically designed to offer a wide range of services (the
                    “Services”). These Services encompass various
                    functionalities such as the dissemination of relevant
                    information regarding potential workspaces, recommendations
                    for suitable places to work, the offering of products that
                    may be of interest to users, and facilitating user-to-user /
                    user-to-business communication through chat functionality,
                    real-time location sharing, workspace preference sharing, as
                    well as the exchange of information or Content through the
                    platform. In the context of this Agreement, the terms "you"
                    and "your" shall refer to the Users of Sync, including both
                    individuals and businesses.
                  </p>
                  <p>
                    The term "Content" shall encompass any information, text,
                    links, graphics, photos, audio, videos, data, code, location
                    tracking, or other materials or arrangements of materials
                    that are accessible for viewing, accessing, or interacting
                    with through the Services.
                  </p>
                  <p>
                    The utilization of the Services is contingent upon your
                    unequivocal acceptance of the terms, conditions, and
                    notifications outlined hereinafter (collectively referred to
                    as this "Agreement"). By availing yourself of or engaging
                    with the Services, you willingly consent to be legally bound
                    by the provisions set forth within this Agreement. Moreover,
                    you assert that you have conscientiously perused and
                    comprehended the terms elucidated herein. It is of utmost
                    importance that you meticulously peruse this Agreement, as
                    it comprehensively delineates crucial details concerning
                    your legal entitlements, restrictions imposed upon these
                    entitlements, and a section elucidating the applicable law
                    and jurisdiction governing disputes.
                  </p>
                  <p>
                    We reserve the right to modify this Agreement in accordance
                    with its terms and conditions. By continuing to access or
                    use the Services after such changes, you indicate your
                    acceptance of the updated Agreement. Registered users of our
                    Services, referred to as "Account Holders," will be notified
                    of significant changes to these terms and conditions either
                    through email sent to the associated account or by
                    displaying a notice on our websites.
                  </p>
                  <p>
                    You hereby acknowledge and agree that the utilization of the
                    Services or entering into this Agreement does not create or
                    establish any joint venture, agency, partnership, or
                    employment relationship between you and Sync and/or its
                    corporate affiliates.
                  </p>
                </div>
                <h5>Modifying the Services and Termination</h5>
                <p>
                  We continuously strive to enhance and innovate our Services,
                  leading us to introduce new features, products, and
                  functionalities. Consequently, we reserve the right to add or
                  remove such elements, and we may even suspend or discontinue
                  the Services entirely. These actions can be taken at any time,
                  for any reason, and without prior notice to you.
                </p>
                <p>
                  In the event that you fail to comply with this Agreement or
                  the law, or due to circumstances beyond our control, we
                  maintain the authority to terminate or temporarily suspend
                  your access to the Services. This termination may include the
                  complete cessation of the Services or the imposition of new
                  limitations on your usage.For instance, we may deactivate your
                  account due to prolonged inactivity, or we may reclaim your
                  username at any time and for any reason. While we will make
                  efforts to provide reasonable notice in advance, we cannot
                  guarantee notice in every circumstance. To the maximum extent
                  permitted by applicable law, all provisions of this Agreement
                  shall remain in full force and effect even after you have
                  deleted your Sync account. Therefore, your actions and
                  interactions with the Services shall remain subject to
                  accountability indefinitely.
                </p>
                <div className="position-relative">
                  <img
                    src={aboutorange}
                    className={`${cx.shape2}`}
                    alt="aboutRange"
                  />
                  <h5>Use of Services</h5>
                  <p>
                    By using the Services provided by Sync Remote LLC, you agree
                    to the following conditions:
                  </p>

                  <ul>
                    <li>
                      <h5>Information Accuracy </h5>
                      <p>
                        You warrant that all information provided to Sync Remote
                        LLC via the Services is true, accurate, current, and
                        complete.
                      </p>
                    </li>
                    <li>
                      <h5>Age Requirement</h5>
                      <p>
                        You must be 13 years of age or older (or meet the older
                        age requirement if applicable in your jurisdiction) to
                        register for an account, use the Services, contribute to
                        our websites, and comply with all the terms and
                        conditions of this Agreement.
                      </p>
                    </li>
                    <li>
                      <h5>Legal Authority</h5>
                      <p>
                        You affirm that you have the legal authority to enter
                        into this Agreement and utilize the Services, including
                        our websites, in accordance with all the terms and
                        conditions stated herein.
                      </p>
                    </li>
                    <li>
                      <h5>Account Responsibility</h5>
                      <p>
                        (i) If you have an account, you are responsible for
                        safeguarding your account information and supervising
                        any use of your account by individuals other than
                        yourself.
                      </p>
                      <p>
                        (ii) If you hold an Account Holder status, you agree to
                        maintain up-to-date contact information.
                      </p>
                    </li>
                  </ul>
                  <p>
                    Sync Remote LLC respects the privacy and safety of
                    individuals under the age of 13 and does not knowingly
                    collect their information. We reserve the right, at our sole
                    discretion, to deny access to the Services to anyone, at any
                    time, and for any reason, including violations of this
                    Agreement. We also reserve the right to take steps to verify
                    your identity and Right to deny access to anyone.
                  </p>
                  <p>
                    For Business representatives creating a Sync account for
                    commercial purposes and accepting this Agreement on behalf
                    of a company, organization, or legal entity, it is necessary
                    to warrant and represent that the authority to do so has
                    been granted, enabling the binding of the said entity to
                    this Agreement.
                  </p>
                  <p>
                    We may provide various other services that may be subject to
                    additional terms or agreements. Should you choose to utilize
                    these additional services, the corresponding terms will be
                    made accessible to you and will be considered an integral
                    part of this Agreement, except in cases where the additional
                    terms explicitly exclude or supersede this Agreement. For
                    instance, if you intend to use or procure such additional
                    services for commercial or business purposes, your
                    acceptance of the applicable additional terms is mandatory.
                    In the event of any conflict between these terms and
                    conditions and any other terms, the additional terms shall
                    prevail over this Agreement specifically concerning those
                    particular services.
                  </p>
                  <h5>Content</h5>
                  <p>
                    By using this platform, you agree to grant Sync permissions
                    regarding your Content. These permissions include a
                    nonexclusive, royalty-free, perpetual, transferable,
                    irrevocable, and fully sublicensable right. Specifically,
                    the Sync has the right to host, use, reproduce, modify, run,
                    adapt, translate, distribute, publish, create derivative
                    works from, publicly display, and perform your Content
                    worldwide in any media, both now and in the future. You
                    understand and accept that the Content you provide is not
                    intended to be kept confidential or regarded as proprietary.
                    You confidently affirm, represent, and guarantee that you
                    are the rightful owner of the Content or possess the
                    required licenses, rights (including copyright and other
                    proprietary rights), consents, and permissions to authorize
                    the publication and usage of your Content by both yourself
                    and Sync Remote LLC, as outlined in this agreement.
                  </p>
                  <p>
                    Furthermore, Sync can make your Content available to others
                    and allow them to do the same. They may also utilize your
                    Content to provide, promote, and enhance their services.
                    This includes sharing your Content or information with other
                    companies, organizations, or individuals for syndication,
                    broadcast, distribution, promotion, or publication on other
                    media and services. These actions are subject to our Privacy
                    Policy and the terms outlined in this agreement.
                  </p>
                  <p>
                    Additionally,Sync has the right to use the name and/or
                    trademark associated with your Content. They may choose to
                    attribute your Content at their discretion. In the event of
                    a breach of this agreement,Sync has the authority to take
                    legal action against the violating party to protect your
                    rights and their own.
                  </p>
                  <p>
                    Please be aware that your Content is considered
                    non-confidential and non-proprietary. You confirm,
                    represent, and warrant that you either own the necessary
                    licenses, rights, consents, and permissions or are
                    authorized to publish and allowSync to use your Content as
                    described in this agreement.
                  </p>

                  <p>
                    If applicable, and to the extent permitted by applicable
                    law, you declare that you do not require any personally
                    identifying information to be associated with your Content
                    or any derivative works, upgrades, or updates. You also
                    state that you have no objections to the publication, use,
                    modification, deletion, and exploitation of your Content by
                    Sync or their licensees, successors, and assigns.
                    Additionally, you forever waive and refrain from claiming
                    any moral rights of an author in your Content. Lastly, you
                    release Sync and their licensees, successors, and assigns
                    from any claims related to moral rights that you may assert
                    against them.
                  </p>
                  <p>
                    By using the Services, including any products or services
                    facilitating the sharing of Content to or from third-party
                    sites, you acknowledge and accept that you are solely
                    responsible for any information shared with Sync. Access to
                    the Services is permitted solely through the provided
                    functionality and in compliance with this Agreement.
                  </p>
                  <p>
                    Sync Remote LLC reserves the right, at our sole discretion,
                    to remove, screen, translate, or edit any Content posted on
                    the Services without prior notice. This includes the ability
                    to delegate such actions to third parties.
                  </p>
                  <p>
                    Please be aware that certain Content available or accessible
                    through the Services may have commercial purposes. By
                    utilizing the Services, you explicitly acknowledge and
                    provide your consent to Sync Remote LLC's inclusion of
                    advertisements and promotional materials in conjunction with
                    your Content. These placements may appear alongside, in
                    proximity to, or in connection with your Content,
                    encompassing various formats such as videos or other dynamic
                    Content, both before, during, or after its presentation.
                    Moreover, these placements may also be associated with the
                    Content generated by other users.
                  </p>
                  <p>
                    Kindly note that Sync Remote LLC reserves the right to
                    periodically modify, revise, or terminate specific products
                    and features offered through the Services. You hereby agree
                    that Sync is not under any obligation to retain or preserve
                    your Content or any other information you submit, unless
                    specifically required by relevant legislation.
                  </p>
                  <p>
                    Neither we nor our affiliates assume responsibility or
                    liability for any Content created, uploaded, posted, sent,
                    received, or stored by you, another user, or a third party
                    on or through our Services.{" "}
                  </p>
                  <p>
                    You acknowledge and agree that you may be exposed to Content
                    that could be offensive, illegal, misleading, or otherwise
                    inappropriate, and neither we nor our affiliates shall be
                    held responsible for such Content. If you come across any
                    Content within our Services that you believe is
                    inappropriate, please notify us by sending an email with the
                    title “INAPPROPRIATE CONTENT” to admin@syncremote.co for our
                    review.
                  </p>
                  <p>
                    If you provide feedback or suggestions, please be aware that
                    we may utilize them without providing any compensation to
                    you, and without any restriction or obligation towards you.
                    By agreeing to this, you acknowledge and agree that we shall
                    be the sole owner of all rights pertaining to any materials
                    or items that we develop based on such feedback or
                    suggestions.
                  </p>
                  <h5>Third parties</h5>
                  <p>
                    The Services may include links to websites operated by
                    parties other than Sync Remote LLC. It's important to note
                    that Sync Remote LLC does not have control over these
                    websites and cannot be held accountable for their Content or
                    their privacy and operational practices. We highly recommend
                    that you carefully review the terms and conditions as well
                    as the privacy policies of these third-party sites. It is
                    essential to take necessary precautions and make decisions
                    based on your own judgment.
                  </p>
                  <p>
                    It is your sole responsibility to provide any additional
                    information required by these third parties and to bear the
                    consequences of doing so. Please be aware that the offering
                    of third-party products on our website does not imply any
                    endorsement or recommendation from Sync Remote LLC. You
                    understand and agree that Sync Remote LLC bears no
                    responsibility for the assessment or analysis of the
                    content, accuracy, completeness, availability, timeliness,
                    validity, copyright compliance, legality, decency, quality,
                    or any other aspect of such Third-Party Materials or
                    websites.
                  </p>
                  <p>
                    Sync Remote LLC is not liable for any payments made to
                    third-party companies. The responsibility for processing
                    your payments lies with the supplier and not with Sync
                    Remote LLC.
                  </p>

                  <h5>Prohibited activities</h5>
                  <p>
                    You expressly agree not to post or publish false, offensive,
                    illegal, or inappropriate Content through our Services. The
                    Content and information available on and through the
                    Services (including, but not limited to, messages, data,
                    information, text, music, sound, photos, graphics, video,
                    maps, icons, software, code or other material), as well as
                    the infrastructure used to provide such Content and
                    information, is proprietary to Sync or licensed to Sync by
                    third parties. For all Content other than your Content, you
                    agree not to otherwise modify, copy, distribute, transmit,
                    display, perform, reproduce, publish, license, create
                    derivative works from, transfer, or sell or re-sell any
                    information, software, products, or services obtained from
                    or through the Services.{" "}
                  </p>
                  <p>
                    You are strictly prohibited from utilizing the Services to
                    engage in activities such as bullying, harassing,
                    manipulating, or causing harm or suffering to other users.{" "}
                  </p>
                  <p>
                    You also agree not to use the Services, or enable anyone
                    else to use the Services, in a manner that violates or
                    infringes someone else’s rights of publicity, privacy,
                    copyright, trademark, or other intellectual property right.
                  </p>
                  <p>
                    You are prohibited from engaging in the following actions:
                    using the Services or Content for unauthorized commercial
                    purposes, accessing or exploiting Content without permission
                    through automated or manual means, circumventing access
                    restrictions or violating robot exclusion headers,
                    overburdening our infrastructure, deep-linking to our
                    Services without written consent, integrating our Services
                    into other websites without prior authorization, attempting
                    to reverse engineer our software, interfering with security
                    features or measures that restrict Content use, and
                    downloading Content not explicitly designated for download.
                  </p>
                  <p>
                    You expressly agree not to post, upload to, transmit,
                    distribute, store, create or otherwise publish through the
                    Services any Content of yours that it can be understood as
                    inappropriate, not related to the Services, illegal or
                    false.
                  </p>
                  <h5>Copyright</h5>
                  <p>
                    The trademarks, including Sync and its logo, ratings, as
                    well as all other product or service names or slogans
                    displayed on the Services, are registered or protected under
                    common law trademarks of Sync Remote LLC, its suppliers, or
                    licensors. It is strictly prohibited to copy, imitate, or
                    use them, whether in whole or in part, without obtaining
                    prior written permission from Sync Remote LLC or the
                    relevant trademark holder. Moreover, the overall appearance
                    and experience of the Services, including our websites,
                    along with all page headers, custom graphics, button icons,
                    and related scripts, constitute the trade dress, service
                    mark, and/or trademark of Sync Remote LLC. They are
                    protected and may not be copied, imitated, or used, whether
                    in whole or in part, without obtaining prior written
                    permission from Sync Remote LLC.
                  </p>
                  <p>
                    You understand that the Software provided within the
                    Services, including but not limited to all HTML, XML and
                    Java code is the property of Sync Remote LLC or licensed to
                    Sync Remote LLC. It is protected by copyright laws and
                    international treaties. Any form of reproduction or
                    redistribution of the Software is strictly prohibited and
                    may lead to serious civil and criminal consequences.
                    Individuals found in violation will be prosecuted to the
                    fullest extent permitted by law.
                  </p>
                  <p>
                    Without prior written permission from Sync Remote LLC,
                    engaging in unauthorized activities, including but not
                    limited to copying, transmitting, reproducing, replicating,
                    posting, or redistributing (a) Content or any part of it,
                    and/or (b) the Services in general, is strictly prohibited.
                    If you wish to obtain permission, please direct your
                    inquiries to admin@syncremote.co and wait for our review and
                    decision:{" "}
                  </p>
                  <p>
                    All rights reserved. Sync is not responsible for Content on
                    websites operated by parties other than Sync Remote LLC.
                  </p>
                  <h5>Liabilities </h5>

                  <ul>
                    <li>
                      <h5>User Conduct and Content:</h5>
                      <p>
                        (i) Sync shall not be held liable for any misconduct or
                        inappropriate behavior exhibited by any user on its
                        platforms. Sync reserves the right to remove Content or
                        messages, without notice, if it believes in good faith
                        that such Content breaches this Agreement or if the
                        removal is reasonably necessary to safeguard the rights
                        of Sync and/or other users of the Services.
                      </p>
                      <p>
                        (ii) Sync takes no responsibility and assumes no
                        liability for any Content posted, stored, transmitted,
                        or uploaded to the Services by you (in the case of your
                        Content) or any third party (in the case of any and all
                        Content more generally), or for any loss or damage
                        thereto. Sync is also not liable for any mistakes,
                        defamation, slander, libel, omissions, falsehoods,
                        obscenity, pornography, or profanity you may encounter.
                      </p>
                    </li>
                    <li>
                      <h5>Accuracy of Content:</h5>
                      <p>
                        (i) Sync shall not be held responsible for any errors or
                        inaccuracies in the Content provided on its platform.
                        While we strive to ensure the accuracy of the
                        information presented, occasional errors or omissions
                        may occur.
                      </p>
                      <p>
                        (ii) Sync reserves the right to correct any availability
                        and pricing errors that may occur on its platform. In
                        the event an error is identified, Sync will make
                        reasonable efforts to promptly rectify the situation.
                        However, Sync shall not be liable for any inconvenience,
                        loss, or damages arising from such errors.
                      </p>
                    </li>
                    <li>
                      <h5>Security and Third-Party Content:</h5>
                      <p>
                        (i) Sync disclaims all warranties that the information
                        transmitted through its services, including but not
                        limited to emails, attachments, or downloadable files,
                        is free of viruses or harmful components. Users are
                        responsible for implementing appropriate security
                        measures to protect their devices and systems.
                      </p>
                      <p>
                        (ii) Sync shall not be held responsible for any Content
                        provided by third parties, including but not limited to
                        reviews, recommendations, or advertisements. The
                        inclusion of such Content on the Sync platform does not
                        imply endorsement or guarantee of its accuracy,
                        reliability, or legality.
                      </p>
                    </li>
                    <li>
                      <h5>Services Provided by Third Parties:</h5>
                      <p>
                        (i) Sync shall not be held liable for any errors,
                        cancellations, overbookings, or any other issues arising
                        from the services provided by other companies or third
                        parties. Users are advised to independently review and
                        understand the terms and conditions of such services.
                      </p>
                    </li>
                    <li>
                      <h5>Limitation of Liability:</h5>
                      <p>
                        (i) Sync shall not be liable for any direct or indirect
                        consequences that may arise from the use of its
                        services. This includes, but is not limited to,
                        financial loss, personal injury, or any other damages
                        resulting from the use or inability to use Sync's
                        services.
                      </p>
                    </li>
                    <li>
                      <h5>Indemnification:</h5>
                      <p>
                        (i) Users agree to indemnify and hold Sync harmless from
                        any claims, demands, losses, liabilities, damages,
                        costs, and expenses (including attorney's fees) arising
                        out of or in connection with any breach of this
                        agreement by the user or any third-party claims arising
                        from the user's use of Sync's services.
                      </p>
                    </li>
                    <li>
                      <h5>User-Generated Content and Monitoring:</h5>
                      <p>
                        (i) Sync cannot review and monitor all user-generated
                        Content or activities on its platform. While Sync
                        reserves the right to remove or take action against any
                        Content that violates its terms of service, it does not
                        guarantee that all Content complies with its terms.
                        Users are advised to report any violations they come
                        across and to exercise their own judgment when using
                        Sync's services.
                      </p>
                    </li>
                  </ul>
                  <h5>Data Charges</h5>
                  <p>
                    You are solely responsible for any charges incurred on your
                    mobile device while using our Services, including but not
                    limited to text-messaging charges (such as SMS, MMS, or any
                    future protocols or technologies) and data charges. If you
                    are uncertain about the nature and amount of these charges,
                    it is advisable to consult your service provider before
                    utilizing the Services.
                  </p>
                  <p>
                    By providing us with your mobile phone number, you hereby
                    consent to receiving SMS messages from Sync pertaining to
                    the Services, which may include promotional Content,
                    information about your account, and updates regarding your
                    relationship with Sync. These SMS messages may be sent to
                    your mobile phone number even if it is registered on any
                    form of "Do Not Call" list or its international equivalent.
                  </p>
                  <h5>Jurisdiction and Governing Law</h5>
                  <p>
                    To the extent permitted by this Agreement, in the event of
                    any litigation initiated by either you or Sync, both parties
                    agree that all claims and disputes (including those arising
                    from contract, tort, or other legal theories) and including
                    statutory claims and disputes, relating to the Agreement or
                    the use of the Services, shall be exclusively litigated in
                    the United States District Court for the Northern District
                    of New York. However, if the aforementioned court lacks
                    original jurisdiction over the litigation, then all such
                    claims and disputes shall be exclusively litigated in the
                    Superior Court of New York. Both you and Sync hereby consent
                    to the personal jurisdiction of both courts. Nothing in this
                    clause shall limit the right of Sync Remote LLC to take
                    proceedings against you in any other court, or courts, of
                    competent jurisdiction.
                  </p>
                  <h5>California Residents</h5>
                  <p>
                    For residents of California, as mandated by Cal. Civ. Code §
                    1789.3, you have the right to file complaints with the
                    Complaint Assistance Unit of the Division of Consumer
                    Services of the California Department of Consumer Affairs.
                    Complaints can be submitted in writing to the following
                    address: 1625 North Market Blvd., Suite N 112 Sacramento, CA
                    95834. Alternatively, you may choose to contact them by
                    telephone at (800) 952-5210.
                  </p>
                  <h5>Service Help</h5>
                  <p>
                    For any inquiries or assistance that we may be able to
                    provide, please contact us via email at <a href="mailto:carlos.guisado@syncremote.co." style={{textDecoration:"none", color:"black"}}>carlos.guisado@syncremote.co.</a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TermsandCondition;
