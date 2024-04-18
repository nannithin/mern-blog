import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";

export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading...",
            levels: [2,3],
            defaultLeve: 2
        }
    },
    quote: Quote,
    marker: Marker,
    inlineCode : InlineCode

}