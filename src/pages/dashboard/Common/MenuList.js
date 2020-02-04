import React from "react";
import {FixedSizeList as List} from "react-window";



const height = 35;

export default function MenuList({options, children, maxHeight, getValue}) {


    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    if(options.length*height<maxHeight){
        maxHeight=options.length*height;
    }
    return (
        <List
            height={maxHeight}
            itemCount={children.length}
            itemSize={height}
            initialScrollOffset={initialOffset}
        >
            {({index, style}) => <div style={style}>{children[index]}</div>}
        </List>
    );

}