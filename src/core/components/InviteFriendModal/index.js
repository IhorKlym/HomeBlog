import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/plain.css';
import RoundedButton from 'components/RoundedButton';
import Input from 'components/Input';
import Modal from 'components/Modal';
import GoogleLoginButton from 'components/GoogleLoginButton';
import Validate from 'services/validation';
import stores from 'core/stores';
import { IconEmail } from 'styles/icons';

import ContactItem from './components/ContactItem';
import * as S from './styles';

const emailValidation = {
  email: 'email'
};

const InviteFriendModal = () => {
  const { invitationsStore: { inviteViaEmail, inviteViaText, getGoogleContacts } } = stores;
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState('email');
  const [email, setEmail] = useState('');
  const [emailValidator, setEmailValidator] = useState({});
  const [phone, setPhone] = useState('');
  const [phoneValidator, setPhoneValidator] = useState({});
  const [googleContacts, setGoogleContacts] = useState([]);

  const validateEmail = () => {
    const valid = Validate({ email }, emailValidation);
    setEmailValidator(email ? valid : {});
  };
  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const validatePhone = (newValue, country) => {
    let valid = { isValid: true };
    if (!newValue || !country || (country.format.split('.').length - 1) > newValue.length) {
      valid = {
        errors: {
          phone: '• Please provide valid phone number!'
        }
      };
    }
    setPhoneValidator(phone ? valid : {});
    return !!valid;
  };
  const handleChangePhone = (value: any, country: any) => {
    setPhone(value);
    validatePhone(value, country);
  };

  const handleGoogleLogin = async (params: any) => {
    const data = await getGoogleContacts(params);
    if (data) {
      setMode('google');
      setGoogleContacts(data);
    }
  };

  const sendInvite = () => {
    let request;
    if (mode === 'email' && emailValidator.isValid) {
      request = inviteViaEmail(email);
    } else if (mode === 'phone' && phoneValidator.isValid) {
      const formatted = `+${phone.replace(/\D/g, '')}`;
      request = inviteViaText(formatted);
    }
    if (request) {
      request.then(() => {
        setShowModal(false);
        setEmail('');
        setPhone('');
        setPhoneValidator({});
      });
    }
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  return (
    <>
      <S.Button text onClick={() => setShowModal(true)}>
        <S.Icon><IconEmail /></S.Icon>
        Invite Friends
      </S.Button>
      <Modal
        open={showModal}
        header="Invite Friends"
        onClose={() => setShowModal(false)}
      >
        {mode === 'email' && <S.ModalContent>
          <Input
            placeholder="Friend’s Email Address"
            value={email}
            onChange={handleChangeEmail}
            error={emailValidator.errors && emailValidator.errors.email}
          />
          <RoundedButton md primary
            disabled={!emailValidator.isValid}
            onClick={sendInvite}
          >
            INVITE
          </RoundedButton>
        </S.ModalContent>}

        {mode === 'phone' && <S.ModalContent>
          <S.PhoneFieldWrap>
            <PhoneInput
              enableSearch
              country='us'
              placeholder="Friend’s Phone Number"
              value={phone}
              onChange={handleChangePhone}
            />
            {(phoneValidator.errors && phoneValidator.errors.phone) && <S.PhoneFieldError>
              {phoneValidator.errors.phone}
            </S.PhoneFieldError>}
          </S.PhoneFieldWrap>
          <RoundedButton md primary
            disabled={!phoneValidator.isValid}
            onClick={sendInvite}
          >
            INVITE
          </RoundedButton>
        </S.ModalContent>}

        {mode === 'google' && <S.ModalContent>
          {!googleContacts.length && <p>Contacts not found</p>}
          {!!googleContacts.length && <S.Contacts>
            {googleContacts.map(contact => (
              <ContactItem key={contact.id}
                contact={contact}
                sendInvite={inviteViaEmail}
              />
            ))}
          </S.Contacts>}
        </S.ModalContent>}

        <S.ModalButtonWrap>
          {mode !== 'email' && <RoundedButton primary onClick={() => setMode('email')}>
            INVITE FRIEND VIA EMAIL
          </RoundedButton>}
          {mode !== 'phone' && <RoundedButton primary onClick={() => setMode('phone')}>
            INVITE FRIEND VIA TEXT
          </RoundedButton>}
          <GoogleLoginButton handleLogin={handleGoogleLogin}>
            INVITE FRIEND FROM GOOGLE
          </GoogleLoginButton>
        </S.ModalButtonWrap>
      </Modal>
    </>
  );
};

InviteFriendModal.defaultProps = {
  icon: null
};

export default observer(InviteFriendModal);
