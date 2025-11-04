/*
  # Rules: * Cannot be empty or null  
  1. Minimum length should be 8 characters
  2. At least one lowercase character
  3. At least one uppercase character
  4. At least one number
  5. At least one special character ($, @, #)
  6. No easy passwords
 
  
    - Additional rules:
      - Should not contain name (password.includes(name))
      - Should not contain email (password.includes(email))
      - Should not contain repeated character-sets

  # Category
    - Strong
    - Moderate
    - Weak
*/

// Main Check: Password is empty or null
function validatePassword(password) {
  confirmPassword = document.getElementById('inputConfirmPassword').value
  if(!password) {
    document.getElementById('invalid-password-alert').classList.remove('d-none')
    document.getElementById('invalid-password-alert').classList.add('d-block')
    return  // Guard clause - Terminates the FUNCTION here
  } else if(password !== confirmPassword) {
    document.getElementById('passwords-no-match').classList.remove('d-none')
    document.getElementById('passwords-no-match').classList.add('d-block')
  }

  let score = 0

  // Check: 1. Minimum length should be 8 characters
  if(password.length >= 8) {
    document.getElementById('length-check').classList.add('fa-solid', 'fa-square-check')
    document.getElementById('length-check-container').classList.add('list-group-item-success')
    score++
  } else {
    document.getElementById('length-check').classList.add('fa-solid', 'fa-square-xmark')
    document.getElementById('length-check-container').classList.add('list-group-item-danger')
  }

  
  let containsLower = false
  let containsUpper = false
  let containsNumber = false
  let containsSpecialChar = false
  // Iterate through each character of the password string
  for(let i = 0; i < password.length; i++) {
    let char = password[i]

    // Check: 2. At least one lowercase character
    if(char >= 'a' && char <= 'z') {
      containsLower = true
    }

    // Check: 3. At least one uppercase character
    if(char >= 'A' && char <= 'Z') {
      containsUpper = true
    }

    // Check: 4. At least one number
    if(char >= 0 && char <= 9) {
      containsNumber = true
    }

    // Check: 5. At least one special character ($, @, #)
    if(char == '$' || char == '@' || char == '#') {
      containsSpecialChar = true
    }
  }
  if(containsLower) {
    document.getElementById('lowercase-check').classList.add('fa-solid', 'fa-square-check')
    document.getElementById('lowercase-check-container').classList.add('list-group-item-success')
    score++
  } else {
    document.getElementById('lowercase-check').classList.add('fa-solid', 'fa-square-xmark')
    document.getElementById('lowercase-check-container').classList.add('list-group-item-danger')
  }

  if(containsUpper) {
    document.getElementById('uppercase-check').classList.add('fa-solid', 'fa-square-check')
    document.getElementById('uppercase-check-container').classList.add('list-group-item-success')
    score++
  } else {
    document.getElementById('uppercase-check').classList.add('fa-solid', 'fa-square-xmark')
    document.getElementById('uppercase-check-container').classList.add('list-group-item-danger')
  }

  if(containsNumber) {
    document.getElementById('number-check').classList.add('fa-solid', 'fa-square-check')
    document.getElementById('number-check-container').classList.add('list-group-item-success')
    score++
  } else {
    document.getElementById('number-check').classList.add('fa-solid', 'fa-square-xmark')
    document.getElementById('number-check-container').classList.add('list-group-item-danger')
  }

  if(containsSpecialChar) {
    document.getElementById('special-char-check').classList.add('fa-solid', 'fa-square-check')
    document.getElementById('special-char-check-container').classList.add('list-group-item-success')
    score++
  } else {
    document.getElementById('special-char-check').classList.add('fa-solid', 'fa-square-xmark')
    document.getElementById('special-char-check-container').classList.add('list-group-item-danger')
  }

  const easyPasswords = ['user', 'admin', 'password', 'test', '12345', 'qwerty']
  // Check for easy passwords
  if(!easyPasswords.some(function(pattern) {
    return password.toLowerCase().includes(pattern)
  })) {
    document.getElementById('easy-check').classList.add('fa-solid', 'fa-square-check')
    document.getElementById('easy-check-container').classList.add('list-group-item-success')
    score++
  } else {
    document.getElementById('easy-check').classList.add('fa-solid', 'fa-square-xmark')
    document.getElementById('easy-check-container').classList.add('list-group-item-danger')
  }

  if(score == 6) {
    document.getElementById('strong-password').classList.remove('d-none')
    document.getElementById('strong-password').classList.add('d-block')
  } else if(score >= 4) {
    document.getElementById('moderate-password').classList.remove('d-none')
    document.getElementById('moderate-password').classList.add('d-block')
  } else {
    document.getElementById('weak-password').classList.remove('d-none')
    document.getElementById('weak-password').classList.add('d-block')
  }
}

// const inputPassword = prompt("Enter your password")
// console.log(inputPassword)

// validatePassword(inputPassword)




  // Check: 5. At least one number
  // const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  // Iterate through each character of the password string
//   let containsDigit = false
//   for(let i = 0; i < password.length; i++) {
//     // Check whether the character is (=) any of the characters in digits
//     // if(digits.includes(password[i])) {
//     if(!isNaN(Number(password[i]))) {
//       console.log("At least one number ✅")
//       containsDigit = true
//       break // Guard clause - Terminates the LOOP here
//     }
//   }
//   if(!containsDigit) {
//     console.log("At least one number ⚠")
//   }
// }


/*
  # Additional resources:
    - https://www.w3schools.com/charsets/ref_html_ascii.asp
*/