const fs = require('fs');
const path = require('path');

/*
========================================
 FRONTEND LAB
 AUTO GALLERY GENERATOR
========================================

This script:

1. Scans component folders
2. Detects all demos
3. Generates components.json
4. Automatically updates gallery data

========================================
*/

const ROOT_DIR = path.join(__dirname, '..');

const COMPONENTS_DIR = path.join(
    ROOT_DIR,
    'animations'
);

const OUTPUT_DIR = path.join(
    ROOT_DIR,
    'data'
);

const OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    'components.json'
);

/*
========================================
 HELPERS
========================================
*/

function formatTitle(text){

    return text
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );
}

function generateDescription(category, type){

    const descriptions = [
        'Modern frontend UI experiment with smooth animations.',
        'Responsive interactive component built using vanilla frontend.',
        'Creative frontend animation showcasing modern UI motion.',
        'Lightweight HTML, CSS, and JavaScript interaction demo.',
        'Modern reusable frontend component with animation effects.'
    ];

    const random =
        descriptions[
            Math.floor(
                Math.random() * descriptions.length
            )
        ];

    return random;
}

/*
========================================
 MAIN
========================================
*/

function generateGallery(){

    console.log('\n================================');
    console.log(' FRONTEND LAB GALLERY GENERATOR ');
    console.log('================================\n');

    /*
    --------------------------------
    Ensure output folder exists
    --------------------------------
    */

    if(!fs.existsSync(OUTPUT_DIR)){

        fs.mkdirSync(
            OUTPUT_DIR,
            { recursive:true }
        );
    }

    /*
    --------------------------------
    Validate animations folder
    --------------------------------
    */

    if(!fs.existsSync(COMPONENTS_DIR)){

        console.log(
            'Animations folder not found.'
        );

        return;
    }

    const categories =
        fs.readdirSync(COMPONENTS_DIR);

    const components = [];

    /*
    --------------------------------
    Scan categories
    --------------------------------
    */

    categories.forEach(category => {

        const categoryPath =
            path.join(
                COMPONENTS_DIR,
                category
            );

        if(
            !fs.statSync(categoryPath).isDirectory()
        ){
            return;
        }

        console.log(`Scanning: ${category}`);

        const componentFolders =
            fs.readdirSync(categoryPath);

        /*
        ----------------------------
        Scan component types
        ----------------------------
        */

        componentFolders.forEach(type => {

            const typePath =
                path.join(
                    categoryPath,
                    type
                );

            if(
                !fs.statSync(typePath).isDirectory()
            ){
                return;
            }

            /*
            ----------------------------
            Validate index.html exists
            ----------------------------
            */

            const indexFile =
                path.join(
                    typePath,
                    'index.html'
                );

            if(!fs.existsSync(indexFile)){

                console.log(
                    `Skipped: ${type} (missing index.html)`
                );

                return;
            }

            /*
            ----------------------------
            Create component object
            ----------------------------
            */

            const component = {

                title:
                    `${formatTitle(category)} ${formatTitle(type)}`,

                description:
                    generateDescription(category, type),

                category:
                    formatTitle(category),

                type:
                    formatTitle(type),

                path:
                    `animations/${category}/${type}/`
            };

            components.push(component);

            console.log(
                `Added: ${component.title}`
            );
        });
    });

    /*
    --------------------------------
    Sort alphabetically
    --------------------------------
    */

    components.sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    /*
    --------------------------------
    Write components.json
    --------------------------------
    */

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(
            components,
            null,
            2
        )
    );

    console.log('\n================================');
    console.log(
        ` Gallery generated successfully`
    );
    console.log(
        ` Components found: ${components.length}`
    );
    console.log(
        ` Output: data/components.json`
    );
    console.log('================================\n');
}

/*
========================================
 RUN
========================================
*/

generateGallery();
