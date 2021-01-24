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

export const displayNameValidator = (name) => {
  if (name.length > 0) {
    return '';
  } else return ' ';
};

export const userNameValidator = (name) => {
  if (name) {
    var userName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim;

    if (name.match(userName)) {
      return '';
    } else return 'only [a-z], [0-9], -, _ are allowed';
  } else return ' ';
};

export const dateValidator = (date) => {
  if (date) {
    var datePattern = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/g;
    if (date.match(datePattern)) {
      return '';
    } else return 'Invalid Date Format';
  } else return ' ';
};
