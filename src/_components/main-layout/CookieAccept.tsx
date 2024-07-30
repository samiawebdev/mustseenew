import CookieConsent from 'react-cookie-consent';

const CookieAccept = () => {
  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      cookieName="c-rgpd"
      style={{ background: 'orange' }}
      buttonStyle={{
        color: '#000',
        fontSize: '15px',
        backgroundColor: 'white',
      }}
      declineButtonStyle={{
        margin: '10px 10px 10px 0',
        color: '#000',
        backgroundColor: 'white',
      }}
      expires={1}
    >
      <span className="text-zinc-950">Ce site web utilise des cookies <span>&nbsp;&nbsp; <a href='/cgu' target="_blank"><ins>En savoir plus</ins></a> </span></span>
    </CookieConsent>
  );
};
export default CookieAccept;