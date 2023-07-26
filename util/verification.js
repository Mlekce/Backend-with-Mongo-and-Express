function validateInput(email, password) {
  return (email && password && email.includes("@") && password.trim().length > 6)
}

function validateInputEmail(email, cmail, password){
    return (email && cmail && password && email === cmail && password.trim().length > 6)
}

function validatePostCreation(title, summary, author, content){
  return (title 
    && summary 
    && author 
    && content 
    && title.trim().length > 0
    && summary.trim().length > 0
    && author.trim().length > 0
    && content.trim().length > 0)
}
module.exports = {
    validateInput : validateInput,
    validateInputEmail: validateInputEmail,
    validatePostCreation: validatePostCreation
}
