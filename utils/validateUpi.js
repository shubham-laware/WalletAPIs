

const validateUPI = (upi)=>{

    return /\d{10}@[\w-]+/.test(upi)
}

export default validateUPI;