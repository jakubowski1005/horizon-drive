export const validateCredentials = (username, email, password, passwordConfirmation, checkbox) => {
    if (username == null || username === '') {
        return [false, 'Username cannot be empty.'];
    }
    if (username.length < 5) {
        return [false, 'Username must be longer than 5 characters.'];
    }
    if (username.length > 32) {
        return [false, 'Username must be shorter than 32 characters.'];
    }
    if (email == null || email === '') {
        return [false, 'E-mail cannot be empty.'];
    }
    if (!email.includes('@')) {
        return [false, 'Incorrect e-mail address.'];
    }
    if (password == null || password === '') {
        return [false, 'Password cannot be empty.'];
    }
    if (password.length < 8) {
        return [false, 'Password must be longer than 8 characters.'];
    }
    if (password.length > 255) {
        return [false, 'Password must be shorter than 255 characters.'];
    }
    if (password.match('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$')) {
        return [false, 'Password must have minimum eight characters, at least one letter and one number.'];
    }
    if (password !== passwordConfirmation) {
        return [false, 'Passwords are diffrent.']
    }
    if (!checkbox) {
        return [false, 'You have to agree with all statements in Terms of service'];
    }
    return [true, 'Redirecting...'];
}

export const truncate = (filename, length = 20) => {
    let half = length / 2;
    return filename.substr(0, half -3 ) + '...' + filename.substr(filename.length - half, filename.length - 1)
}

export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

export const printSize = (size) => {
    if (size === 0) return '0 kB';
    const i = Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}