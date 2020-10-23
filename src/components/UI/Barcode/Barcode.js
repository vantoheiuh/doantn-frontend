import React from 'react';
import Barcode from 'react-barcode';

const barcode = (props) => (
    <Barcode value={props.value} width={1/2} height={30} fontSize={8} />
);

export default barcode;