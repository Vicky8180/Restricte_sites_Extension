This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).


## This repository is pushed on BitBucket and the link is https://bitbucket.org/trial18299/block_wensites/src/master/



## Watch Here : https://drive.google.com/file/d/1B1slNhr4jOwQPacxUg47Cxal2MLiAlEQ/view?usp=sharing


https://github.com/Vicky8180/Restricte_sites_Extension/assets/76256436/208c32d9-00ba-4dc0-80c3-dd47e2c67606


![30 06 2024_23 00 25_REC](https://github.com/Vicky8180/Restricte_sites_Extension/assets/76256436/22c7d3ce-ac30-42c7-b1a1-dc6a5c3a85fb)






## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
