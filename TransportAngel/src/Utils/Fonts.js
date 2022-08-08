import {PixelRatio} from 'react-native'
export default {
    FONTSIZE : {
        MINI  : 12/PixelRatio.getFontScale(),
        SMALL : 14/PixelRatio.getFontScale(),
        MEDIUM : 16/PixelRatio.getFontScale(),
        SEMI : 18/PixelRatio.getFontScale(),
        LARGE : 20/PixelRatio.getFontScale(),
        EXTRALARGE:26/PixelRatio.getFontScale()
    },

    FONTS: {
        THIN:"Poppins-Thin",
        SEMI_BOLD:"Poppins-SemiBold",
        REGULAR:"Poppins-Regular",
        MEDIUM:"Poppins-Medium",
        LIGHT:"Poppins-Light",
        ITALIC:"Poppins-Italic",
        EXTRA_LIGHT:"Poppins-ExtraLight",
        EXTRA_BOLD:"Poppins-ExtraBold",
        BOLD:"Poppins-Bold",
        BLACK:"Poppins-Black"
    },
}