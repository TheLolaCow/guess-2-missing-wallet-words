const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
const { bip39WordsEnglish } = require('./bip-0039-english');

module.exports.getEthAddressFromPassphrase = async (mnemonic) => {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const path = `m/44'/60'/0'/0/0`;
    const wallet = hdwallet.derivePath(path).getWallet();
    return `0x${wallet.getAddress().toString('hex')}`;
};

module.exports.getAllPossiblePassphrasesIKnowTheFirst10Words = (first10WordsArray) => {
    const allPossiblePassphrases = [];
    const first10Words = first10WordsArray.join(' ');
    bip39WordsEnglish.forEach(word11 =>
        bip39WordsEnglish.forEach(word12 =>
            allPossiblePassphrases.push(`${first10Words} ${word11} ${word12}`)));
    return allPossiblePassphrases;
};
