import React from 'react';
import  { Svg, Path } from 'react-native-svg';

export default function Checkmark(props) {
    const {size, color='currentColor'} = props;

    return (
        <Svg width={size} height={size}>
            <Path 
                class="checkmark" 
                fill="none" 
                strokeWidth="8"
                stroke={color} 
                strokeMiterlimit="10" 
                d="M81.7,17.8C73.5,9.3,62,4,49.2,4 C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
            />
        </Svg>
    );
}