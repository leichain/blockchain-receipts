import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';
import fs from 'fs';

const apiUrl = 'https://api.covalenthq.com/v1/eth-mainnet/transaction_v2/0x409b56eaa505274b636835fd1ec5a8319a1c9278731054be1b9842b48b0ca548/?&no-logs=true&with-nft-sales=true&key=ckey_df06b26ac0f6496cbe4d04455ec';

fetch(apiUrl)
  .then(response => response.json())
  .then(apiResponse => {
    const transactions = apiResponse.data.items;

    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const document = dom.window.document;

    // Add styles and link to Google Fonts
    const head = document.head;
    const styleElement = document.createElement('style');
    const linkElement = document.createElement('link');

    styleElement.textContent = `
        body {
            font-family: 'Roboto', sans-serif;
            display: flex;
            justify-content: center;
            padding: 20px;
            background-color: #f2f2f2;
        }
        .receipt {
            border: 1px solid black;
            padding: 20px;
            width: 600px;
            background-color: #ffffff;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .banner {
            background-color: #ff91a4;
            position: absolute;
            width: 130%;
            height: 150px;
            transform: rotate(-10deg);
            left: -15%;
            top: -50px;
            z-index: -1;
        }
        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .header img {
            width: 100px;
            height: 100px;
            margin-bottom: 10px;
            border-radius: 50%;
            border: 2px solid black;
        }
        .details {
            margin-top: 20px;
        }
        .details img {
            width: 100px;
            height: 100px;
            margin: 0 auto 10px;
            display: block;
        }
        .total {
            background-color: #ff91a4;
            color: #ffffff;
            padding: 10px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 20px;
        }
    `;

    linkElement.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap';
    linkElement.rel = 'stylesheet';

    head.appendChild(styleElement);
    head.appendChild(linkElement);

    transactions.forEach((transaction) => {
      if (transaction.nft_sale_details && transaction.nft_sale_details[0]) {
        const nftDetails = transaction.nft_sale_details[0];

        // Create HTML elements for each transaction
        const receiptDiv = document.createElement('div');
        receiptDiv.className = 'receipt';

        const bannerDiv = document.createElement('div');
        bannerDiv.className = 'banner';
        receiptDiv.appendChild(bannerDiv);

        const headerDiv = document.createElement('div');
        headerDiv.className = 'header';
        const logoImg = document.createElement('img');
        logoImg.src = 'https://www.datocms-assets.com/86369/1683821198-blur.png';
        headerDiv.appendChild(logoImg);

        const titleElement = document.createElement('h2');
        titleElement.textContent = 'NFT Sale Receipt';
        headerDiv.appendChild(titleElement);

        const etherscanLinkElement = document.createElement('p');
        const etherscanLink = document.createElement('a');
        etherscanLink.href = `https://etherscan.io/tx/${transaction.tx_hash}`;
        etherscanLink.target = '_blank';
        etherscanLink.textContent = `${transaction.tx_hash}`; // Set the text content to the transaction hash
        etherscanLinkElement.appendChild(etherscanLink);
        footerDiv.appendChild(etherscanLinkElement);
        receiptDiv.appendChild(footerDiv);

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'details';

        const walletElement = document.createElement('p');
        walletElement.innerHTML = `<strong>Wallet Address:</strong> ${transaction.from_address}`;
        detailsDiv.appendChild(walletElement);

        const collectionElement = document.createElement('p');
        collectionElement.innerHTML = `<strong>NFT Collection:</strong> ${nftDetails.collection_name}`;
        detailsDiv.appendChild(collectionElement);

        const nftImgElement = document.createElement('img');
        nftImgElement.src = nftDetails.image;
        detailsDiv.appendChild(nftImgElement);

        const nftNameElement = document.createElement('p');
        nftNameElement.innerHTML = `<strong>NFT Name:</strong> ${nftDetails.name}`;
        detailsDiv.appendChild(nftNameElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.innerHTML = `<strong>Description:</strong> ${nftDetails.description}`;
        detailsDiv.appendChild(descriptionElement);
        receiptDiv.appendChild(detailsDiv);

        const totalDiv = document.createElement('div');
        totalDiv.className = 'total';
        const totalElement = document.createElement('h3');
        totalElement.textContent = `Total: $${nftDetails.nft_token_price_usd.toFixed(2)}`;
        totalDiv.appendChild(totalElement);
        receiptDiv.appendChild(totalDiv);

        const footerDiv = document.createElement('div');
        footerDiv.className = 'footer';

        const feesPaidElement = document.createElement('p');
        feesPaidElement.innerHTML = `<strong>Fees paid (USD):</strong> $${transaction.pretty_gas_quote}`;
        footerDiv.appendChild(feesPaidElement);

        document.body.appendChild(receiptDiv);
      }
    });

    fs.writeFile('output.html', dom.serialize(), function (err) {
      if (err) throw err;
      console.log('Saved!');
  });
  })
  .catch(error => console.error('Error fetching data:', error));