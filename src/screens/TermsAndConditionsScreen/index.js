// @flow

import React from 'react';
import { observer } from 'mobx-react';

import ScreenPage from 'components/ScreenPage';

import * as S from './styles';

const TermsAndConditionsScreen = () => (
  <ScreenPage withTopBar withFooter withHeader theme="SYSTEM">
    <S.Wrap>
      <p>
        Hey, welcome to WeKnow’s Terms and Conditions of Use (these &quot;Terms&quot;). This is a contract
        between you and WeKnow and we want you to be aware of yours and our rights before you use
        the WeKnow platform (&quot;Site&quot; or “WeKnow”). Please take some time to read these Terms before
        enjoying the Site, because once you access, view or use the Site, you will be legally bound by
        these Terms.
      </p>
      <p>
        If you have any questions about these Terms or our site, please contact us at: <a href="mailto: hello@we-know.com">hello@we-know.com</a>.
      </p>

      <h2>1. WeKnow rules</h2>
      <p>
        Before you can use our Site, you will need to register for an account (&quot;Account&quot;). In order to
        create an Account you must:
      </p>
      <ol>
        <li>sign in through your Google, or by providing your email, first name and last name</li>
        <li>be at least 18 years old;</li>
        <li>be legally permitted to use the Site in your country.</li>
      </ol>
      <p>
        If you create an Account, you authorize us to access, display and use certain information from
        Google account (e.g. name). For more information about what information we use and how we
        use it, please check out our Privacy Policy
      </p>
      <p>
        You cannot use another user’s Account without her permission.
      </p>
      <p>
        We hope you love the community on WeKnow, but if you want to leave, you can delete your
        Account at any time by emailing us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>, or for Google, you can go to the
        relevant settings page within those services and disallow access by the Site. We will save your
        profile information in case you realize you miss us and you decide to restore your Account;
        check our Privacy Policy for more information. If you would like Your Content or profile
        information to be deleted, please contact us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>
      </p>
      <p>
        WeKnow reserves the right at its sole discretion to terminate or suspend any Account, or make
        use of any operational, technological, legal or other means available to enforce the Terms
        (including without limitation blocking specific IP addresses), at any time without liability and
        without the need to give you prior notice.
      </p>

      <h2>2. Types of content</h2>
      <p>There are three types of content that you will be able to access on the Site:</p>
      <ol>
        <li>content that you upload and provide (&quot;Your Content&quot;);</li>
        <li>content that members provide (&quot;Member Content&quot;);</li>
        <li>content that WeKnow provides (&quot;Our Content&quot;).</li>
      </ol>

      <h3>We don’t allow certain content on WeKnow</h3>
      <p>
        We want our users to freely communicate on WeKnow, but we have to impose restrictions on
        certain content that:
      </p>
      <ul>
        <li>
          contains language which could be deemed offensive or is likely to harass, upset,
          embarrass, alarm or annoy any other person;
        </li>
        <li>
          is obscene, pornographic or otherwise may offend human dignity;
        </li>
        <li>
          is abusive, insulting or threatening, or which promotes or encourages racism, sexism,
          hatred or bigotry;
        </li>
        <li>
          encourages any illegal activity including, without limitation, terrorism, inciting racial
          hatred or the submission of which in itself constitutes committing a criminal offence;
        </li>
        <li>
          is defamatory or libellous;
        </li>
        <li>
          involves the transmission of &quot;junk&quot; mail or &quot;spam&quot;;
        </li>
        <li>
          contains any spy ware, adware, viruses, corrupt files, worm programs or other malicious
          code designed to interrupt, damage or limit the functionality of or disrupt any software,
          hardware, telecommunications, networks, servers or other equipment, Trojan horse or any
          other material designed to damage, interfere with, wrongly intercept or expropriate any
          data or personal information whether from WeKnow or otherwise;
        </li>
        <li>
          itself, or the posting of which, infringes any third party&#39;s rights (including, without
          limitation, intellectual property rights and privacy rights);
        </li>
        <li>
          shows another person which was created or distributed without that person’s consent;
          and/or
        </li>
        <li>
          breaches the terms of our community guidelines
        </li>
      </ul>
      <p>
        We operate a zero-tolerance policy for this kind of content.
      </p>
      <p>
        To guarantee a safe environment for all, you must also comply with our Community Guidelines,
        when engaging with the WeKnow community.
      </p>
      <p>
        We have a team that reviews Your Content and Member Content to ensure that it complies with
        these Terms. Our moderation tools and team of moderators may remove any of Your Content
        that they consider breaches our Community Guidelines, restrict or prohibit your access to the
        site, and/or delete your Account, if in their reasonable opinion, you breach any of the restrictions
        in these Terms or the Community Guidelines
      </p>

      <h3>Your Content</h3>
      <p>
        As Your Content is created by you, you are responsible and liable for Your Content and will
        indemnify, defend, release, and hold us harmless from any claims made in connection with Your
        Content.
      </p>
      <p>
        You may not display any personal contact or banking information on your individual profile
        page whether in relation to you or any other person (for example, names, home addresses or
        postcodes, telephone numbers, email addresses, URLs, credit/debit card or other banking
        details). If you do choose to reveal any personal information about yourself to other users,
        whether via email or otherwise, it is at your own risk. We encourage you to use the same caution
        in disclosing details about yourself to third parties online as you would under any other
        circumstances.
      </p>
      <p>
        WeKnow is a public community, so Your Content will be visible to other users of the Site all
        around the world. Please make sure you are comfortable sharing Your Content before you post it,
        particularly insofar as it relates to your children. As such, you agree that Your Content may be
        viewed by other users and any person visiting, participating in or who is sent a link to the Site.
        By uploading Your Content on WeKnow, you represent and warrant to us that you have all
        necessary rights and licenses to do so, and automatically grant us a non-exclusive, royalty free,
        perpetual, worldwide license to use Your Content in any way (including, without limitation,
        editing, copying, modifying, adapting, translating, reformatting, creating derivative works from,
        incorporating into other works, advertising, distributing and otherwise making available to the
        general public Your Content, whether in whole or in part and in any format or medium currently
        known or developed in the future).
      </p>
      <p>
        We may assign and/or sub-license the above license to our affiliates and successors without any
        further approval by you.
      </p>
      <p>
        We have the right to remove, edit, limit or block access to any of Your Content at any time, and
        we have no obligation to display or review Your Content.
      </p>

      <h3>Member Content</h3>
      <p>
        Other members of WeKnow will also share content via the Site. Member Content belongs to the
        user who posted the content and is stored on our servers and displayed via the Site at the
        direction of the user providing the Member Content.
      </p>
      <p>
        You do not have any rights in relation to other users&#39; Member Content, and you may only use
        other WeKnow users&#39; personal information to the extent that your use of it matches WeKnow’s
        purpose of allowing people to meet one another. You may not use other users&#39; information for
        commercial purposes, to spam, to harass, or to make unlawful threats. We reserve the right to
        terminate your Account if you misuse other users&#39; information.
      </p>

      <h3>Our Content</h3>
      <p>
        The rest of the content on WeKnow belongs to us. Any other text, content, graphics, user
        interfaces, trademarks, logos, sounds, artwork, and other intellectual property appearing on
        WeKnow are owned, controlled or licensed by us and are protected by copyright, trademark and
        other intellectual property law rights. All right, title and interest in and to Our Content remains
        with us at all times.
      </p>
      <p>
        We grant you a non-exclusive, limited, personal, non-transferable, revocable, license to access
        and use Our Content, without the right to sublicense, under the following conditions:
      </p>
      <ol>
        <li>
          you shall not use, sell, modify, or distribute Our Content except as permitted by the
          functionality of the Site;
        </li>
        <li>
          you shall not use our name in metatags, keywords and/or hidden text;
        </li>
        <li>
          you shall not create derivative works from Our Content or commercially exploit Our
          Content, in whole or in part, in any way;
        </li>
        <li>
          you shall use Our Content for lawful purposes only.
        </li>
      </ol>

      <p>
        We reserve all other rights.
      </p>

      <h2>3. Restrictions on the Site</h2>
      <p>
        We don’t tolerate bad behavior on WeKnow. You can report any abuse or complain about
        Member Content by contacting us, outlining the abuse and/or complaint. Email us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>
      </p>
      <p>
        We also want our users to respect WeKnow. Scraping or replicating any part of the Site without
        our prior consent is expressly prohibited. This includes by any means (automated or otherwise)
        other than through our currently available, published interfaces - unless you have been
        specifically allowed to do so in a separate agreement with us.
      </p>

      <h2>4. Privacy</h2>
      <p>
        For information about how WeKnow Limited collects, uses, and shares your personal data,
        please check out our Privacy Policy.
      </p>
      <p>
        The terms were last updated on: August 4, 2020
      </p>
      <p>
        It’s good to talk, email us at <a href="mailto: hello@we-know.com">hello@we-know.com</a>
      </p>
    </S.Wrap>
  </ScreenPage>
);

export default observer(TermsAndConditionsScreen);
