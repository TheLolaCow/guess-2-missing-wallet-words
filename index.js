const { getEthAddressFromPassphrase, getAllPossiblePassphrasesIKnowTheFirst10Words } = require('./utils');
const fs = require('fs');

const LEACKED_ADDRESS_STARTS = '0xbf91';
const LEACKED_ADDRESS_ENDS = '1bb4';
const REVEALED_10_WORDS = ['suit', 'drop', 'pretty', 'remind', 'solve', 'buzz', 'skin', 'response', 'tilt', 'almost'];
const FILE_WITH_THE_4_MILLION_PASSPHRASES = './4-million-passphrases.txt';
const FILE_WITH_THE_FOUND_PASSPHRASE = './found.txt';

const getPassphrasesAndSaveThemToAFile = () => {
    const all4MillionPassphrases = getAllPossiblePassphrasesIKnowTheFirst10Words(REVEALED_10_WORDS);
    fs.writeFileSync(FILE_WITH_THE_4_MILLION_PASSPHRASES, all4MillionPassphrases.join('\n'));
}

const scanFileForStonks = async (filename) => {
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(`./${filename}`)
    });

    let count = 0;

    lineReader.on('line', (passphrase) => {
        getEthAddressFromPassphrase(passphrase).then(address => {

            // Print progress every 1000 scanned lines
            if (++count % 1000 === 0) console.log("Scanning ", filename, 'line: ', count);

            if (address.startsWith(LEACKED_ADDRESS_STARTS) && address.endsWith(LEACKED_ADDRESS_ENDS)) {
                // Save the address and the passphrase to a file.
                console.log(`The passphrase was found! STONKS!`, { passphrase, address });
                fs.appendFileSync(FILE_WITH_THE_FOUND_PASSPHRASE, JSON.stringify({ passphrase, address }) + '\n');
            }
        });
    });
};

(async () => {
    const { step, filename } = require('yargs').argv;

    if (!step) throw new Error("You must provide a 'step' param witih values 1, 2 or 3");

    switch (step) {
        case 1:
            // STEP ONE: Build a file with all possible passphrases
            await getPassphrasesAndSaveThemToAFile();
            console.log(`Step one complete! The passphrases are saved in '${FILE_WITH_THE_4_MILLION_PASSPHRASES}'.`);
            break;
        case 2:
            // STEP TWO: Split file with the 4 million passphrases into several smaller files.
            // I DID THIS MANUALLY BUT THE CODE FOR THAT SHOULD BE PRETTY SIMPLE
            console.log("The code for this step does not exist. You can split the file into smaller chuncks manually really easilly.");
            break;
        case 3:
            // STEP THREE: Scan the file to check if in that file lives the passphrase that matches the one with stonks.
            if (!filename) throw new Error("You must provide a 'filename' param.");
            scanFileForStonks(filename);
            break;
    }
})();
