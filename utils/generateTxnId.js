
const generateTxnId = ()=>{

    const prefix = 'TXN-';

    const date = Date.now() + Math.floor(Math.random() * 10);
    ;

    return `${prefix}${date}`
}

export default generateTxnId;