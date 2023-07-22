function validateInput(email, password) {
  return (email && password && email.includes("@") && password.trim().length > 6)
}

function validateInputEmail(email, cmail, password){
    return (email && cmail && password && email === cmail && password.trim().length > 6)
}
module.exports = {
    validateInput : validateInput,
    validateInputEmail: validateInputEmail
}
