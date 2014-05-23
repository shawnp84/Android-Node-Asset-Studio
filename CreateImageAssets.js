var jsdom = require("jsdom").jsdom;
var document = jsdom("<html><head></head><body></body></html>");
var canvas = require('canvas');
var window = document.parentWindow;
var imagelib = require("./imagelib.js");
var studio = require("./util.js").studioLibrary;
var fs = require('fs');
var resList = {};

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var shapes = {
    'ab_solid': 1,
    'ab_transparent': 1,
    'ab_stacked_solid': 1,
    'ab_bottom_solid': 1,
    'ab_texture_tile': 1,
    'menu_dropdown_panel': 1,
    //'menu_hardkey_panel':1,
    'tab_unselected': 1,
    'tab_unselected_pressed': 1,
    'tab_unselected_focused': 1,
    'tab_selected': 1,
    'tab_selected_pressed': 1,
    'tab_selected_focused': 1,
    'spinner_ab_focused': 1,
    'spinner_ab_pressed': 1,
    'progress_primary': 1,
    'progress_secondary': 1,
    'list_focused': 1,
    'list_pressed': 1,
    'btn_cab_done_focused': 1,
    'btn_cab_done_pressed': 1,
    'cab_background_top': 1,
    'cab_background_bottom': 1
};

var nonStyledShapes = {
    'spinner_ab_default': 1,
    'spinner_ab_disabled': 1,
    'progress_bg': 1,
    'btn_cab_done_default': 1
}

var neutralOptionNonStyledShapes = {
    'btn_cab_done_pressed': 1,
    'spinner_ab_pressed': 1,
    'list_pressed': 1
}

var xmlTemplates = {
    'styles': 1,
    'styles-sherlock': 1,
    'styles-v14-sherlock': 1,
    'styles-appcompat': 1,
    'styles-v14-appcompat': 1,
    //'colors':1,
    //'focused_background':1,
    //'pressed_background':1,
    'selectable_background': 1,
    'spinner_background_ab': 1,
    'tab_indicator_ab': 1,
    'progress_horizontal': 1,
    'btn_cab_done': 1,
    'ab_background_textured': 1
}

for (var density in {
    'xxhdpi': 1,
    'xhdpi': 1,
    'hdpi': 1,
    'mdpi': 1
})
    for (var backgroundShape in shapes)
        for (var type in {
            'back': 1,
            'fore1': 1,
            'mask': 1
        })
            resList[backgroundShape + '-' + density + '-' + type] = (
                'res/actionbar-stencil/' + backgroundShape + '/' + density + '/' + type + '.png');

// cab assets need 2nd mask
for (var density in {
    'xxhdpi': 1,
    'xhdpi': 1,
    'hdpi': 1,
    'mdpi': 1
})
    for (var backgroundShape in {
        'cab_background_top': 1,
        'cab_background_bottom': 1,
        'tab_selected_focused': 1,
        'tab_selected_pressed': 1,
        'tab_unselected_focused': 1,
        'tab_unselected_pressed': 1
    })
        resList[backgroundShape + '-' + density + '-' + 'mask1'] = (
            'res/actionbar-stencil/' + backgroundShape + '/' + density + '/' + 'mask1' + '.png');

// tab hairline      
for (var density in {
    'xxhdpi': 1,
    'xhdpi': 1,
    'hdpi': 1,
    'mdpi': 1
})
    for (var backgroundShape in {
        'tab_unselected_focused': 1,
        'tab_unselected_pressed': 1
    }) {
        resList[backgroundShape + '-' + density + '-' + 'mask_old'] = (
            'res/actionbar-stencil/' + backgroundShape + '/' + density + '/' + 'mask_old' + '.png');
        resList[backgroundShape + '-' + density + '-' + 'mask_old1'] = (
            'res/actionbar-stencil/' + backgroundShape + '/' + density + '/' + 'mask_old1' + '.png');
    }

for (var density in {
    'xxhdpi': 1,
    'xhdpi': 1,
    'hdpi': 1,
    'mdpi': 1
})
    for (var nonStyledShape in nonStyledShapes)
        for (var type in {
            'light': 1,
            'dark': 1
        })
            resList[nonStyledShape + '-' + density + '-' + type] = (
                'res/actionbar-stencil/' + nonStyledShape + '/' + density + '/' + type + '.png');

// neutral        
for (var density in {
    'xxhdpi': 1,
    'xhdpi': 1,
    'hdpi': 1,
    'mdpi': 1
})
    for (var neutralOptionNonStyledShape in neutralOptionNonStyledShapes)
        for (var type in {
            'light': 1,
            'dark': 1
        })
            resList[neutralOptionNonStyledShape + '-' + density + '-' + type] = (
                'res/actionbar-stencil/' + neutralOptionNonStyledShape + '/' + density + '/' + type + '.png');

// JG
var xmlList = {};
for (var template in xmlTemplates)
    xmlList[template] = (
        'res/actionbar-xml-templates/' + template + '.xml');

var XML_RESOURCES = {};
var IMAGE_RESOURCES = {};
var PREVIEW_RESOURCES = {};

imagelib.loadImageResources(resList, document, function (r) {
    IMAGE_RESOURCES = r;
    IMAGE_RESOURCES._loaded = true;

    imagelib.loadXmlTemplates(xmlList, function (r2) {
        XML_RESOURCES = r2;
        XML_RESOURCES._loaded = true;
        //regenerate();  
    });

});

var PARAM_RESOURCES = {
    'xxhdpi-tab_unselected_pressed': {
        w: 8,
        h: 14
    },
    'xhdpi-tab_unselected_pressed': {
        w: 6,
        h: 10
    },
    'hdpi-tab_unselected_pressed': {
        w: 5,
        h: 8
    },
    'mdpi-tab_unselected_pressed': {
        w: 4,
        h: 6
    },

    'xxhdpi-tab_unselected_focused': {
        w: 8,
        h: 14
    },
    'xhdpi-tab_unselected_focused': {
        w: 6,
        h: 10
    },
    'hdpi-tab_unselected_focused': {
        w: 5,
        h: 8
    },
    'mdpi-tab_unselected_focused': {
        w: 4,
        h: 6
    },

    'xxhdpi-tab_unselected': {
        w: 8,
        h: 14
    },
    'xhdpi-tab_unselected': {
        w: 6,
        h: 10
    },
    'hdpi-tab_unselected': {
        w: 5,
        h: 8
    },
    'mdpi-tab_unselected': {
        w: 4,
        h: 6
    },

    'xxhdpi-tab_selected_pressed': {
        w: 8,
        h: 26
    },
    'xhdpi-tab_selected_pressed': {
        w: 6,
        h: 18
    },
    'hdpi-tab_selected_pressed': {
        w: 5,
        h: 14
    },
    'mdpi-tab_selected_pressed': {
        w: 4,
        h: 10
    },

    'xxhdpi-tab_selected_focused': {
        w: 8,
        h: 26
    },
    'xhdpi-tab_selected_focused': {
        w: 6,
        h: 18
    },
    'hdpi-tab_selected_focused': {
        w: 5,
        h: 14
    },
    'mdpi-tab_selected_focused': {
        w: 4,
        h: 10
    },

    'xxhdpi-tab_selected': {
        w: 8,
        h: 26
    },
    'xhdpi-tab_selected': {
        w: 6,
        h: 18
    },
    'hdpi-tab_selected': {
        w: 5,
        h: 14
    },
    'mdpi-tab_selected': {
        w: 4,
        h: 10
    },

    'xxhdpi-ab_solid': {
        w: 74,
        h: 74
    },
    'xhdpi-ab_solid': {
        w: 50,
        h: 50
    },
    'hdpi-ab_solid': {
        w: 38,
        h: 38
    },
    'mdpi-ab_solid': {
        w: 26,
        h: 26
    },

    'xxhdpi-ab_transparent': {
        w: 74,
        h: 74
    },
    'xhdpi-ab_transparent': {
        w: 50,
        h: 50
    },
    'hdpi-ab_transparent': {
        w: 38,
        h: 38
    },
    'mdpi-ab_transparent': {
        w: 26,
        h: 26
    },

    'xxhdpi-ab_stacked_solid': {
        w: 74,
        h: 74
    },
    'xhdpi-ab_stacked_solid': {
        w: 50,
        h: 50
    },
    'hdpi-ab_stacked_solid': {
        w: 38,
        h: 38
    },
    'mdpi-ab_stacked_solid': {
        w: 26,
        h: 26
    },

    'xxhdpi-ab_bottom_solid': {
        w: 74,
        h: 74
    },
    'xhdpi-ab_bottom_solid': {
        w: 50,
        h: 50
    },
    'hdpi-ab_bottom_solid': {
        w: 38,
        h: 38
    },
    'mdpi-ab_bottom_solid': {
        w: 26,
        h: 26
    },

    'xxhdpi-menu_dropdown_panel': {
        w: 194,
        h: 98
    },
    'xhdpi-menu_dropdown_panel': {
        w: 130,
        h: 66
    },
    'hdpi-menu_dropdown_panel': {
        w: 98,
        h: 50
    },
    'mdpi-menu_dropdown_panel': {
        w: 66,
        h: 34
    },

    'xxhdpi-spinner_ab_focused': {
        w: 68,
        h: 98
    },
    'xhdpi-spinner_ab_focused': {
        w: 46,
        h: 66
    },
    'hdpi-spinner_ab_focused': {
        w: 35,
        h: 50
    },
    'mdpi-spinner_ab_focused': {
        w: 24,
        h: 34
    },

    'xxhdpi-spinner_ab_pressed': {
        w: 68,
        h: 98
    },
    'xhdpi-spinner_ab_pressed': {
        w: 46,
        h: 66
    },
    'hdpi-spinner_ab_pressed': {
        w: 35,
        h: 50
    },
    'mdpi-spinner_ab_pressed': {
        w: 24,
        h: 34
    },

    'xxhdpi-spinner_ab_default': {
        w: 68,
        h: 98
    },
    'xhdpi-spinner_ab_default': {
        w: 46,
        h: 66
    },
    'hdpi-spinner_ab_default': {
        w: 35,
        h: 50
    },
    'mdpi-spinner_ab_default': {
        w: 24,
        h: 34
    },

    'xxhdpi-spinner_ab_disabled': {
        w: 68,
        h: 98
    },
    'xhdpi-spinner_ab_disabled': {
        w: 46,
        h: 66
    },
    'hdpi-spinner_ab_disabled': {
        w: 35,
        h: 50
    },
    'mdpi-spinner_ab_disabled': {
        w: 24,
        h: 34
    },

    'xxhdpi-list_focused': {
        w: 20,
        h: 20
    },
    'xhdpi-list_focused': {
        w: 14,
        h: 14
    },
    'hdpi-list_focused': {
        w: 11,
        h: 11
    },
    'mdpi-list_focused': {
        w: 8,
        h: 8
    },

    'xxhdpi-list_pressed': {
        w: 20,
        h: 20
    },
    'xhdpi-list_pressed': {
        w: 14,
        h: 14
    },
    'hdpi-list_pressed': {
        w: 11,
        h: 11
    },
    'mdpi-list_pressed': {
        w: 8,
        h: 8
    },

    'xxhdpi-progress_primary': {
        w: 68,
        h: 50
    },
    'xhdpi-progress_primary': {
        w: 46,
        h: 34
    },
    'hdpi-progress_primary': {
        w: 35,
        h: 26
    },
    'mdpi-progress_primary': {
        w: 24,
        h: 18
    },

    'xxhdpi-progress_secondary': {
        w: 14,
        h: 50
    },
    'xhdpi-progress_secondary': {
        w: 10,
        h: 34
    },
    'hdpi-progress_secondary': {
        w: 8,
        h: 26
    },
    'mdpi-progress_secondary': {
        w: 6,
        h: 18
    },

    'xxhdpi-progress_bg': {
        w: 14,
        h: 50
    },
    'xhdpi-progress_bg': {
        w: 10,
        h: 34
    },
    'hdpi-progress_bg': {
        w: 8,
        h: 26
    },
    'mdpi-progress_bg': {
        w: 6,
        h: 18
    },

    'xxhdpi-btn_cab_done_default': {
        w: 6,
        h: 80
    },
    'xhdpi-btn_cab_done_default': {
        w: 5,
        h: 56
    },
    'hdpi-btn_cab_done_default': {
        w: 4,
        h: 44
    },
    'mdpi-btn_cab_done_default': {
        w: 4,
        h: 32
    },

    'xxhdpi-btn_cab_done_focused': {
        w: 6,
        h: 80
    },
    'xhdpi-btn_cab_done_focused': {
        w: 5,
        h: 56
    },
    'hdpi-btn_cab_done_focused': {
        w: 4,
        h: 44
    },
    'mdpi-btn_cab_done_focused': {
        w: 4,
        h: 32
    },

    'xxhdpi-btn_cab_done_pressed': {
        w: 6,
        h: 80
    },
    'xhdpi-btn_cab_done_pressed': {
        w: 5,
        h: 54
    },
    'hdpi-btn_cab_done_pressed': {
        w: 4,
        h: 41
    },
    'mdpi-btn_cab_done_pressed': {
        w: 6,
        h: 28
    },

    'xxhdpi-cab_background_top': {
        w: 74,
        h: 74
    },
    'xhdpi-cab_background_top': {
        w: 50,
        h: 50
    },
    'hdpi-cab_background_top': {
        w: 38,
        h: 38
    },
    'mdpi-cab_background_top': {
        w: 26,
        h: 26
    },

    'xxhdpi-cab_background_bottom': {
        w: 74,
        h: 74
    },
    'xhdpi-cab_background_bottom': {
        w: 50,
        h: 50
    },
    'hdpi-cab_background_bottom': {
        w: 38,
        h: 38
    },
    'mdpi-cab_background_bottom': {
        w: 26,
        h: 26
    },

    'xxhdpi-ab_texture_tile': {
        w: 12,
        h: 12
    },
    'xhdpi-ab_texture_tile': {
        w: 8,
        h: 8
    },
    'hdpi-ab_texture_tile': {
        w: 6,
        h: 6
    },
    'mdpi-ab_texture_tile': {
        w: 6,
        h: 6
    },

};

var NEUTRAL_PRESSED_COLOR_DARK = '#F0F0F0';
var NEUTRAL_PRESSED_COLOR_LIGHT = '#999999';

var INVERSE_THEME_ATTRS =
    '        <!-- Light.DarkActionBar specific -->\n' +
    '        <item name="android:actionBarWidgetTheme">@style/Theme.##stylep##.Widget</item>\n';

var INVERSE_THEME_ATTRS_SHERLOCK =
    '        <!-- Light.DarkActionBar specific -->\n' +
    '        <item name="actionBarWidgetTheme">@style/Theme.##stylep##.Widget</item>\n';

/**
 * Main image generation routine.
 */
function regenerate(force) {
    if (!force) {
        if (regenerate.timeout_) {
            clearTimeout(regenerate.timeout_);
        }
        regenerate.timeout_ = setTimeout(function () {
            regenerate(true);
        }, 1000);
        return;
    }

    if (!IMAGE_RESOURCES._loaded || !XML_RESOURCES._loaded)
        return;
        
   	 var values = {
        'name': process.argv[2],
        'theme': process.argv[3],
        'compat': process.argv[4],
        'neutralPressed': process.argv[5],
        'theme': process.argv[6],
        'actionbarstyle': process.argv[7],
        'hairline': process.argv[8],
        'texture': process.argv[9],
        'accentColor': {
            color: process.argv[10]
        },
        'secondaryColor': {
            color: process.argv[11]
        },
        'tertiaryColor': {
            color: process.argv[12]
        },
        'cabBackColor': {
            color: process.argv[13]
        },
        'tabColor': {
            color: process.argv[14]
        },
        'backColor': {
            color: process.argv[15]
        },
        'cabHighlightColor': {
            color: process.argv[16]
        },
        'foreColor': {
            color: process.argv[17]
        }
    };
   
  /*  var values = {
        'name': 'Test',
        'theme': 'Test',
        'compat': 'sherlock',
        'neutralPressed': 'On',
        'theme': 'light_dark',
        'actionbarstyle': 'solid',
        'hairline': 'Off',
        'texture': 'Off',
        'accentColor': {
            color: '#FF0000'
        },
        'secondaryColor': {
            color: '#FF0000'
        },
        'tertiaryColor': {
            color: '#FF0000'
        },
        'cabBackColor': {
            color: '#FF0000'
        },
        'tabColor': {
            color: '#FF0000'
        },
        'backColor': {
            color: '#FF0000'
        },
        'cabHighlightColor': {
            color: '#FF0000'
        },
        'foreColor': {
            color: '#FF0000'
        }
    };
*/
    //Creating some local variables
    var styleName = values['name'].replace(/[^a-z0-9_]/ig, '');
    var baseTheme = values['theme'];
    var compat = values['compat'];
    var coreTheme = ((baseTheme == 'light_dark') ? 'dark' : baseTheme);
    var neutralPressed = values['neutralPressed'];
    baseThemeSetting = baseTheme;

    var styleNameTC = toTitleCase(styleName);

    var rx = new RegExp('##stylep##', "g");
    var inverseAttrs = (baseTheme == 'light_dark') ? INVERSE_THEME_ATTRS.replace(rx, styleNameTC) : '';
    var inverseAttrsSherlock = (baseTheme == 'light_dark') ? INVERSE_THEME_ATTRS_SHERLOCK.replace(rx, styleNameTC) : '';

    var acc = values['accentColor'].color.substring(1);
    if (acc.length == 3) {
        acc = acc[0] + acc[0] + acc[1] + acc[1] + acc[2] + acc[2];
    }
    var replaceStrings = {
        'style': (styleName.toLowerCase()),
        'stylep': (styleNameTC),
        'base': ((baseTheme == 'light') ? '.Light' : ''),
        'accent': (acc.toUpperCase()),
        'actionbarstyle': (toTitleCase(values['actionbarstyle'])),

        'tab_unselected': ((values['hairline'] == true) ? '@drawable/tab_unselected_' + styleName.toLowerCase() : '@android:color/transparent'),
        'solid_ab_bg': ((values['texture'] == true) ? 'background_textured' : 'solid'),
        'solid_ab_bottom_bg': ((values['texture'] == true) ? 'background_textured' : 'bottom_solid'),

        'parent_theme': ((baseTheme == 'light_dark') ? '.Light.DarkActionBar' : ((baseTheme == 'light') ? '.Light' : '')),
        'inverse': ((baseTheme == 'light_dark') ? '.Inverse' : ''),
        'actionbar_base': ((baseTheme == 'light_dark') ? '.Light' : ((baseTheme == 'light') ? '.Light' : '')),
        'inverse_attrs': inverseAttrs,
        'inverse_attrs_sherlock': inverseAttrsSherlock
    };

    var continue_ = function (foreCtx) {
        // Create XML Style Resources
        for (var template in xmlTemplates) {
            if (template == 'styles-sherlock') continue;
            if (template == 'styles-appcompat') continue;
            if (template == 'styles-v14-sherlock' && compat != 'sherlock') continue;
            if (template == 'styles-v14-appcompat' && compat != 'appcompat') continue;
            var dir;
            var suffix = '';
            if (template == 'styles' || template == 'colors') {
                dir = 'res/values/';
                if (template == 'styles' && compat == 'sherlock') {
                    suffix = '-sherlock';
                }
                if (template == 'styles' && compat == 'appcompat') {
                    suffix = '-appcompat';
                }
            } else if (template == 'styles-v14-sherlock') {
                template = 'styles';
                suffix = '-v14-sherlock';
                dir = 'res/values-v14/';
            } else if (template == 'styles-v14-appcompat') {
                template = 'styles';
                suffix = '-v14-appcompat';
                dir = 'res/values-v14/';
            } else {
                dir = 'res/drawable/';
            }
            dir = "./generated/" + dir;
            if (!fs.existsSync("./generated/res")) {
                fs.mkdirSync("./generated");
                fs.mkdirSync("./generated/res");
            }

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            //Rename template files appropriately
            var data = XML_RESOURCES[template + suffix];
            for (var id in replaceStrings) {
                var regexp = new RegExp('##' + id + '##', "g");
                data = data.replace(regexp, replaceStrings[id]);
            }

            fs.writeFileSync(dir + template + '_' + styleName.toLowerCase() + '.xml', data);
        }
   
        // process non-styled assets
        for (var nonStyledShape in nonStyledShapes) {
            for (var density in {
                'xxhdpi': 1,
                'xhdpi': 1,
                'hdpi': 1,
                'mdpi': 1
            }) {
                var mult = studio.util.getMultBaseMdpi(density);
                var iconSize = PARAM_RESOURCES[density + '-' + nonStyledShape];
                var targetRect = {
                    x: 0,
                    y: 0,
                    w: iconSize.h,
                    h: iconSize.h
                };

                var outCtx = imagelib.drawing.context(iconSize);

                imagelib.drawing.copy(outCtx, IMAGE_RESOURCES[nonStyledShape + '-' + density + '-' + coreTheme], iconSize);

                var newDir = './generated/res/drawable-' + density;

                if (!fs.existsSync(newDir)) {
                    fs.mkdirSync(newDir);
                }
                var buf = new Buffer(outCtx.canvas.toDataURL().match(/;base64,(.+)/)[1], 'base64');
                fs.writeFileSync(newDir + '/' + nonStyledShape + '_' + styleName.toLowerCase() + '.9.png', buf);
            }
        }

        // process neutral non-styled assets
        if (neutralPressed) {
            for (var neutralOptionNonStyledShape in neutralOptionNonStyledShapes) {
                for (var density in {
                    'xxhdpi': 1,
                    'xhdpi': 1,
                    'hdpi': 1,
                    'mdpi': 1
                }) {
                    var mult = studio.util.getMultBaseMdpi(density);
                    var iconSize = PARAM_RESOURCES[density + '-' + neutralOptionNonStyledShape];
                    var targetRect = {
                        x: 0,
                        y: 0,
                        w: iconSize.h,
                        h: iconSize.h
                    };

                    var outCtx = imagelib.drawing.context(iconSize);
                    var newDir = './generated/res/drawable-' + density;
                    imagelib.drawing.copy(outCtx, IMAGE_RESOURCES[neutralOptionNonStyledShape + '-' + density + '-' + coreTheme], iconSize);
                    var buf = new Buffer(outCtx.canvas.toDataURL().match(/;base64,(.+)/)[1], 'base64');
                    fs.writeFileSync(newDir + '/' + neutralOptionNonStyledShape + '_' + styleName.toLowerCase() + '.9.png', buf);

                    if (density == 'xhdpi') {
                        imagelib.loadFromUri(outCtx.canvas.toDataURL(), function (neutralOptionNonStyledShape) {
                            return function (img) {
                                $('#out-icon-' + neutralOptionNonStyledShape).attr('src', img.src);
                            };
                        }(neutralOptionNonStyledShape));
                    }

                }
            }
        }

        // process styled assets
        for (var backgroundShape in shapes) {

            for (var density in {
                'xxhdpi': 1,
                'xhdpi': 1,
                'hdpi': 1,
                'mdpi': 1
            }) {
                var mult = studio.util.getMultBaseMdpi(density);


                // bail if we've already processed a neutral version
                if (neutralPressed && neutralOptionNonStyledShapes.hasOwnProperty(backgroundShape)) {
                    continue;
                }

                var iconSize = PARAM_RESOURCES[density + '-' + backgroundShape];
                //var targetRect = PARAM_RESOURCES[density + '-targetRect'];
                var targetRect = {
                    x: 0,
                    y: 0,
                    w: iconSize.h,
                    h: iconSize.h
                };

                var outCtx = imagelib.drawing.context(iconSize);
                var tmpCtx = imagelib.drawing.context(iconSize);

                var fillColor;
                if (backgroundShape.match('spinner') ||
                    backgroundShape.match('transparent') ||
                    backgroundShape.match('progress') ||
                    backgroundShape.match('list') || backgroundShape.match('cab_done')) {
                    fillColor = values['accentColor'].color;
                } else if (backgroundShape.match('stacked')) {
                    fillColor = values['secondaryColor'].color;
                } else if (backgroundShape.match('menu')) {
                    fillColor = values['tertiaryColor'].color;
                } else if (backgroundShape.match('cab_background')) {
                    fillColor = values['cabBackColor'].color;
                } else if (backgroundShape.match('tab')) {
                    fillColor = values['tabColor'].color;
                } else {
                    fillColor = values['backColor'].color;
                }

                var altFillColor = (backgroundShape.match('cab_background')) ? values['cabHighlightColor'].color :
                    (backgroundShape.match('tab_selected_') || backgroundShape.match('tab_unselected_')) ? values['accentColor'].color : null;

                if (neutralPressed && ((backgroundShape.match('tab_selected_pressed') || backgroundShape.match('tab_unselected_pressed')))) {
                    altFillColor = (coreTheme == 'dark') ? NEUTRAL_PRESSED_COLOR_DARK : NEUTRAL_PRESSED_COLOR_LIGHT;
                }

                var maskName = (backgroundShape.match('tab_unselected_') && (values['hairline'] == true)) ? '-mask_old' : '-mask';

                tmpCtx.save();
                tmpCtx.globalCompositeOperation = 'source-over';
                imagelib.drawing.copy(tmpCtx, IMAGE_RESOURCES[backgroundShape + '-' + density + maskName], iconSize);
                tmpCtx.globalCompositeOperation = 'source-atop';
                tmpCtx.fillStyle = fillColor;
                tmpCtx.fillRect(0, 0, iconSize.w, iconSize.h);

                if (foreCtx) {
                    var copyFrom = foreCtx;
                    var foreSize = {
                        w: foreCtx.canvas.width,
                        h: foreCtx.canvas.height
                    };

                    var tmpCtx2 = imagelib.drawing.context(foreSize);
                    imagelib.drawing.copy(tmpCtx2, foreCtx, foreSize);
                    tmpCtx2.globalCompositeOperation = 'source-atop';
                    tmpCtx2.fillStyle = values['foreColor'].color;
                    tmpCtx2.fillRect(0, 0, foreSize.w, foreSize.h);
                    copyFrom = tmpCtx2;
                    tmpCtx.globalAlpha = values['foreColor'].alpha / 100;

                    imagelib.drawing['drawCenterCrop']
                    (tmpCtx, copyFrom, targetRect, {
                        x: 0,
                        y: 0,
                        w: foreSize.w,
                        h: foreSize.h
                    });
                }
                tmpCtx.restore();

                // TODO
                var tmpCtxAlt;
                if (altFillColor) {
                    tmpCtxAlt = imagelib.drawing.context(iconSize);
                    tmpCtxAlt.save();
                    tmpCtxAlt.globalCompositeOperation = 'source-over';
                    imagelib.drawing.copy(tmpCtxAlt, IMAGE_RESOURCES[backgroundShape + '-' + density + maskName + '1'], iconSize);
                    tmpCtxAlt.globalCompositeOperation = 'source-atop';
                    tmpCtxAlt.fillStyle = altFillColor;
                    tmpCtxAlt.fillRect(0, 0, iconSize.w, iconSize.h);
                    tmpCtxAlt.restore();
                }


                var foreEffect = 1; //values['foreEffect'];
                imagelib.drawing.copy(outCtx, IMAGE_RESOURCES[backgroundShape + '-' + density + '-back'], iconSize);
                imagelib.drawing.copy(outCtx, tmpCtx, iconSize);
                if (altFillColor) {
                    imagelib.drawing.copy(outCtx, tmpCtxAlt, iconSize);
                }
                imagelib.drawing.copy(outCtx, IMAGE_RESOURCES[backgroundShape + '-' + density + '-fore' + foreEffect], iconSize);
                //}

                var ext = (backgroundShape.match('ab_texture_tile')) ? '.png' : '.9.png';
                var newDir = './generated/res/drawable-' + density;
               
                var buf = new Buffer(outCtx.canvas.toDataURL().match(/;base64,(.+)/)[1], 'base64');
                fs.writeFileSync(newDir + '/' + backgroundShape + '_' + styleName.toLowerCase() + ext, buf);

                if (density == 'xhdpi') {
                    imagelib.loadFromUri(outCtx.canvas.toDataURL(), function (backgroundShape) {
                        return function (img) {
                            $('#out-icon-' + backgroundShape).attr('src', img.src);
                        };
                    }(backgroundShape));
                }
            }

        } // JG

    };

    continue_(null);
}
console.log("Creating Assets...");

regenerate();