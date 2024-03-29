# NFT Sale Receipt Template

This template is for creating human-readable blockchain receipts for NFT sales using the Covalent Unified API!

The final product looks something like this:
![Receipt example](/images/receipt.png)

Here is a live demo: https://leichain.github.io/blockchain-receipts/

## How to Use This Template

1. Fork this repository.
2. Create a `.env` file and input your API key as follows: `COVALENT_API_KEY=abc`, where "abc" is your key. Your key will remain private as long as you have `.env` specified in your `.gitignore` file.
3. In `styling.mjs`, modify the `const apiUrl` API call with the transaction hash you want to display.
![API call](/images/api-call.png)
4. Navigate to your repository settings, then go to pages. Configure GitHub pages to deploy from your main branch.
![GitHub pages](/images/github-pages.png)
5. In your `package.json` file, modify the `"homepage"` URL to replace `leichain` with your GitHub name.
6. Now, the `index.html` file is where your HTML is going to print when you run the `styling.mjs` script. Delete the current `index.html` file.
7. Open your terminal in VSCode. Now install your packages by typing `npm install node-fetch jsdom`. You can also install GitHub pages by typing `npm install gh-pages`.
8. Now we run our script. To do so, type `node styling.mjs`. You should see a new `index.html` file appear with your HTML. 
9. To view your receipt, go back to your settings for GitHub pages and click "Visit site" where it says your site is live. Alternatively, you can paste the same `"homepage"` URL from `package.json` into your browser. That's it!