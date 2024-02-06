import Snackbar from 'awesome-snackbar';

const snackMessageTemplate = (message, icon) =>
  `
    <style>
      @keyframes loader {
        0% {
          width: 100%;
        }
        100% {
          width: 0%;
        }
      }
    </style>
    <div style="display: flex; justify-content: space-between; gap: 0.5em; margin: 0.2em 0; align-items: center;">
      <span class="material-symbols-rounded">${icon}</span>
      <p>${message}</p>
      <div class='loader'>
    </div>
  `;

const snackDefaultSettings = (color) => ({
  // timeout: 0, // Dev debug tools
  // actionText: 'Hide',
  position: 'bottom-left',
  waitForEvent: false,
  style: {
    container: [
      ['padding', '0px 10px']
    ],
    message: [['line-height', '1em']],
    loader : [
      ['width', '100%'],
      ["height", "4px"],
      ["background", color],
      ["border-radius", "0 2px 2px 0"],
      ["position", "absolute"],
      ["bottom", "0"],
      ["left", "0"],
      ['animation', 'loader 3.7s linear 0.3s forwards']
    ],
  },
});

export const errorSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'error'), snackDefaultSettings('#DC343B'));
};

export const warningSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'warning'), snackDefaultSettings('#ffd400'));
};

export const infoSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'info'), snackDefaultSettings('#007cb7'));
};

export const successSnackBar = (message) => {
  new Snackbar(snackMessageTemplate(message, 'check_circle'), snackDefaultSettings('#39a845'));
};
