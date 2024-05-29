define(['qlik', 'text!./template.html', 'css!./index.css'], function (
    qlik,
    template
) {
    function getObjectTitleId(layout) {
        // `header#${layout.qInfo.qId}_title` - targets the area at the top that leave unwanted whitespace;
        return `${layout.qInfo.qId}_title`;
    }

    function getObjectContentId(layout) {
        // `#${layout.qInfo.qId}_content` - targets the body of the object
        return `${layout.qInfo.qId}_content`;
    }

    function render(layout) {
        function qualifySelector(selector) {
            // Use this when making jQuery selections
            // so other qlik objects are not targeted
            const contentId = `#${getObjectContentId(layout)}`; // Prepend to every query

            return `${contentId} ${selector}`;
        }

        console.log('layout: ', layout);

        const {
            imageMedia,
            imageHeight,
            imageWidth,
            caption,
            captionTextAlignment,
            captionFontSize,
        } = layout;

        $(`header#${getObjectTitleId(layout)}`).css('display', 'none'); // Remove title (The default qlik one that leaves ugly white space at the top)

        const captionEl = $(qualifySelector('.CaptionedImage-caption'));
        const imageContainerEl = $(
            qualifySelector('.CaptionedImage-image-container')
        );
        const imageEl = $(`<img src="${imageMedia}"  alt="${caption}"/>`);

        imageContainerEl.empty();
        imageEl.css('height', imageHeight || '50px');
        imageEl.css('width', imageWidth || '50px');

        // Alter HTML
        captionEl.text(caption);
        captionEl.css('text-align', captionTextAlignment);
        captionEl.css('font-size', captionFontSize);

        imageContainerEl.append(imageEl);
    }

    return {
        template: template,
        definition: {
            type: 'items',
            component: 'accordion',
            items: {
                imageMedia: {
                    type: 'string',
                    label: 'Image',
                    component: 'media',
                    ref: 'imageMedia',
                    layoutRef: 'imageMedia',
                },
                imageHeight: {
                    type: 'string',
                    label: 'Image Height',
                    ref: 'imageHeight',
                },
                imageWidth: {
                    type: 'string',
                    label: 'Image Width',
                    ref: 'imageWidth',
                },
                caption: {
                    type: 'string',
                    label: 'Caption',
                    ref: 'caption',
                    expression: 'optional',
                },
                captionTextAlignment: {
                    type: 'string',
                    label: 'Text Alignment',
                    ref: 'captionTextAlignment',
                    component: 'dropdown',
                    defaultValue: 'center',
                    options: [
                        { label: 'Center', value: 'center' },
                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },
                    ],
                },
                captionFontSize: {
                    type: 'string',
                    label: 'Font Size',
                    ref: 'captionFontSize',
                    expression: 'optional',
                },
            },
        },
        support: {
            snapshot: true,
            export: true,
            exportData: false,
        },
        paint: function ($element, layout) {
            render(layout);

            return qlik.Promise.resolve();
        },
        controller: [
            '$scope',
            function ($scope) {
                //add your rendering code here
                $scope.html = 'Hello World';
            },
        ],
    };
});
