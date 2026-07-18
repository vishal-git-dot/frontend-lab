const fs = require('fs');
const path = require('path');

/*
========================================
 FRONTEND LAB
 MULTI-COLLECTION GALLERY GENERATOR
========================================
*/

const ROOT_DIR = path.join(__dirname, '..');

const COLLECTIONS = [
    'components',
    'animations',
    'experiments',
    'Effects',
    'snippets'
];

const OUTPUT_DIR = path.join(
    ROOT_DIR,
    'data'
);

const OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    'components.json'
);

const STATS_FILE = path.join(
    OUTPUT_DIR,
    'stats.json'
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

function fileExists(filePath){

    return fs.existsSync(filePath);
}

function createDescription(
    collection,
    category,
    type
){

    return `${formatTitle(type)} is a modern ${formatTitle(category)} ${formatTitle(collection)} built using HTML, CSS, and JavaScript.`;
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
    Ensure output directory exists
    --------------------------------
    */

    if(!fileExists(OUTPUT_DIR)){

        fs.mkdirSync(
            OUTPUT_DIR,
            { recursive:true }
        );
    }

    const components = [];

    /*
    ========================================
    LIVE STATS TRACKERS
    ========================================
    */

    const collectionSet = new Set();

    const categorySet = new Set();

    let previewCount = 0;

    /*
    ========================================
    SCAN ALL COLLECTIONS
    ========================================
    */

    COLLECTIONS.forEach(collection => {

        const collectionPath =
            path.join(ROOT_DIR, collection);

        /*
        --------------------------------
        Skip missing collections
        --------------------------------
        */

        if(!fileExists(collectionPath)){

            console.log(
                `Skipped Collection: ${collection}`
            );

            return;
        }

        collectionSet.add(
            formatTitle(collection)
        );

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

        categories.forEach(category => {

            if(category.startsWith('.')){

                return;
            }

            const categoryPath =
                path.join(
                    collectionPath,
                    category
                );

            if(
                !fs.statSync(categoryPath).isDirectory()
            ){
                return;
            }

            categorySet.add(
                formatTitle(category)
            );

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

            componentFolders.forEach(type => {

                if(type.startsWith('.')){

                    return;
                }

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
                --------------------------------
                Validate index.html
                --------------------------------
                */

                const indexFile =
                    path.join(
                        typePath,
                        'index.html'
                    );

                if(!fileExists(indexFile)){

                    console.log(
                        `    Skipped: ${type}`
                    );

                    return;
                }

                /*
                --------------------------------
                Preview image
                --------------------------------
                */

                const previewFile =
                    path.join(
                        typePath,
                        'preview.png'
                    );

                const previewImage =
                    fileExists(previewFile)
                    ? `${collection}/${category}/${type}/preview.png`
                    : null;

                if(previewImage){

                    previewCount++;
                }

                /*
                --------------------------------
                Component object
                --------------------------------
                */

                const component = {

                    id:
                        `${collection}-${category}-${type}`,

                    title:
                        formatTitle(type),

                    description:
                        createDescription(
                            collection,
                            category,
                            type
                        ),

                    collection:
                        formatTitle(collection),

                    category:
                        formatTitle(category),

                    type:
                        formatTitle(type),

                    preview:
                        previewImage,

                    path:
                        `${collection}/${category}/${type}/`,

                    createdAt:
                        new Date().toISOString()
                };

                components.push(component);

                console.log(
                    `    Added: ${component.title}`
                );
            });
        });
    });

    /*
    ========================================
    SORT COMPONENTS
    ========================================
    */

    components.sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    /*
    ========================================
    LIVE STATS OBJECT
    ========================================
    */

    const stats = {

        totalComponents:
            components.length,

        totalCollections:
            collectionSet.size,

        totalCategories:
            categorySet.size,

        totalPreviews:
            previewCount,

        collections:
            [...collectionSet],

        categories:
            [...categorySet],

        generatedAt:
            new Date().toISOString()
    };

    /*
    ========================================
    WRITE COMPONENTS JSON
    ========================================
    */

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(
            components,
            null,
            2
        )
    );

    /*
    ========================================
    WRITE STATS JSON
    ========================================
    */

    fs.writeFileSync(
        STATS_FILE,
        JSON.stringify(
            stats,
            null,
            2
        )
    );

    /*
    ========================================
    CONSOLE OUTPUT
    ========================================
    */

    console.log('\n================================');

    console.log(
        ' Gallery generated successfully'
    );

    console.log(
        ` Total Components: ${components.length}`
    );

    console.log(
        ` Total Collections: ${collectionSet.size}`
    );

    console.log(
        ` Total Categories: ${categorySet.size}`
    );

    console.log(
        ` Total Previews: ${previewCount}`
    );

    console.log(
        ` Output: data/components.json`
    );

    console.log(
        ` Stats: data/stats.json`
    );

    console.log('================================\n');
}

/*
========================================
 RUN
========================================
*/

generateGallery();
