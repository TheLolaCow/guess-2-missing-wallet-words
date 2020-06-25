# guess-2-missing-wallet-words

Guess 2 missing wallet words of a bip39 compatible wallet.

## Instructions

You will need node js and yarn to execute the program.

1. Install the dependencies

```shell script
yarn install
```

2. Generate the file containing the 4 million possible passphrases. (This step will take a while)

```shell script
node .\index.js --step=1
```

3. The file generated in the previous step will be about 300Mb. You should consider splitting it into smaller files with different names. I didn't do this in this version of the code.

4. Run the following command for each of your smaller files generated in the previous step. For example, in the previous step you created 3 files named `part-1.txt`, `part-2.txt`, and `part-3.txt`, you should run these commands. You can open several shells so they run in parallel making the process faster.

```shell script
node .\index.js --step=3 --filename=part-1.txt
```

```shell script
node .\index.js --step=3 --filename=part-2.txt
```

```shell script
node .\index.js --step=3 --filename=part-3.txt
```

5. If the passphrase containing DAI is found, a file named `found.txt` will be created containing the passphrase and the complete ethereum address.

6. Stonks!
