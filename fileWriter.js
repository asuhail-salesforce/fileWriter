const fs = require('fs');

const run = () => {
    //regex to find text to replace
    const regex = /<apiVersion>\d+\.?\d*/g; //<apiVersion>XX.X

    //New text to replace existing text found by regex
    const replaceWith = '<apiVersion>56.0';

    //Root path of the folder containing the files
    const prefix = '/Users/asuhail/Documents/workspace/github_repos/jest/via_cmex/';

    //list of files to update
    const fileNames = [
        "aura/vplAdsCloneQuoteWithProducts/vplAdsCloneQuoteWithProducts.cmp-meta.xml",
        "aura/sfiAdsModifyQuotewithMediaAdPlacement/sfiAdsModifyQuotewithMediaAdPlacement.cmp-meta.xml",
        "aura/vlpAdsCreateOrder/vlpAdsCreateOrder.cmp-meta.xml",
        "aura/vlpAdsGenerateAdServerUserId/vlpAdsGenerateAdServerUserId.cmp-meta.xml",
        "aura/vlpAdsGenerateAdServerAdvertiserId/vlpAdsGenerateAdServerAdvertiserId.cmp-meta.xml",
        "aura/vplAdsCloneQouteWithoutProducts/vplAdsCloneQouteWithoutProducts.cmp-meta.xml",
        "aura/sfiAdsGenerateAdServerAgentId/sfiAdsGenerateAdServerAgentId.cmp-meta.xml",
        "pages/vplS360StripePaymentIntegration.page-meta.xml"
    ];



    let notUpdatedCount = 0;
    let nonUpdatedList = [];
    let updatedList = [];

    fileNames.forEach(filename => {
        const filePath = prefix+filename;
        const wholeFileBuff = fs.readFileSync(filePath);
        let wholeFileString = wholeFileBuff.toString();
        let apiVersionMatch = wholeFileString.match(regex);
        let apiVersion = apiVersionMatch[0].split('>')[1];

        if (parseFloat(apiVersion) < 56.0) {
            let stringAfterReplace = wholeFileString.replace(apiVersionMatch,replaceWith);
            updatedList.push(filePath);
            fs.writeFileSync(filePath, stringAfterReplace);
        } else {
            nonUpdatedList.push(filePath);
            ++notUpdatedCount;
        }
        
    });

    if (notUpdatedCount) {
        console.log(notUpdatedCount, 'out of', fileNames.length, 'components are not updated :=>');
        console.log(nonUpdatedList); 
    }
    
}

run();
