// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';

import * as S from './styles';

const PrivacyAndPolicyScreen = () => (
  <ScreenPage withTopBar withFooter withHeader theme="SYSTEM">
    <S.Wrap>
      <h2>Privacy</h2>

      <p>
        This is where you can find out how WeKnow (“WeKnow”, “we”, “us”, “our”) collects, stores,
        protects and shares data about you (“Policy”). It’s best read alongside our WeKnow Terms and Conditions,
        which you can find <Link to='/terms-and-conditions'>here</Link>.
      </p>
      <p>
        When you’re using our WeKow online platform (&quot;site&quot;), there is some information we collect
        about you, and you can share your information on the site with other users (&quot;Users&quot;). The Policy
        is intended to meet our duties of transparency under the “General Data Protection Regulation” or
        “GDPR”.
      </p>

      <h2>1. Collection of information</h2>

      <h3>Registration Information</h3>
      <p>
        Access to WeKnow is granted through various means of your choice: your Google account or
        your email.
      </p>
      <p>
        If you connect through Google, we will collect information about you from Google (as
        applicable), including an email address, full name and a unique ID (which allows Google to
        identify you as a legitimate user of the account).
      </p>

      <h3>Selfie Data</h3>
      <p>
        During our onboarding process, so that we can check whether your account is legitimate, we ask
        you to take a selfie, which is processed by a third-party provider. If the third-party system flags
        anything that may mean the photo is not of a real person (or that you do not meet the criteria
        required to be a member), the photo is then passed back to our team to review.
      </p>

      <h3>Log and Usage Data</h3>
      <p>
        Our servers automatically record information (&quot;Log and Usage Data&quot;) created by your use of
        WeKnow, which again helps us to improve our service. Log and Usage Data may include
        information such as your IP address, browser type, the referring domain, pages visited, access
        times, your mobile carrier, unique device identifier, device model, operating system, MAC
        address and search terms.
      </p>

      <h3>Marketing and Communications Data</h3>
      <p>
        We also collect information on your preferences in receiving marketing from us and your
        communication preferences (“Marketing and Communications Data”).
      </p>

      <h3>Behavioral Data</h3>
      <p>
        We collect “Behavioral Data”, which is inferred or assumed information relating to your
        behavior and interests, based on your online activity. This is most often collated and grouped
        into “segments” (e.g., there may be a segment for women, living in New York and aged under
        35, who like contemporary art).
      </p>

      <h3>Your Content Data</h3>
      <p>
        You can post content on the website and/or participate in chats through it. This content may
        contain personal data, but only what you choose to disclose.
      </p>

      <h3>Aggregated Data</h3>
      <p>
        We also collect, use and share “Aggregated Data” such as statistical or demographic data for any
        purpose. Aggregated Data may be derived from your personal data, but once in aggregated form
        it will not constitute considered personal data for the purposes of the GDPR as this data does not
        directly or indirectly reveal your identity. However, if we combine or connect Aggregated Data
        with your personal data so that it can directly or indirectly identify you, we treat the combined
        data as personal data which will be used in accordance with this Policy.
      </p>

      <h3>No Special Categories of Personal Data</h3>
      <p>
        We do not collect any “Special Categories of Personal Data” about you (this includes details
        about your race or ethnicity, religious or philosophical beliefs, sex life, sexual orientation,
        political opinions, trade union membership, information about your health and genetic and
        biometric data). Nor do we collect any information about criminal convictions and offences.
        However, you have the option of providing such information in your profile or in any
        information you publish on our site, for instance by sharing your sexual orientation with other
        users. Please do not submit any Special Categories of Personal Data if you are not happy for such
        information to be shared publicly on your WeKnow account.
      </p>

      <h2>2. Uses made of the information</h2>
      <p>
        We will only use your personal data for the purposes for which we collected it as listed below,
        unless we reasonably consider that we need to use it for another reason and that reason is
        compatible with the original purpose.
      </p>
      <p>
        If we need to use your personal data for an unrelated purpose, we will update this Policy and we
        will explain the legal basis which allows us to do so.
      </p>

      <h3>What is our “legal basis” for processing your Personal Data?</h3>
      <p>
        In respect of each of the purposes for which we use your personal data, the GDPR requires us to
        ensure that we have a “legal basis” for that use. Most commonly, we will rely on one of the
        following legal bases:
      </p>
      <ul>
        <li>
          Where we need to perform a contract we are about to enter into or have entered into with
          you (“Contractual Necessity”).
        </li>
        <li>
          Where it is necessary for our legitimate interests and your interests and fundamental
          rights do not override those interests (“Legitimate Interests”). More detail about the
          specific legitimate interests pursued in respect of each purpose we use your personal data
          for is set out in the table below.
        </li>
        <li>
          Where we need to comply with a legal or regulatory obligation (“Compliance with
          Law”).
        </li>
        <li>
          Where we have your specific consent to carry out the processing for the purpose in
          question (“Consent”).
        </li>
      </ul>
      <p>
        Generally, we do not rely on your Consent as a legal basis for using your personal data other
        than in the context of direct marketing communications.
      </p>
      <p>
        We have set out below, in a table format, the legal bases we rely on in respect of the relevant
        Purposes for which we use your Personal Data.
      </p>

      <table className="full-width">
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Categories of personal data involved</th>
            <th>Why do we do this</th>
            <th>Our legal basis for this use of data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              Account Creation and Management
            </td>
            <td>
              <ul>
                <li>Registration Information</li>
                <li>Selfie Data</li>
                <li>Log and Usage Data</li>
                <li>Your Content Data</li>
              </ul>
            </td>
            <td>
              To register you as a new
              customer, and offer you
              our services and features,
              and to allow you to
              participate in interactive
              features of our service,
              when you choose to do so.
              To notify you about
              changes to our service.
            </td>
            <td>
              Contractual Necessity.
            </td>
          </tr>

          <tr>
            <td>
              Customer Moderation
            </td>
            <td>
              <ul>
                <li>Registration Information</li>
                <li>Selfie Data</li>
                <li>Log and Usage Data</li>
                <li>Your Content Data</li>
              </ul>
            </td>
            <td>
              To allow our moderators
              to ensure that Users’
              behavior accords with our
              rules and restrictions
              (including our Community
              Guidelines) by reviewing
              the online content posted
              on the Site and/or
              investigating complaints,
              and to take remedial action
              if it does not. Legitimate
              Interests.
            </td>
            <td>
              It is in our legitimate
              interest that the Site
              remains safe for you,
              trustworthy and that
              Users do not abuse our
              services for purposes in
              breach of our Terms of
              Use or Community
              Guidelines.
            </td>
          </tr>

          <tr>
            <td>
              Support
            </td>
            <td>
              <ul>
                <li>Registration Information</li>
              </ul>
            </td>
            <td>
              To respond to any
              inquiries you raise when
              you contact us directly.
            </td>
            <td>
              Legitimate Interests.
              We have a legitimate
              interest in providing
              you with support
              services and answering
              your queries, so that we
              can improve our Site
              and related services.
            </td>
          </tr>

          <tr>
            <td>
              Troubleshooting and Site Development
            </td>
            <td>
              <ul>
                <li>Log and Usage Data</li>
                <li>Behavioral Data</li>
              </ul>
            </td>
            <td>
              To track issues that might
              be occurring on our systems. To carry out
              internal operations such as
              data analysis, testing,
              research or for statistical
              purposes.
            </td>
            <td>
              Legitimate Interests. It
              is in our legitimate
              interests that we are
              able to monitor and
              ensure the proper
              operation of our Site
              and associated systems
              and services.
            </td>
          </tr>

          <tr>
            <td>
              Marketing
            </td>
            <td>
              <ul>
                <li>Registration Information</li>
                <li>Marketing and Communications Data</li>
                <li>Behavioral Data</li>
              </ul>
            </td>
            <td>
              To contact you with
              information about the Site
              subject to the “Marketing”
              section below.
            </td>
            <td>
              Consent.
            </td>
          </tr>

          <tr>
            <td>
              Geolocation
            </td>
            <td>
              <ul>
                <li>Geolocation Information</li>
              </ul>
            </td>
            <td>
              To personalize the Site and
              make it easier for you to
              interact with other Users
              close by
            </td>
            <td>
              Consent.
            </td>
          </tr>

          <tr>
            <td>
              Protecting our Legal Rights
            </td>
            <td>
              <ul>
                <li>Registration Information</li>
                <li>Selfie Data</li>
                <li>Log and Usage Data</li>
              </ul>
            </td>
            <td>
              To protect our legal rights,
              and to enforce our Terms
              of Use.
            </td>
            <td>
              Legitimate Interests.
              We have a legitimate
              interest in ensuring that
              you comply with your
              obligations under the
              contract between you
              and us, so that we can
              appropriately provide
              you and other Users
              our services.
            </td>
          </tr>
        </tbody>
      </table>

      <h3>What happens when you do not provide necessary personal data?</h3>
      <p>
        Where we need to process your personal data either to comply with law, or to perform the terms
        of a contract we have with you and you fail to provide that data when requested, we may not be
        able to perform the contract we have or are trying to enter into with you (for example, to provide
        you with the functionalities of or access to the Site).
      </p>
      <p>
        In this case, we may have to stop you using our Site but we will notify you if this is the case at
        the time.
      </p>

      <h2>3. Disclosure of your information</h2>
      <p>
        We will not disclose your information, except in the limited circumstances described here:
      </p>
      <ul>
        <li>
          <strong>Service Providers</strong> — We engage certain trusted third parties to perform IT and system
          administration functions and services. We may share your Registration Information and
          Log and Usage Data with these third parties, but only for the purposes of performing
          these functions and providing such services.
        </li>
        <li>
          <strong>Regulators and Public Authorities</strong> — We will cooperate with law enforcement
          enquiries received from within or outside your country of residence. This may include
          preserving or disclosing any of your personal data, including your Registration
          Information, if it is necessary to comply with a law or regulation, or to comply with a
          judicial proceeding, court order, or legal request, to protect the safety of any person, or to
          address fraud or security issues. Such Regulators or Public Authorities may be located
          both within or outside the United States
        </li>
        <li>
          <strong>Business Transfers</strong> — In the event that WeKnow or any of our affiliates are involved in
          a bankruptcy, merger, acquisition, reorganization or sale of assets, your information may
          be transferred as part of that transaction.
        </li>
        <li>
          <strong>Professional Advisers</strong> — We may transfer your Registration Data to our lawyers,
          bankers, auditors and insurers and other advisers who provide consultancy, banking,
          legal, insurance and accounting services. Such Professional Advisers may be located in
          the United States.
        </li>
      </ul>

      <h2>4. Where we store your personal data</h2>
      <p>
        Many of our external third parties are based inside of the United States.
      </p>
      <p>
        We endeavor to ensure that people to whom we provide personal data hold it subject to
        appropriate safeguards and controls.
      </p>

      <h2>5. Marketing</h2>
      <p>
        We will not send you any marketing materials. However, we may send you emails which are
        necessary for us to provide our services, or to announce any update of our Site or <Link to='/terms-and-conditions'>Terms of
        service</Link> for instance.
      </p>

      <h2>6. What others see about you</h2>
      <p>
        WeKnow is designed to make it easier for you to connect with other Users and to interact with
        them. Other Users of the Site will see:
      </p>
      <ul>
        <li>
          General WeKnow-submitted information:
          <ul>
            <li>your Content Data;</li>
            <li>Photo and other images you upload;</li>
            <li>First Name;</li>
            <li>Generalized location (city/state);</li>
            <li>Location;</li>
            <li>
              if you choose to share it:
              <ul>
                <li>bio information</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          Third party profile information:
          <ul>
            <li>
              If you login to the Site using your Google account, other Users will be able to see
              your name.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        Such other Users may therefore share your profile information with individuals who may or may
        not be Users or via third party applications. So, please be careful about what permissions you
        grant through the Site and what you post, particularly when it relates to your children. We want
        to keep you safe, but we need you to help us.
      </p>

      <h2>7. Our Policy Towards Age</h2>
      <p>
        Our Site is for adults. You have to be at least 18 years old to use the Site. We don’t market to
        anyone under the age of 18 either. If we discover you’re under 18, we will delete your account,
        sorry but we’re looking forward to welcoming you soon!
      </p>

      <h2>8. Removing WeKnow access</h2>
      <p>
        If you want to remove WeKnow from your Google account at any time you can do this by
        visiting the application settings on your Google profile (as applicable) and following the
        instructions to remove WeKnow access permissions.
      </p>
      <p>
        Even after you remove information from your profile or delete your Account, copies of that
        information may still be viewable and/or accessed to the extent such information has been
        previously shared with others, made public by you during your use of the Site, or copied or
        stored by other Users or to the extent such information has been shared with search engines. We
        cannot control this, nor do we accept any liability for this. The Site may also include links to
        third-party websites, plug-ins and applications. Clicking on those links or enabling those
        connections may allow third parties to collect or share your personal data. We do not control
        these third-party websites and are not responsible for their privacy statements. If you have given
        third party applications or websites access to your personal data, they may retain such
        information to the extent permitted under their terms of service or privacy policies.
      </p>

      <h2>9. Your Rights Relating to Your Personal Data</h2>
      <p>
        By law you have the right to:
      </p>
      <ul>
        <li>
          <strong>Request access to your personal data.</strong> This enables you to receive a copy of the
          personal data we hold about you and to check that we are lawfully processing it.
        </li>
        <li>
          <strong>Request correction of the personal data that we hold about you.</strong> This enables you to
          have any incomplete or inaccurate information we hold about you corrected.
        </li>
        <li>
          <strong>Request erasure of your personal data.</strong> This enables you to ask us to delete or remove
          personal data where there is no good reason for us continuing to process it. You also have
          the right to ask us to delete or remove your personal data where you have exercised your
          right to object to processing (see below).
        </li>
        <li>
          <strong>Object to processing of your personal data.</strong> This right exists where we are relying on a
          Legitimate Interest as the legal basis for our processing and there is something about your
          particular situation, which makes you want to object to processing on this ground. You
          also have the right to object where we are processing your personal data for direct
          marketing purposes.
        </li>
        <li>
          <strong>Request the restriction of processing of your personal data.</strong> This enables you to ask us
          to suspend the processing of personal data about you, for example if you want us to
          establish its accuracy or the reason for processing it.
        </li>
        <li>
          <strong>Request the transfer of your personal data.</strong> We will provide to you, or a third party
          you have chosen, personal data in a structured, commonly used, machine-readable
          format. Note that this right only applies to automated information which you initially
          provided consent for us to use or where we used the information to perform a contract
          with you.
        </li>
        <li>
          <strong>Withdraw consent.</strong> This right only exists where we are relying on consent to process
          your personal data (“Consent Withdrawal”). If you withdraw your consent, we may not
          be able to provide you with access to the certain specific functionalities of our Site. We
          will advise you if this is the case at the time you withdraw your consent.
        </li>
      </ul>

      <h3>How to exercise your rights</h3>
      <p>
        If you want to exercise any of the rights described above, please contact us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>
      </p>
      <p>
        Typically, you will not have to pay a fee to access your personal data (or to exercise any of the
        other rights). However, except in relation to Consent Withdrawal, we may charge a reasonable
        fee if your request is clearly unfounded, repetitive or excessive, or, we may refuse to comply
        with your request in these circumstances.
      </p>
      <p>
        We may need to request specific information from you to help us confirm your identity and
        ensure your right to access your personal data (or to exercise any of your other rights). This is a
        security measure to ensure that personal data is not disclosed to any person who has no right to
        receive it. We may also contact you to ask you for further information in relation to your request
        to speed up our response.
      </p>
      <p>
        We try to respond to all legitimate requests within one month. Occasionally it may take us longer
        than a month if your request is particularly complex or you have made a number of requests. In
        this case, we will notify you and keep you updated.
      </p>

      <h3>Complaints</h3>
      <p>
        If you would like to make a complaint regarding this Policy or our practices in relation to your
        personal data, please contact us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>
      </p>
      <p>
        We will reply to your complaint as soon as we can.
      </p>
      <p>
        If you feel that your complaint has not been adequately resolved, please note that the GDPR
        gives you the right to contact your local data protection supervisory authority.
      </p>

      <h2>10. How we keep your personal data secure</h2>
      <p>
        We have put in place appropriate security measures to prevent your personal data from being
        accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
      </p>
      <p>
        We limit access to your personal data to those employees and other staff who have a business
        need to have such access. All such people are subject to a contractual duty of confidentiality.
      </p>
      <p>
        We have put in place procedures to deal with any actual or suspected personal data breach. In the
        event of any such breach, we have systems in place to work with applicable regulators. In
        addition, in certain circumstances (e.g., where we are legally required to do so) we may notify
        you of breaches affecting your personal data.
      </p>

      <h2>11. Changes to our privacy policy</h2>
      <p>
        We may revise this Policy from time to time. If we make a change to this Policy that, in our sole
        discretion, is material, we will notify you, for example, via an email. The revised Policy will
        apply from the date on which we post it on this page.
      </p>

      <h2>12. Cookies</h2>
      <p>
        We collect information by placing cookies on your mobile or desktop. A cookie is a piece of text
        stored on your computer or mobile by your web browser. We may use both session cookies
        (which expire once you close your web browser) and persistent cookies (which stay on your
        computer or mobile device until you delete them) to provide you with a more personal and
        interactive experience on our Site.
      </p>
      <p>
        We use two broad categories of cookies:
      </p>
      <ul>
        <li>
          first party cookies, served directly by us to your computer or mobile device;
        </li>
        <li>
          third party cookies, which are served by our partners or service providers on our Site.
        </li>
      </ul>
      <p>
        We use cookies for a number of reasons, as explained below:
      </p>

      <table>
        <thead>
          <tr>
            <th>
              Cookie Functions
            </th>
            <th>
              Cookie Purposes
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Analytics and research
            </td>
            <td>
              We use Google Analytics to collect information about how visitors use the
              WeKnow site. We use the information to compile reports and to help us
              improve the site and the Site. The cookies collect information in an
              anonymous form, including the number of visitors to the site, where visitors
              have come to the site from and the pages they visited.
              <br />
              We use Google Analytics for this purpose. Google Analytics uses its own
              cookies. It is only used to improve how our site works. You can find out more
              information about Google Analytics cookies <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage">here</a>
            </td>
          </tr>
          <tr>
            <td>
              Authentication
            </td>
            <td>
              These cookies help us to identify visitors so that when you’re logged in, you
              can enjoy WeKnow offerings and customize your experience, such as when
              you’ve requested to view WeKnow in your local language or when you’ve
              asked WeKnow to ‘remember me’.
            </td>
          </tr>
          <tr>
            <td>
              Security and integrity
            </td>
            <td>
              We use cookies and other devices, such as CAPTCHAs, to help keep the Site
              and our visitors safe and secure. These cookies do things like protect visitors
              from spam and fraud, by ensuring the safety of personal data.
              <br />
              We may use persistent cookies, which will help us to ensure we have
              identified the same device is logging into the correct account. These types of
              cookies also help with our anti-spam measures and may help us to prevent
              phishers, scammers and other unauthorized activity.
            </td>
          </tr>
          <tr>
            <td>
              Site features and services
            </td>
            <td>
              These cookies and local storage devices provide functionalities such as links to
              other social media sites and social plugins. In some cases, the Site feature you
              choose may allow a third party to place cookies or local storage devices on
              your computer. The third party who places cookies on your device is
              responsible for how they process their data and WeKnow recommends that
              you read their privacy policies. Third parties who place cookies on your device
              when you use WeKnow include the following, and we have included a link to
              the privacy policies of <a href="https://www.facebook.com/about/privacy/your-info-on-other">Facebook</a> and <a href="https://policies.google.com/privacy?hl=en&gl=uk">Google</a>
            </td>
          </tr>
          <tr>
            <td>
              Performance
            </td>
            <td>
              We need to use certain cookies and local storage devices to ensure our visitors
              have the best possible experience. These may, for example, assist with your
              navigation of our site, ensure pages load up quickly and respond faster to your
              requests for the site’s services. Without these cookies, the services that you
              have asked for cannot be provided, and we only use these cookies to provide
              you with those services.
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Our use of cookies and local share devices, including the specific cookie names, may change
        over time, but will generally fall into the above categories. Please visit this page regularly so that
        you are aware of any changes.
      </p>

      <h3>Disabling cookies</h3>
      <p>
        You can typically remove or reject cookies via your browser settings. In order to do this, follow
        the instructions provided by your browser (usually located within the “settings”, “help” “tools”
        or “edit” facility). Many browsers are set to accept cookies until you change your settings.
      </p>
      <p>
        If you do not accept our cookies, you may experience some inconvenience in your use of our
        Site. For example, we may not be able to recognize your computer or mobile device and you
        may need to log in every time you visit our Site.
      </p>
      <p>
        Further information about cookies, including how to see what cookies have been set on your
        computer or mobile device and how to manage and delete them,
        visit <a href="www.allaboutcookies.org">www.allaboutcookies.org</a> and <a href="www.youronlinechoices.com.uk">www.youronlinechoices.com.uk</a>
      </p>
      <p>
        You can also prevent the use of Google Analytics relating to your use of our Site by
        downloading and installing the browser plugin <a href="https://tools.google.com/dlpage/gaoptout?hl=en-GB.">here</a>.
      </p>

      <h2>13. How long we store your personal data</h2>
      <p>
        We will only retain your Personal Data for so long as we reasonably need to use it for the
        purposes set out in &quot;2. Uses made of the information&quot;, unless a longer retention period is
        required by law (for example for regulatory purposes).
      </p>
      <p>
        The table below shows our standard retention practices:
      </p>

      <table className="full-width">
        <thead>
          <tr>
            <th>
              Category of Personal Data
            </th>
            <th>
              Retention period
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Geolocation Information
            </td>
            <td>
              For so long as you do not opt-out of the
              geolocation functionality on our Site, and in
              any event, no longer than 30 days following
              deletion of your Account as a back-up copy to
              enable restoration.
            </td>
          </tr>
          <tr>
            <td>
              <ul>
                <li>Registration Data</li>
                <li>Selfie Data</li>
                <li>Log and Usage Data</li>
                <li>Your Content Data</li>
                <li>Behavioral Data</li>
                <li>Marketing;</li>
                <li>Communications Data</li>
              </ul>
            </td>
            <td>
              For so long as retention is necessary to fulfil
              the Purposes/Use for which it is used (see &quot;2.
              Uses made of the information&quot;) and in any
              event, no longer than 30 days following
              deletion of your Account as a back-up copy to
              enable restoration.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>14. Contact</h2>
      <p>
        Localee LLC is the controller (for the purposes of the GDPR) of your personal data, and is
        registered in the United States.
      </p>
      <p>
        This privacy policy was last updated on: August 4, 2020
      </p>
      <p>
        It’s good to talk, email us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>
      </p>
    </S.Wrap>
  </ScreenPage>
);

export default observer(PrivacyAndPolicyScreen);
