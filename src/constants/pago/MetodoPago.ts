const bbvaLogo =
  "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1735867001/BBVA-logo_ixxd0h.webp";
const coppelLogo =
  "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1735867001/coppeLogo_bdsqhi.avif";
const SantaderLogo =
  "https://res.cloudinary.com/dk6h3pmlf/image/upload/v1735867001/SantanderLogo_eeq9o5.webp";

export const Transferencia = [
  {
    type: "bbva",
    cardNumber: "4532 7568 9012 3456",
    cardClave: "123124134",
    cardHolder: "JUAN PÉREZ",
    logoSrc: bbvaLogo,
    logoAlt: "BBVA Logo",
  },

  {
    type: "bbva",
    cardNumber: "2522 7268 1772 1414",
    cardClave: "543612435",
    cardHolder: "LUIS OMAR GARCÍA",
    logoSrc: bbvaLogo,
    logoAlt: "BBVA Logo",
  },

  {
    type: "bbva",
    cardNumber: "6351 2512 5762 3124",
    cardClave: "64574578",
    cardHolder: "ANA LAURA PÉREZ",
    logoSrc: bbvaLogo,
    logoAlt: "BBVA Logo",
  },
];

export const Deposito = [
  {
    type: "coppel",
    cardNumber: "0592 3502 4761 1502",
    logoSrc: coppelLogo,
    logoAlt: "Coppel Logo",
  },
  {
    type: "bbva",
    cardNumber: "7777 1312 5621 7562",
    cardClave: "1293981",
    logoSrc: bbvaLogo,
    logoAlt: "BBVA Logo",
  },

  {
    type: "santander",
    cardNumber: "7582 5902 0124 3576",
    logoSrc: SantaderLogo,
    logoAlt: "Santander Logo",
  },
];
