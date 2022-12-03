

export const phoneNumberFormat = number => {
    const phoneNumber = number.toString()

    const dd = phoneNumber.substr(0,2)
    const digito = phoneNumber.substr(2,1)
    const number1 = phoneNumber.substr(3,4)
    const number2 = phoneNumber.substr(7,4)

    return "("+dd+") "+digito+" "+number1+"-"+number2
    // return dd
 }

export const nivelFormat = type => {
    if(type === 'admin'){
      return 'Admin'
    }
    if(type === 'salesperson'){
      return 'Vendedor'
    }
    if(type === 'marketing'){
      return 'Marketing'
    }
}
  