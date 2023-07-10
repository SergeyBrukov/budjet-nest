const regex = {
    EMAIL: "^[_a-z0-9-]+([\\._a-z0-9-])*@[a-z-]+(\\.[a-z-])*(\\.[a-z]{2,})$",
    REGEX_STANDARD_STATUS: /_/g,
    TEXT: "^[\\'\\ʼ\\`\\-a-zA-Zа-яґіїєёА-ЯҐІЇЄЁ ]+$",
    NAME: "^[\\'\\ʼ\\`\\-a-zA-Zа-яґіїєёА-ЯҐІЇЄЁ ]+$",
    AMOUNT: '^\\d+(\\.\\d{1,8})?$',
    NUMBERS: /\D+/g,
    REGEX_NUMBER: /^\d+$/,

};

export {
    regex
}