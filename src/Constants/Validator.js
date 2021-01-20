export const emailValidator = (email) => {
  if (email) {
    var emailPattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    if (email.match(emailPattern)) return '';
    else return 'Invalid Email Address';
  } else return ' ';
};

export const passwordValidator = (password) => {
  if (password) {
    if (password.length >= 6) return '';
    else return 'Password at lest 6 character long';
  } else return ' ';
};

export const confirmPasswordValidator = (password, confirmPassword) => {
  if (password && confirmPassword) {
    if (password === confirmPassword) return '';
    else return 'Password did not match';
  } else return ' ';
};
