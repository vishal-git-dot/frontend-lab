const { chromium } = require('playwright');

const fs = require('fs');
const path = require('path');

/*
========================================
 FRONTEND LAB
 AUTO PREVIEW GENERATOR
========================================
*/

const ROOT_DIR = path.join(__dirname, '..');

const COLLECTIONS = [
    'components',
    'animations',
    'effects',
    'experiments',
    'snippets'
];

/*
========================================
 HELPERS
========================================
*/

function fileExists(filePath){

    return fs.existsSync(filePath);
}

/*
========================================
 GENERATE PREVIEWS
========================================
*/

async function generatePreviews(){

    console.log('\n================================');
    console.log(' FRONTEND LAB PREVIEW GENERATOR ');
    console.log('================================\n');

    /*
    --------------------------------
    Launch Browser
    --------------------------------
    */

    const browser = await chromium.launch({
        headless: true
    });

    /*
    --------------------------------
    Create Page
    --------------------------------
    */

    const page = await browser.newPage({

        viewport: {
            width: 1440,
            height: 900
        }
    });

    /*
    ========================================
    SCAN COLLECTIONS
    ========================================
    */

    for(const collection of COLLECTIONS){

        const collectionPath =
            path.join(ROOT_DIR, collection);

        /*
        --------------------------------
        Skip missing folders
        --------------------------------
        */

        if(!fileExists(collectionPath)){

            console.log(
                `Skipped Collection: ${collection}`
            );

            continue;
        }

        console.log(
            `\nScanning Collection: ${collection}`
        );

        const categories =
            fs.readdirSync(collectionPath);

        /*
        ========================================
        SCAN CATEGORIES
        ========================================
        */

        for(const category of categories){

            if(category.startsWith('.')){

                continue;
            }

            const categoryPath =
                path.join(
                    collectionPath,
                    category
                );

            if(
                !fs.statSync(categoryPath).isDirectory()
            ){
                continue;
            }

            console.log(
                `  Category: ${category}`
            );

            const componentFolders =
                fs.readdirSync(categoryPath);

            /*
            ========================================
            SCAN COMPONENTS
            ========================================
            */

            for(const component of componentFolders){

                if(component.startsWith('.')){

                    continue;
                }

                const componentPath =
                    path.join(
                        categoryPath,
                        component
                    );

                if(
                    !fs.statSync(componentPath).isDirectory()
                ){
                    continue;
                }

                /*
                --------------------------------
                index.html check
                --------------------------------
                */

                const htmlFile =
                    path.join(
                        componentPath,
                        'index.html'
                    );

                if(!fileExists(htmlFile)){

                    console.log(
                        `    Skipped: ${component}`
                    );

                    continue;
                }

                /*
                --------------------------------
                Preview output path
                --------------------------------
                */

                const previewPath =
                    path.join(
                        componentPath,
                        'preview.png'
                    );

                /*
                --------------------------------
                Open Component
                --------------------------------
                */

                const fileUrl =
                    `file://${htmlFile}`;

                console.log(
                    `    Generating: ${component}`
                );

                try{

                    await page.goto(fileUrl);

                    /*
                    ----------------------------
                    Wait for animations
                    ----------------------------
                    */

                    await page.waitForTimeout(2000);

                    /*
                    ----------------------------
                    Capture Screenshot
                    ----------------------------
                    */

                    await page.screenshot({

                        path: previewPath,

                        fullPage: true
                    });

                    console.log(
                        `    Saved: preview.png`
                    );
                }

                catch(error){

                    console.log(
                        `    Failed: ${component}`
                    );

                    console.log(error);
                }
            }
        }
    }

    /*
    --------------------------------
    Close Browser
    --------------------------------
    */

    await browser.close();

    console.log('\n================================');
    console.log(' Preview generation completed');
    console.log('================================\n');
}

/*
========================================
 RUN
========================================
*/

generatePreviews();
