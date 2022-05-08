export const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

// 6 to 20 characters, contain at least one numeric digit, one uppercase and one lowercase letter
export const validatePassword = (password) => {
  if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
    return true;
  }
  return false;
};

// accept alphabets and only space character between words, should accept min 2 chars and max of 30 chars
export const validateName = (name) => {
  if (/^[a-zA-Z ]{2,30}$/.test(name)) {
    return true;
  }
  return false;
};
