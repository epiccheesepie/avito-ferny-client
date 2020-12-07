const namePng = _ => {
    let name = '';
    const symbols = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i=0; i<4; i++) {
        name += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    return 'banner_' + name + '.png';
};

export default namePng;