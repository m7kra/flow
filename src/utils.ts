export default function getColors() {
    if (getTheme() === 'dark') {
        return {
            background: '#3c3c3c',
            backgroundTransparent: '#3c3c3cDF',
            color: '#ebebeb0F'
        };
    }
    return {
        background: '#ebebeb',
        backgroundTransparent: '#ebebebDF',
        color: '#3c3c3c0F'
    };
}

// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
function getTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}
